// broken-maker-links.json の「接続不可」を原因別に分類する。
//   node scripts/diagnose-unreachable.mjs
//
// 「つながらない」には性質の違うものが混ざっている:
//   dns      : ドメインが引けない → 廃業・ドメイン失効の可能性が高い
//   tls      : 暗号方式が古すぎて современные ブラウザでも警告が出る
//   refused  : サーバーが応答を拒否
//   timeout  : 単に遅い、またはボット避け。人間のブラウザなら開けることが多い
//   recovered: 再確認したら普通に開いた（検査時の一時的な失敗）
//
// 出力は src/data/unreachable-report.json。
// 会社トップが生きているかも併せて見るので、「製品ページだけ死んでいる」判別に使える。

import fs from 'node:fs';

const IN = 'src/data/broken-maker-links.json';
const OUT = 'src/data/unreachable-report.json';
const UA = 'Mozilla/5.0 (compatible; yaneyuka-linkcheck/1.0; +https://yaneyuka.com/)';
const CONCURRENCY = 6;

async function probe(url, timeoutMs) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ac.signal, headers: { 'User-Agent': UA } });
    return { ok: true, status: res.status };
  } catch (e) {
    const code = String(e?.cause?.code || e?.name || e?.message);
    return { ok: false, code };
  } finally {
    clearTimeout(timer);
  }
}

function classify(code) {
  if (/ENOTFOUND|EAI_AGAIN|getaddrinfo/i.test(code)) return 'dns';
  if (/CERT|SSL|TLS|ERR_SSL|EPROTO|SEC_E/i.test(code)) return 'tls';
  if (/ECONNREFUSED/i.test(code)) return 'refused';
  if (/ECONNRESET/i.test(code)) return 'reset';
  if (/TIMEOUT|AbortError|UND_ERR_CONNECT_TIMEOUT|HeadersTimeout/i.test(code)) return 'timeout';
  return 'other';
}

async function run() {
  const report = JSON.parse(fs.readFileSync(IN, 'utf8'));
  const targets = report.unreachable || [];
  console.log(`接続不可として記録されている URL: ${targets.length} 件`);

  const rows = [];
  let index = 0;
  let done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (index < targets.length) {
      const t = targets[index++];
      let origin = null;
      try { origin = new URL(t.url).origin; } catch { /* ignore */ }

      // 時間をかけて本体をもう一度。ここで通れば検査時の一時的な失敗
      const again = await probe(t.url, 30000);
      // 会社トップの生死も見る（製品ページだけ死んでいるのか、会社ごとなのか）
      const top = origin && origin !== t.url ? await probe(origin, 30000) : again;

      const kind = again.ok ? 'recovered' : classify(again.code);
      rows.push({
        url: t.url,
        kind,
        detail: again.ok ? `HTTP ${again.status}` : again.code,
        origin,
        originAlive: !!top.ok,
        originStatus: top.ok ? top.status : top.code,
      });
      done++;
      if (done % 25 === 0) console.log(`  ${done}/${targets.length} 件`);
    }
  }));

  const order = ['dns', 'tls', 'refused', 'reset', 'timeout', 'other', 'recovered'];
  rows.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind) || a.url.localeCompare(b.url));

  const counts = {};
  rows.forEach((r) => { counts[r.kind] = (counts[r.kind] || 0) + 1; });

  fs.writeFileSync(OUT, JSON.stringify({
    generatedAt: new Date().toISOString().slice(0, 10),
    total: rows.length,
    counts,
    rows,
  }, null, 2) + '\n');

  const label = {
    dns: 'ドメインが引けない（廃業の可能性）',
    tls: '暗号方式が古い（ブラウザでも警告が出る）',
    refused: '接続を拒否',
    reset: '接続を切断',
    timeout: '時間内に応答なし（ボット避けの可能性）',
    other: 'その他',
    recovered: '再確認したら開いた（検査時の一時的な失敗）',
  };
  console.log('');
  for (const k of order) {
    if (!counts[k]) continue;
    console.log(`  ${String(counts[k]).padStart(3)} 件  ${label[k]}`);
  }
  const aliveTop = rows.filter((r) => !['recovered'].includes(r.kind) && r.originAlive).length;
  console.log('');
  console.log(`  うち会社トップは生きている: ${aliveTop} 件（リンク先だけの問題）`);
  console.log(`-> ${OUT}`);
}

run();
