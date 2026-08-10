// 消滅したドメインのリンクを、同じ会社の生きているドメインへ張り替える。
//   node scripts/fix-dead-domains.mjs [--apply]
//
// 大手メーカーがドメインを移すと、旧ドメインは名前解決ごと消える。
// 例: アイジー工業 ig-kogyou.co.jp -> igkogyo.co.jp、
//     川口技研 kawaguchi-giken.co.jp -> kawaguchigiken.co.jp
// 同じ会社の別項目には現行ドメインが入っていることが多いので、そこから候補を作る。
//
// ⚠️ ホストを差し替えてもパスが同じとは限らない。候補は必ず実際に開いて確認し、
//    404 になるものは採用しない（会社トップへ逃がす既存のしくみに任せる）。

import fs from 'node:fs';

const MAKERS = 'src/data/makers.json';
const REPORT = 'src/data/unreachable-report.json';
const SLOTS = ['products', 'catalog', 'office', 'contact', 'sample', 'cad'];
const UA = 'Mozilla/5.0 (compatible; yaneyuka-linkcheck/1.0; +https://yaneyuka.com/)';

const apply = process.argv.includes('--apply');

async function statusOf(url) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 20000);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ac.signal, headers: { 'User-Agent': UA } });
    return res.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(timer);
  }
}

const hostOf = (u) => { try { return new URL(u).hostname; } catch { return null; } };

async function run() {
  const makers = JSON.parse(fs.readFileSync(MAKERS, 'utf8'));
  const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
  const dead = new Set(report.rows.filter((r) => r.kind === 'dns').map((r) => hostOf(r.url)).filter(Boolean));

  // 会社名 -> その会社で生きているホスト
  const aliveHosts = new Map();
  for (const list of Object.values(makers)) {
    for (const m of list) {
      for (const s of SLOTS) {
        const h = hostOf(m[s]);
        if (h && !dead.has(h)) {
          if (!aliveHosts.has(m.name)) aliveHosts.set(m.name, new Set());
          aliveHosts.get(m.name).add(h);
        }
      }
    }
  }

  const changes = [];
  const rejected = [];
  const tried = new Map(); // 候補URL -> status（同じURLを何度も叩かない）

  for (const [category, list] of Object.entries(makers)) {
    for (const m of list) {
      for (const s of SLOTS) {
        const url = m[s];
        const h = hostOf(url);
        if (!h || !dead.has(h)) continue;
        const candidates = aliveHosts.get(m.name);
        if (!candidates) continue;

        let picked = null;
        for (const alt of candidates) {
          const candidate = url.replace(h, alt);
          if (!tried.has(candidate)) tried.set(candidate, await statusOf(candidate));
          const st = tried.get(candidate);
          if (st >= 200 && st < 400) { picked = { candidate, st }; break; }
        }

        if (picked) {
          changes.push({ who: `${category} / ${m.name}`, slot: s, from: url, to: picked.candidate, status: picked.st, ref: m });
        } else {
          rejected.push({ who: `${category} / ${m.name}`, slot: s, from: url });
        }
      }
    }
  }

  console.log(`張り替えられる  : ${changes.length} 本`);
  changes.forEach((c) => {
    console.log(`  ${c.who}  [${c.slot}]`);
    console.log(`    ${c.from}`);
    console.log(`    -> ${c.to}  (HTTP ${c.status})`);
  });
  console.log('');
  console.log(`張り替え先が無い: ${rejected.length} 本（会社トップへの自動振替に任せる）`);

  if (apply) {
    for (const c of changes) c.ref[c.slot] = c.to;
    fs.writeFileSync(MAKERS, JSON.stringify(makers, null, 2) + '\n');
    console.log(`\n${MAKERS} を更新しました。`);
  } else {
    console.log('\n--apply を付けると反映します。');
  }
}

run();
