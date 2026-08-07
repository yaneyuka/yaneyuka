// 展示会の公式サイトから会期を読み取り、src/data/events.json を更新する。
//   node scripts/update-events.mjs [--dry-run]
//   .github/workflows/update-events.yml が週次で実行
//
// 展示会サイトの URL は年をまたいでも変わらないことが多いので（例: messe.nikkei.co.jp/ac/）、
// 同じ URL を読み直すだけで翌年の会期を拾える。実際 2026-08 時点で
// 建築・建材展のページには既に 2027 年の会期が出ていた。
//
// 会期が過ぎたまま放置されていた（15 件中 9 件）のがこの仕組みを入れた理由。
// 表示側は endDate で足切りするので、ここが動かなくても古い情報は出ない。

import fs from 'node:fs';

const FILE = 'src/data/events.json';
const TIMEOUT_MS = 25000;
const UA = 'Mozilla/5.0 (compatible; yaneyuka-eventbot/1.0; +https://yaneyuka.com/)';

const dryRun = process.argv.includes('--dry-run');

async function fetchText(url) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ac.signal, headers: { 'User-Agent': UA } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const toIso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

/**
 * 「2027年3月2日(火)～5日(金)」「2027年5月26日(水)～28日(金)」といった表記から会期を取る。
 * 開始日しか書かれていない場合は終了日を開始日と同じにする。
 */
function extractPeriod(html) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#x?[0-9a-f]+;/gi, ' ').replace(/\s+/g, ' ');
  const candidates = [];

  // 年月日 ～ 日（同月内）
  for (const m of text.matchAll(/(20\d{2})年\s*(\d{1,2})月\s*(\d{1,2})日[^0-9]{0,8}[〜~～-]\s*(\d{1,2})日/g)) {
    candidates.push({ start: toIso(+m[1], +m[2], +m[3]), end: toIso(+m[1], +m[2], +m[4]) });
  }
  // 年月日 ～ 月日（月をまたぐ）
  for (const m of text.matchAll(/(20\d{2})年\s*(\d{1,2})月\s*(\d{1,2})日[^0-9]{0,8}[〜~～-]\s*(\d{1,2})月\s*(\d{1,2})日/g)) {
    candidates.push({ start: toIso(+m[1], +m[2], +m[3]), end: toIso(+m[1], +m[4], +m[5]) });
  }
  // 単日
  for (const m of text.matchAll(/(20\d{2})年\s*(\d{1,2})月\s*(\d{1,2})日/g)) {
    candidates.push({ start: toIso(+m[1], +m[2], +m[3]), end: toIso(+m[1], +m[2], +m[3]) });
  }

  if (!candidates.length) return null;

  // 今日以降で最も早いもの＝次回開催とみなす。
  // ページ内には過去回の実績も載っているため、単純な最初の一致では拾えない。
  const today = new Date().toISOString().slice(0, 10);
  const future = candidates.filter((c) => c.end >= today).sort((a, b) => a.start.localeCompare(b.start));
  return future[0] || null;
}

async function run() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const events = data.events || [];
  const today = new Date().toISOString().slice(0, 10);

  const review = [];
  let updated = 0;
  let unreachable = 0;
  let expired = 0;

  for (const ev of events) {
    if (!ev.link) continue;
    const html = await fetchText(ev.link);
    if (!html) {
      ev.isLinkActive = false;
      unreachable++;
      console.log(`  × 到達不可  ${ev.title}`);
      continue;
    }
    ev.isLinkActive = true;

    const period = extractPeriod(html);
    if (!period) {
      if (ev.endDate && ev.endDate < today) {
        expired++;
        console.log(`  ! 会期不明かつ終了済  ${ev.title}（${ev.endDate}）`);
      }
      continue;
    }
    if (period.start === ev.startDate && period.end === ev.endDate) continue;

    // 展示会サイトは姉妹展の会期も載せているので、素直に拾うと別の展示会の日付で
    // 上書きしてしまう（JAPAN BUILD TOKYO の 12/2 が大阪展の 8/26 に化けた）。
    // 確実なものだけ自動反映し、それ以外は人の確認に回す。
    const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000) + 1;
    const movesForward = period.start > ev.startDate;
    const sameLength = days(period.start, period.end) === days(ev.startDate, ev.endDate);

    if (!movesForward || !sameLength) {
      review.push({
        title: ev.title,
        current: `${ev.startDate}〜${ev.endDate}`,
        found: `${period.start}〜${period.end}`,
        reason: !movesForward ? '会期が前に戻っている' : '会期の日数が違う',
      });
      continue;
    }

    {
      console.log(`  ↑ 更新  ${ev.title}`);
      console.log(`      ${ev.startDate}〜${ev.endDate}  ->  ${period.start}〜${period.end}`);
      ev.startDate = period.start;
      ev.endDate = period.end;
      // 表示用の文字列も作り直す（元の書式に合わせる）
      const [sy, sm, sd] = period.start.split('-').map(Number);
      const [, em, ed] = period.end.split('-').map(Number);
      ev.dateText = sm === em
        ? `${sy}年${sm}月${sd}日～${ed}日`
        : `${sy}年${sm}月${sd}日～${em}月${ed}日`;
      updated++;
    }
  }

  const stillExpired = events.filter((e) => e.endDate && e.endDate < today);
  data.updatedAt = today;

  console.log('');
  console.log(`会期を更新   : ${updated} 件`);
  console.log(`要確認       : ${review.length} 件（自動反映していない）`);
  review.forEach((r) => {
    console.log(`    ${r.title}`);
    console.log(`      現在 ${r.current} / 検出 ${r.found}  — ${r.reason}`);
  });
  console.log(`到達できない : ${unreachable} 件`);
  console.log(`終了済のまま : ${stillExpired.length} 件（表示側で非表示になる）`);
  stillExpired.forEach((e) => console.log(`    ${e.endDate}  ${e.title}`));

  if (dryRun) {
    console.log('\n--dry-run のため書き込みませんでした。');
  } else {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
    console.log(`\n${FILE} を更新しました。`);
  }
}

run();
