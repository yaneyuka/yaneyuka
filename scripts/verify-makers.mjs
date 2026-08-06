// extract-makers.mjs の抽出結果が、元の mak_*.tsx と一致しているかを照合する。
//
// 確認するのは 2 点:
//   1. 元ファイルに現れる外部URLが、すべて JSON 側にも存在するか（取りこぼし）
//   2. JSON 側に、元ファイルに無いURLが混ざっていないか（作り込み）
//
// 社名は表記ゆれの判定が難しいので URL を基準に突き合わせる。
// URL は 1 社あたり最大 6 本あり、これが一致していれば実質的な情報は保たれている。

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'src/components/content/leftcolumn-menu';
const data = JSON.parse(fs.readFileSync('src/data/makers.json', 'utf8'));

const SLOTS = ['products', 'catalog', 'office', 'contact', 'sample', 'cad'];

let ng = 0;
for (const file of fs.readdirSync(DIR).filter((f) => f.startsWith('mak_') && f.endsWith('.tsx'))) {
  const category = file.replace(/^mak_\d+_/, '').replace('.tsx', '');
  const text = fs.readFileSync(path.join(DIR, file), 'utf8');

  // 元ファイル側: renderLink / renderCompanyRow が実際に参照している http(s) URL
  const source = new Set();
  for (const m of text.matchAll(/renderLink\('(https?:\/\/[^']*)'/g)) source.add(m[1]);
  for (const m of text.matchAll(/renderCompanyRow\(\s*'[^']+'\s*,\s*\{([\s\S]*?)\}\s*\)/g)) {
    for (const kv of m[1].matchAll(/\w+\s*:\s*'(https?:\/\/[^']*)'/g)) source.add(kv[1]);
  }

  // JSON 側
  const extracted = new Set();
  for (const maker of data[category] || []) {
    for (const slot of SLOTS) {
      const u = maker[slot];
      if (u && u.startsWith('http')) extracted.add(u);
    }
  }

  const missing = [...source].filter((u) => !extracted.has(u));
  const extra = [...extracted].filter((u) => !source.has(u));

  const mark = missing.length === 0 && extra.length === 0 ? 'OK  ' : 'NG  ';
  if (mark === 'NG  ') ng++;
  console.log(
    `${mark}${category.padEnd(12)} 元:${String(source.size).padStart(4)}  抽出:${String(extracted.size).padStart(4)}` +
    (missing.length ? `  取りこぼし:${missing.length}` : '') +
    (extra.length ? `  余分:${extra.length}` : '')
  );
  for (const u of missing.slice(0, 3)) console.log(`      取りこぼし: ${u}`);
  for (const u of extra.slice(0, 3)) console.log(`      余分      : ${u}`);
}

console.log('');
console.log(ng === 0 ? '全カテゴリ一致（URLの取りこぼし・余分ともに0）' : `${ng} カテゴリで不一致`);
process.exit(ng === 0 ? 0 : 1);
