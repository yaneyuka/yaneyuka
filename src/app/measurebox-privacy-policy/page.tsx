import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function MeasureBoxPrivacyPolicyPage() {
  return (
    <BilingualLegal
      titleEn="MeasureBox Privacy Policy"
      titleJa="計測ボックス プライバシーポリシー"
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
        <h3 className="font-semibold mb-1">1. はじめに</h3>
        <p>当社は本アプリの利用者（以下「ユーザー」）のプライバシーを最大限尊重し、本ポリシーに従って個人情報・利用情報を取り扱います。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. 取得する情報</h3>
        <p>本アプリは原則として以下の情報を <strong>iPhone・iPad端末内で処理</strong> し、当社サーバーに送信しません。</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-2 py-1 text-left">情報の種類</th>
                <th className="border border-gray-300 px-2 py-1 text-left">利用機能</th>
                <th className="border border-gray-300 px-2 py-1 text-left">取得手段</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 px-2 py-1">カメラ映像</td><td className="border border-gray-300 px-2 py-1">ARメジャー、カラーピッカー、心拍計、照度計</td><td className="border border-gray-300 px-2 py-1">端末カメラ</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">マイク入力</td><td className="border border-gray-300 px-2 py-1">騒音計、音程チューナー</td><td className="border border-gray-300 px-2 py-1">端末マイク</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">位置情報</td><td className="border border-gray-300 px-2 py-1">速度計、ルート記録、高度計</td><td className="border border-gray-300 px-2 py-1">CoreLocation</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">モーションセンサー</td><td className="border border-gray-300 px-2 py-1">水平器、傾斜計、歩数計、振動計、ローラーメジャー</td><td className="border border-gray-300 px-2 py-1">CoreMotion</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">気圧</td><td className="border border-gray-300 px-2 py-1">高度計</td><td className="border border-gray-300 px-2 py-1">CMAltimeter</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">ヘルスケア（任意）</td><td className="border border-gray-300 px-2 py-1">歩数計、心拍計の履歴連携</td><td className="border border-gray-300 px-2 py-1">HealthKit</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">写真ライブラリ（任意）</td><td className="border border-gray-300 px-2 py-1">計測結果に紐づく写真の選択</td><td className="border border-gray-300 px-2 py-1">PhotosPicker</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">これらの情報は <strong>本アプリのリアルタイム計測のみに使用</strong> され、外部サーバーへ送信されることはありません。録画・録音されたデータが当社のサーバーに蓄積されることもありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. アプリ内購入と第三者提供</h3>
        <p>本アプリの買い切り機能は Apple の StoreKit を通じて提供されます。決済および購入情報は Apple が処理し、当社はクレジットカード番号等の決済情報を取得しません。</p>
        <p className="mt-2">本アプリは広告SDK、解析SDK、トラッキング技術を使用しません。ユーザーの計測データや利用データを当社または第三者のサーバーへ送信しません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. ユーザーが入力するデータ</h3>
        <p>ユーザーが本アプリで保存する計測結果・案件名・メモ・選択した写真のコピー等は、原則として <strong>iPhone・iPad端末内</strong> にのみ保存されます。iCloud バックアップを有効にした場合、Apple のサービスに従いバックアップされる場合があります。本アプリ独自のデバイス間同期機能はありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. 18 歳未満の利用者</h3>
        <p>本アプリは特に低年齢層を対象としていません。13 歳未満の利用者の情報を意図的に収集することはありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. 本ポリシーの変更</h3>
        <p>法令の変更・サービス内容の変更に応じて、本ポリシーを改定する場合があります。重大な変更がある場合はアプリ内またはウェブサイトでお知らせします。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. お問い合わせ</h3>
        <p>本ポリシーに関するお問い合わせは下記までお願いいたします。</p>
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
        <h3 className="font-semibold mb-1">1. Introduction</h3>
        <p>We respect the privacy of the people who use the App (&ldquo;you&rdquo;) and handle personal and usage information in accordance with this policy.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Information the App uses</h3>
        <p>As a rule the App processes the following <strong>on your iPhone or iPad</strong> and does not transmit it to our servers.</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-2 py-1 text-left">Type</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Used by</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 px-2 py-1">Camera image</td><td className="border border-gray-300 px-2 py-1">AR measure, colour picker, heart rate, light meter</td><td className="border border-gray-300 px-2 py-1">Device camera</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">Microphone input</td><td className="border border-gray-300 px-2 py-1">Sound level meter, tuner</td><td className="border border-gray-300 px-2 py-1">Device microphone</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">Location</td><td className="border border-gray-300 px-2 py-1">Speedometer, route recording, altimeter</td><td className="border border-gray-300 px-2 py-1">CoreLocation</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">Motion sensors</td><td className="border border-gray-300 px-2 py-1">Level, inclinometer, pedometer, vibration meter, roller measure</td><td className="border border-gray-300 px-2 py-1">CoreMotion</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">Barometric pressure</td><td className="border border-gray-300 px-2 py-1">Altimeter</td><td className="border border-gray-300 px-2 py-1">CMAltimeter</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">Health data (optional)</td><td className="border border-gray-300 px-2 py-1">Pedometer and heart rate history</td><td className="border border-gray-300 px-2 py-1">HealthKit</td></tr>
              <tr><td className="border border-gray-300 px-2 py-1">Photo library (optional)</td><td className="border border-gray-300 px-2 py-1">Choosing a photo to attach to a measurement</td><td className="border border-gray-300 px-2 py-1">PhotosPicker</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">This information is used <strong>only for live measurement inside the App</strong> and is never sent to an external server. Nothing recorded is accumulated on our servers.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. In-app purchase and third parties</h3>
        <p>The App&rsquo;s paid features are a one-time purchase provided through Apple&rsquo;s StoreKit. Apple processes the payment and the purchase information; we do not receive payment details such as credit card numbers.</p>
        <p className="mt-2">The App uses no advertising SDK, no analytics SDK and no tracking technology. We do not send your measurements or usage data to our servers or to any third party.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Data you enter</h3>
        <p>Measurements, project names, notes and copies of selected photos that you save in the App are stored, as a rule, <strong>only on your iPhone or iPad</strong>. If you enable iCloud backup, this data may be backed up in accordance with Apple&rsquo;s service. The App has no sync feature of its own between devices.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Users under 18</h3>
        <p>The App is not directed at young children in particular. We do not knowingly collect information from users under 13.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Changes to this policy</h3>
        <p>We may revise this policy in response to changes in law or in the App. If a material change is made, we will give notice in the App or on our website.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Contact</h3>
        <p>For questions about this policy, please contact:</p>
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
