// mak_*.tsx に直書きされている建材メーカー情報を src/data/makers.json へ抽出する。
//   npm run makers:extract
//
// 抽出したら必ず npm run makers:verify で元ファイルと突き合わせること。
// 読み取りの実装は scripts/lib/maker-parse.mjs に置き、照合側と共有している
// （別実装にしていたとき、9 ファイルぶんの取り違えが照合をすり抜けた）。

import fs from 'node:fs';
import path from 'node:path';
import { SLOTS, pageRegions, makerEvents, groupHeadings } from './lib/maker-parse.mjs';

const DIR = 'src/components/content/leftcolumn-menu';
const OUT = 'src/data/makers.json';

const clean = (url) => (url && url !== '#' && url.trim() !== '' ? url.trim() : '');

function extract(text) {
  const regions = pageRegions(text);
  const headings = groupHeadings(text);

  const regionAt = (pos) => regions.find((r) => pos >= r.start && pos < r.end) || null;

  return makerEvents(text).map((e) => {
    const pages = regions.filter((r) => e.at >= r.start && e.at < r.end).map((r) => r.name);
    // 直前の見出し。ただし同じページ範囲の中のものだけ有効
    const region = regionAt(e.at);
    const heading = headings
      .filter((h) => h.at < e.at && (!region || (h.at >= region.start && h.at < region.end)))
      .pop();

    const links = {};
    SLOTS.forEach((slot, i) => { links[slot] = clean(e.urls[i]); });
    return { name: e.name, pages, group: heading ? heading.name : '', ...links };
  });
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
