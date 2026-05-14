import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function CfdSignalTermsPage() {
  return (
    <BilingualLegal
      titleEn="CFD Signal Terms of Use"
      titleJa="CFD Signal 利用規約"
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
        <strong>最終更新日:</strong> 2026年5月15日 &nbsp;|&nbsp;
        <strong>事業者:</strong> 合同会社slime &nbsp;|&nbsp;
        <strong>連絡先:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>
      </p>
      <p>
        本利用規約（以下「本規約」）は、合同会社slime（以下「当社」）が提供する <strong>CFD Signal</strong> アプリ（以下「本サービス」）の利用条件を定めるものです。
      </p>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ 重要 — 本サービスの位置付け</h3>
        <p className="text-[12px]">
          本サービスは、貴金属・エネルギー・株価指数等の差金決済取引（CFD）の<strong>価格情報を元にしたテクニカル指標イベント（RSI / 移動平均クロス / ボリンジャーバンド / 高値安値ブレイク 等）を通知する情報提供サービス</strong>です。
        </p>
        <p className="text-[12px] mt-2">本サービスは以下を <strong>行いません</strong>:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1 text-[12px]">
          <li>特定の取引・銘柄を推奨する助言・勧誘</li>
          <li>売買シグナルに従った自動取引・代理発注</li>
          <li>個別ユーザーの投資判断・運用方針に対するアドバイス</li>
        </ul>
        <p className="text-[12px] mt-2">
          本サービスは <strong>金融商品取引業（投資助言・代理業を含む）には該当しません</strong>。表示される情報はあくまでテクニカル指標の自動計算結果であり、投資成果を保証するものではありません。すべての投資判断・売買執行は <strong>ご自身の責任</strong> で行ってください。
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">1. サービスの内容</h3>
        <p>本サービスは、OANDA Japan の MetaTrader 5（MT5）を介して取得した CFD 銘柄の価格データを基に、複数の時間足（M5/M10/M30/H1/H4/D/W）でテクニカル指標を監視し、設定した条件に合致したシグナルが発生した際にプッシュ通知でユーザーに告知するシステムです。</p>
        <p className="mt-2">監視対象銘柄の例: 金（XAUUSD）・銀（XAGUSD）・銅（COPPER）・原油（USOIL/UKOIL）・天然ガス（NATGAS）・米株価指数（US30/US500/US100/US2000）・欧州株価指数（UK100/GER30/FRA40/EU50）・アジア株価指数（JP225/AUS200/HK50/CHINA50/SING30）・農産物（CORN/SOYBEANS/SUGAR/WHEAT）他。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. サブスクリプション</h3>
        <p>本サービスは、以下のプランで提供されます。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>無料プラン:</strong> 制限付きで利用可能</li>
          <li><strong>ベーシックプラン:</strong> 月額 700 円（自動更新）</li>
          <li><strong>プレミアムプラン:</strong> 月額 1,500 円（自動更新）</li>
        </ul>
        <p className="mt-2">新規ユーザーには、ベーシック・プレミアム各プランで <strong>1 ヶ月の無料トライアル</strong>が提供される場合があります（Apple Introductory Offer のポリシーに従う）。</p>

        <h4 className="font-semibold mt-3 mb-1 text-[12px]">自動更新について</h4>
        <p>サブスクリプションは自動的に更新されます。各プランの更新日の 24 時間前までにキャンセルしない場合、同額が自動的に課金されます。</p>

        <h4 className="font-semibold mt-3 mb-1 text-[12px]">キャンセル方法</h4>
        <p>サブスクリプションは、iOS の「設定 &gt; Apple ID &gt; サブスクリプション」または App Store の「アカウント &gt; サブスクリプションを管理」からいつでもキャンセルできます。キャンセル後も、既に支払い済みの期間中はサービスを利用できます。</p>

        <h4 className="font-semibold mt-3 mb-1 text-[12px]">返金</h4>
        <p>返金は Apple のポリシーに従います。返金リクエストは Apple のサポート（<a href="https://reportaproblem.apple.com" className="text-blue-600 hover:text-blue-800 underline">reportaproblem.apple.com</a>）からご依頼ください。</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ 3. 免責事項・投資リスク（重要）</h3>
        <p className="text-[12px]">
          本サービスで提供される情報は、テクニカル指標の自動計算結果に基づく <strong>参考情報</strong>であり、投資の勧誘・推奨・個別アドバイスを目的としたものではありません。
        </p>
        <p className="text-[12px] mt-2">CFD 取引には以下のリスクがあり、投資元本を上回る損失が発生する可能性があります:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1 text-[12px]">
          <li><strong>価格変動リスク:</strong> 為替・原油・指数等の価格が短時間で大きく変動する</li>
          <li><strong>レバレッジ リスク:</strong> 少額の証拠金で大きな取引を行うため、損失が拡大しやすい</li>
          <li><strong>流動性リスク:</strong> 取引時間外・市場急変時に約定できない場合がある</li>
          <li><strong>テクニカル指標の限界:</strong> 過去の値動きから計算される指標は、将来の価格を予測するものではない</li>
        </ul>
        <p className="text-[12px] mt-2">
          本サービスの通知に従って取引を行った結果生じた <strong>損失・損害について、当社は一切の責任を負いません</strong>。投資判断はご自身の知識・経験・財務状況に応じて慎重に行ってください。
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. 禁止事項</h3>
        <p>以下の行為を禁止します。</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>本サービスの逆コンパイル、リバースエンジニアリング、改変</li>
          <li>本サービスの営利目的での無断使用・再販売</li>
          <li>本サービスのアカウント・サブスクリプションの第三者への譲渡</li>
          <li>本サービスを利用した違法行為・他者への損害行為</li>
          <li>その他、法令・公序良俗に違反する行為</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. データソースの責任範囲</h3>
        <p>本サービスは OANDA Japan 株式会社の MetaTrader 5 から取得したデータを利用していますが、データの正確性・遅延・欠落について当社は保証いたしません。本サービスの通知タイミングが市場の実際の動きと差異が生じた場合の損失についても責任を負いません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. サービスの変更・終了</h3>
        <p>当社は、事前の通知なく、本サービスの内容を変更または終了する場合があります。重要な変更がある場合はアプリ内通知または本ページでお知らせします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. 規約の変更</h3>
        <p>本規約を変更する場合、本ページにて変更内容と発効日を告知します。変更後も継続して本サービスを利用する場合、変更後の規約に同意したものとみなします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. 準拠法・管轄</h3>
        <p>本規約は日本法に準拠し、本サービスに関する一切の紛争については東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. お問い合わせ</h3>
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
        <strong>Last Updated:</strong> May 15, 2026 &nbsp;|&nbsp;
        <strong>Operator:</strong> 合同会社slime &nbsp;|&nbsp;
        <strong>Contact:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a>
      </p>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) set forth the conditions of use for the <strong>CFD Signal</strong> application (the &ldquo;Service&rdquo;) provided by 合同会社slime (the &ldquo;Company&rdquo;).
      </p>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ Important — About the Service</h3>
        <p className="text-[12px]">
          The Service provides notifications of technical-indicator events (RSI, moving-average crosses, Bollinger Bands, high/low breakouts, etc.) based on price information of Contracts for Difference (CFD) on precious metals, energy, and stock indices.
        </p>
        <p className="text-[12px] mt-2">The Service does <strong>NOT</strong>:</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1 text-[12px]">
          <li>Recommend or solicit specific trades or instruments</li>
          <li>Execute automated trades or place orders on behalf of users</li>
          <li>Provide personalized investment advice or portfolio guidance</li>
        </ul>
        <p className="text-[12px] mt-2">
          The Service does <strong>not</strong> constitute a Financial Instruments Business (including investment advisory services) under Japanese law. Displayed information is the output of automated technical-indicator calculations and does <strong>not</strong> guarantee any investment outcome. <strong>All investment decisions and trade executions are the sole responsibility of the user.</strong>
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">1. Service Description</h3>
        <p>The Service monitors CFD instrument price data acquired via OANDA Japan&rsquo;s MetaTrader 5 (MT5) terminal across multiple timeframes (M5/M10/M30/H1/H4/D/W), and delivers push notifications when technical-indicator conditions configured by the user are met.</p>
        <p className="mt-2">Monitored instruments include: Gold (XAUUSD), Silver (XAGUSD), Copper (COPPER), Crude Oil (USOIL/UKOIL), Natural Gas (NATGAS), US Indices (US30/US500/US100/US2000), European Indices (UK100/GER30/FRA40/EU50), Asian Indices (JP225/AUS200/HK50/CHINA50/SING30), Agricultural Commodities (CORN/SOYBEANS/SUGAR/WHEAT), and others.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Subscription</h3>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Free Plan:</strong> Available with limitations</li>
          <li><strong>Basic Plan:</strong> ¥700/month (auto-renewal)</li>
          <li><strong>Premium Plan:</strong> ¥1,500/month (auto-renewal)</li>
        </ul>
        <p className="mt-2">New users may receive a <strong>one-month free trial</strong> for Basic/Premium plans (subject to Apple Introductory Offer policy).</p>

        <h4 className="font-semibold mt-3 mb-1 text-[12px]">Auto-Renewal</h4>
        <p>Subscriptions automatically renew. Unless cancelled at least 24 hours before the renewal date, the same amount will be charged.</p>

        <h4 className="font-semibold mt-3 mb-1 text-[12px]">Cancellation</h4>
        <p>Subscriptions can be cancelled at any time via iOS Settings &gt; Apple ID &gt; Subscriptions, or via App Store &gt; Account &gt; Manage Subscriptions. After cancellation, you can still use the service during the paid period.</p>

        <h4 className="font-semibold mt-3 mb-1 text-[12px]">Refunds</h4>
        <p>Refunds follow Apple&rsquo;s policy. Submit refund requests via <a href="https://reportaproblem.apple.com" className="text-blue-600 hover:text-blue-800 underline">reportaproblem.apple.com</a>.</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-3 my-3">
        <h3 className="font-semibold mb-1 text-yellow-900">⚠ 3. Disclaimer and Investment Risk (Important)</h3>
        <p className="text-[12px]">
          The information provided by this Service is <strong>reference information</strong> based on automated technical-indicator calculations and is not intended as investment advice, recommendation, or solicitation.
        </p>
        <p className="text-[12px] mt-2">CFD trading carries the following risks, and losses may exceed the principal investment:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1 text-[12px]">
          <li><strong>Price volatility risk</strong></li>
          <li><strong>Leverage risk</strong> (small margin controls large positions)</li>
          <li><strong>Liquidity risk</strong> (orders may not execute during off-hours or volatile periods)</li>
          <li><strong>Limits of technical indicators</strong> (past price calculations do not predict future prices)</li>
        </ul>
        <p className="text-[12px] mt-2">
          <strong>The Company assumes no liability for any losses or damages arising from trading actions taken based on Service notifications.</strong> Make investment decisions carefully according to your own knowledge, experience, and financial situation.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Prohibited Activities</h3>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Reverse engineering, decompiling, or modification of the Service</li>
          <li>Unauthorized commercial use or resale of the Service</li>
          <li>Transfer of account or subscription to a third party</li>
          <li>Use of the Service for illegal activities or to harm others</li>
          <li>Any other activities violating laws or public order</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Data Source Responsibility</h3>
        <p>The Service uses data obtained from OANDA Japan&rsquo;s MetaTrader 5. The Company does not guarantee the accuracy, delay, or completeness of such data. The Company is not liable for losses arising from differences between Service notification timing and actual market movements.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Service Changes and Termination</h3>
        <p>The Company may change or terminate the Service without prior notice. Material changes will be announced via in-app notification or on this page.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Changes to These Terms</h3>
        <p>We will post any changes to these Terms on this page along with the effective date. Continued use after changes constitutes acceptance of the revised Terms.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Governing Law and Jurisdiction</h3>
        <p>These Terms are governed by Japanese law. Any disputes related to the Service shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">9. Contact</h3>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Operator:</strong> 合同会社slime</li>
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className="text-blue-600 hover:text-blue-800 underline">info@yaneyuka.com</a></li>
        </ul>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 合同会社slime. All rights reserved.
      </p>
    </div>
  );
}
