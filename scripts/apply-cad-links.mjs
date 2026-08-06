// find-cad-links.mjs が見つけた CAD ページを src/data/makers.json の cad 欄へ反映する。
//   node scripts/apply-cad-links.mjs --dry-run   変更内容だけ表示
//   node scripts/apply-cad-links.mjs             実際に書き込む
//
// 反映するのは cad が空の項目だけ。すでに入っている値は上書きしない。

import fs from 'node:fs';

const MAKERS = 'src/data/makers.json';
const CANDIDATES = 'src/data/cad-link-candidates.json';

const dryRun = process.argv.includes('--dry-run');

const makers = JSON.parse(fs.readFileSync(MAKERS, 'utf8'));
const { candidates } = JSON.parse(fs.readFileSync(CANDIDATES, 'utf8'));

// origin -> CAD ページ
const byOrigin = new Map(candidates.map((c) => [c.origin, c.cad]));

const originOf = (m) => {
  const base = m.products || m.catalog || m.office || m.contact;
  try { return new URL(base).origin; } catch { return null; }
};

let applied = 0, skipped = 0;
const samples = [];
for (const [category, list] of Object.entries(makers)) {
  for (const m of list) {
    if (m.cad) { skipped++; continue; }
    const cad = byOrigin.get(originOf(m));
    if (!cad) continue;
    if (samples.length < 12) samples.push(`  ${category} / ${m.name} -> ${cad}`);
    m.cad = cad;
    applied++;
  }
}

console.log(`反映対象: ${applied} 件（すでに設定済みで触らないもの: ${skipped} 件）`);
console.log('例:');
console.log(samples.join('\n'));

if (dryRun) {
  console.log('\n--dry-run のため書き込みませんでした。');
} else {
  fs.writeFileSync(MAKERS, JSON.stringify(makers, null, 2) + '\n');
  console.log(`\n${MAKERS} を更新しました。`);
}
