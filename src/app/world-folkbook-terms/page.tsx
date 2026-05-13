import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function WorldFolkbookTermsPage() {
  return (
    <BilingualLegal
      titleEn="World Folkbook Terms of Service"
      titleJa="World Folkbook 利用規約"
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
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the iOS application &ldquo;World Folkbook&rdquo; (the &ldquo;App&rdquo;) provided by slime LLC (合同会社slime) (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By using the App, you (&ldquo;you&rdquo; or &ldquo;user&rdquo;) agree to these Terms.
      </p>

      <div>
        <h3 className="font-semibold mb-1">Section 1 — Applicability</h3>
        <p>These Terms apply to all aspects of the App&rsquo;s use.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 2 — Content</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>The App offers folktales and legends from around the world as illustrated picture books. Story texts are based on works in the public domain, edited, translated, and curated by us.</li>
          <li>Illustrations, UI, translations, and editorial works in the App are copyrighted by us or our licensors.</li>
          <li>You may view content for personal use only. Reproduction, redistribution, public transmission, modification, or commercial use is prohibited.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 3 — Subscriptions</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>The App offers a free tier and a paid auto-renewing subscription (&ldquo;Premium&rdquo;).</li>
          <li>Premium is delivered through Apple Inc.&rsquo;s App Store as an auto-renewable subscription.</li>
          <li>Pricing is shown in the App Store at the time of purchase.</li>
          <li>Unless cancelled at least 24 hours before the end of the period, the subscription automatically renews, and your Apple ID payment method is charged.</li>
          <li>To cancel, go to iOS Settings → Apple ID → Subscriptions.</li>
          <li>Refunds for unused portions of a billing period are not provided.</li>
          <li>We may change pricing, conditions, or availability at our discretion. Changes will be announced in-app or on our support site.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 4 — Free Trial</h3>
        <p>New users may be offered a free trial period (e.g., 1 month) at first signup. If not cancelled within the trial, the paid plan begins automatically.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 5 — Prohibited Conduct</h3>
        <p>You must not:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li>Violate any laws or regulations.</li>
          <li>Engage in conduct against public order or morality.</li>
          <li>Infringe rights of us, other users, or third parties.</li>
          <li>Reverse engineer, modify, or redistribute the App.</li>
          <li>Acquire or use the App&rsquo;s features through improper means.</li>
          <li>Engage in any conduct we deem inappropriate.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 6 — Disclaimer</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>We do not warrant the accuracy, completeness, or usefulness of the App&rsquo;s content.</li>
          <li>Except in cases of our willful misconduct or gross negligence, we are not liable for damages arising from use or inability to use the App.</li>
          <li>The App may be temporarily unavailable due to maintenance, defects, or network issues.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 7 — Operating Environment</h3>
        <p>You are responsible for the device, OS, and network needed to use the App. The App may not function properly if our specified environment is not met.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 8 — Changes</h3>
        <p>We may update these Terms as needed. Updated Terms take effect upon posting in-app or on our support site. Continued use after changes constitutes acceptance.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 9 — Governing Law and Jurisdiction</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>These Terms are governed by the laws of Japan.</li>
          <li>Disputes will be subject to the exclusive jurisdiction of the court having jurisdiction over our headquarters as the court of first instance.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Section 10 — Contact</h3>
        <p>For questions about these Terms:</p>
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
        本規約は、合同会社slime（以下「当社」といいます）が提供するiOSアプリケーション「World Folkbook」（以下「本アプリ」といいます）の利用に関する条件を定めるものです。本アプリを利用される方（以下「利用者」といいます）は、本規約に同意したものとみなします。
      </p>

      <div>
        <h3 className="font-semibold mb-1">第1条（適用）</h3>
        <p>本規約は、本アプリの利用に関する一切の関係に適用されます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第2条（コンテンツ）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本アプリは、世界各国の昔話・民話を絵本形式で提供します。物語本文は、原則としてパブリックドメイン作品を当社が編集・翻訳・編成したものです。</li>
          <li>本アプリの挿絵・UI・翻訳・編集物は、当社または当社にライセンスした権利者に著作権が帰属します。</li>
          <li>利用者は、本アプリのコンテンツを個人的に利用する目的でのみ閲覧でき、複製、転載、公衆送信、改変、商用利用を行うことはできません。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第3条（サブスクリプション）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本アプリには、無料で利用可能な範囲と、有料サブスクリプション（以下「プレミアム」といいます）でのみ利用可能な範囲があります。</li>
          <li>プレミアムは、Apple Inc. の App Store における自動更新サブスクリプションとして提供されます。</li>
          <li>利用料金は App Store の表示価格に従います。</li>
          <li>期間終了の24時間前までにキャンセルされない限り、自動的に更新され、Apple ID に登録された支払い方法に課金されます。</li>
          <li>キャンセル方法は、iOS の「設定 → Apple ID → サブスクリプション」から行えます。</li>
          <li>期間途中の解約による日割り返金は行いません。</li>
          <li>当社は、当社の判断により、価格、提供条件、提供範囲を変更することがあります。変更がある場合は、本アプリまたはサポートサイトにて通知します。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第4条（無料試用期間）</h3>
        <p>新規利用者には、初回登録時に限り、当社が定める期間（例：1ヶ月）の無料試用期間を提供することがあります。試用期間中にキャンセルされない場合、自動的に有料プランに移行します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第5条（禁止事項）</h3>
        <p>利用者は、以下の行為を行ってはなりません。</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li>法令に違反する行為</li>
          <li>公序良俗に反する行為</li>
          <li>当社、他の利用者、または第三者の権利を侵害する行為</li>
          <li>本アプリのリバースエンジニアリング、改変、再配布</li>
          <li>不正な手段により本アプリの機能を取得・利用する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第6条（免責事項）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>当社は、本アプリの内容について、その正確性・完全性・有用性を保証するものではありません。</li>
          <li>当社は、本アプリの利用または利用不能から生じた損害について、当社の故意または重大な過失による場合を除き、責任を負いません。</li>
          <li>本アプリは、定期メンテナンス、不具合、ネットワーク障害等により、一時的に利用できなくなることがあります。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第7条(利用環境)</h3>
        <p>利用者は、自らの責任において、本アプリの利用に必要な端末・OS・通信環境を準備するものとします。当社が指定する動作環境を満たさない場合、本アプリが正常に動作しないことがあります。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第8条(規約の変更)</h3>
        <p>当社は、本規約を必要に応じて変更することがあります。変更後の規約は、本アプリ内またはサポートサイトに掲示した時点で効力を生じます。利用者が変更後も本アプリを利用した場合、変更に同意したものとみなします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第9条(準拠法・管轄)</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本規約は、日本法に準拠します。</li>
          <li>本アプリに関する紛争については、当社の本店所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第10条(お問い合わせ)</h3>
        <p>本規約に関するお問い合わせは、以下までご連絡ください。</p>
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
