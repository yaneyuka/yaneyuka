// mak_*.tsx の手書きメーカー行を <MakerRows /> に置き換える移行スクリプト。
// ⚠️ 2026-08-06 に全 16 ファイルの移行が完了済み。実行対象はもう残っていない。
//   node scripts/swap-to-makerrows.mjs <ファイル名> [--dry-run]
//   例: node scripts/swap-to-makerrows.mjs mak_1_屋根.tsx --dry-run
//
// 連続するメーカー行を 1 つの <MakerRows /> にまとめる。区切りは
// 「表示ページ（switch の case）」と「ページ内見出し（丸タグ）」の組。
// 置換後は npm run makers:verify と画面の目視で確認すること。

import fs from 'node:fs';
import path from 'node:path';
import { pageRegions, makerEvents, groupHeadings, renderFunctions } from './lib/maker-parse.mjs';

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
// 描画関数の境界。ここをまたいで行をまとめると、関数の閉じ括弧ごと消える
const funcs = renderFunctions(text);
const funcAt = (pos) => (funcs.find((f) => pos >= f.at && pos < f.end) || {}).name || null;

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
  const fn = funcAt(e.at);
  if (!current || current.page !== page || current.group !== group || current.fn !== fn) {
    current = { page, group, fn, start: e.at, end: e.end, count: 0, names: [] };
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

// 置換で構造を壊していないかの目安。括弧の数が変わっていたら何かを消しすぎている。
// （引数付きの描画関数を認識できず、関数の閉じ括弧ごと削除した事故があったため）
const countOutsideStrings = (s, ch) => (s.match(new RegExp(`\\${ch}`, 'g')) || []).length;
for (const ch of ['(', ')', '{', '}']) {
  const before = countOutsideStrings(text, ch);
  const after = countOutsideStrings(out, ch);
  const removedByBlocks = blocks.reduce((n, b) => n + countOutsideStrings(text.slice(b.start, b.end), ch), 0);
  const expected = before - removedByBlocks;
  if (after !== expected) {
    console.error(`  ⚠ '${ch}' の数が想定と違います（想定 ${expected} / 実際 ${after}）。置換範囲が広すぎる可能性があります。`);
  }
}

console.log(`\n${blocks.length} ブロック / ${events.length} 社を置換`);
if (dryRun) {
  console.log('--dry-run のため書き込みませんでした。');
} else {
  fs.writeFileSync(target, out);
  console.log(`${target} を更新しました。`);
}
