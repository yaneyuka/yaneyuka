import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function PasLogPrivacyPolicyPage() {
  return (
    <BilingualLegal
      titleEn="PasLog Privacy Policy"
      titleJa="PasLog プライバシーポリシー"
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
        <strong>Last Updated:</strong> May 29, 2026 &nbsp;|&nbsp;
        <strong>Effective Date:</strong> May 29, 2026
      </p>
      <p>
        slime design, LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy (&ldquo;Policy&rdquo;) describes how the iOS application &ldquo;PasLog&rdquo; (the &ldquo;App&rdquo;) handles your information. <strong>PasLog stores all data only on your device. We do not transmit, collect, or store any of your secrets on our servers, and the App does not communicate with any server we operate.</strong>
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. Who We Are</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><strong>Controller:</strong> slime design, LLC (合同会社slime)</li>
          <li><strong>Contact:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
          <li><strong>Website:</strong> <a href="https://yaneyuka.com/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Information You Enter Into the App</h3>
        <p>You may enter the following types of information into the App for your own personal record-keeping. This information is stored <strong>only on your device</strong> and is never transmitted to us or any third party.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Service names, categories, notes</li>
          <li>Passwords, PINs, email addresses, user IDs, URLs, custom fields, and any other text you choose to save</li>
          <li>A recovery code you generate during onboarding (shown to you once; we never see it)</li>
          <li>Optional app passcode (4-6 digits) you set in Settings</li>
        </ul>
        <p className="mt-2">All data is encrypted on your device using AES-GCM. The encryption key is held in the iOS Keychain (Secure Enclave-backed Secure Store) and is unlocked by Face ID / Touch ID or the recovery code.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Information We Do NOT Collect</h3>
        <p>We expressly do <strong>not</strong> collect, transmit, or have access to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Any of the secrets you enter into the App (passwords, PINs, notes, etc.)</li>
          <li>Your name, address, phone number, or email address</li>
          <li>Location data (GPS, EXIF, or otherwise)</li>
          <li>Advertising Identifier (IDFA)</li>
          <li>Contacts, calendar, photos, or other personal device data</li>
          <li>Face ID / Touch ID biometric data (handled entirely by iOS; we only receive a success/failure result)</li>
          <li>Behavioral analytics, crash logs sent to third parties, or any usage tracking</li>
          <li>Cookies or web-tracking identifiers</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Purchase Information</h3>
        <p>PasLog offers a one-time, non-subscription in-app purchase (&ldquo;Pro&rdquo;) for unlimited records. When you make a purchase:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>The purchase is processed entirely by <strong>Apple Inc.</strong> via the App Store / StoreKit framework.</li>
          <li>Your Apple ID, payment method, and purchase history are handled by Apple under <a href="https://www.apple.com/legal/privacy/" className="text-blue-600 hover:text-blue-800 underline">Apple&rsquo;s Privacy Policy</a>.</li>
          <li>The App receives only a local receipt indicating purchase status. We do not run any server to verify or store purchase data.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Sub-Processors</h3>
        <p>The only third party that processes any data related to the App is:</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left">Provider</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Service</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Data Handled</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Apple Inc. (USA)</td>
                <td className="border border-gray-300 px-2 py-1">iOS, App Store, In-App Purchase, Face ID / Touch ID, Keychain</td>
                <td className="border border-gray-300 px-2 py-1">Apple ID, purchase data, biometric verification result</td>
                <td className="border border-gray-300 px-2 py-1">Per Apple policy</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">We do <strong>not</strong> use Firebase, Google Analytics, RevenueCat, advertising SDKs, crash-reporting services, or any other third-party data processor.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Data Retention</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>App data (encrypted records):</strong> Stored on your device for as long as you keep the App installed. Uninstalling the App or using &ldquo;Delete all data&rdquo; in Settings permanently removes the data.</li>
          <li><strong>Recovery code:</strong> Shown to you once during onboarding; never stored on our side. If you lose it and your device&rsquo;s Face ID / passcode also fails (e.g., after biometric re-enrollment), data cannot be recovered.</li>
          <li><strong>Purchase data:</strong> Retained by Apple under its policy.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Your Rights</h3>
        <p>Because we do not collect or store your data on any server, the conventional rights of access, rectification, and deletion are exercised directly within the App:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li><strong>Access:</strong> View all your records inside the App after unlocking.</li>
          <li><strong>Rectification:</strong> Edit any record from the edit screen.</li>
          <li><strong>Erasure:</strong> Use &ldquo;Delete all data&rdquo; in Settings, or uninstall the App.</li>
        </ol>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">GDPR Rights (EU/UK Residents)</h4>
        <p>If you are a resident of the European Union or United Kingdom, you have the rights of access, rectification, erasure, restriction, portability, and to lodge a complaint with a supervisory authority. Since we hold no data about you, these rights are effectively satisfied by the in-app controls described above.</p>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">CCPA Rights (California Residents)</h4>
        <p>If you are a California resident, you have the right to know, delete, opt-out of sale, and non-discrimination. We do not sell personal information and we do not collect personal information on any server.</p>

        <p className="mt-2">To exercise any of these rights or for any privacy-related question, contact <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>. We will respond within 30 days.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Cookies and Tracking</h3>
        <p>The App does not use web cookies, tracking pixels, or any cross-app/cross-site tracking technology.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. Children&rsquo;s Privacy</h3>
        <p>The App is not intended for children under the age of 13. Children under 13 should not use the App without parental consent.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. Security</h3>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>All stored data is encrypted using AES-GCM (256-bit) on your device.</li>
          <li>The encryption key is stored in the iOS Keychain (Secure Store) with <code>requireAuthentication: true</code>, requiring Face ID / Touch ID to unlock.</li>
          <li>App content is hidden when the App is sent to the background, preventing app-switcher screenshots from leaking sensitive data.</li>
          <li>Secret fields, when copied to the clipboard, are auto-cleared after 45 seconds.</li>
        </ul>
        <p className="mt-1">Because all data is stored on your device, the overall security of your information also depends on the security of your device and your iOS passcode / biometric setup.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">11. Changes to This Policy</h3>
        <p>We may update this Policy from time to time. Updated policies take effect upon posting at <a href="https://yaneyuka.com/paslog-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/paslog-privacy-policy/</a>.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">12. Governing Law and Jurisdiction</h3>
        <p>This Policy is governed by the laws of Japan. Any disputes arising from this Policy shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">13. Contact Us</h3>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Company:</strong> slime design, LLC (合同会社slime)</li>
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
          <li><strong>Website:</strong> <a href="https://yaneyuka.com/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 slime design, LLC. All rights reserved.
      </p>
    </div>
  );
}

function JapaneseContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-3">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年5月29日 &nbsp;|&nbsp;
        <strong>初版制定日:</strong> 2026年5月29日
      </p>
      <p>
        合同会社slime（以下「当社」）は、iOS アプリケーション「PasLog」（以下「本アプリ」）のご利用にあたり、利用者のプライバシーを尊重します。本プライバシーポリシー（以下「本ポリシー」）は、本アプリにおける情報の取扱いについて定めます。<strong>PasLog はすべてのデータを利用者の端末内にのみ保存し、当社のサーバーには一切の情報を送信・収集・保存しません。本アプリは当社が運営するサーバーとの通信を行いません。</strong>
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. 事業者情報</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><strong>事業者名:</strong> 合同会社slime</li>
          <li><strong>連絡先:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
          <li><strong>ウェブサイト:</strong> <a href="https://yaneyuka.com/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. 本アプリに入力する情報</h3>
        <p>利用者は、ご自身の記録管理のため、本アプリに以下のような情報を入力できます。これらの情報は<strong>すべて利用者の端末内にのみ</strong>保存され、当社および第三者へ送信されることは一切ありません。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>サービス名、カテゴリ、備考</li>
          <li>パスワード、暗証番号、メールアドレス、ユーザーID、URL、カスタム項目、その他利用者が入力した任意のテキスト</li>
          <li>初回オンボーディング時に発行されるリカバリーコード（一度のみ画面表示。当社は値を保持しません）</li>
          <li>設定画面で任意設定可能なアプリパスコード（4-6桁）</li>
        </ul>
        <p className="mt-2">本アプリのデータは AES-GCM により端末内で暗号化されます。暗号化鍵は iOS Keychain（Secure Enclave 連携の Secure Store）に保管され、Face ID / Touch ID またはリカバリーコードでのみ復号できます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. 収集しない情報</h3>
        <p>本アプリは、以下の情報を<strong>一切収集・送信・取得しません</strong>。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>利用者が本アプリに入力した機密情報（パスワード、暗証番号、メモ等）</li>
          <li>氏名、住所、電話番号、メールアドレス</li>
          <li>位置情報（GPS、EXIF を含む）</li>
          <li>広告識別子（IDFA）</li>
          <li>連絡先、カレンダー、写真等の端末上の個人データ</li>
          <li>Face ID / Touch ID の生体情報（iOS が完結処理し、当社には認証成功/失敗のフラグしか渡されません）</li>
          <li>行動ログ、第三者へのクラッシュレポート、利用追跡データ</li>
          <li>Cookie 等の追跡識別子</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. 購入情報</h3>
        <p>本アプリは買い切り型のアプリ内課金（「Pro版」）を1件提供しており、購入により登録件数が無制限になります。購入手続きについて:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>購入処理は <strong>Apple Inc.</strong> が App Store / StoreKit を通じて完結します。</li>
          <li>Apple ID、決済方法、購入履歴は <a href="https://www.apple.com/legal/privacy/" className="text-blue-600 hover:text-blue-800 underline">Apple のプライバシーポリシー</a> に従って Apple が取扱います。</li>
          <li>本アプリは購入状態を示すローカルレシートのみを受け取り、当社は購入データの検証や保存を行うサーバーを一切持ちません。</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. サブプロセッサー</h3>
        <p>本アプリに関連してデータを取扱う第三者は、以下の1社のみです。</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left">事業者</th>
                <th className="border border-gray-300 px-2 py-1 text-left">サービス</th>
                <th className="border border-gray-300 px-2 py-1 text-left">取り扱うデータ</th>
                <th className="border border-gray-300 px-2 py-1 text-left">保存期間</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Apple Inc.（米国）</td>
                <td className="border border-gray-300 px-2 py-1">iOS, App Store, In-App Purchase, Face ID / Touch ID, Keychain</td>
                <td className="border border-gray-300 px-2 py-1">Apple ID, 購入情報, 生体認証の検証結果</td>
                <td className="border border-gray-300 px-2 py-1">Apple ポリシーに準拠</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">当社は Firebase、Google Analytics、RevenueCat、広告 SDK、クラッシュレポートサービス、その他の第三者データプロセッサーを<strong>一切利用しません</strong>。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. 保存期間</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>アプリデータ（暗号化済みレコード）:</strong> 利用者が本アプリをインストールしている間、利用者の端末上に保存されます。アンインストール、または設定画面の「全データ削除」により完全に削除されます。</li>
          <li><strong>リカバリーコード:</strong> 初回オンボーディング時に1度だけ画面表示され、当社側には保存されません。リカバリーコードを失い、かつ Face ID / アプリパスコードも使用不可能な状態（例: 生体情報再登録後）になった場合、データは復旧できません。</li>
          <li><strong>購入情報:</strong> Apple ポリシーに従い Apple 側で保管されます。</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. 利用者の権利</h3>
        <p>当社は利用者のデータをサーバーに保存しないため、アクセス権・訂正権・削除権はアプリ内で直接行使していただきます。</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li><strong>アクセス権:</strong> 解錠後、すべてのレコードをアプリ内で閲覧可能</li>
          <li><strong>訂正権:</strong> 編集画面で任意のレコードを修正可能</li>
          <li><strong>削除権:</strong> 設定画面の「全データ削除」または、本アプリのアンインストール</li>
        </ol>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">GDPR の権利（EU/英国 居住者）</h4>
        <p>EU および英国の居住者は、アクセス権・訂正権・削除権・処理停止権・データ可搬性の権利・監督機関への苦情申立権を有します。当社は利用者のデータを保有しないため、これらの権利は実質的に上記のアプリ内操作で満たされます。</p>

        <h4 className="font-semibold mt-2 mb-1 text-[12px]">CCPA の権利（カリフォルニア州居住者）</h4>
        <p>カリフォルニア州の居住者は、開示請求権・削除請求権・販売停止権・差別禁止権を有します。当社は個人情報の販売を行わず、サーバー上で個人情報を収集することもありません。</p>

        <p className="mt-2">これらの権利の行使、その他プライバシーに関するお問い合わせは <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a> までご連絡ください。30日以内にご返答いたします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Cookie および追跡技術</h3>
        <p>本アプリは Cookie、トラッキングピクセル、その他のクロスアプリ・クロスサイト追跡技術を一切使用しません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. 子どもの利用</h3>
        <p>本アプリは13歳未満の児童を対象としていません。13歳未満のお子様は、保護者の同意なしに本アプリを利用しないでください。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. セキュリティ</h3>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>保存されるすべてのデータは AES-GCM（256bit）により端末内で暗号化されます。</li>
          <li>暗号化鍵は iOS Keychain（Secure Store）に <code>requireAuthentication: true</code> で保管され、Face ID / Touch ID 認証通過時のみ復号できます。</li>
          <li>本アプリがバックグラウンドに移行した際は内容を隠蔽し、アプリスイッチャーのスナップショットから機密情報が漏洩することを防ぎます。</li>
          <li>シークレット項目をクリップボードにコピーした場合、45秒後に自動でクリップボードを消去します。</li>
        </ul>
        <p className="mt-1">本アプリのデータはすべて端末内に保存されるため、情報の全体的な安全性は利用者の端末そのものの安全性（iOS のパスコード設定、生体認証設定等）にも依存します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">11. ポリシーの変更</h3>
        <p>当社は、法令の変更、サービス内容の変更その他の事情に応じて、本ポリシーを随時変更することがあります。変更後のポリシーは、<a href="https://yaneyuka.com/paslog-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/paslog-privacy-policy/</a> に掲載した時点から効力を生じます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">12. 準拠法および管轄</h3>
        <p>本ポリシーは日本法に準拠します。本ポリシーに関連する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">13. お問い合わせ</h3>
        <p>本ポリシーに関するご質問、情報開示請求、削除請求等は、下記までご連絡ください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>事業者:</strong> 合同会社slime</li>
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
          <li><strong>ウェブサイト:</strong> <a href="https://yaneyuka.com/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}
