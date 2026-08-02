import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function TrailmarkPrivacyPolicyPage() {
  return (
    <BilingualLegal
      titleEn="Trailmark Privacy Policy"
      titleJa="Trailmark プライバシーポリシー"
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
        <strong>最終更新日:</strong> 2026年5月31日 &nbsp;|&nbsp;
        <strong>制定日:</strong> 2026年5月31日
      </p>
      <p>
        合同会社slime（以下「当社」）は、iOS アプリ「Trailmark」（以下「本アプリ」）における利用者の個人情報・位置情報の取り扱いについて、以下のとおり定めます。
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. 取得する情報</h3>
        <p>本アプリは、利用者の移動を記録するために以下の情報を取得します。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>位置情報（緯度・経度・取得時刻・水平精度）</strong></li>
          <li>端末情報（プラットフォーム、OS バージョン、アプリバージョン）</li>
          <li>課金情報（購入履歴、サブスクリプション状態、買い切り購入の有無）</li>
        </ul>
        <p className="mt-2">位置情報は、利用者が「常に許可（Always）」を有効にした場合に、バックグラウンドを含め継続的に取得されます。これは「過去の自分の移動を後から地図で振り返る」という本アプリの中心機能のために必要です。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. 情報の保存場所と外部送信</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>取得した位置情報は、利用者の端末内にのみ保存されます。</strong></li>
          <li>当社のサーバーや第三者を含む<strong>外部に送信されることはありません</strong>（本バージョン v1.0 時点）。</li>
          <li>したがって当社が利用者の位置情報を閲覧・収集・保管することはありません。</li>
          <li>利用者が iCloud バックアップ機能を使用した場合、データは <strong>利用者自身の iCloud（Apple Inc. 提供）</strong> に暗号化されて保存されます。当社のサーバーには引き続き送信されません。</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. 利用目的</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>記録した移動を地図上に表示し、日付ごとに振り返る機能の提供。</li>
          <li>全期間ヒートマップ・過去同日表示などの振り返り機能の提供。</li>
          <li>課金プラン（全期間閲覧の解放）の管理。</li>
          <li>iCloud バックアップ/復元機能の提供（利用者の任意操作によるもの）。</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. 第三者提供・外部サービスの利用</h3>
        <p>法令に基づく場合や人命・財産保護の必要がある場合等を除き、本人の同意なく第三者に情報を提供しません。本アプリは、課金処理および任意のバックアップ機能のために以下の外部サービスと連携しています。位置情報・移動履歴等のユーザーデータは、これらのサービスに<strong>当社が直接送信することはありません</strong>。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Apple Inc.</strong>（米国） — App Store 経由の決済処理、ならびに利用者自身が任意で利用する iCloud バックアップ。Apple ID と購入情報、および利用者の選択に基づくバックアップデータのみ取り扱います。</li>
          <li><strong>RevenueCat, Inc.</strong>（米国） — サブスクリプション・買い切り購入状態の管理。Apple ID に紐づく匿名化された購入ステータスのみ取り扱います。</li>
        </ul>
        <p className="mt-2">これらのサービス提供者は、それぞれのプライバシーポリシーに従って情報を処理します。上記サービスは日本国外（米国）に所在し、情報が国外で処理される場合があります。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. 課金情報</h3>
        <p>本アプリの有料プランには以下の 3 種類があり、いずれも全期間閲覧の解放を提供します（機能差はありません）。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>月額自動更新サブスクリプション</strong>（$0.99 / ¥160 相当）</li>
          <li><strong>年額自動更新サブスクリプション</strong>（$4.99 / ¥750 相当）</li>
          <li><strong>買い切り（Non-Consumable）</strong>（$9.99 / ¥1,500 相当） — 一度の購入で永続利用可能</li>
        </ul>
        <p className="mt-2">購入処理は Apple および RevenueCat を通じて行われます。当社は利用者のクレジットカード情報等の決済情報を取得しません。</p>
        <p className="mt-2">サブスクリプションは、次回更新の 24 時間前までにキャンセルしない限り自動的に更新されます。キャンセル・購入履歴の確認・購入の復元は、iOS の「設定」アプリ &gt; Apple ID &gt; 「サブスクリプション」から行えます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. データの削除</h3>
        <p>端末内に保存された移動記録データは、以下の方法で削除できます。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>アプリ内「ジャーナル」画面で、各日の <strong>ゴミ箱アイコン</strong> から日ごとに記録を消去できます。</li>
          <li>本アプリを iOS から削除することで、すべての記録データが端末ごと消去されます。</li>
          <li>iCloud バックアップを削除する場合は、iOS の「設定」アプリ &gt; Apple ID &gt; iCloud &gt; 「ストレージを管理」から該当データを削除してください。</li>
        </ul>
        <p className="mt-2">当社サーバーに利用者データを保持していないため、当社への削除依頼は不要です。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. 子どもの個人情報</h3>
        <p>本アプリは 13 歳未満の方を対象として提供しておりません。13 歳未満の方の個人情報は意図的に取得しません。万一取得したことが判明した場合は、速やかに削除します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. 安全管理</h3>
        <p>端末内データは iOS のセキュリティ機構（アプリサンドボックス・ファイル暗号化）に従って保護されます。iCloud バックアップを利用する場合、データは Apple の暗号化技術により保護されます。当社が外部に保管するデータは存在しないため、サーバー側の漏えいリスクはありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. 準拠法および国際的な取扱い</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>本ポリシーは日本法に準拠し、個人情報の保護に関する法律（APPI）を遵守します。</li>
          <li>EU および英国にお住まいの利用者に対しては、一般データ保護規則（GDPR）および UK GDPR に基づく権利（アクセス権・訂正権・消去権・処理制限権・データポータビリティ権・異議申立権）を保障します。</li>
          <li>米国カリフォルニア州にお住まいの利用者に対しては、カリフォルニア州消費者プライバシー法（CCPA）に基づく権利（情報の開示・削除・販売のオプトアウト）を保障します。</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. 改定</h3>
        <p>法令やサービス内容の変更に伴い、本ポリシーを改定することがあります。重要な変更は本アプリ内または当社ウェブサイト上で告知します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">11. お問い合わせ</h3>
        <p>本ポリシーに関するお問い合わせは、以下までご連絡ください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
          <li><strong>運営会社:</strong> 合同会社slime</li>
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
        <strong>Last Updated:</strong> May 31, 2026 &nbsp;|&nbsp;
        <strong>Established:</strong> May 31, 2026
      </p>
      <p>
        This Privacy Policy (&ldquo;Policy&rdquo;) sets out how slime LLC (&ldquo;we&rdquo;) handles personal information and location data in the iOS application &ldquo;Trailmark&rdquo; (the &ldquo;App&rdquo;).
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. Information We Collect</h3>
        <p>The App collects the following information for the purpose of recording user movement:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Location data (latitude, longitude, timestamp, horizontal accuracy)</strong></li>
          <li>Device information (platform, OS version, app version)</li>
          <li>Purchase information (purchase history, subscription status, one-time purchase status)</li>
        </ul>
        <p className="mt-2">Location data is continuously collected, including in the background, when the user enables &ldquo;Always&rdquo; location permission. This is required for the App&rsquo;s central function: &ldquo;looking back on your own past movements on a map.&rdquo;</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Where Information Is Stored and External Transmission</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Location data collected by the App is stored only on the user&rsquo;s device.</strong></li>
          <li>It is <strong>never transmitted to our servers or to any third party</strong> (as of version 1.0).</li>
          <li>Therefore, we cannot view, collect, or retain user location data.</li>
          <li>If the user enables the iCloud Backup feature, the data is encrypted and stored only in the user&rsquo;s own iCloud (provided by Apple Inc.). It is still not transmitted to our servers.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Purposes of Use</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Displaying recorded movement on a map and providing a date-based look-back feature.</li>
          <li>Providing look-back features such as the all-time heatmap and &ldquo;On this day&rdquo; view.</li>
          <li>Managing paid plans (unlocking full-period viewing).</li>
          <li>Providing iCloud backup/restore functionality (via the user&rsquo;s explicit action).</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Third-Party Provision and External Services</h3>
        <p>We do not provide your information to third parties without consent except where required by law or necessary to protect life, body, or property. The App integrates with the following external services for purchase processing and optional backup functionality. <strong>We do not directly transmit user data such as location or movement history to these services.</strong></p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Apple Inc.</strong> (USA) — Payment processing via the App Store, and iCloud Backup (used optionally by the user). Only handles Apple ID, purchase information, and backup data chosen by the user.</li>
          <li><strong>RevenueCat, Inc.</strong> (USA) — Management of subscription and one-time purchase status. Only handles anonymized purchase status linked to Apple ID.</li>
        </ul>
        <p className="mt-2">These service providers process information in accordance with their respective privacy policies. The above services are located outside Japan (USA), which may involve cross-border processing of information.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Purchase Information</h3>
        <p>The App&rsquo;s paid plan is available in the following 3 variants, all of which provide the same feature set (full-period viewing unlocked, no feature differences):</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Monthly Auto-Renewing Subscription</strong> ($0.99 / ¥160 equivalent)</li>
          <li><strong>Yearly Auto-Renewing Subscription</strong> ($4.99 / ¥750 equivalent)</li>
          <li><strong>One-Time Purchase (Non-Consumable)</strong> ($9.99 / ¥1,500 equivalent) — permanent access with a single purchase</li>
        </ul>
        <p className="mt-2">Purchase processing is handled by Apple and RevenueCat. We do not collect any payment information such as credit card numbers.</p>
        <p className="mt-2">Subscriptions are automatically renewed unless canceled at least 24 hours before the next renewal date. You can cancel, review purchase history, or restore purchases from iOS Settings &gt; Apple ID &gt; &ldquo;Subscriptions&rdquo;.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Data Deletion</h3>
        <p>Movement data stored on the device can be deleted as follows:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Tap the <strong>trash icon</strong> for each day from the in-app &ldquo;Journal&rdquo; screen to erase records day-by-day.</li>
          <li>Deleting the App from iOS erases all recorded data along with the App.</li>
          <li>To delete iCloud backups, go to iOS Settings &gt; Apple ID &gt; iCloud &gt; &ldquo;Manage Account Storage&rdquo; and remove the relevant data.</li>
        </ul>
        <p className="mt-2">Since we do not retain user data on our servers, no deletion request to us is required.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Children&rsquo;s Privacy</h3>
        <p>The App is not intended for users under the age of 13. We do not intentionally collect personal information from users under 13. If we discover such collection, we will promptly delete it.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Security</h3>
        <p>On-device data is protected by iOS security mechanisms (application sandbox, file encryption). When iCloud backups are used, data is protected by Apple&rsquo;s encryption technologies. Since we do not retain any externally stored data, there is no server-side leakage risk.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. Governing Law and International Handling</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>This Policy is governed by the laws of Japan and complies with the Act on the Protection of Personal Information (APPI).</li>
          <li>For users residing in the EU and UK, we guarantee rights under the General Data Protection Regulation (GDPR) and UK GDPR (right of access, right to rectification, right to erasure, right to restrict processing, right to data portability, and right to object).</li>
          <li>For users residing in California, USA, we guarantee rights under the California Consumer Privacy Act (CCPA) (right to know, right to delete, right to opt out of sale).</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. Amendments</h3>
        <p>We may amend this Policy in response to changes in law or service content. Important changes will be announced in the App or on the official website.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">11. Contact</h3>
        <p>For inquiries regarding this Policy, please contact us at:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
          <li><strong>Operator:</strong> slime LLC (合同会社slime)</li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 slime LLC. All rights reserved.
      </p>
    </div>
  );
}
