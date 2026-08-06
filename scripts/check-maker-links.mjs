// 建材メーカーの外部リンクを全件チェックし、結果を JSON に書き出す。
//   ローカル: npm run check:links
//   自動   : .github/workflows/check-maker-links.yml が週1回実行
//
// 出力: src/data/broken-maker-links.json
//   このファイルは MakerLink コンポーネント（src/components/MakerLink.tsx）が読み、
//   リンク先が 404 のメーカーは会社トップページへ遷移させる。
//
// 2026-08 時点の抽出調査では、200 件中 38 件（19%）が 404、13 件が接続不可だった。
// 404 のほとんどは会社サイト自体は健在で、製品ページが移動しただけ。

import fs from 'node:fs';
import path from 'node:path';

const MENU_DIR = 'src/components/content/leftcolumn-menu';
const OUT_FILE = 'src/data/broken-maker-links.json';
// 同時接続を上げすぎると自分側が詰まり、生きているサイトまで
// UND_ERR_CONNECT_TIMEOUT になる（15並列で 158 件の誤検出が出た）。
// 控えめに並べたうえで、失敗したものは最後に1件ずつ確認し直す。
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;
const RETRY_TIMEOUT_MS = 30000;
const UA = 'Mozilla/5.0 (compatible; yaneyuka-linkcheck/1.0; +https://yaneyuka.com/)';

function collectUrls() {
  const urls = new Set();
  for (const file of fs.readdirSync(MENU_DIR)) {
    if (!file.startsWith('mak_') || !file.endsWith('.tsx')) continue;
    const text = fs.readFileSync(path.join(MENU_DIR, file), 'utf8');
    for (const m of text.matchAll(/https?:\/\/[^'"`)\s]+/g)) {
      urls.add(m[0].replace(/[),.]+$/, ''));
    }
  }
  return [...urls].sort();
}

async function check(url, timeoutMs = TIMEOUT_MS) {
  const attempt = async (method) => {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        signal: ac.signal,
        headers: { 'User-Agent': UA, Accept: '*/*' },
      });
      return { status: res.status };
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    // HEAD を拒否するサイトが多いので、405/501 なら GET で確認し直す
    let { status } = await attempt('HEAD');
    if (status === 405 || status === 501) ({ status } = await attempt('GET'));

    if (status === 404 || status === 410) return { url, state: 'broken', status };
    // 403 / 429 はボット対策のことが多い。人間のブラウザでは開けるので切れ扱いにしない
    if (status >= 400 && status !== 403 && status !== 429) return { url, state: 'error', status };
    return { url, state: 'ok', status };
  } catch (e) {
    const reason = String(e?.cause?.code || e?.name || e?.message);
    return { url, state: 'unreachable', status: 0, reason };
  }
}

async function run() {
  const urls = collectUrls();
  console.log(`対象URL: ${urls.length} 件`);

  const results = [];
  let index = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (index < urls.length) {
      const url = urls[index++];
      results.push(await check(url));
      if (results.length % 100 === 0) console.log(`  ${results.length}/${urls.length} 件完了`);
    }
  });
  await Promise.all(workers);

  // 並列実行で落ちたものを、1件ずつ時間をかけて確認し直す。
  // これを挟まないと、生きているサイトを「接続不可」と報告してしまう。
  const suspects = results.filter((r) => r.state === 'unreachable');
  if (suspects.length) {
    console.log(`\n接続できなかった ${suspects.length} 件を1件ずつ再確認します...`);
    let recovered = 0;
    for (const r of suspects) {
      const retry = await check(r.url, RETRY_TIMEOUT_MS);
      if (retry.state !== 'unreachable') recovered++;
      Object.assign(r, retry);
    }
    console.log(`  ${recovered} 件は再確認で応答しました（誤検出）`);
  }

  const by = (s) => results.filter((r) => r.state === s).sort((a, b) => a.url.localeCompare(b.url));
  const broken = by('broken');
  const unreachable = by('unreachable');
  const errored = by('error');

  // 404 のリンクは、会社トップページ（オリジン）へ逃がせるかどうかを添える
  for (const r of broken) {
    try {
      r.fallback = new URL(r.url).origin;
    } catch {
      r.fallback = null;
    }
  }

  const report = {
    generatedAt: new Date().toISOString().slice(0, 10),
    checked: urls.length,
    summary: {
      ok: results.filter((r) => r.state === 'ok').length,
      broken: broken.length,
      unreachable: unreachable.length,
      error: errored.length,
    },
    // MakerLink がトップページへ差し替える対象
    broken: broken.map((r) => ({ url: r.url, status: r.status, fallback: r.fallback })),
    // ドメインごと到達できないもの。差し替え先も無いので人間の判断が要る
    unreachable: unreachable.map((r) => ({ url: r.url, reason: r.reason })),
    error: errored.map((r) => ({ url: r.url, status: r.status })),
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(report, null, 2) + '\n');

  console.log('');
  console.log(`正常        : ${report.summary.ok}`);
  console.log(`404 (差替可) : ${report.summary.broken}`);
  console.log(`接続不可     : ${report.summary.unreachable}`);
  console.log(`その他エラー : ${report.summary.error}`);
  console.log(`-> ${OUT_FILE} に書き出しました`);
}

run();
