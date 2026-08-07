import React from 'react';

/**
 * 掲載データがまだサンプルであることを示す表示。
 *
 * 施工会社・設計事務所・求人情報・コンペ・Pickup は、現在すべて架空のデータで
 * できている。以前は「詳細」を押して初めて「サンプルです」と分かる作りだったため、
 * 実在の会社だと誤解されうる状態だった。一覧の時点で分かるようにする。
 *
 * 隠さずに見せているのは、掲載を検討する会社に「ここに載れる」と伝える枠でもあるため。
 */

/** カード等に重ねる小さなバッジ */
export const SampleBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-300 ${className}`}
  >
    サンプル
  </span>
);

type SampleNoticeProps = {
  /** 「〜の掲載企業を募集しています」の〜の部分 */
  target: string;
  /** 掲載希望フォームへ誘導する処理 */
  onRequest?: () => void;
};

/** 一覧の先頭に置く説明帯 */
const SampleNotice: React.FC<SampleNoticeProps> = ({ target, onRequest }) => (
  <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-[12px] text-amber-900">
    <SampleBadge />
    <span>
      現在表示されているのは<strong>すべて架空のサンプル</strong>です。{target}の掲載企業を募集しています。
    </span>
    {onRequest && (
      <button
        type="button"
        onClick={onRequest}
        className="ml-auto rounded bg-amber-700 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-amber-800"
      >
        掲載を希望する
      </button>
    )}
  </div>
);

export default SampleNotice;
