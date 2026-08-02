/**
 * FCM 用 Service Worker の登録。
 *
 * ⚠️ 2026-08-02 時点で、この関数はどこからも呼ばれていない。
 * バックグラウンドのプッシュ通知を有効にするには、以下が揃う必要がある:
 *
 *   1. `NEXT_PUBLIC_FIREBASE_VAPID_KEY` を .env.local に設定
 *      （Firebase Console → プロジェクトの設定 → Cloud Messaging → ウェブプッシュ証明書）
 *   2. この関数をクライアント側から呼ぶ
 *   3. getFCMToken()（firebaseClient.ts）でトークンを取得してサーバーに保存
 *
 * 2 を入れる際は慎重に。過去に next-pwa の Service Worker が /_next/static を
 * CacheFirst で握ってしまい、デプロイしても古い画面が出る事故が起きたため、
 * public/sw.js にキルスイッチ（全キャッシュ削除 + 自身の unregister）を置いて
 * 収拾した経緯がある。Service Worker を戻すのは、その影響を理解した上で。
 *
 * なお、タブを開いている間のチャット通知は ChatNotificationListener が
 * Firestore の onSnapshot と Notification API で処理しており、Service Worker には
 * 依存していない。
 */

function buildConfigQuery(): string | null {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!config.apiKey || !config.projectId || !config.messagingSenderId) {
    console.error('[initServiceWorker] Firebase の環境変数が不足しています');
    return null;
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(config)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}

export async function initServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('[initServiceWorker] Service Workerが利用できません');
    return null;
  }

  const query = buildConfigQuery();
  if (!query) return null;

  try {
    // 設定はクエリ文字列で渡す。Service Worker からは process.env を読めず、
    // postMessage は「起動直後の onBackgroundMessage 登録」に間に合わないため。
    // URL が変わればブラウザが新しい Worker として扱うので、設定変更も反映される。
    const registration = await navigator.serviceWorker.register(
      `/firebase-messaging-sw.js?${query}`,
      { scope: '/' }
    );

    // getFCMToken() 側が navigator.serviceWorker.ready を待つので、
    // ここでアクティブ化まで待つ必要はない。
    console.log('[initServiceWorker] Service Worker登録成功');
    return registration;
  } catch (error) {
    console.error('[initServiceWorker] Service Worker登録エラー:', error);
    return null;
  }
}
