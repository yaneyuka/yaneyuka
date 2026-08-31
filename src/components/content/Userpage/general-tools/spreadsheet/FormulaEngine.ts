/**
 * スプレッドシートの数式処理エンジン
 *
 * 字句解析 → 再帰下降パース → 評価 の3段構成。
 * 以前は正規表現で「関数名(引数)」を丸ごとマッチする方式だったため、
 *   - =SUM(A1:A3)*2 のような複合式
 *   - =SUM(A1,MAX(B1:B3)) のような入れ子
 *   - $A$1 の絶対参照
 *   - "文字列" リテラル
 * がいずれも解釈できず、しかも失敗を 0 として返していた。
 * ここでは構文木を組んでから評価し、解釈できないものは #ERROR 系の値を返す。
 */

export type CellId = { row: number; col: number };

export class CellError {
  constructor(public code: string) {}
  toString() {
    return this.code;
  }
}

export const ERR = {
  VALUE: '#VALUE!',
  NAME: '#NAME?',
  DIV0: '#DIV/0!',
  REF: '#REF!',
  NUM: '#NUM!',
  SYNTAX: '#SYNTAX!',
} as const;

/** 空セルを表す番兵。0 と区別しないと AVERAGE / COUNT / MIN が狂う。 */
class EmptyValue {
  readonly isEmpty = true;
}
const EMPTY = new EmptyValue();
type Empty = EmptyValue;

type Scalar = number | string | CellError | Empty;
/** 配列は範囲参照（A1:B5）の展開結果 */
type Value = Scalar | Scalar[];

type GetCellValueFn = (cell: CellId) => { value: string; formula: string };
type EvaluateCellFn = (cell: CellId) => number | string;

// 範囲参照の展開上限。誤って A1:ZZ99999 と書かれてもフリーズさせない。
const MAX_RANGE_CELLS = 50000;

// ---------------------------------------------------------------- 字句解析

type Token =
  | { t: 'num'; v: number }
  | { t: 'str'; v: string }
  | { t: 'ref'; v: string }
  | { t: 'ident'; v: string }
  | { t: 'op'; v: string }
  | { t: 'lparen' }
  | { t: 'rparen' }
  | { t: 'comma' }
  | { t: 'colon' };

const REF_RE = /^\$?[A-Za-z]{1,3}\$?\d{1,7}$/;

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < src.length) {
    const ch = src[i];

    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
      i++;
      continue;
    }

    // 文字列リテラル。Excel と同じく "" でエスケープする
    if (ch === '"') {
      i++;
      let buf = '';
      // ★閉じ引用符を見つけたかを明示的に持つ。
      //   以前は `i > src.length` で未終端を検出しようとしていたが、
      //   ループは i === src.length で抜けるためこの条件は決して成立せず、
      //   `="OK` のような未終端リテラルが黙って捨てられていた。
      let closed = false;
      while (i < src.length) {
        if (src[i] === '"') {
          if (src[i + 1] === '"') {
            buf += '"';
            i += 2;
            continue;
          }
          i++;
          tokens.push({ t: 'str', v: buf });
          closed = true;
          break;
        }
        buf += src[i++];
      }
      if (!closed) throw new CellError(ERR.SYNTAX);
      continue;
    }

    if (ch >= '0' && ch <= '9') {
      let buf = '';
      while (i < src.length && /[0-9.]/.test(src[i])) buf += src[i++];
      // 指数表記 (1.5E+3)
      if (src[i] === 'e' || src[i] === 'E') {
        const save = i;
        let exp = src[i++];
        if (src[i] === '+' || src[i] === '-') exp += src[i++];
        if (src[i] >= '0' && src[i] <= '9') {
          while (i < src.length && src[i] >= '0' && src[i] <= '9') exp += src[i++];
          buf += exp;
        } else {
          i = save;
        }
      }
      const n = Number(buf);
      if (Number.isNaN(n)) throw new CellError(ERR.SYNTAX);
      tokens.push({ t: 'num', v: n });
      continue;
    }

    // セル参照 or 関数名。$ から始まるのは参照のみ
    if (ch === '$' || /[A-Za-z_]/.test(ch)) {
      let buf = '';
      while (i < src.length && /[A-Za-z0-9_$.]/.test(src[i])) buf += src[i++];
      if (REF_RE.test(buf)) tokens.push({ t: 'ref', v: buf });
      else tokens.push({ t: 'ident', v: buf.toUpperCase() });
      continue;
    }

    if (ch === '(') { tokens.push({ t: 'lparen' }); i++; continue; }
    if (ch === ')') { tokens.push({ t: 'rparen' }); i++; continue; }
    if (ch === ',') { tokens.push({ t: 'comma' }); i++; continue; }
    if (ch === ':') { tokens.push({ t: 'colon' }); i++; continue; }

    // 2文字演算子を先に見る
    const two = src.substr(i, 2);
    if (two === '>=' || two === '<=' || two === '<>') {
      tokens.push({ t: 'op', v: two });
      i += 2;
      continue;
    }
    if ('+-*/^%&=><'.includes(ch)) {
      tokens.push({ t: 'op', v: ch });
      i++;
      continue;
    }

    throw new CellError(ERR.SYNTAX);
  }

  return tokens;
}

