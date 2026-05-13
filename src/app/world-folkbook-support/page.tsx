import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がトグルUIを提供。SEO/クローラ対策のため両言語ともDOMに保持。
export default function WorldFolkbookSupportPage() {
  return (
    <BilingualLegal
      titleEn="World Folkbook Support"
      titleJa="World Folkbook サポート"
      en={<EnglishContent />}
      ja={<JapaneseContent />}
      defaultLang="ja"
    />
  );
}

function EnglishContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-4">
      <p className="text-[12px] text-gray-500">
        <strong>Last updated:</strong> May 5, 2026
      </p>

      <div>
        <h3 className="font-semibold mb-1">Contact</h3>
        <p>For questions, bug reports, and feature requests:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Frequently Asked Questions</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. How do I cancel my subscription?</p>
          <p>Through the iOS Settings app:</p>
          <p className="mt-1 text-gray-600">Settings → Your Name → Subscriptions → World Folkbook → Cancel Subscription</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How do I restore my purchases on another device?</p>
          <p>Tap &ldquo;Restore Purchases&rdquo; at the bottom of the Premium screen. As long as you are signed in with the same Apple ID, your subscription will be restored.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. What happens if I cancel during the free trial?</p>
          <p>You can use all features until the trial period ends, after which premium features will be deactivated. You will not be charged.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Is there audio narration?</p>
          <p>The App is focused on the illustrated picture book experience. Audio narration is not currently provided. We are considering it for a future update.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Can I read offline?</p>
          <p>Downloaded stories can be read offline.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Can I request a story?</p>
          <p>Absolutely. Please email us at the address above.</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Related Pages</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><a href="https://yaneyuka.com/world-folkbook-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a></li>
          <li><a href="https://yaneyuka.com/world-folkbook-terms/" className="text-blue-600 hover:text-blue-800 underline">Terms of Service</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Operator</h3>
        <p>slime LLC (合同会社slime)</p>
        <p>Contact: <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></p>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 slime LLC. All rights reserved.
      </p>
    </div>
  );
}

function JapaneseContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-4">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年5月5日
      </p>

      <div>
        <h3 className="font-semibold mb-1">お問い合わせ</h3>
        <p>ご質問・不具合報告・ご要望は、下記までお気軽にお問い合わせください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">よくある質問</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. サブスクリプションを解約したい</p>
          <p>iOS の「設定」アプリから操作できます。</p>
          <p className="mt-1 text-gray-600">設定 → ご自分の名前 → サブスクリプション → World Folkbook → サブスクリプションをキャンセル</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 購入履歴を別の端末で復元したい</p>
          <p>本アプリのプレミアム画面下部の「購入を復元」をタップしてください。同じ Apple ID でサインインしている端末であれば、サブスクリプションが復元されます。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 無料試用期間中に解約したらどうなる？</p>
          <p>試用期間が終了するまで全機能をご利用いただけ、その後自動的にプレミアム機能が解除されます。料金は発生しません。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 物語に音声はありますか？</p>
          <p>本アプリは絵本に特化しており、現在は音声機能を提供しておりません。今後のアップデートでの対応は検討中です。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. オフラインでも読めますか？</p>
          <p>ダウンロード済みの物語は、オフラインでも読書できます。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 物語のリクエストはできますか？</p>
          <p>ぜひお寄せください。上記メールアドレス宛てにご連絡いただけると幸いです。</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">関連ページ</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><a href="https://yaneyuka.com/world-folkbook-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">プライバシーポリシー</a></li>
          <li><a href="https://yaneyuka.com/world-folkbook-terms/" className="text-blue-600 hover:text-blue-800 underline">利用規約</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">運営者情報</h3>
        <p>合同会社slime</p>
        <p>お問い合わせ: <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></p>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}
