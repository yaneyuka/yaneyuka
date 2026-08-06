// mak_*.tsx に直書きされている建材メーカー情報を src/data/makers.json へ抽出する。
//
// 移行用のスクリプト。抽出後は各コンポーネントが JSON を読む形にするため、
// 通常運用で再実行する必要はない。取りこぼしの検証（verify-makers.mjs）と
// 対で使うことを前提にしている。
//
// 対応している書式は 2 つ:
//   形式A: メーカー1社ぶんの JSX を直書き（11ファイル）
//   形式B: renderCompanyRow('社名', { products: '...', ... }) （5ファイル）

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'src/components/content/leftcolumn-menu';
const OUT = 'src/data/makers.json';

// リンクの並び順は全ファイル共通（商品ページ/カタログ/営業所/お問い合わせ/サンプル/CAD）
const SLOTS = ['products', 'catalog', 'office', 'contact', 'sample', 'cad'];

const clean = (url) => (url && url !== '#' && url.trim() !== '' ? url.trim() : '');

/** 出現順にサブカテゴリ見出しとメーカー行を拾い、直前の見出しに属させる */
function extract(text) {
  const events = [];

  // サブカテゴリ見出し（丸タグ）。{変数} を含むものは動的なので除外
  for (const m of text.matchAll(/rounded-full">([^<{][^<]*)<\/span>/g)) {
    events.push({ at: m.index, kind: 'sub', name: m[1].trim() });
  }

  // 形式A
  const jsxEntry = /<span className="w-\[\d+px\]">・([^<{][^<]*)<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>/g;
  for (const m of text.matchAll(jsxEntry)) {
    const urls = [...m[2].matchAll(/renderLink\('([^']*)'/g)].map((x) => x[1]);
    events.push({ at: m.index, kind: 'maker', name: m[1].trim(), urls });
  }

  // 形式B
  const rowCall = /renderCompanyRow\(\s*'([^']+)'\s*,\s*\{([\s\S]*?)\}\s*\)/g;
  for (const m of text.matchAll(rowCall)) {
    const byKey = {};
    for (const kv of m[2].matchAll(/(\w+)\s*:\s*'([^']*)'/g)) byKey[kv[1]] = kv[2];
    // キー名が products/catalog/... で来るので順序に並べ直す
    const urls = SLOTS.map((s) => byKey[s] ?? '');
    events.push({ at: m.index, kind: 'maker', name: m[1].trim(), urls });
  }

  events.sort((a, b) => a.at - b.at);

  const out = [];
  let sub = '';
  for (const e of events) {
    if (e.kind === 'sub') { sub = e.name; continue; }
    const links = {};
    SLOTS.forEach((slot, i) => { links[slot] = clean(e.urls[i]); });
    out.push({ name: e.name, subcategory: sub, ...links });
  }
  return out;
}

const data = {};
let total = 0;
for (const file of fs.readdirSync(DIR).filter((f) => f.startsWith('mak_') && f.endsWith('.tsx'))) {
  const category = file.replace(/^mak_\d+_/, '').replace('.tsx', '');
  const makers = extract(fs.readFileSync(path.join(DIR, file), 'utf8'));
  data[category] = makers;
  total += makers.length;
  console.log(`${category.padEnd(12)} ${String(makers.length).padStart(4)} 社`);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
console.log(`\n合計 ${total} 社 -> ${OUT}`);
