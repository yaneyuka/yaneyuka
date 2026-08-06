// メーカー各社のサイトから CAD データ配布ページを探し、候補を JSON に書き出す。
//   node scripts/find-cad-links.mjs [調べるドメイン数]
//
// makers.json の cad 欄が空の会社が対象。誤ったリンクを入れると空欄より害が大きいので、
// このスクリプトは候補を出すだけで makers.json は書き換えない。
// 反映は apply-cad-links.mjs で別途行う。
//
// 判定は 2 段階:
//   1. 会社トップと商品ページの HTML から、CAD らしいリンクを拾う
//   2. 拾ったページを実際に開き、CAD 配布ページらしい語が本文にあるか確かめる
//      （「ダウンロード」だけだとカタログPDFを拾ってしまうため）

import fs from 'node:fs';

const OUT = 'src/data/cad-link-candidates.json';
const TIMEOUT_MS = 20000;
const CONCURRENCY = 6;
const UA = 'Mozilla/5.0 (compatible; yaneyuka-cadfinder/1.0; +https://yaneyuka.com/)';

// href か リンク文言に、CAD を特定できる語が要る。「ダウンロード」単体では採らない。
const CAD_TOKEN = /(^|[^a-z])cad([^a-z]|$)|ＣＡＤ|dwg|dxf|jww|\bbim\b/i;
// 拾ったページが本当に CAD 配布ページかの確認に使う語
const CONFIRM = /(CAD|ＣＡＤ|dwg|dxf|jww|BIM)/i;
// 配布ページなら「ダウンロード」系の語が必ず伴う。これが無いものは記事や事例紹介。
const DOWNLOAD_WORD = /(ダウンロード|download|ＤＬ|データ提供)/i;
const NEGATIVE = /(採用|求人|IR情報|プライバシー|サイトマップ)/;
// 記事・事例・ニュースの類は CAD の語が出てきても配布ページではない
const ARTICLE_URL = /(blog|news|column|topics|case[-_]?stud|interview|magazine|\/\d{4}\/\d{2}\/)/i;

// 日本の建材メーカーサイトでよく使われる CAD ページのパス
const COMMON_PATHS = [
  '/cad/', '/cad.html', '/caddata/', '/cad_data/', '/caddata.html',
  '/download/cad/', '/download/cad.html', '/data/cad/',
  '/support/cad/', '/product/cad/', '/products/cad/',
  '/dl/cad/', '/technical/cad/', '/bim/',
];

/**
 * 配布ページらしさの判定。
 * 本文の「ダウンロード」で見るのが基本だが、Shift-JIS のページを UTF-8 として
 * 読むと日本語が文字化けして一致しない（三協アルミの CAD ページで実際に取りこぼした）。
 * その場合に備えて URL 側の手がかりも見る。
 */
function looksLikeDownloadPage(url, body) {
  if (DOWNLOAD_WORD.test(body)) return true;
  return /\/(download|dl|cad|caddata|cad_data)(\/|\.|$)/i.test(url);
}

/**
 * URL 推測が会社トップへリダイレクトされただけのものを弾く。
 * ただし cad.ykkap.co.jp のような CAD 専用サブドメインは、パスが / でも正しい。
 */
function isJustTopPage(url) {
  try {
    const u = new URL(url);
    if (/(^|\.)(cad|bim)\./i.test(u.hostname)) return false;
    return (u.pathname === '/' || u.pathname === '') && !u.search;
  } catch {
    return false;
  }
}

async function get(url) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ac.signal, headers: { 'User-Agent': UA } });
    if (!res.ok) return null;
    const type = res.headers.get('content-type') || '';
    if (!type.includes('html')) return null;
    return { url: res.url, html: await res.text() };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** HTML から <a href> と表示文字列の組を取り出す */
function anchors(html, baseUrl) {
  const out = [];
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]{0,120}?)<\/a>/gi)) {
    const text = m[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    try {
      out.push({ href: new URL(m[1], baseUrl).toString(), text });
    } catch { /* 相対解決できないものは捨てる */ }
  }
  return out;
}

