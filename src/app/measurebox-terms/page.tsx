import BilingualLegal from '@/components/BilingualLegal';

// Server Component。BilingualLegal がトグルUIを担い、本文は両言語とも SSR で出る。
export default function MeasureBoxTermsPage() {
  return (
    <BilingualLegal
      titleEn="MeasureBox Terms of Use"
      titleJa="計測ボックス 利用規約"
      en={<EnglishContent />}
      ja={<JapaneseContent />}
      defaultLang="ja"
    />
  );
}

const linkClass = 'text-blue-600 hover:text-blue-800 underline';

function JapaneseContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-3">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年9月1日
      </p>
      <ul className="list-disc pl-5 space-y-0.5 text-[12px] text-gray-600">
        <li><strong>事業者名:</strong> 合同会社slime（以下「当社」）</li>
        <li><strong>サービス名:</strong> 計測ボックス / MeasureBox（以下「本アプリ」）</li>
      </ul>

      <div>
        <h3 className="font-semibold mb-1">第 1 条（適用）</h3>
        <p>本規約は、当社が提供する本アプリの利用に関する一切の関係に適用されます。本アプリをダウンロード・利用した時点で、本規約に同意いただいたものとみなします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 2 条（利用環境）</h3>
        <p>本アプリは iOS 17.0 以降を搭載した iPhone および iPad での動作を想定しています。一部機能（LiDAR、気圧センサー等）は対応端末でのみ完全動作します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 3 条（計測値の精度）</h3>
        <p>本アプリは、iPhone 内蔵センサーを使用した <strong>目安値</strong> を表示するものであり、法定計測器・医療機器・専門機器の代替ではありません。以下の用途には絶対に使用しないでください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>法令に基づく公的計測（騒音規制、計量証明など）</li>
          <li>建築・工事の最終確認</li>
          <li>医療診断・治療判断</li>
          <li>法的紛争の証拠</li>
        </ul>
        <p className="mt-2">計測値の使用により発生したいかなる損害についても、当社は責任を負いません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 4 条（課金）</h3>
        <p>本アプリは無料でダウンロードでき、一部機能を無料でご利用いただけます。全24機能および履歴保存・PDF/CSV/USDZ出力等の機能は、App Store に表示される価格の買い切り型アプリ内購入により恒久的に利用可能となります。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>課金は Apple ID への請求となります</li>
          <li>自動更新サブスクリプションではなく、一度限りの購入です</li>
          <li>一度の購入で、同一 Apple ID を使用する対応端末から復元できます</li>
        </ul>
        <p className="mt-2">サブスクリプションを利用していないため、自動継続課金は発生しません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 5 条（返金）</h3>
        <p>App Store における購入の返金処理は、Apple の規定に従います。当社が直接返金処理を行うことはできません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 6 条（禁止事項）</h3>
        <p>ユーザーは以下の行為をしてはなりません。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>本アプリを違法・不正な目的で使用する行為</li>
          <li>本アプリのリバースエンジニアリング・改変・再配布</li>
          <li>本アプリを通じて第三者の権利を侵害する行為</li>
          <li>当社のサーバー・サービスに不正アクセスを試みる行為</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 7 条（免責）</h3>
        <p>当社は、本アプリの計測値の正確性・継続稼働・特定目的への適合性を保証しません。本アプリの利用により発生した損害について、当社は責任を負いません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 8 条（規約の変更）</h3>
        <p>当社は、必要と判断した場合、ユーザーに事前通知することなく本規約を変更できるものとします。変更後にアプリを利用した時点で、新しい規約に同意したものとみなします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 9 条（準拠法・管轄）</h3>
        <p>本規約の解釈は日本法に準拠し、本アプリに関する紛争については、当社所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第 10 条（お問い合わせ）</h3>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>事業者:</strong> 合同会社slime</li>
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className={linkClass}>info@yaneyuka.com</a></li>
          <li><strong>サポート:</strong> <a href="https://yaneyuka.com/support/" className={linkClass}>https://yaneyuka.com/support/</a></li>
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
        <strong>Last updated:</strong> September 1, 2026
      </p>
      <ul className="list-disc pl-5 space-y-0.5 text-[12px] text-gray-600">
        <li><strong>Business:</strong> slime LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;)</li>
        <li><strong>Service:</strong> MeasureBox / 計測ボックス (the &ldquo;App&rdquo;)</li>
      </ul>

      <div>
        <h3 className="font-semibold mb-1">1. Scope</h3>
        <p>These terms apply to every aspect of your use of the App. By downloading or using the App you are taken to have agreed to them.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Supported environment</h3>
        <p>The App is intended for iPhone and iPad running iOS 17.0 or later. Some features (LiDAR, barometric sensor and so on) work fully only on devices that have the necessary hardware.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Accuracy of measurements</h3>
        <p>The App shows <strong>approximate values</strong> derived from the sensors built into your iPhone. It is not a substitute for a legally certified measuring instrument, a medical device or professional equipment. Never use it for:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>Official measurement required by law (noise regulation, certified metrology and the like)</li>
          <li>Final verification of building or construction work</li>
          <li>Medical diagnosis or treatment decisions</li>
          <li>Evidence in a legal dispute</li>
        </ul>
        <p className="mt-2">We accept no liability for any loss arising from the use of a measured value.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Payment</h3>
        <p>The App is free to download and some features are free to use. All 24 tools, along with saved history and PDF/CSV/USDZ export, are unlocked permanently by a one-time in-app purchase at the price shown on the App Store.</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>The charge is made to your Apple ID</li>
          <li>It is a one-time purchase, not an auto-renewing subscription</li>
          <li>A single purchase can be restored on supported devices using the same Apple ID</li>
        </ul>
        <p className="mt-2">Because there is no subscription, no recurring charge is made.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Refunds</h3>
        <p>Refunds for App Store purchases follow Apple&rsquo;s rules. We cannot process a refund directly.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Prohibited conduct</h3>
        <p>You must not:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>Use the App for any unlawful or improper purpose</li>
          <li>Reverse engineer, modify or redistribute the App</li>
          <li>Infringe the rights of others through the App</li>
          <li>Attempt to gain unauthorised access to our servers or services</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Disclaimer</h3>
        <p>We do not warrant the accuracy of the App&rsquo;s measurements, its continuous operation, or its fitness for any particular purpose. We accept no liability for loss arising from use of the App.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Changes to these terms</h3>
        <p>We may change these terms without prior notice where we consider it necessary. Using the App after a change is taken as agreement to the new terms.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. Governing law and jurisdiction</h3>
        <p>These terms are interpreted under the law of Japan. Any dispute concerning the App is subject to the exclusive jurisdiction, in the first instance, of the court having jurisdiction over our registered office.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. Contact</h3>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Business:</strong> slime LLC (合同会社slime)</li>
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className={linkClass}>info@yaneyuka.com</a></li>
          <li><strong>Support:</strong> <a href="https://yaneyuka.com/support/" className={linkClass}>https://yaneyuka.com/support/</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 slime LLC. All rights reserved.
      </p>
    </div>
  );
}
