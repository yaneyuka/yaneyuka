// src/data/makers.json の健全性を確認する。
//   npm run makers:verify
//
// もともとは mak_*.tsx に直書きされていた内容と突き合わせるスクリプトだったが、
// 2026-08-06 に全 16 ファイルを MakerRows へ移行して元データが JSON 側に一本化された。
// 移行時の照合（取りこぼし 0 / ページ割り当て 833 件一致）はコミット履歴に残っている。
// 現在は「JSON として壊れていないか」「表示側が期待する形か」を見る。
//
// ⚠️ pages が歯抜けなのは意図的な運用なので、網羅性は検査しない。
// （メーカーが扱う分類をあえて載せないことで掲載依頼を引き出している）

import fs from 'node:fs';

const FILE = 'src/data/makers.json';
const SLOTS = ['products', 'catalog', 'office', 'contact', 'sample', 'cad'];

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const problems = [];

let total = 0;
let shown = 0;
let linkTotal = 0;
let linkFilled = 0;

for (const [category, list] of Object.entries(data)) {
  if (!Array.isArray(list)) {
    problems.push(`${category}: 配列ではありません`);
    continue;
  }
  const seen = new Set();

  for (const [i, m] of list.entries()) {
    total++;
    const where = `${category}[${i}] ${m?.name ?? '(名前なし)'}`;

    if (!m || typeof m.name !== 'string' || !m.name.trim()) problems.push(`${where}: name が空`);
    if (!Array.isArray(m.pages)) problems.push(`${where}: pages が配列でない`);
    else {
      if (m.pages.length) shown++;
      for (const p of m.pages) {
        if (typeof p !== 'string' || !p.trim()) problems.push(`${where}: pages に空の値`);
      }
    }
    if (typeof m.group !== 'string') problems.push(`${where}: group が文字列でない`);

    let hasLink = false;
    for (const slot of SLOTS) {
      const v = m[slot];
      linkTotal++;
      if (typeof v !== 'string') { problems.push(`${where}: ${slot} が文字列でない`); continue; }
      if (!v) continue;
      linkFilled++;
      hasLink = true;
      if (!/^https?:\/\//.test(v)) problems.push(`${where}: ${slot} が URL でない -> ${v}`);
    }
    if (!hasLink) problems.push(`${where}: リンクが 1 本もない`);

    // 同じページに同じ社名・同じ商品ページが重複していないか
    for (const p of m.pages || []) {
      const key = `${p}|${m.group}|${m.name}|${m.products}`;
      if (seen.has(key)) problems.push(`${where}: '${p}' に同じ内容が重複`);
      seen.add(key);
    }
  }
}

console.log(`カテゴリ    : ${Object.keys(data).length}`);
console.log(`メーカー項目: ${total}（うち表示対象 ${shown}）`);
console.log(`リンク枠    : ${linkTotal} 中 ${linkFilled} 埋（${Math.round((linkFilled / linkTotal) * 100)}%）`);
console.log('');

if (problems.length) {
  console.log(`${problems.length} 件の問題:`);
  problems.slice(0, 30).forEach((p) => console.log('  ' + p));
  if (problems.length > 30) console.log(`  ...ほか ${problems.length - 30} 件`);
  process.exit(1);
}
console.log('問題なし');
