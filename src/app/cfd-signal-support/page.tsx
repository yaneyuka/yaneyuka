import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がトグルUIを提供。SEO/クローラ対策のため両言語ともDOMに保持。
export default function CfdSignalSupportPage() {
  return (
    <BilingualLegal
      titleEn="CFD Signal Support"
      titleJa="CFD Signal サポート"
      en={<EnglishContent />}
      ja={<JapaneseContent />}
      defaultLang="ja"
    />
  );
}

function JapaneseContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-4">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年5月19日
      </p>

      <p>
        CFD Signal をご利用いただきありがとうございます。ご不明な点・ご要望・不具合のご報告は下記までお問い合わせください。
      </p>

      <div>
        <h3 className="font-semibold mb-1">お問い合わせ</h3>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
        <p className="mt-1 text-[12px] text-gray-600">
          お問い合わせの際は、ご利用の iPhone の機種・iOS バージョン・アプリのバージョンを添えていただけますとスムーズに対応できます。
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">よくある質問</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. シグナルが表示されない / 更新されない</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>市場が休場している時間帯（週末など）は新しいシグナルが発生しません。アプリ上部に「市場は休場中です」と表示されます。</li>
            <li>通信環境をご確認のうえ、アプリを再起動してください。</li>
          </ul>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 通知が届かない</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>アプリの「設定 → 通知設定」でプッシュ通知が ON になっているかご確認ください。</li>
            <li>iPhone の「設定 → 通知 → CFD Signal」で通知が許可されているかご確認ください。</li>
            <li>「おやすみ時間」を設定している場合、その時間帯は通知が抑制されます。</li>
          </ul>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. サブスクリプションの解約方法</p>
          <p>iPhone の「設定」→ 最上部の Apple ID →「サブスクリプション」から、プランの確認・変更・解約ができます。解約は次回更新日の 24 時間前までに行ってください。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 購入の復元</p>
          <p>機種変更や再インストール後は、ペイウォール画面の「購入を復元」から以前の購入を復元できます。</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">本アプリについて</h3>
        <p>CFD Signal は、貴金属・エネルギー・株価指数などの CFD 銘柄について、テクニカル指標に基づく客観的な情報を提供するアプリです。投資助言サービスではなく、特定の取引を推奨するものではありません。投資判断はご自身の責任で行ってください。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">関連ページ</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><a href="https://yaneyuka.com/cfd-signal-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">プライバシーポリシー</a></li>
          <li><a href="https://yaneyuka.com/cfd-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">利用規約</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">事業者</h3>
        <p>合同会社slime</p>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}

function EnglishContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-4">
      <p className="text-[12px] text-gray-500">
        <strong>Last Updated:</strong> May 19, 2026
      </p>

      <p>
        Thank you for using CFD Signal. For questions, requests, or bug reports, please contact us.
      </p>

      <div>
        <h3 className="font-semibold mb-1">Contact</h3>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
        <p className="mt-1 text-[12px] text-gray-600">
          Please include your iPhone model, iOS version, and app version for a smoother response.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">FAQ</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. Signals are not showing / not updating</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>No new signals are generated while the market is closed (e.g. weekends). The app shows &ldquo;Market closed&rdquo; at the top during these periods.</li>
            <li>Check your network connection and restart the app.</li>
          </ul>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Not receiving notifications</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>In the app&rsquo;s &ldquo;Settings → Notification settings&rdquo;, make sure push notifications are ON.</li>
            <li>In iOS &ldquo;Settings → Notifications → CFD Signal&rdquo;, make sure notifications are allowed.</li>
            <li>If &ldquo;Quiet hours&rdquo; is set, notifications are suppressed during that period.</li>
          </ul>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How to cancel a subscription</p>
          <p>Go to iPhone &ldquo;Settings&rdquo; → your Apple ID at the top → &ldquo;Subscriptions&rdquo; to view, change, or cancel your plan. Cancel at least 24 hours before the next renewal date.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Restoring purchases</p>
          <p>After changing devices or reinstalling, use &ldquo;Restore Purchases&rdquo; on the paywall screen.</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">About this app</h3>
        <p>CFD Signal provides objective, technical-indicator-based information on CFD instruments such as precious metals, energy, and stock indices. It is not an investment advisory service and does not recommend any specific transaction. All investment decisions are your own responsibility.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Related Pages</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><a href="https://yaneyuka.com/cfd-signal-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a></li>
          <li><a href="https://yaneyuka.com/cfd-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">Terms of Use</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Operator</h3>
        <p>Slime LLC (合同会社slime)</p>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}