async function findForOrigin(origin, extraPages) {
  const seen = new Set();
  const candidates = [];

  for (const page of [origin, ...extraPages]) {
    const doc = await get(page);
    if (!doc) continue;
    for (const a of anchors(doc.html, doc.url)) {
      if (seen.has(a.href)) continue;
      if (!CAD_TOKEN.test(a.href) && !CAD_TOKEN.test(a.text)) continue;
      if (NEGATIVE.test(a.text)) continue;
      // 別ドメインへ飛ぶものは対象外（提携サイトや広告のことが多い）
      try { if (new URL(a.href).origin !== new URL(origin).origin) continue; } catch { continue; }
      seen.add(a.href);
      candidates.push(a);
    }
    if (candidates.length) break; // トップで見つかればそれ以上は辿らない
  }

  // 候補を実際に開いて確認する
  for (const c of candidates.slice(0, 4)) {
    const doc = await get(c.href);
    if (!doc) continue;
    const body = doc.html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ');
    const hits = (body.match(new RegExp(CONFIRM.source, 'gi')) || []).length;
    if (hits >= 2 && looksLikeDownloadPage(doc.url, body) && !ARTICLE_URL.test(doc.url) && !isJustTopPage(doc.url)) {
      return { url: doc.url, label: c.text.slice(0, 40), confirmHits: hits, via: 'link' };
    }
  }

  // トップページからリンクを辿れない会社が多いので、よくあるURLも直接叩く。
  // 当てずっぽうになるぶん、本文確認（CONFIRM）は必ず通す。
  for (const p of COMMON_PATHS) {
    const doc = await get(origin + p);
    if (!doc) continue;
    const body = doc.html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ');
    const hits = (body.match(new RegExp(CONFIRM.source, 'gi')) || []).length;
    // 推測で辿り着いたページは、リンク経由より厳しめに確認する
    if (hits >= 4 && looksLikeDownloadPage(doc.url, body) && !ARTICLE_URL.test(doc.url) && !isJustTopPage(doc.url)) {
      return { url: doc.url, label: '(URL推測)', confirmHits: hits, via: 'path' };
    }
  }
  return null;
}

async function run() {
  const limit = Number(process.argv[2] || 0);
  const makers = JSON.parse(fs.readFileSync('src/data/makers.json', 'utf8'));

  // origin -> その origin を使っているメーカー項目
  const byOrigin = new Map();
  for (const [category, list] of Object.entries(makers)) {
    for (const m of list) {
      if (m.cad) continue;
      const base = m.products || m.catalog || m.office || m.contact;
      if (!base) continue;
      let origin, pages = [];
      try {
        origin = new URL(base).origin;
        pages = [m.products, m.catalog].filter(Boolean);
      } catch { continue; }
      if (!byOrigin.has(origin)) byOrigin.set(origin, { origin, pages: new Set(), entries: [] });
      const rec = byOrigin.get(origin);
      pages.forEach((p) => rec.pages.add(p));
      rec.entries.push({ category, name: m.name });
    }
  }

  let targets = [...byOrigin.values()];
  if (limit) targets = targets.slice(0, limit);
  console.log(`調査対象: ${targets.length} ドメイン`);

  const found = [];
  let done = 0, index = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (index < targets.length) {
      const t = targets[index++];
      const hit = await findForOrigin(t.origin, [...t.pages].slice(0, 2));
      done++;
      if (done % 20 === 0) console.log(`  ${done}/${targets.length} 社`);
      if (hit) {
        found.push({ origin: t.origin, cad: hit.url, label: hit.label, confirmHits: hit.confirmHits, entries: t.entries });
        console.log(`  発見 ${t.origin} -> ${hit.url}`);
      }
    }
  });
  await Promise.all(workers);

  found.sort((a, b) => a.origin.localeCompare(b.origin));
  const affected = found.reduce((n, f) => n + f.entries.length, 0);
  fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), scanned: targets.length, found: found.length, affectedEntries: affected, candidates: found }, null, 2) + '\n');

  console.log('');
  console.log(`CAD ページが見つかった会社: ${found.length} / ${targets.length}`);
  console.log(`反映されるメーカー項目   : ${affected} 件`);
  console.log(`-> ${OUT}`);
}

run();