// ------------------------------------------------------------------ 構文木

type Node =
  | { k: 'num'; v: number }
  | { k: 'str'; v: string }
  | { k: 'ref'; v: string }
  | { k: 'range'; from: string; to: string }
  | { k: 'call'; name: string; args: Node[] }
  | { k: 'unary'; op: string; arg: Node }
  | { k: 'binary'; op: string; left: Node; right: Node }
  | { k: 'percent'; arg: Node };

/**
 * 演算子の優先順位（低い順）:
 *   比較 (= <> >= <= > <)
 *   連結 (&)
 *   加減 (+ -)
 *   乗除 (* /)
 *   べき乗 (^, 右結合)
 *   単項 (- +)   ← Excel と同じく ^ より強い。-2^2 は (-2)^2 = 4
 *   後置 (%)
 */
class Parser {
  private pos = 0;
  constructor(private tokens: Token[]) {}

  parse(): Node {
    const node = this.parseComparison();
    if (this.pos < this.tokens.length) throw new CellError(ERR.SYNTAX);
    return node;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private eatOp(...ops: string[]): string | null {
    const tk = this.peek();
    if (tk && tk.t === 'op' && ops.includes(tk.v)) {
      this.pos++;
      return tk.v;
    }
    return null;
  }

  private parseComparison(): Node {
    let left = this.parseConcat();
    const op = this.eatOp('=', '<>', '>=', '<=', '>', '<');
    if (op) left = { k: 'binary', op, left, right: this.parseConcat() };
    return left;
  }

  private parseConcat(): Node {
    let left = this.parseAdditive();
    let op: string | null;
    while ((op = this.eatOp('&'))) {
      left = { k: 'binary', op, left, right: this.parseAdditive() };
    }
    return left;
  }

  private parseAdditive(): Node {
    let left = this.parseMultiplicative();
    let op: string | null;
    while ((op = this.eatOp('+', '-'))) {
      left = { k: 'binary', op, left, right: this.parseMultiplicative() };
    }
    return left;
  }

  private parseMultiplicative(): Node {
    let left = this.parsePower();
    let op: string | null;
    while ((op = this.eatOp('*', '/'))) {
      left = { k: 'binary', op, left, right: this.parsePower() };
    }
    return left;
  }

  private parsePower(): Node {
    const left = this.parseUnary();
    if (this.eatOp('^')) {
      return { k: 'binary', op: '^', left, right: this.parsePower() };
    }
    return left;
  }

  private parseUnary(): Node {
    const op = this.eatOp('-', '+');
    if (op) return { k: 'unary', op, arg: this.parseUnary() };
    return this.parsePostfix();
  }

  private parsePostfix(): Node {
    let node = this.parsePrimary();
    while (this.eatOp('%')) node = { k: 'percent', arg: node };
    return node;
  }

  private parsePrimary(): Node {
    const tk = this.peek();
    if (!tk) throw new CellError(ERR.SYNTAX);

    if (tk.t === 'num') { this.pos++; return { k: 'num', v: tk.v }; }
    if (tk.t === 'str') { this.pos++; return { k: 'str', v: tk.v }; }

    if (tk.t === 'ref') {
      this.pos++;
      const next = this.peek();
      if (next && next.t === 'colon') {
        this.pos++;
        const end = this.peek();
        if (!end || end.t !== 'ref') throw new CellError(ERR.REF);
        this.pos++;
        return { k: 'range', from: tk.v, to: end.v };
      }
      return { k: 'ref', v: tk.v };
    }

    if (tk.t === 'ident') {
      this.pos++;
      const next = this.peek();
      if (!next || next.t !== 'lparen') throw new CellError(ERR.NAME);
      this.pos++;
      const args: Node[] = [];
      if (this.peek()?.t !== 'rparen') {
        args.push(this.parseComparison());
        while (this.peek()?.t === 'comma') {
          this.pos++;
          args.push(this.parseComparison());
        }
      }
      if (this.peek()?.t !== 'rparen') throw new CellError(ERR.SYNTAX);
      this.pos++;
      return { k: 'call', name: tk.v, args };
    }

    if (tk.t === 'lparen') {
      this.pos++;
      const inner = this.parseComparison();
      if (this.peek()?.t !== 'rparen') throw new CellError(ERR.SYNTAX);
      this.pos++;
      return inner;
    }

    throw new CellError(ERR.SYNTAX);
  }
}

// -------------------------------------------------------------- 値の取り扱い

const isEmpty = (v: Scalar): v is Empty => v instanceof EmptyValue;
const isErr = (v: Value): v is CellError => v instanceof CellError;

/**
 * 参照先が「エラー値」かどうか。
 * ★「# で始まる文字列」で判定してはいけない。「#3 増築工事」「#101号室」のような
 *   ごく普通のテキストがエラー扱いになり、それを参照した数式すべてが壊れる。
 *   エンジンが実際に出しうるコードとの完全一致だけをエラーとして扱う。
 */
const ERROR_CODES: ReadonlySet<string> = new Set([
  ...Object.values(ERR),
  '#CIRCULAR!', // Spreadsheet.tsx の循環参照検出が返す値
]);

/** セルの生値を、数値・文字列・空 のいずれかに寄せる */
function coerceCell(raw: number | string): Scalar {
  if (typeof raw === 'number') return raw;
  const s = String(raw);
  if (s === '') return EMPTY;
  if (ERROR_CODES.has(s)) return new CellError(s); // 参照先が既にエラー
  const n = Number(s);
  if (s.trim() !== '' && !Number.isNaN(n) && Number.isFinite(n)) return n;
  return s;
}

/** 算術用の数値化。空セルは 0、数字でない文字列は #VALUE! */
function toNumber(v: Scalar): number | CellError {
  if (isErr(v)) return v;
  if (isEmpty(v)) return 0;
  if (typeof v === 'number') return v;
  if (v.trim() === '') return 0;
  const n = Number(v);
  return Number.isNaN(n) ? new CellError(ERR.VALUE) : n;
}

function toDisplay(v: Scalar): number | string {
  if (isErr(v)) return v.code;
  if (isEmpty(v)) return '';
  return v;
}

/** 集計関数用。範囲・引数をならして「数値だけ」を取り出す（空セル・文字列は除外） */
function flattenNumbers(args: Value[]): number[] | CellError {
  const out: number[] = [];
  for (const a of args) {
    const items = Array.isArray(a) ? a : [a];
    for (const item of items) {
      if (isErr(item)) return item;
      if (isEmpty(item)) continue;
      if (typeof item === 'number') out.push(item);
      // 文字列は Excel の SUM/AVERAGE と同じく無視する
    }
  }
  return out;
}

function flattenAll(args: Value[]): Scalar[] {
  const out: Scalar[] = [];
  for (const a of args) {
    if (Array.isArray(a)) out.push(...a);
    else out.push(a);
  }
  return out;
}

function truthy(v: Scalar): boolean {
  if (isErr(v) || isEmpty(v)) return false;
  if (typeof v === 'number') return v !== 0;
  const s = v.trim().toUpperCase();
  if (s === 'TRUE') return true;
  if (s === 'FALSE' || s === '') return false;
  const n = Number(s);
  return Number.isNaN(n) ? true : n !== 0;
}

const pad2 = (n: number) => String(n).padStart(2, '0');

// -------------------------------------------------------------------- 本体

class FormulaEngine {
  /** 組み込み関数。registerFunction で差し替え・追加できる */
  private functions: Record<string, (args: Value[]) => Value> = {
    SUM: (args) => {
      const nums = flattenNumbers(args);
      return isErr(nums) ? nums : nums.reduce((a, b) => a + b, 0);
    },
    AVERAGE: (args) => {
      const nums = flattenNumbers(args);
      if (isErr(nums)) return nums;
      // 空セルを母数に含めない（従来は 0 として数えていたため平均が狂っていた）
      if (nums.length === 0) return new CellError(ERR.DIV0);
      return nums.reduce((a, b) => a + b, 0) / nums.length;
    },
    MIN: (args) => {
      const nums = flattenNumbers(args);
      if (isErr(nums)) return nums;
      return nums.length ? Math.min(...nums) : 0;
    },
    MAX: (args) => {
      const nums = flattenNumbers(args);
      if (isErr(nums)) return nums;
      return nums.length ? Math.max(...nums) : 0;
    },
    // Excel の COUNT は「数値が入ったセル」だけを数える
    COUNT: (args) => {
      const nums = flattenNumbers(args);
      return isErr(nums) ? nums : nums.length;
    },
    // 空でないセルの個数
    COUNTA: (args) => flattenAll(args).filter((v) => !isEmpty(v)).length,
    ABS: (args) => {
      const n = toNumber(flattenAll(args)[0] ?? EMPTY);
      return isErr(n) ? n : Math.abs(n);
    },
    ROUND: (args) => {
      const flat = flattenAll(args);
      const v = toNumber(flat[0] ?? EMPTY);
      if (isErr(v)) return v;
      const d = flat.length > 1 ? toNumber(flat[1]) : 0;
      if (isErr(d)) return d;
      const mul = Math.pow(10, d);
      return Math.round(v * mul) / mul;
    },
    TODAY: () => {
      const d = new Date();
      return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    },
    NOW: () => {
      const d = new Date();
      return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    },
  };

