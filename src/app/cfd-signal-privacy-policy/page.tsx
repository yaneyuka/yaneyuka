import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function CfdSignalPrivacyPolicyPage() {
  return (
    <BilingualLegal
      titleEn="CFD Signal Privacy Policy"
      titleJa="CFD Signal プライバシーポリシー"
      en={<EnglishContent />}
      ja={<JapaneseContent />}
      defaultLang="ja"
    />
  );
}

function JapaneseContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-3">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年5月15日 &nbsp;|&nbsp;
        <strong>事業者:</strong> 合同会社slime &nbsp;|&nbsp;
        <strong>連絡先:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>
      </p>
      <p>
        本プライバシーポリシーは、合同会社slime（以下「当社」）が提供する <strong>CFD Signal</strong> アプリ（以下「本サービス」）における個人情報の取扱いについて定めるものです。
      </p>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ 本サービスの位置付け</h3>
        <p className="text-[12px]">
          本サービスは、貴金属・エネルギー・株価指数等の差金決済取引（CFD）の<strong>価格情報を元にしたテクニカル指標イベント（RSI / 移動平均クロス / ボリンジャーバンド / 高値安値ブレイク 等）を通知する情報提供サービス</strong>であり、投資助言業や金融商品取引業に該当する助言・推奨は行いません。投資判断はすべてご自身の責任で行ってください。
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">1. 収集する情報</h3>
        <p>本アプリケーションでは、以下の情報を収集・保存します。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>ユーザー設定（サブスクリプションプラン、有効化されたシグナル、監視銘柄、時間足）</li>
          <li>通知履歴（シグナル発動時の通知データ）</li>
          <li>アプリケーションの使用状況（機能利用ログ）</li>
          <li>デバイストークン（プッシュ通知配信のため、Apple Push Notification service 経由）</li>
        </ul>
        <p className="mt-2">匿名認証（Firebase Anonymous Auth）を利用しており、氏名・メールアドレス・電話番号等の<strong>個人を直接識別する情報は取得しません</strong>。ユーザーは匿名 UID で識別されます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. 情報の使用目的</h3>
        <p>収集した情報は、以下の目的で使用します。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>CFD 銘柄の価格情報に基づくテクニカルシグナルの監視と通知機能の提供</li>
          <li>ユーザー設定の保存と復元</li>
          <li>サービスの改善と機能追加</li>
          <li>サブスクリプション管理（RevenueCat 経由）</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. データの保存場所</h3>
        <p>データは Google Firebase Firestore（asia-northeast1 リージョン、東京）に保存されます。Firebase のプライバシーポリシーについては、<a href="https://firebase.google.com/support/privacy" className="text-blue-600 hover:text-blue-800 underline">Firebase Privacy Policy</a> をご確認ください。</p>
        <p className="mt-2">サブスクリプション情報は <strong>RevenueCat</strong> を介して管理しており、同社のプライバシーポリシー（<a href="https://www.revenuecat.com/privacy" className="text-blue-600 hover:text-blue-800 underline">RevenueCat Privacy</a>）も併せてご確認ください。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. 第三者への情報提供</h3>
        <p>当社は、法律で要求される場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。</p>
        <p className="mt-2">ただし、本サービスの提供に必要な以下の外部サービスにデータを処理委託します。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Google Firebase / Firestore</strong>（認証・データ保存・サーバーホスティング）</li>
          <li><strong>Apple Push Notification service</strong>（プッシュ通知配信）</li>
          <li><strong>RevenueCat</strong>（サブスクリプション課金管理）</li>
          <li><strong>OANDA Japan / MetaTrader 5</strong>（CFD 銘柄の価格データ取得）</li>
        </ul>
        <p className="mt-2">これらの委託先は、当社との契約および各社のプライバシーポリシーに基づき、適切に個人情報を取り扱います。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. データの削除</h3>
        <p>データの削除をご希望の場合は、<a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a> 宛てにご連絡ください。匿名 UID に紐づく Firestore 上のデータを 14 日以内に削除します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. クッキーおよびトラッキング</h3>
        <p>本サービスは広告 SDK・分析 SDK を利用しておらず、デバイス間トラッキングや広告 ID の取得は行いません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. プライバシーポリシーの変更</h3>
        <p>本ポリシーを変更する場合、本ページにて変更内容と発効日を告知します。重要な変更がある場合はアプリ内通知でもお知らせします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. お問い合わせ</h3>
        <p>プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>事業者:</strong> 合同会社slime</li>
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}

function EnglishContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-3">
      <p className="text-[12px] text-gray-500">
        <strong>Last Updated:</strong> May 15, 2026 &nbsp;|&nbsp;
        <strong>Operator:</strong> 合同会社slime &nbsp;|&nbsp;
        <strong>Contact:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>
      </p>
      <p>
        This Privacy Policy describes how 合同会社slime (&ldquo;the Company&rdquo;) handles personal information in the <strong>CFD Signal</strong> application (the &ldquo;Service&rdquo;).
      </p>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ About the Service</h3>
        <p className="text-[12px]">
          The Service provides notifications of technical-indicator events (RSI, moving-average crosses, Bollinger Bands, high/low breakouts, etc.) based on price information of Contracts for Difference (CFD) on precious metals, energy, and stock indices. <strong>It is an information-only service and does not constitute investment advice or any recommendation of a specific transaction.</strong> All investment decisions are made at the user&rsquo;s own responsibility.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">1. Information We Collect</h3>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>User settings (subscription plan, enabled signals, watched instruments, timeframes)</li>
          <li>Notification history</li>
          <li>Application usage data</li>
          <li>Device token for push notifications via Apple Push Notification service</li>
        </ul>
        <p className="mt-2">We use anonymous authentication (Firebase Anonymous Auth). We do <strong>not</strong> collect personally identifying information such as name, email, or phone number. Users are identified by an anonymous UID only.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Purpose of Information Use</h3>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Providing CFD-instrument technical-signal monitoring and notification features</li>
          <li>Saving and restoring user settings</li>
          <li>Service improvement</li>
          <li>Subscription management via RevenueCat</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Data Storage Location</h3>
        <p>Data is stored in Google Firebase Firestore (asia-northeast1 region, Tokyo). See <a href="https://firebase.google.com/support/privacy" className="text-blue-600 hover:text-blue-800 underline">Firebase Privacy Policy</a>.</p>
        <p className="mt-2">Subscription data is processed by RevenueCat. See <a href="https://www.revenuecat.com/privacy" className="text-blue-600 hover:text-blue-800 underline">RevenueCat Privacy</a>.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Third-Party Information Sharing</h3>
        <p>We do not share personal information with third parties without user consent, except as required by law. The Service uses the following sub-processors:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Google Firebase / Firestore (authentication, data storage)</li>
          <li>Apple Push Notification service (push delivery)</li>
          <li>RevenueCat (subscription billing)</li>
          <li>OANDA Japan / MetaTrader 5 (CFD price data)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Data Deletion</h3>
        <p>To request data deletion, please contact <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>. We will delete Firestore data associated with your anonymous UID within 14 days.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Cookies and Tracking</h3>
        <p>The Service does not use advertising or analytics SDKs and does not perform cross-device tracking or advertising-ID collection.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Changes to this Policy</h3>
        <p>We will post any changes to this Policy on this page along with the effective date. Material changes will be announced via in-app notification.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Contact</h3>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Operator:</strong> 合同会社slime</li>
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}
