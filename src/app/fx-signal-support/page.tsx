import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がトグルUIを提供。SEO/クローラ対策のため両言語ともDOMに保持。
export default function FxSignalSupportPage() {
  return (
    <BilingualLegal
      titleEn="FX Signal Support"
      titleJa="FX Signal サポート"
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
        <strong>Last Updated:</strong> May 10, 2026
      </p>

      <div>
        <h3 className="font-semibold mb-1">Contact</h3>
        <p>For questions, bug reports, or feature requests, please contact:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
        <p className="mt-1 text-[12px] text-gray-600">
          Please include &ldquo;FX Signal:&rdquo; in the subject line for faster handling. We typically respond within 3 business days.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Frequently Asked Questions</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. I&rsquo;m not receiving signal notifications.</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>In the App, open <strong>Settings → Notification Settings</strong> and confirm push notifications are <strong>ON</strong>.</li>
            <li>In <strong>iPhone Settings → Notifications → FX Signal</strong>, confirm notifications are allowed.</li>
            <li>Confirm you have configured at least one currency pair, one timeframe, and one signal type.</li>
            <li>Free-plan users are limited to 5 pairs / 3 signal types / 3 timeframes. Check if your selection is within these limits.</li>
            <li>Note: signals on the 4-hour, daily, and weekly timeframes fire less frequently and may take several hours to several days to appear.</li>
            <li>If notifications still don&rsquo;t arrive, please contact <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a> with your iOS version and which pairs/signals you have configured.</li>
          </ul>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How do I cancel my subscription?</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>Open the iPhone Settings app.</li>
            <li>Tap your name (Apple ID) at the top.</li>
            <li>Tap <strong>Subscriptions</strong>.</li>
            <li>Select <strong>FX Signal</strong>.</li>
            <li>Tap <strong>Cancel Subscription</strong>.</li>
          </ul>
          <p className="mt-1 text-[12px] text-gray-600">
            Cancel at least 24 hours before the renewal date to avoid the next charge. After cancellation, paid features remain available until the end of the current period.
          </p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How do I request a refund?</p>
          <p>Refunds are managed by Apple. Please request a refund directly from Apple via <a href="https://reportaproblem.apple.com/" className="text-blue-600 hover:text-blue-800 underline">https://reportaproblem.apple.com/</a>. We cannot process refunds on our side.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How accurate are the signals?</p>
          <p>Signals are technical conditions automatically computed from market price data. They are <strong>not</strong> a buy/sell recommendation and do not guarantee profit. Different timeframes have different lead times — short timeframes (5min, 10min) trigger frequently with more noise; long timeframes (daily, weekly) trigger rarely with stronger signals. See our <a href="https://yaneyuka.com/fx-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">Terms of Use</a> for full risk disclosure.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Where do the prices come from?</p>
          <p>Our backend fetches price data from public market-data sources (OANDA, MT5 data feeds, etc.). Data is anonymous and not tied to your account. The App does not connect to your brokerage account.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. There&rsquo;s a delay between when a signal fires and when I receive a notification.</p>
          <p>Some delay is normal. Our backend evaluates signals at the close of each candle, and notification delivery via APNs can add a few seconds. For 4-hour or daily timeframes, the candle-close interval itself is the dominant delay. We aim for under 60 seconds of latency after a candle closes on short timeframes.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Can I use FX Signal as a trading robot or automated trader?</p>
          <p>No. FX Signal only delivers notifications. It does not place orders, connect to your brokerage account, or auto-trade.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How is my data handled?</p>
          <p>See our <a href="https://yaneyuka.com/fx-signal-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>. In short: we store an anonymous UID, your signal configuration, and your push-notification token. We do not collect your name, email, location, IDFA, or brokerage account details.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Who is the operator?</p>
          <p>合同会社slime (slime design, LLC). For all inquiries: <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>.</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Related Pages</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><a href="https://yaneyuka.com/fx-signal-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a></li>
          <li><a href="https://yaneyuka.com/fx-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">Terms of Use</a></li>
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
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-4">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年5月10日
      </p>

      <div>
        <h3 className="font-semibold mb-1">お問い合わせ</h3>
        <p>ご質問・不具合報告・機能要望は、以下までご連絡ください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
        <p className="mt-1 text-[12px] text-gray-600">
          件名に「FX Signal:」を付けていただけると、優先的に対応できます。原則3営業日以内に返信いたします。
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">よくあるご質問</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. シグナル通知が届きません</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>アプリ内の <strong>「設定 → 通知設定」</strong> でプッシュ通知が <strong>ON</strong> になっているかご確認ください。</li>
            <li><strong>iPhone「設定」→「通知」→「FX Signal」</strong> で通知が許可されているかご確認ください。</li>
            <li>監視通貨ペア、時間足、シグナル種別がそれぞれ1件以上設定されているかご確認ください。</li>
            <li>無料プランは「監視ペア5 / シグナル3 / 時間足3」の上限があります。設定がこの範囲内かご確認ください。</li>
            <li>4時間足・日足・週足のシグナルは発動頻度が低く、数時間〜数日かかる場合があります。</li>
            <li>それでも届かない場合は、iOS のバージョン、設定したペア／シグナル種別を <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a> までお知らせください。</li>
          </ul>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. サブスクリプションをキャンセルしたい</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>iPhone の「設定」アプリを開く</li>
            <li>画面上部の「ユーザー名（Apple ID）」をタップ</li>
            <li>「<strong>サブスクリプション</strong>」をタップ</li>
            <li>「<strong>FX Signal</strong>」を選択</li>
            <li>「<strong>サブスクリプションをキャンセル</strong>」をタップ</li>
          </ul>
          <p className="mt-1 text-[12px] text-gray-600">
            次回更新日の24時間以上前にキャンセルすると、次回更新の課金が停止します。キャンセル後も、現在の契約期間終了日までは有料機能をご利用いただけます。
          </p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 返金してほしい</p>
          <p>返金処理は Apple 側で行います。<a href="https://reportaproblem.apple.com/" className="text-blue-600 hover:text-blue-800 underline">https://reportaproblem.apple.com/</a> から Apple に直接ご申請ください。当社側で返金処理を行うことはできません。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. シグナルの精度はどの程度ですか</p>
          <p>シグナルは、市場価格データから自動算出される<strong>テクニカル条件</strong>であり、売買推奨や利益の保証ではありません。短い時間足（5分・10分等）はノイズが多く頻繁に発動し、長い時間足（日足・週足）は発動頻度が低い分、強いシグナルとなります。詳細は <a href="https://yaneyuka.com/fx-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">利用規約</a> のリスク開示をご確認ください。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 為替レートはどこから取得していますか</p>
          <p>当社のバックエンドサーバーが、公開市場データソース（OANDA、MT5 データフィード等）から取得しています。匿名の市場データであり、利用者個人のアカウントとは結びつきません。本アプリが利用者のブローカー口座に接続することはありません。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. シグナル発動から通知到着まで遅延があります</p>
          <p>一定の遅延は仕様です。当社バックエンドは各ローソク足の確定タイミングでシグナルを判定し、APNs 経由で通知配信を行います。4時間足や日足では、足の確定タイミング自体が遅延の主因となります。短い時間足では、足の確定から60秒以内の通知配信を目標としています。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. FX Signal を自動売買ロボットとして使えますか</p>
          <p>いいえ。本アプリはシグナル通知のみを提供します。発注、ブローカー口座への接続、自動売買はいずれも行いません。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 個人データはどのように扱われますか</p>
          <p>詳細は <a href="https://yaneyuka.com/fx-signal-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">プライバシーポリシー</a> をご確認ください。概要としては、匿名UID・シグナル設定値・プッシュ通知トークンのみを保存しており、氏名・メールアドレス・位置情報・IDFA・ブローカー口座情報は一切収集しません。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 運営会社はどこですか</p>
          <p>合同会社slime（slime design, LLC）。お問い合わせは <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a> までお願いいたします。</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">関連ページ</h3>
        <ul className="list-disc pl-5 space-y-0.5">
          <li><a href="https://yaneyuka.com/fx-signal-privacy-policy/" className="text-blue-600 hover:text-blue-800 underline">プライバシーポリシー</a></li>
          <li><a href="https://yaneyuka.com/fx-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">利用規約</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}
