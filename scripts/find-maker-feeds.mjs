// 掲載中の建材メーカー各社から、ニュース/新製品の RSS・Atom フィードを探す。
//   node scripts/find-maker-feeds.mjs [調べるドメイン数]
//
// 新製品ページは PR TIMES 等の総合フィードを読んで 99% を捨てており、実質 1 件しか
// 表示できていなかった（254 件中、建材キーワードに一致したのは 2 件）。
// PR TIMES はカテゴリ別フィードを提供していないため、絞り込みでは解決しない。
// 掲載中のメーカー自身の配信を読めば、その時点で建材の新製品情報になる。
//
// 結果は src/data/maker-feeds.json（候補一覧）。採用は別途判断する。

import fs from 'node:fs';

const OUT = 'src/data/maker-feeds.json';
const TIMEOUT_MS = 15000;
const CONCURRENCY = 8;
const UA = 'Mozilla/5.0 (compatible; yaneyuka-feedfinder/1.0; +https://yaneyuka.com/)';

// 日本のメーカーサイトでよく使われるフィードの場所
const COMMON_PATHS = [
  '/feed', '/feed/', '/rss', '/rss/', '/rss.xml', '/index.rdf',
  '/atom.xml', '/feed.xml', '/news/feed/', '/news/rss.xml', '/info/feed/',
];

async function get(url) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ac.signal, headers: { 'User-Agent': UA } });
    if (!res.ok) return null;
    return { url: res.url, type: res.headers.get('content-type') || '', body: await res.text() };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** フィードとして成立していて、記事が入っているか */
function feedInfo(doc) {
  if (!doc) return null;
  const body = doc.body;
  if (!/<rss|<feed|<rdf:RDF/i.test(body.slice(0, 2000))) return null;
  const items = (body.match(/<item[\s>]|<entry[\s>]/gi) || []).length;
  if (items === 0) return null;
  const titles = [...body.matchAll(/<title>([\s\S]*?)<\/title>/g)]
    .map((m) => m[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim())
    .filter(Boolean);
  // 最新記事の日付（古すぎるフィードは更新が止まっている）
  const dates = [...body.matchAll(/<(?:pubDate|updated|dc:date)>([\s\S]*?)<\/(?:pubDate|updated|dc:date)>/g)]
    .map((m) => Date.parse(m[1].trim()))
    .filter((n) => !Number.isNaN(n));
  const newest = dates.length ? Math.max(...dates) : null;
  return { items, sample: titles.slice(1, 3), newest: newest ? new Date(newest).toISOString().slice(0, 10) : null };
}

async function findFeed(origin) {
  // 1) トップページの <link rel="alternate"> を見る
  const top = await get(origin);
  if (top) {
    const links = [...top.body.matchAll(/<link[^>]+rel=["']alternate["'][^>]*>/gi)]
      .map((m) => m[0])
      .filter((tag) => /application\/(rss|atom)\+xml/i.test(tag))
      .map((tag) => (tag.match(/href=["']([^"']+)["']/) || [])[1])
      .filter(Boolean);
    for (const href of links.slice(0, 3)) {
      let abs;
      try { abs = new URL(href, top.url).toString(); } catch { continue; }
      const info = feedInfo(await get(abs));
      if (info) return { feed: abs, via: 'link', ...info };
    }
  }

  // 2) よくある場所を直接叩く
  for (const p of COMMON_PATHS) {
    const info = feedInfo(await get(origin + p));
    if (info) return { feed: origin + p, via: 'path', ...info };
  }
  return null;
}

async function run() {
  const limit = Number(process.argv[2] || 0);
  const makers = JSON.parse(fs.readFileSync('src/data/makers.json', 'utf8'));

  const byOrigin = new Map();
  for (const [category, list] of Object.entries(makers)) {
    for (const m of list) {
      const base = m.products || m.catalog || m.office || m.contact;
      if (!base) continue;
      try {
        const origin = new URL(base).origin;
        if (!byOrigin.has(origin)) byOrigin.set(origin, { origin, names: new Set(), categories: new Set() });
        byOrigin.get(origin).names.add(m.name);
        byOrigin.get(origin).categories.add(category);
      } catch { /* ignore */ }
    }
  }

  let targets = [...byOrigin.values()];
  if (limit) targets = targets.slice(0, limit);
  console.log(`調査対象: ${targets.length} ドメイン`);

  const found = [];
  let done = 0, index = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (index < targets.length) {
      const t = targets[index++];
      const hit = await findFeed(t.origin);
      done++;
      if (done % 25 === 0) console.log(`  ${done}/${targets.length} 社`);
      if (hit) {
        found.push({
          origin: t.origin,
          name: [...t.names][0],
          categories: [...t.categories],
          ...hit,
        });
        console.log(`  発見 ${[...t.names][0]} -> ${hit.feed} (${hit.items}件, 最新 ${hit.newest || '不明'})`);
      }
    }
  }));

  found.sort((a, b) => a.origin.localeCompare(b.origin));
  fs.writeFileSync(OUT, JSON.stringify({
    generatedAt: new Date().toISOString().slice(0, 10),
    scanned: targets.length,
    found: found.length,
    feeds: found,
  }, null, 2) + '\n');

  console.log('');
  console.log(`フィードが見つかった会社: ${found.length} / ${targets.length}`);
  console.log(`-> ${OUT}`);
}

run();
