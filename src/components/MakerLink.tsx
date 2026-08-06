import React from 'react';
import report from '@/data/broken-maker-links.json';

/**
 * 建材メーカーの外部リンク。
 *
 * メーカー各社は製品ページの URL をよく作り替えるため、こちらのリンクは放っておくと
 * 404 が溜まっていく（2026-08 の調査では約 2 割が 404 で、そのほとんどは会社サイト
 * 自体は健在だった）。scripts/check-maker-links.mjs が週次で全件を確認し、
 * src/data/broken-maker-links.json に切れたリンクを書き出す。
 * ここではその一覧を見て、404 のものは会社トップページへ振り替える。
 * 目的の会社には辿り着けるので、行き止まりにはならない。
 */

const FALLBACKS: Record<string, string> = Object.fromEntries(
  (report.broken || [])
    .filter((b): b is { url: string; status: number; fallback: string } => Boolean(b.fallback))
    .map((b) => [b.url, b.fallback])
);

const isUsable = (url?: string): url is string =>
  Boolean(url && url !== '#' && url.trim() !== '');

type MakerLinkProps = {
  url?: string;
  label: string;
};

const MakerLink: React.FC<MakerLinkProps> = ({ url, label }) => {
  if (!isUsable(url)) {
    return <span className="text-gray-600 no-underline cursor-not-allowed">{label}</span>;
  }

  const fallback = FALLBACKS[url];
  if (fallback) {
    return (
      <a
        href={fallback}
        target="_blank"
        rel="noopener noreferrer"
        title="リンク先のページが移動したため、会社トップページを開きます"
        className="text-blue-800 hover:text-blue-900 underline cursor-pointer"
      >
        {label}
        <span className="ml-0.5 text-[10px] text-gray-500 no-underline">(トップへ)</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-800 hover:text-blue-900 underline cursor-pointer"
    >
      {label}
    </a>
  );
};

export default MakerLink;