  // ------------------------------------------------ アドレス変換

  addressToRC(addr: string): CellId | null {
    // $A$1 のような絶対参照も受け付ける（従来は null になり参照が解決できなかった）
    const m = addr.trim().match(/^\$?([A-Za-z]+)\$?(\d+)$/);
    if (!m) return null;
    const letters = m[1].toUpperCase();
    const row = parseInt(m[2], 10) - 1;
    let col = 0;
    for (let i = 0; i < letters.length; i++) {
      col = col * 26 + (letters.charCodeAt(i) - 64);
    }
    col -= 1;
    if (row < 0 || col < 0) return null;
    return { row, col };
  }

  rcToAddress(row: number, col: number): string {
    return `${this.indexToColName(col)}${row + 1}`;
  }

  // ------------------------------------------------ 評価

  evaluateRaw(
    raw: string,
    visited: Set<string>,
    getCellValue: GetCellValueFn,
    evaluateCell: EvaluateCellFn
  ): number | string {
    const t = String(raw ?? '').trim();
    if (!t.startsWith('=')) return String(raw ?? '');

    const body = t.substring(1).trim();
    if (body === '') return '';

    try {
      const ast = new Parser(tokenize(body)).parse();
      const result = this.evalNode(ast, evaluateCell);
      if (Array.isArray(result)) return ERR.VALUE; // 範囲をそのまま表示はできない
      return toDisplay(result);
    } catch (err) {
      if (err instanceof CellError) return err.code;
      return ERR.SYNTAX;
    }
  }

