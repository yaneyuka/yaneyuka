/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

// Firebase の設定は登録時のクエリ文字列から受け取る（src/lib/initServiceWorker.ts）。
// ここに値を直接書くと .env.local と食い違う。実際 2026-08-02 まで、この位置に
// リファラ制限付きの古い apiKey が残っていて、アプリ側が使っているキーと
// 一致していなかった。設定の出所は環境変数ひとつに保つこと。
const params = new URL(self.location).searchParams;
const firebaseConfig = {
  apiKey: params.get('apiKey'),
  authDomain: params.get('authDomain'),
  projectId: params.get('projectId'),
  storageBucket: params.get('storageBucket'),
  messagingSenderId: params.get('messagingSenderId'),
  appId: params.get('appId'),
};

let messaging = null;
if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.messagingSenderId) {
  try {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    messaging = firebase.messaging();
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Firebase の初期化に失敗:', error);
  }
} else {
  console.warn('[firebase-messaging-sw.js] 設定がクエリ文字列で渡されていないため、バックグラウンド通知は無効です');
}

if (messaging) {
  messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification?.title || 'YyChat';
    const notificationOptions = {
      body: payload.notification?.body || '',
      icon: '/favicon.png',
      tag: payload.data?.roomId ? `chat-${payload.data.roomId}` : 'chat',
      data: payload.data,
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // next.config.js の trailingSlash: true により、実際のパスは /userpage/ になる。
  const roomId = event.notification.data?.roomId;
  const urlToOpen = roomId ? `/userpage/?room=${roomId}` : '/userpage/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // クエリ違いで一致しなくなるのを避けるため、パス部分だけで既存タブを探す。
      for (const client of clientList) {
        if (new URL(client.url).pathname.startsWith('/userpage') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});
