// mak_*.tsx を読むための共通処理。
// 抽出（extract-makers.mjs）と照合（verify-makers.mjs）で必ず同じ判定を使うために切り出した。
// 別々に実装していたときは、間接型のファイル 9 本ぶんが照合をすり抜けていた。

/** リンクの並び順は全ファイル共通（商品ページ/カタログ/営業所/お問い合わせ/サンプル/CAD） */
export const SLOTS = ['products', 'catalog', 'office', 'contact', 'sample', 'cad'];

/**
 * 「どの文字位置がどの表示ページか」を求める。
 * ファイルには 2 通りの書き方がある:
 *   直接型: case '折板': return ( ...メーカー行... )
 *   間接型: case 'ウレタン防水': return renderUrethaneWaterproof();
 *           …で、その関数はファイル前方に定義されている
 */
/**
 * 描画関数の定義位置。次の定義までを本体とみなす。
 * 引数を取る関数（renderGenericCategory = (title: string) => ...）も対象。
 * これを取りこぼすと、その関数のメーカー行が直前の関数の範囲に含まれてしまい、
 * 置換時に関数の境界ごと消える。
 */
export function renderFunctions(text) {
  // 関数名に日本語が混ざることがある（renderGreen化 など）。
  // ASCII だけで拾うと名前を途中で切り、関数の境界を見誤って定義ごと消してしまう。
  const funcs = [...text.matchAll(/^\s*const\s+(render[\p{L}\p{N}_$]*)\s*=\s*\([^)]*\)\s*(?::[^=]*)?=>/gmu)]
    .map((m) => ({ name: m[1], at: m.index }));
  funcs.forEach((f, i) => { f.end = i + 1 < funcs.length ? funcs[i + 1].at : text.length; });
  return funcs;
}

export function pageRegions(text) {
  const funcs = renderFunctions(text);
  const funcByName = new Map(funcs.map((f) => [f.name, f]));

  const cases = [...text.matchAll(/case\s+'([^']+)'\s*:\s*(?:\n\s*)?(?:return\s+(render[\p{L}\p{N}_$]*)\(\)\s*;)?/gu)]
    .map((m) => ({ name: m[1].trim(), fn: m[2] || null, at: m.index, end: m.index + m[0].length }));

  const regions = [];
  cases.forEach((c, i) => {
    if (c.fn) {
      const f = funcByName.get(c.fn);
      if (f) regions.push({ name: c.name, start: f.at, end: f.end });
      return;
    }
    const next = cases[i + 1];
    // ラベルだけ並んでいる（fallthrough）ときは次の case が本体を持つ
    if (next && next.at - c.end < 4) return;
    regions.push({ name: c.name, start: c.at, end: next ? next.at : text.length });
  });
  return regions;
}

/** メーカー1社ぶんの出現位置・社名・リンク6本を、書式の違いを吸収して返す */
export function makerEvents(text) {
  const events = [];

  // 形式A: メーカーごとに JSX を直書き
  const jsxEntry = /<span className="w-\[\d+px\]">・([^<{][^<]*)<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>/g;
  for (const m of text.matchAll(jsxEntry)) {
    const urls = [...m[2].matchAll(/renderLink\('([^']*)'/g)].map((x) => x[1]);
    events.push({ at: m.index, end: m.index + m[0].length, name: m[1].trim(), urls });
  }

  // 形式B: renderCompanyRow('社名', { products: '...', ... })
  const rowCall = /renderCompanyRow\(\s*'([^']+)'\s*,\s*\{([\s\S]*?)\}\s*\)/g;
  for (const m of text.matchAll(rowCall)) {
    const byKey = {};
    for (const kv of m[2].matchAll(/(\w+)\s*:\s*'([^']*)'/g)) byKey[kv[1]] = kv[2];
    events.push({ at: m.index, end: m.index + m[0].length, name: m[1].trim(), urls: SLOTS.map((s) => byKey[s] ?? '') });
  }

  return events.sort((a, b) => a.at - b.at);
}

/** ページ内の丸タグ見出し。{変数} を含む動的なものは対象外 */
export function groupHeadings(text) {
  return [...text.matchAll(/rounded-full">([^<{][^<]*)<\/span>/g)]
    .map((m) => ({ at: m.index, name: m[1].trim() }));
}

/** 元ファイルが実際に参照している http(s) URL の集合 */
export function sourceUrls(text) {
  const set = new Set();
  for (const m of text.matchAll(/renderLink\('(https?:\/\/[^']*)'/g)) set.add(m[1]);
  for (const m of text.matchAll(/renderCompanyRow\(\s*'[^']+'\s*,\s*\{([\s\S]*?)\}\s*\)/g)) {
    for (const kv of m[1].matchAll(/\w+\s*:\s*'(https?:\/\/[^']*)'/g)) set.add(kv[1]);
  }
  return set;
}
