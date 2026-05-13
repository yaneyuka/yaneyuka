import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function FxSignalTermsPage() {
  return (
    <BilingualLegal
      titleEn="FX Signal Terms of Use"
      titleJa="FX Signal 利用規約"
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
        <strong>Last Updated:</strong> May 10, 2026 &nbsp;|&nbsp;
        <strong>Effective Date:</strong> May 10, 2026
      </p>
      <p>
        These Terms of Use (&ldquo;Terms&rdquo;) govern your use of the iOS application &ldquo;FX Signal&rdquo; (the &ldquo;App&rdquo;) provided by slime design, LLC (合同会社slime) (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By installing, downloading, or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, please uninstall the App immediately.
      </p>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ Important Risk Disclosure</h3>
        <p className="text-[12px]">
          The App provides technical signal notifications based on price data. It is <strong>not investment advice</strong>, financial advice, or solicitation to trade. Foreign exchange (FX) trading involves significant risk and may not be suitable for all investors. <strong>Past performance is not indicative of future results.</strong> You are solely responsible for any trading decisions and outcomes. We are not a registered investment advisor (投資助言・代理業) and do not provide individualized financial advice.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">1. Definitions</h3>
        <p>In these Terms, the following terms shall have the meanings set forth below:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li><strong>&ldquo;Service&rdquo;</strong> — all features, content, and related services provided through the App.</li>
          <li><strong>&ldquo;User&rdquo;</strong> — any individual or entity that installs the App or uses the Service.</li>
          <li><strong>&ldquo;Signal&rdquo;</strong> — a technical condition derived from market price data (e.g., RSI levels, SMA crosses, breakouts, round-number levels, sudden price changes).</li>
          <li><strong>&ldquo;Notification&rdquo;</strong> — a push notification delivered to your device when a Signal you configured fires.</li>
          <li><strong>&ldquo;Third-Party Services&rdquo;</strong> — external services used by us to provide the Service, including Firebase (Google LLC), RevenueCat, Apple Inc., and market-data sources.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Acceptance of Terms</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>By installing and using the App, you are deemed to have agreed to these Terms.</li>
          <li>If you do not agree to these Terms, you must uninstall the App immediately.</li>
          <li>The Service is intended for users who are adults capable of making independent financial decisions. If you are a minor, you may only use the App with the consent of a parent or legal guardian.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Account</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>The App uses Firebase Anonymous Authentication. No email address or password registration is required.</li>
          <li>An anonymous identifier is automatically generated for each device upon first launch.</li>
          <li>Subscription transfer to a new device is handled via Apple&rsquo;s Restore Purchases feature, which is tied to your Apple ID.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Nature of Signals — Not Investment Advice</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Signals delivered through the App are <strong>technical conditions</strong> automatically computed from public market-data feeds. They are presented for informational and educational purposes only.</li>
          <li>Signals are <strong>not</strong> a recommendation to buy, sell, or hold any financial instrument. They are not investment advice and do not constitute solicitation under the Japanese Financial Instruments and Exchange Act (金融商品取引法) or any equivalent law in other jurisdictions.</li>
          <li>We are <strong>not a registered investment advisor</strong> (投資助言・代理業). We do not provide individualized advice, portfolio recommendations, or risk-tolerance assessment.</li>
          <li>You acknowledge that FX trading involves <strong>significant risk of loss</strong>, including loss exceeding deposited funds in leveraged trading. Past Signal outcomes do not guarantee future profit.</li>
          <li>You are <strong>solely responsible</strong> for all trading decisions you make based on or in spite of the Signals. We bear no responsibility for any losses incurred.</li>
          <li>Signal calculations may be delayed, inaccurate, or missing due to data-feed issues, server load, or other technical conditions. Notifications may be delayed by minutes or hours, especially on the 4-hour, daily, or weekly timeframes.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. User Obligations and Prohibited Conduct</h3>
        <p>You agree not to engage in any of the following activities while using the Service:</p>
        <ol className="list-[lower-alpha] pl-5 space-y-1 mt-1">
          <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the App or any Third-Party Service.</li>
          <li>Access the Service through automated scripts, bots, scraping tools, or any other unauthorized means.</li>
          <li>Republish, redistribute, or commercially exploit the Signals or notification data without our prior written consent.</li>
          <li>Use the Service to provide unauthorized investment advice to others.</li>
          <li>Interfere with the operation of the Service, overload our servers, or engage in any form of attack against our infrastructure.</li>
          <li>Engage in any activity that violates applicable law or public morals.</li>
          <li>Engage in any other activity that we deem inappropriate.</li>
        </ol>
        <p className="mt-1">If you engage in any prohibited conduct, we may suspend or terminate your access to the Service without prior notice.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Subscription and Payment</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>The App offers a free plan (with limits on watched pairs, signal types, and timeframes) and paid plans (Basic and Premium) as <strong>auto-renewing monthly subscriptions</strong> via Apple In-App Purchase.</li>
          <li>Pricing: Basic ¥700/month, Premium ¥1,500/month. Prices in other currencies follow Apple&rsquo;s pricing tiers.</li>
          <li><strong>Free Trial:</strong> New users receive a 1-month free trial of a paid plan. You will not be charged during the trial period. The trial automatically converts to a paid subscription at the end of the trial unless you cancel at least 24 hours before the trial ends.</li>
          <li>Payment is charged to your Apple ID at confirmation of purchase.</li>
          <li>Subscriptions automatically renew unless <strong>auto-renewal is turned off at least 24 hours before</strong> the end of the current period. Your account will be charged for renewal within 24 hours prior to the end of the current period.</li>
          <li>
            Subscription management, cancellation, and plan changes are performed via your iPhone&rsquo;s Settings app:
            <br />
            <span className="text-gray-600">Settings → [Your Name (Apple ID)] → Subscriptions → FX Signal → Cancel Subscription / Change Plan</span>
          </li>
          <li>Refunds must be requested directly from Apple in accordance with Apple&rsquo;s refund policy. We cannot process refunds directly.</li>
          <li>Plan changes take effect at your next renewal date.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Intellectual Property</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>All intellectual property rights in the App, including the signal-detection algorithms, UI, logos, source code, text, images, and other assets, belong to us or our licensors.</li>
          <li>These Terms do not grant you any license to the App&rsquo;s intellectual property other than the limited right to use the App in accordance with these Terms.</li>
          <li>Market price data is provided by upstream sources and is governed by their respective terms and licenses.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Third-Party Services</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            The Service uses the following Third-Party Services. By using the Service, you agree to also be bound by their respective terms of service and privacy policies:
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Apple Inc. (iOS, App Store, In-App Purchase, Push Notification Service)</li>
              <li>Google LLC (Firebase Authentication, Firestore, Cloud Functions, Cloud Messaging, App Check)</li>
              <li>RevenueCat, Inc. (subscription management)</li>
              <li>Market-data sources (OANDA, MT5 data feeds, etc.)</li>
            </ul>
          </li>
          <li>Changes to, or discontinuation of, Third-Party Services may affect the availability of certain features. We are not liable for any damages arising from such changes.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. Disclaimer and Limitation of Liability</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>The Service is provided &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo;.</li>
          <li>We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy or reliability of Signals, absence of delays, and uninterrupted availability.</li>
          <li>We are not liable for any trading losses, missed opportunities, or other damages, whether direct, indirect, incidental, consequential, or punitive, arising from your use of, or reliance on, the Signals or the Service.</li>
          <li>Except in cases of our willful misconduct or gross negligence, our total liability to you shall not exceed the lesser of: (a) the total subscription fees paid by you to us in the 12 months immediately preceding the event giving rise to the claim, or (b) one thousand Japanese yen (¥1,000).</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">10. Consumer Rights (GDPR — EU/UK Residents)</h3>
        <p>If you are a resident of the European Union or the United Kingdom, you have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Right of access</strong> to your personal data</li>
          <li><strong>Right to rectification</strong> of inaccurate data</li>
          <li><strong>Right to erasure</strong> (&ldquo;right to be forgotten&rdquo;)</li>
          <li><strong>Right to data portability</strong></li>
          <li><strong>Right to restrict processing</strong></li>
          <li><strong>Right to object</strong> to processing</li>
        </ul>
        <p className="mt-1">To exercise these rights, contact us at <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>. We will respond within 30 days.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">11. Consumer Rights (CCPA — California Residents)</h3>
        <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Right to know</strong> what personal information we collect and how we use it</li>
          <li><strong>Right to delete</strong> your personal information</li>
          <li><strong>Right to opt-out</strong> of the sale of personal information (note: we do not sell personal information)</li>
          <li><strong>Right to non-discrimination</strong> for exercising your rights</li>
        </ul>
        <p className="mt-1">To exercise these rights, contact us at <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">12. International Data Transfer</h3>
        <p>The Service is operated from Japan, but data may be processed in the United States and other countries where Third-Party Services operate. By using the Service, you consent to the transfer of your data to these countries, which may have different data protection standards than your home country.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">13. Service Modifications and Termination</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>We may modify, add to, or discontinue the Service at any time without prior notice.</li>
          <li>For significant changes or discontinuation of the Service, we will use reasonable efforts to provide prior notice via in-app notification or posting on <a href="https://yaneyuka.com/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/</a>.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">14. Governing Law and Jurisdiction</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>These Terms shall be governed by and construed in accordance with the laws of Japan.</li>
          <li>Any disputes arising out of or relating to the Service or these Terms shall be subject to the <strong>exclusive jurisdiction of the Tokyo District Court</strong> as the court of first instance.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">15. Changes to These Terms</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>We may revise these Terms from time to time.</li>
          <li>Changes become effective upon posting the revised Terms in the App or at <a href="https://yaneyuka.com/fx-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/fx-signal-terms/</a>.</li>
          <li>Your continued use of the Service after the effective date of revised Terms constitutes acceptance of the changes.</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">16. Severability</h3>
        <p>If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">17. Contact</h3>
        <p>For inquiries regarding these Terms, please contact us at:</p>
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
        <strong>最終更新日:</strong> 2026年5月10日 &nbsp;|&nbsp;
        <strong>初版制定日:</strong> 2026年5月10日
      </p>
      <p>
        この利用規約（以下「本規約」）は、合同会社slime（以下「当社」）が提供する iOS アプリケーション「FX Signal」（以下「本アプリ」）の利用条件を定めるものです。本アプリをインストール、ダウンロード、または利用することにより、お客様は本規約のすべての条項に同意したものとみなされます。
      </p>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ 重要なリスク開示</h3>
        <p className="text-[12px]">
          本アプリは、価格データに基づくテクニカルなシグナル通知を提供するものであり、<strong>投資判断・売買勧誘・投資助言ではありません</strong>。FX（外国為替証拠金取引）は元本を超える損失が発生する可能性のあるリスクの高い取引であり、すべての投資家に適しているとは限りません。<strong>過去の結果が将来の利益を保証するものではありません</strong>。取引判断とその結果については利用者ご自身がすべての責任を負います。当社は<strong>金融商品取引業（投資助言・代理業）の登録を行っておらず</strong>、個別の投資助言は提供しません。
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第1条（定義）</h3>
        <p>本規約において使用する用語の意義は次のとおりとします。</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li><strong>「本サービス」</strong> — 本アプリを通じて当社が提供するすべての機能、コンテンツ、関連サービス</li>
          <li><strong>「利用者」</strong> — 本アプリをインストール、または本サービスを利用するすべての個人または法人</li>
          <li><strong>「シグナル」</strong> — 為替価格データから自動算出されるテクニカル条件（RSI 水準、SMA クロス、ブレイクアウト、キリ番到達、急騰急落等）</li>
          <li><strong>「通知」</strong> — 利用者が設定したシグナルが発動した際に端末に配信されるプッシュ通知</li>
          <li><strong>「第三者サービス」</strong> — Apple Inc.、Google LLC（Firebase）、RevenueCat, Inc.、市場データ提供元等、本サービスの提供にあたり当社が利用する外部サービス</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第2条（本規約への同意）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>利用者は、本アプリのインストールおよび利用をもって、本規約に同意したものとみなされます。</li>
          <li>本規約に同意いただけない場合は、本アプリを直ちにアンインストールしてください。</li>
          <li>本サービスは、自らの判断で金融的意思決定を行うことができる成人を利用対象とします。利用者が未成年者である場合は、親権者その他の法定代理人の同意を得た上で本アプリを利用するものとします。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第3条（アカウント）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本アプリは、Firebase Anonymous Auth による匿名認証を採用しており、メールアドレスやパスワードによるアカウント登録は不要です。</li>
          <li>本アプリの初回起動時に、デバイスごとに匿名識別子が自動生成されます。</li>
          <li>機種変更時のサブスクリプション引き継ぎは、Apple ID に紐づく購入履歴の復元機能（Restore Purchases）により行います。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第4条（シグナルの性質 — 投資助言ではないこと）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本アプリで配信されるシグナルは、公開された市場データフィードから自動算出される<strong>テクニカル条件</strong>であり、情報提供および学習目的のために表示されます。</li>
          <li>シグナルは、特定の金融商品の売買・保有を推奨するものでは<strong>ありません</strong>。投資助言ではなく、金融商品取引法（およびその他の法域における同等の法令）にいう投資勧誘にも該当しません。</li>
          <li>当社は<strong>金融商品取引業（投資助言・代理業）の登録を行っておりません</strong>。個別の投資助言、ポートフォリオ推奨、リスク許容度評価は一切提供しません。</li>
          <li>利用者は、FX取引が<strong>元本を超える損失</strong>を生じうるリスクの高い取引であることを認識・了承するものとします。過去のシグナル結果は将来の利益を保証するものではありません。</li>
          <li>シグナルに基づいて行うか、またはシグナルにもかかわらず行うすべての取引判断は、<strong>利用者の単独の責任</strong>であり、当社は損失について一切の責任を負いません。</li>
          <li>シグナル算出は、データフィードの障害、サーバー負荷その他の技術的要因により、遅延、不正確、または欠落する場合があります。特に4時間足・日足・週足においては、通知が数分〜数時間遅延する可能性があります。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第5条（利用者の義務および禁止事項）</h3>
        <p>利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li>本アプリまたは第三者サービスに対するリバースエンジニアリング、逆コンパイル、逆アセンブル、その他ソースコード解析行為</li>
          <li>自動化スクリプト、ボット、スクレイピングツールその他の手段により本サービスに不正にアクセスする行為</li>
          <li>当社の事前の書面による同意なく、シグナルまたは通知データを再配信、再公開、商業的に利用する行為</li>
          <li>本サービスを利用して、第三者に対し無登録の投資助言を行う行為</li>
          <li>本サービスの運営を妨害する行為、サーバーに過度の負荷を与える行為、攻撃行為</li>
          <li>法令または公序良俗に反する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ol>
        <p className="mt-1">利用者が前項各号のいずれかに該当する行為を行った場合、当社は利用者に対する本サービスの提供を予告なく停止または終了することができるものとします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第6条（サブスクリプションおよび支払い）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本アプリには、無料プラン（監視対象ペア・シグナル種別・時間足に制限あり）および有料プラン（ベーシック、プレミアム）があり、有料プランは Apple In-App Purchase を通じて提供される<strong>自動更新月額サブスクリプション</strong>です。</li>
          <li>料金: ベーシック 月額¥700、プレミアム 月額¥1,500（その他通貨は Apple の価格 Tier に従います）。</li>
          <li><strong>無料トライアル:</strong> 新規利用者には有料プランの1か月無料トライアルが付与されます。トライアル期間中は課金されません。トライアル終了の24時間以上前にキャンセルしない限り、トライアル終了時に自動的に有料プランへ移行します。</li>
          <li>料金は、Apple ID に登録されたお支払い方法により、購入確定時に請求されます。</li>
          <li>サブスクリプションは、現在の契約期間終了日の<strong>24時間以上前に自動更新をオフ</strong>にしない限り、自動的に更新されます。更新料金は、現在の契約期間終了日前の24時間以内に請求されます。</li>
          <li>
            サブスクリプションの管理、キャンセル、プラン変更は、iPhone の「設定」アプリから以下の手順で行います:
            <br />
            <span className="text-gray-600">「設定」→「ユーザー名(Apple ID)」→「サブスクリプション」→「FX Signal」→「キャンセル」または「プラン変更」</span>
          </li>
          <li>返金は Apple の返金ポリシーに従い、Apple に対して直接リクエストしていただく必要があります。当社は返金処理を行うことができません。</li>
          <li>プラン変更は Apple ID のサブスクリプション設定から行い、次回更新時から適用されます。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第7条（知的財産権）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本アプリ、本アプリに含まれるシグナル検出アルゴリズム、ユーザーインターフェース、ロゴ、ソースコード、文字列、画像その他のアセットに関する著作権、商標権、特許権その他一切の知的財産権は、当社または正当なライセンスを有する第三者に帰属します。</li>
          <li>本規約は、本規約に従って本アプリを使用する限定的な権利を超えて、利用者に対し本アプリに関するいかなる知的財産権のライセンス許諾も行うものではありません。</li>
          <li>市場価格データは上流のデータ提供元から取得しており、それぞれの利用規約およびライセンスに従います。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第8条（第三者サービス）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            本サービスは、以下の第三者サービスを利用しています。利用者は、本サービスの利用にあたり、各サービスの利用規約およびプライバシーポリシーにも同時に拘束されることに同意します。
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Apple Inc.（iOS、App Store、In-App Purchase、プッシュ通知サービス）</li>
              <li>Google LLC（Firebase Authentication、Firestore、Cloud Functions、Cloud Messaging、App Check）</li>
              <li>RevenueCat, Inc.（サブスクリプション管理）</li>
              <li>市場データ提供元（OANDA、MT5 データフィード等）</li>
            </ul>
          </li>
          <li>第三者サービスの仕様変更、提供終了、障害等により、本サービスの一部機能が利用できなくなる場合があります。当社はこれらに起因する損害について責任を負いません。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第9条（保証の否認および責任の制限）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本サービスは、「現状有姿（as-is）」「現状可能（as-available）」の状態で提供されます。</li>
          <li>当社は、本サービスについて、明示または黙示を問わず、商品性、特定目的への適合性、第三者の権利の非侵害、シグナルの正確性・信頼性、遅延の不存在、中断のない継続的な提供その他一切の保証を行いません。</li>
          <li>当社は、利用者がシグナルまたは本サービスに依拠して行った取引による損失、機会損失その他の損害（直接・間接・付随・結果的・懲罰的損害を問わず）について、一切の責任を負いません。</li>
          <li>当社が利用者に対して負う損害賠償責任の総額は、当社に故意または重過失がある場合を除き、利用者が損害発生直前の12か月間に当社に支払ったサブスクリプション料金の総額、または金1,000円のいずれか少ない金額を上限とします。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第10条（サービスの変更・終了）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>当社は、利用者への事前の予告なく、本サービスの内容を変更、追加、または終了することができます。</li>
          <li>本サービスの重大な変更または終了を行う場合、当社は合理的な範囲で、アプリ内通知または <a href="https://yaneyuka.com/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/</a> 上での告知により、事前の通知を試みます。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第11条（準拠法および管轄裁判所）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>本規約の解釈および適用は、日本法に準拠します。</li>
          <li>本サービスまたは本規約に関連して利用者と当社との間で紛争が生じた場合、<strong>東京地方裁判所</strong>を第一審の専属的合意管轄裁判所とします。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第12条（規約の変更）</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>当社は、必要に応じて本規約を変更することができます。</li>
          <li>本規約の変更は、変更後の規約をアプリ内に表示するか、または <a href="https://yaneyuka.com/fx-signal-terms/" className="text-blue-600 hover:text-blue-800 underline">https://yaneyuka.com/fx-signal-terms/</a> 上に掲載することにより効力を生じます。</li>
          <li>変更後の規約の発効日以降も利用者が本サービスの利用を継続した場合、利用者は変更後の規約に同意したものとみなされます。</li>
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第13条（分離可能性）</h3>
        <p>本規約のいずれかの条項が裁判所により無効または執行不能と判断された場合であっても、本規約の他の条項の有効性および執行可能性には影響を及ぼさないものとします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">第14条（お問い合わせ）</h3>
        <p>本規約に関するお問い合わせは、以下の連絡先までお願いいたします。</p>
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