  private evalNode(node: Node, evaluateCell: EvaluateCellFn): Value {
    switch (node.k) {
      case 'num':
        return node.v;
      case 'str':
        return node.v;

      case 'ref': {
        const rc = this.addressToRC(node.v);
        if (!rc) return new CellError(ERR.REF);
        return coerceCell(evaluateCell(rc));
      }

      case 'range': {
        const s = this.addressToRC(node.from);
        const e = this.addressToRC(node.to);
        if (!s || !e) return new CellError(ERR.REF);
        const r0 = Math.min(s.row, e.row);
        const r1 = Math.max(s.row, e.row);
        const c0 = Math.min(s.col, e.col);
        const c1 = Math.max(s.col, e.col);
        if ((r1 - r0 + 1) * (c1 - c0 + 1) > MAX_RANGE_CELLS) return new CellError(ERR.REF);
        const out: Scalar[] = [];
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) out.push(coerceCell(evaluateCell({ row: r, col: c })));
        }
        return out;
      }

      case 'percent': {
        const v = this.scalar(this.evalNode(node.arg, evaluateCell));
        const n = toNumber(v);
        return isErr(n) ? n : n / 100;
      }

      case 'unary': {
        const v = this.scalar(this.evalNode(node.arg, evaluateCell));
        const n = toNumber(v);
        if (isErr(n)) return n;
        return node.op === '-' ? -n : n;
      }

