// src/data/makers.json が元の mak_*.tsx と一致しているかを照合する。
//   npm run makers:verify
//
// 確認するのは 2 点:
//   1. 元ファイルの外部URLが、すべて JSON 側にも存在するか（取りこぼし）
//   2. 各メーカーが正しい表示ページに割り当てられているか（取り違え）
//
// JSON 側にしか無いURLは、抽出後に補ったもの（CADリンクの追加など）として許容する。
// 読み取りは scripts/lib/maker-parse.mjs を抽出側と共有している。

import fs from 'node:fs';
import path from 'node:path';
import { pageRegions, sourceUrls, SLOTS } from './lib/maker-parse.mjs';

const DIR = 'src/components/content/leftcolumn-menu';
const data = JSON.parse(fs.readFileSync('src/data/makers.json', 'utf8'));

let missingNg = 0;
let pageChecked = 0;
let pageNg = 0;

for (const file of fs.readdirSync(DIR).filter((f) => f.startsWith('mak_') && f.endsWith('.tsx'))) {
  const category = file.replace(/^mak_\d+_/, '').replace('.tsx', '');
  const text = fs.readFileSync(path.join(DIR, file), 'utf8');

  const source = sourceUrls(text);
  const extracted = new Set();
  for (const maker of data[category] || []) {
    for (const slot of SLOTS) {
      const u = maker[slot];
      if (u && u.startsWith('http')) extracted.add(u);
    }
  }

  const missing = [...source].filter((u) => !extracted.has(u));
  const added = [...extracted].filter((u) => !source.has(u));
  if (missing.length) missingNg++;

  // ページ割り当て: メーカーのURLが、割り当てられたページの範囲内に実在するか
  const regions = pageRegions(text);
  let catPageNg = 0;
  for (const maker of data[category] || []) {
    const probe = maker.products || maker.catalog || maker.office || maker.contact;
    if (!probe || !source.has(probe)) continue; // 抽出後に補ったURLは対象外
    pageChecked++;
    const ok = (maker.pages || []).some((p) =>
      regions.some((r) => r.name === p && text.slice(r.start, r.end).includes(probe))
    );
    if (!ok) {
      catPageNg++;
      pageNg++;
      if (pageNg <= 5) {
        console.log(`      ページ不一致: ${category} / ${maker.name} -> [${(maker.pages || []).join(', ')}]`);
      }
    }
  }

  console.log(
    `${missing.length || catPageNg ? 'NG  ' : 'OK  '}${category.padEnd(12)} 元:${String(source.size).padStart(4)}  抽出:${String(extracted.size).padStart(4)}` +
    (missing.length ? `  取りこぼし:${missing.length}` : '') +
    (added.length ? `  追加分:${added.length}` : '') +
    (catPageNg ? `  ページ不一致:${catPageNg}` : '')
  );
  for (const u of missing.slice(0, 3)) console.log(`      取りこぼし: ${u}`);
}

console.log('');
console.log(missingNg === 0 ? '取りこぼしなし（元データのURLはすべて保持されている）' : `${missingNg} カテゴリで取りこぼしあり`);
console.log(pageNg === 0 ? `ページ割り当て一致（${pageChecked} 件を照合）` : `ページ割り当てに ${pageNg} 件の不一致（照合 ${pageChecked} 件）`);
process.exit(missingNg === 0 && pageNg === 0 ? 0 : 1);
