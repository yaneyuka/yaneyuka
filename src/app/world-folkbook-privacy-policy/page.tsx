import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function WorldFolkbookPrivacyPolicyPage() {
  return (
    <BilingualLegal
      titleEn="World Folkbook Privacy Policy"
      titleJa="World Folkbook プライバシーポリシー"
      en={<EnglishContent />}
      ja={<JapaneseContent />}
      defaultLang="ja"
    />
  );
}

function EnglishContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-3">
      <p className="text-[12px] text-gray-500">
        <strong>Last updated:</strong> May 5, 2026
      </p>
      <p>
        slime LLC (合同会社slime) (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides the iOS application &ldquo;World Folkbook&rdquo; (the &ldquo;App&rdquo;). This Privacy Policy describes how we handle information from users of the App.
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. Information We Collect</h3>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">1-1. In-App Data Created by Users</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reading history (position of last-read panel, timestamps)</li>
          <li>App settings (display language, text size, kanji display mode, etc.)</li>
        </ul>
        <p className="mt-1">This information is stored on the user&rsquo;s device and is not transmitted to our servers. Users may delete this information at any time by clearing the app settings or uninstalling the App.</p>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">1-2. Subscription Information</h4>
        <p>Paid subscriptions are processed through the App Store payment system operated by Apple Inc. We receive subscription state, purchase amount, and billing date through Apple and our payment processor RevenueCat, Inc.</p>
        <p className="mt-1">We do not collect or store credit card numbers or other payment credentials directly.</p>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">1-3. Automatically Collected Information</h4>
        <p>The App may automatically collect the following for service delivery and quality improvement:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Device OS version</li>
          <li>App version</li>
          <li>Language and region settings</li>
          <li>Anonymous user identifier (we do not use advertising identifiers)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Purposes of Use</h3>
        <p>We use collected information for:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Providing app functionality (reading history sync, settings persistence)</li>
          <li>Investigating and improving app issues</li>
          <li>Subscription state management</li>
          <li>Legal compliance</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Sharing with Third Parties</h3>
        <p>We do not share information with third parties without user consent, except:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>When required by law</li>
          <li>When necessary to protect life, body, or property</li>
          <li>When required to cooperate with public agencies</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Service Providers</h3>
        <p>We may delegate processing of information to the following service providers:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Apple Inc. (App Store / iCloud)</li>
          <li>Google LLC (Firebase: Auth, Database, Storage)</li>
          <li>RevenueCat, Inc. (Subscription management)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Children&rsquo;s Privacy</h3>
        <p>The App may be intended for children. We comply with Apple App Store&rsquo;s Kids category guidelines and applicable child privacy laws (including COPPA).</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>We do not collect personally identifiable information from children (name, email, address, photo, etc.).</li>
          <li>We do not display third-party advertisements.</li>
          <li>External links are limited to parent-facing resources (this policy, Terms of Service, and support contact).</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Data Retention</h3>
        <p>When the user uninstalls the App, on-device information is removed. Information held on our servers is retained only as long as necessary and deleted thereafter.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Disclosure / Correction / Deletion</h3>
        <p>Users may request disclosure, correction, or deletion of their information held by us. Please contact us at the address in Section 10.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Cookies</h3>
        <p>The App does not use browser cookies. Locally, the App uses AsyncStorage for user identification and settings persistence.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. Changes</h3>
        <p>We may update this policy as needed. Material changes will be announced in-app or on our support site.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. Contact</h3>
        <p>For questions about this policy:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Operator:</strong> slime LLC (合同会社slime)</li>
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 slime LLC. All rights reserved.
      </p>
    </div>
  );
}

function JapaneseContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-3">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年5月5日
      </p>
      <p>
        合同会社slime（以下「当社」といいます）は、当社が提供するiOSアプリケーション「World Folkbook」（以下「本アプリ」といいます）における、利用者の情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. 取得する情報</h3>
        <p>本アプリは、以下の情報を取得します。</p>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">1-1. 利用者がアプリ内で作成する情報</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>読書履歴（読み進めたコマの位置、最終アクセス日時）</li>
          <li>アプリ内の設定（表示言語、テキストサイズ、漢字表記モード等）</li>
        </ul>
        <p className="mt-1">これらの情報は、原則として利用者の端末内に保存され、当社サーバーには送信されません。利用者は、いつでもアプリの設定または端末のアプリ削除により、これらの情報を削除できます。</p>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">1-2. 課金に関する情報</h4>
        <p>本アプリの有料サブスクリプションは、Apple Inc. が提供する App Store の課金システムを通じて処理されます。当社は、購入金額、決済日、サブスクリプションの状態等の情報を、Apple および決済代行事業者である RevenueCat, Inc. を通じて取得します。</p>
        <p className="mt-1">クレジットカード番号等の決済情報そのものを当社が取得・保存することはありません。</p>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">1-3. 自動的に取得する情報</h4>
        <p>本アプリは、機能提供および品質改善のために、以下の情報を自動的に取得する場合があります。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>端末のOSバージョン</li>
          <li>アプリのバージョン</li>
          <li>言語・地域設定</li>
          <li>匿名の利用者識別子（広告目的の識別子は使用しません）</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. 利用目的</h3>
        <p>当社は、取得した情報を以下の目的で利用します。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>本アプリの機能（読書履歴の同期、設定の保存等）の提供</li>
          <li>本アプリの不具合の調査および改善</li>
          <li>サブスクリプションの状態管理</li>
          <li>法令・規約の遵守</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. 第三者提供</h3>
        <p>当社は、利用者の同意なく、取得した情報を第三者に提供することはありません。ただし、以下の場合を除きます。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>法令に基づく場合</li>
          <li>人の生命、身体または財産の保護のために必要がある場合</li>
          <li>国の機関等への協力の必要がある場合</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. 委託先</h3>
        <p>当社は、本アプリの運営にあたり、以下の事業者に情報の処理を委託することがあります。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Apple Inc.（App Store / iCloud）</li>
          <li>Google LLC（Firebase: 認証・データベース・ストレージ）</li>
          <li>RevenueCat, Inc.（サブスクリプション管理）</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. 子供のプライバシー</h3>
        <p>本アプリは子供を対象とする場合があります。当社は、Apple App Store の Kids カテゴリ規約および各国の児童プライバシー保護法（COPPA等）を遵守します。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>子供を識別する個人情報（氏名、メールアドレス、住所、写真等）の収集は行いません。</li>
          <li>第三者広告は表示しません。</li>
          <li>外部サイトへのリンクは保護者向けのもの（プライバシーポリシー、利用規約、サポート連絡先）に限定しています。</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. データの保管期間</h3>
        <p>利用者がアプリを削除した場合、端末内に保存されている情報は端末から削除されます。当社サーバーに保管される情報は、必要な期間に限り保管し、不要になった時点で削除します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. 開示・訂正・削除</h3>
        <p>利用者は、当社が保有する自己の情報について、開示・訂正・削除を求めることができます。希望される方は、第10条の連絡先までお問い合わせください。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Cookie等</h3>
        <p>本アプリでは、ブラウザCookieは使用していません。アプリ内では、利用者識別および設定保存のためにローカルストレージ（AsyncStorage）を使用します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. 改定</h3>
        <p>当社は、本ポリシーを必要に応じて改定することがあります。重要な変更がある場合は、本アプリ内またはサポートサイトにて通知します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. お問い合わせ</h3>
        <p>本ポリシーに関するお問い合わせは、以下までご連絡ください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>事業者名:</strong> 合同会社slime</li>
          <li><strong>メールアドレス:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}