      case 'binary':
        return this.evalBinary(node, evaluateCell);

      case 'call':
        return this.evalCall(node, evaluateCell);
    }
  }

  /** 範囲が単一値の文脈に来たら先頭要素で代用せずエラーにする */
  private scalar(v: Value): Scalar {
    if (Array.isArray(v)) return new CellError(ERR.VALUE);
    return v;
  }

  private evalBinary(node: Extract<Node, { k: 'binary' }>, evaluateCell: EvaluateCellFn): Value {
    const l = this.scalar(this.evalNode(node.left, evaluateCell));
    if (isErr(l)) return l;
    const r = this.scalar(this.evalNode(node.right, evaluateCell));
    if (isErr(r)) return r;

    if (node.op === '&') {
      return `${toDisplay(l)}${toDisplay(r)}`;
    }

    if (['=', '<>', '>', '<', '>=', '<='].includes(node.op)) {
      let cmp: number;
      if (typeof l === 'number' && typeof r === 'number') {
        cmp = l < r ? -1 : l > r ? 1 : 0;
      } else if (isEmpty(l) && isEmpty(r)) {
        cmp = 0;
      } else {
        // 数値と文字列が混ざる場合は Excel と同じく大文字小文字を無視した文字列比較
        const ls = String(toDisplay(l)).toUpperCase();
        const rs = String(toDisplay(r)).toUpperCase();
        cmp = ls < rs ? -1 : ls > rs ? 1 : 0;
      }
      switch (node.op) {
        case '=': return cmp === 0 ? 'TRUE' : 'FALSE';
        case '<>': return cmp !== 0 ? 'TRUE' : 'FALSE';
        case '>': return cmp > 0 ? 'TRUE' : 'FALSE';
        case '<': return cmp < 0 ? 'TRUE' : 'FALSE';
        case '>=': return cmp >= 0 ? 'TRUE' : 'FALSE';
        case '<=': return cmp <= 0 ? 'TRUE' : 'FALSE';
      }
    }

    const ln = toNumber(l);
    if (isErr(ln)) return ln;
    const rn = toNumber(r);
    if (isErr(rn)) return rn;

    switch (node.op) {
      case '+': return ln + rn;
      case '-': return ln - rn;
      case '*': return ln * rn;
      case '/': return rn === 0 ? new CellError(ERR.DIV0) : ln / rn;
      case '^': {
        const p = Math.pow(ln, rn);
        return Number.isFinite(p) ? p : new CellError(ERR.NUM);
      }
    }
    return new CellError(ERR.SYNTAX);
  }

  private evalCall(node: Extract<Node, { k: 'call' }>, evaluateCell: EvaluateCellFn): Value {
    // IF だけは分岐しなかった側を評価しない（未使用の枝の #DIV/0! を拾わないため）
    if (node.name === 'IF') {
      if (node.args.length < 2) return new CellError(ERR.VALUE);
      const cond = this.scalar(this.evalNode(node.args[0], evaluateCell));
      if (isErr(cond)) return cond;
      const branch = truthy(cond) ? node.args[1] : node.args[2];
      if (!branch) return 'FALSE';
      return this.scalar(this.evalNode(branch, evaluateCell));
    }

    const fn = this.functions[node.name];
    if (!fn) return new CellError(ERR.NAME);

    const args: Value[] = [];
    for (const argNode of node.args) {
      const v = this.evalNode(argNode, evaluateCell);
      if (isErr(v)) return v;
      args.push(v);
    }
    try {
      return fn(args);
    } catch {
      return new CellError(ERR.VALUE);
    }
  }

  /** カスタム関数の登録。関数表を直接引くので登録すればすぐ使える */
  registerFunction(name: string, fn: (args: Value[]) => Value) {
    this.functions[name.toUpperCase()] = fn;
  }

  /** 実装済みの関数名一覧（サジェスト表示の裏付けに使う） */
  getFunctionNames(): string[] {
    return ['IF', ...Object.keys(this.functions)].sort();
  }

  // ------------------------------------------------ コピー時の参照調整

  /**
   * 数式内のセル参照を相対的にずらす（オートフィル・コピー用）。
   * 文字列リテラルの中身と関数名は書き換えない。
   */
  adjustFormula(formula: string, rowOffset: number, colOffset: number): string {
    let out = '';
    let i = 0;

    while (i < formula.length) {
      const ch = formula[i];

      // 文字列リテラルはそのまま通す
      if (ch === '"') {
        out += ch;
        i++;
        while (i < formula.length) {
          out += formula[i];
          if (formula[i] === '"' && formula[i + 1] !== '"') { i++; break; }
          if (formula[i] === '"' && formula[i + 1] === '"') { out += formula[++i]; }
          i++;
        }
        continue;
      }

      if (ch === '$' || /[A-Za-z]/.test(ch)) {
        let buf = '';
        const start = i;
        while (i < formula.length && /[A-Za-z0-9_$.]/.test(formula[i])) buf += formula[i++];
        // 直後が '(' なら関数名なので触らない
        const isFunctionName = formula[i] === '(';
        const m = buf.match(/^(\$?)([A-Za-z]{1,3})(\$?)(\d{1,7})$/);
        if (m && !isFunctionName) {
          const [, colAbs, colLetters, rowAbs, rowNum] = m;
          let colIndex = this.colNameToIndex(colLetters.toUpperCase());
          let rowIndex = parseInt(rowNum, 10) - 1;
          if (colAbs !== '$') colIndex += colOffset;
          if (rowAbs !== '$') rowIndex += rowOffset;
          if (colIndex < 0) colIndex = 0;
          if (rowIndex < 0) rowIndex = 0;
          out += `${colAbs}${this.indexToColName(colIndex)}${rowAbs}${rowIndex + 1}`;
        } else {
          out += formula.slice(start, i);
        }
        continue;
      }

      out += ch;
      i++;
    }

    return out;
  }

  private colNameToIndex(name: string): number {
    let index = 0;
    for (let i = 0; i < name.length; i++) {
      index = index * 26 + (name.charCodeAt(i) - 64);
    }
    return index - 1;
  }

  private indexToColName(index: number): string {
    let name = '';
    let n = index + 1;
    while (n > 0) {
      const rem = (n - 1) % 26;
      name = String.fromCharCode(65 + rem) + name;
      n = Math.floor((n - 1) / 26);
    }
    return name;
  }
}

export default FormulaEngine;
