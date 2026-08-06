// mak_*.tsx の手書きメーカー行を <MakerRows /> に置き換える移行スクリプト。
//   node scripts/swap-to-makerrows.mjs <ファイル名> [--dry-run]
//   例: node scripts/swap-to-makerrows.mjs mak_1_屋根.tsx --dry-run
//
// 連続するメーカー行を 1 つの <MakerRows /> にまとめる。区切りは
// 「表示ページ（switch の case）」と「ページ内見出し（丸タグ）」の組。
// 置換後は npm run makers:verify と画面の目視で確認すること。

import fs from 'node:fs';
import path from 'node:path';
import { pageRegions, makerEvents, groupHeadings } from './lib/maker-parse.mjs';

const DIR = 'src/components/content/leftcolumn-menu';
const file = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

if (!file) {
  console.error('ファイル名を指定してください（例: mak_1_屋根.tsx）');
  process.exit(1);
}

const target = path.join(DIR, file);
const category = file.replace(/^mak_\d+_/, '').replace('.tsx', '');
const text = fs.readFileSync(target, 'utf8');

const regions = pageRegions(text);
const headings = groupHeadings(text);
const events = makerEvents(text);

// 連続するメーカー行を「ページ+見出し」でまとめる
const blocks = [];
let current = null;
for (const e of events) {
  const region = regions.find((r) => e.at >= r.start && e.at < r.end);
  const heading = headings
    .filter((h) => h.at < e.at && region && h.at >= region.start && h.at < region.end)
    .pop();
  const page = region ? region.name : null;
  const group = heading ? heading.name : '';
  if (!page) {
    console.warn(`  警告: ${e.name} はどのページにも属していません。置換対象外にします。`);
    current = null;
    continue;
  }
  if (!current || current.page !== page || current.group !== group) {
    current = { page, group, start: e.at, end: e.end, count: 0, names: [] };
    blocks.push(current);
  }
  current.end = e.end;
  current.count++;
  current.names.push(e.name);
}

// 幅と mt-4 は元の JSX から読み取る（見た目を変えないため）
function attrsFor(block) {
  const head = text.slice(Math.max(0, block.start - 200), block.start + 300);
  const width = /w-\[200px\]/.test(text.slice(block.start, block.end)) ? "200px" : "180px";
  const topMargin = /className="mt-4 text-\[13px\]/.test(text.slice(block.start, block.start + 80));
  return { width, topMargin };
}

let out = text;
for (const b of [...blocks].reverse()) {
  const { width, topMargin } = attrsFor(b);
  const indent = (out.slice(0, b.start).match(/\n([ \t]*)$/) || [, '            '])[1];
  const attrs = [
    `category="${category}"`,
    `page="${b.page}"`,
    b.group ? `group="${b.group}"` : '',
    width === '200px' ? 'nameWidth="200px"' : '',
    topMargin ? 'topMargin' : '',
  ].filter(Boolean).join(' ');
  out = out.slice(0, b.start) + `<MakerRows ${attrs} />` + out.slice(b.end);
  console.log(`  ${b.page}/${b.group || '-'}  ${b.count}社 -> <MakerRows ${attrs} />`);
}

// import を足す
if (!out.includes("from '@/components/MakerRows'")) {
  const lines = out.split('\n');
  let last = 0;
  lines.forEach((l, i) => { if (/^import .* from /.test(l)) last = i; });
  lines.splice(last + 1, 0, "import MakerRows from '@/components/MakerRows';");
  out = lines.join('\n');
}

console.log(`\n${blocks.length} ブロック / ${events.length} 社を置換`);
if (dryRun) {
  console.log('--dry-run のため書き込みませんでした。');
} else {
  fs.writeFileSync(target, out);
  console.log(`${target} を更新しました。`);
}
