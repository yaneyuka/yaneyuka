'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

/**
 * 掲示板の未読件数。
 *
 * 投稿しても誰も気付かないままだったので、ヘッダーの「掲示板」に件数を出す。
 * 最後に掲示板を開いた時刻を端末に覚えておき、それより新しい投稿を数える。
 * ログインは不要（未ログインでも閲覧できる掲示板なので、未読の概念も共通でよい）。
 */

const SEEN_KEY = 'forumLastSeenAt';
const WATCH_LIMIT = 30;

export function markForumSeen() {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
    window.dispatchEvent(new Event('forum-seen'));
  } catch {
    /* localStorage が使えない環境では未読表示を諦める */
  }
}

export function useForumUnread(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let latest: number[] = [];

    const recount = () => {
      let seen = 0;
      try {
        seen = Number(localStorage.getItem(SEEN_KEY) || 0);
      } catch {
        return;
      }
      // 初回訪問（記録なし）は未読扱いにしない。いきなり赤い数字が出ても意味がないため。
      if (!seen) {
        markForumSeen();
        setCount(0);
        return;
      }
      setCount(latest.filter((t) => t > seen).length);
    };

    const q = query(collection(db, 'forumPosts'), orderBy('createdAt', 'desc'), limit(WATCH_LIMIT));
    const unsub = onSnapshot(
      q,
      (snap) => {
        latest = snap.docs
          .map((d) => Number(d.data().createdAt))
          .filter((n) => Number.isFinite(n));
        recount();
      },
      () => setCount(0)
    );

    window.addEventListener('forum-seen', recount);
    return () => {
      unsub();
      window.removeEventListener('forum-seen', recount);
    };
  }, []);

  return count;
}
