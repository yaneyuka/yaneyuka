import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function NoteleafAppPrivacyPolicyPage() {
  return (
    <BilingualLegal
      titleEn="Noteleaf Privacy Policy"
      titleJa="Noteleaf プライバシーポリシー"
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
        <strong>最終更新日:</strong> 2026年6月2日
      </p>
      <p>
        合同会社slime（以下「当社」）は、当社が提供する手書きノートアプリ「Noteleaf」（以下「本アプリ」）における、ユーザーの個人情報およびデータの取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. 基本方針 — データを収集しません</h3>
        <p>本アプリは、ユーザーの個人情報および利用データを<strong>一切収集しません</strong>。本アプリはアカウント登録が不要で、サーバーやバックエンドを持たず、すべての処理はユーザーの端末内で完結します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. 端末内に保存されるデータ</h3>
        <p>ユーザーが本アプリで作成したノート、手書きデータ、ページ、表紙設定などは、すべてユーザーの端末内（iOS のローカルストレージ）にのみ保存されます。これらのデータが当社や第三者のサーバーに送信されることはありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. ユーザーによる共有（エクスポート）</h3>
        <p>本アプリには、ユーザー自身の操作でノートを PDF または独自形式（.looseleaf）として書き出し、共有シートや AirDrop で共有する機能があります。この共有は、ユーザーが明示的に操作した場合にのみ、ユーザーが選択した送信先に対して行われます。当社がその内容を取得・保存することはありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. アプリ内課金</h3>
        <p>本アプリの有料機能（買い切り）は、Apple の App Store（StoreKit）を通じて提供されます。決済およびそれに伴う情報は Apple が処理し、当社はクレジットカード番号などの決済情報を取得しません。購入の取り扱いについては、Apple のプライバシーポリシーが適用されます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. 解析・広告・第三者提供</h3>
        <p>本アプリは、解析ツール（アナリティクス）、広告 SDK、トラッキング技術のいずれも使用していません。ユーザーのデータを第三者に提供・販売することはありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. お子様のプライバシー</h3>
        <p>本アプリはデータを一切収集しないため、年齢を問わず安心してご利用いただけます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. 本ポリシーの変更</h3>
        <p>本ポリシーは、法令の変更や本アプリの機能変更に応じて改定されることがあります。重要な変更がある場合は、本ページにて告知します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. お問い合わせ</h3>
        <p>本ポリシーに関するお問い合わせは、下記までご連絡ください。</p>
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
        <strong>Last updated:</strong> June 2, 2026
      </p>
      <p>
        slime LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides the handwriting notebook app &ldquo;Noteleaf&rdquo; (the &ldquo;App&rdquo;). This Privacy Policy explains how we handle your information and data.
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. Core principle — We collect no data</h3>
        <p>The App <strong>collects no personal information or usage data whatsoever</strong>. The App requires no account, has no server or backend, and performs all processing entirely on your device.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Data stored on your device</h3>
        <p>Notebooks, handwriting data, pages, cover settings, and any other content you create in the App are stored solely in your device&rsquo;s local storage (iOS). This data is never transmitted to us or to any third party.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Sharing initiated by you (export)</h3>
        <p>The App lets you export a notebook as a PDF or in its native format (.looseleaf) and share it via the system share sheet or AirDrop. Such sharing occurs only when you explicitly choose to do so, to a destination you select. We do not receive or store this content.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. In-app purchases</h3>
        <p>The App&rsquo;s paid feature (a one-time purchase) is provided through Apple&rsquo;s App Store (StoreKit). Apple processes the payment and any related information; we do not receive payment details such as credit card numbers. Apple&rsquo;s Privacy Policy governs these transactions.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Analytics, advertising, and third parties</h3>
        <p>The App uses no analytics tools, no advertising SDKs, and no tracking technologies. We never provide or sell your data to third parties.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Children&rsquo;s privacy</h3>
        <p>Because the App collects no data, it can be used safely by people of any age.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Changes to this policy</h3>
        <p>We may update this Privacy Policy in response to changes in law or in the App&rsquo;s features. We will announce any material changes on this page.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Contact</h3>
        <p>For questions about this Privacy Policy, please contact:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Business:</strong> slime LLC (合同会社slime)</li>
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 slime LLC. All rights reserved.
      </p>
    </div>
  );
}
