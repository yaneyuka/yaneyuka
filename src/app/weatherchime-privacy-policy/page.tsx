import BilingualLegal from '@/components/BilingualLegal';

// Server Component. BilingualLegal がクライアント側でトグルUIを提供し、
// 本文は両言語とも SSR で DOM に書き出されるため、SEO・App Storeクローラ両方で検出可能。
export default function WeatherchimePrivacyPolicyPage() {
  return (
    <BilingualLegal
      titleEn="Weatherchime Privacy Policy"
      titleJa="Weatherchime プライバシーポリシー"
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
        <strong>最終更新日:</strong> 2026年6月10日
      </p>
      <p>
        合同会社slime（以下「当社」といいます）は、当社が提供する iOS アプリ「Weatherchime」（以下「本アプリ」といいます）における利用者の情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
      </p>
      <p>
        本アプリは、利用者が登録した地点の天気予報を、設定した時刻に「行動できる形」（傘の要否・雨の開始時刻・服装の目安など）でプッシュ通知することを目的としたアプリです。
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. 取得する情報</h3>
        <p>本アプリは、アカウント登録（氏名・メールアドレス等の入力）を必要とせず、<strong>匿名</strong>でご利用いただけます。本アプリが取得・保存する情報は、本アプリの機能の提供に必要な最小限のものに限られます。</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left">区分</th>
                <th className="border border-gray-300 px-2 py-1 text-left">具体的な情報</th>
                <th className="border border-gray-300 px-2 py-1 text-left">取得の目的</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">匿名識別子</td>
                <td className="border border-gray-300 px-2 py-1">Firebase の匿名認証によって自動発行されるユーザーID（個人を特定しません）</td>
                <td className="border border-gray-300 px-2 py-1">利用者ごとの地点・通知設定を保存・識別するため</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">プッシュ通知トークン</td>
                <td className="border border-gray-300 px-2 py-1">APNs / Firebase Cloud Messaging のデバイストークン</td>
                <td className="border border-gray-300 px-2 py-1">天気予報のプッシュ通知を端末へ配信するため</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">地点情報</td>
                <td className="border border-gray-300 px-2 py-1">利用者が検索・登録した地点の名称・緯度・経度・タイムゾーン</td>
                <td className="border border-gray-300 px-2 py-1">当該地点の天気予報を取得・通知するため</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">通知設定</td>
                <td className="border border-gray-300 px-2 py-1">通知時刻、対象日（今日／明日）、有効・無効の別、表示言語</td>
                <td className="border border-gray-300 px-2 py-1">設定した時刻・条件で通知を配信するため</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">購入情報</td>
                <td className="border border-gray-300 px-2 py-1">サブスクリプション／買い切りの購入・更新状態（Pro 機能の有無）</td>
                <td className="border border-gray-300 px-2 py-1">有料機能（Pro）の提供状態を管理するため</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">本アプリは、<strong>端末の GPS による現在位置の常時追跡は行いません</strong>。地点は利用者が地名を検索して登録する方式です。</p>
        <p className="mt-2">本アプリは、氏名・メールアドレス・電話番号・連絡先・写真・行動履歴・広告識別子（IDFA）等は取得しません。解析（アナリティクス）SDK および広告 SDK は組み込んでいません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. 情報の利用目的</h3>
        <p>取得した情報は、次の目的のためにのみ利用します。</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li>利用者が登録した地点・時刻に基づく天気予報のプッシュ通知の配信</li>
          <li>ホーム画面・詳細画面での天気情報の表示</li>
          <li>有料機能（Pro）の購入状態の管理</li>
          <li>本アプリの不具合対応・品質改善</li>
        </ol>
        <p className="mt-2">当社は、取得した情報を上記の目的の範囲を超えて利用しません。また、利用者の情報を広告目的のトラッキングに使用したり、第三者に販売したりすることはありません。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. 第三者サービスへの提供・連携</h3>
        <p>本アプリは、機能の提供のために以下の外部サービスを利用します。各サービスに送信される情報は、本アプリの機能提供に必要な範囲に限られます。</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left">サービス名</th>
                <th className="border border-gray-300 px-2 py-1 text-left">提供事業者</th>
                <th className="border border-gray-300 px-2 py-1 text-left">送信される主な情報</th>
                <th className="border border-gray-300 px-2 py-1 text-left">用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Apple WeatherKit</td>
                <td className="border border-gray-300 px-2 py-1">Apple Inc.</td>
                <td className="border border-gray-300 px-2 py-1">登録地点の緯度・経度</td>
                <td className="border border-gray-300 px-2 py-1">天気予報データの取得</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Open-Meteo Geocoding API</td>
                <td className="border border-gray-300 px-2 py-1">Open-Meteo</td>
                <td className="border border-gray-300 px-2 py-1">利用者が入力した地名の検索文字列</td>
                <td className="border border-gray-300 px-2 py-1">地名から緯度・経度・タイムゾーンへの変換</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Firebase（Authentication / Cloud Firestore / Cloud Functions / Cloud Messaging）</td>
                <td className="border border-gray-300 px-2 py-1">Google LLC</td>
                <td className="border border-gray-300 px-2 py-1">匿名ユーザーID、地点・通知設定、プッシュ通知トークン</td>
                <td className="border border-gray-300 px-2 py-1">認証・データ保存・通知配信のためのバックエンド基盤</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">RevenueCat</td>
                <td className="border border-gray-300 px-2 py-1">RevenueCat, Inc.</td>
                <td className="border border-gray-300 px-2 py-1">匿名ユーザーID、購入・更新状態</td>
                <td className="border border-gray-300 px-2 py-1">サブスクリプション等の購入状態の管理</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">各サービスにおける情報の取り扱いについては、それぞれの提供事業者のプライバシーポリシーをご確認ください。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>Apple: <a href="https://www.apple.com/legal/privacy/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a></li>
          <li>Open-Meteo: <a href="https://open-meteo.com/en/terms" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://open-meteo.com/en/terms</a></li>
          <li>Google（Firebase）: <a href="https://firebase.google.com/support/privacy" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://firebase.google.com/support/privacy</a></li>
          <li>RevenueCat: <a href="https://www.revenuecat.com/privacy/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.revenuecat.com/privacy/</a></li>
        </ul>
        <p className="mt-2">天気情報の表示には Apple の WeatherKit を利用しており、本アプリ内に Apple Weather の出典表示（アトリビューション）を掲載しています。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. 情報の保存・管理</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>取得した情報は、Firebase（Google LLC）のサーバー上に保存されます。</li>
          <li>当社は、取得した情報への不正アクセス、漏えい、改ざん等を防止するため、適切な安全管理措置を講じます。</li>
          <li>通知の配信履歴は、重複配信の防止のために一時的に保存されます。</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. 情報の削除</h3>
        <p>利用者は、本アプリ上で登録した地点・通知設定をいつでも削除できます。アプリを削除（アンインストール）した場合、当該端末のプッシュ通知トークンは無効となり、以後の通知は配信されません。</p>
        <p className="mt-2">保存済みの情報の削除をご希望の場合は、第8項記載の連絡先までお問い合わせください。匿名ユーザーIDをご提示いただくことで、当該データの削除に対応します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. 子どものプライバシー</h3>
        <p>本アプリは、特定の年齢層を対象とするものではなく、個人を特定する情報を取得しません。万一、保護者の同意なく子どもの個人情報が当社に提供されたことが判明した場合、当社は速やかに当該情報を削除します。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. 本ポリシーの変更</h3>
        <p>当社は、法令の変更やサービス内容の変更に応じて、本ポリシーを改定することがあります。重要な変更を行う場合は、本アプリまたは当社ウェブサイト上で告知します。改定後のポリシーは、本ページに掲載した時点から効力を生じます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. お問い合わせ窓口</h3>
        <p>本ポリシーに関するお問い合わせ、情報の削除のご依頼は、以下の連絡先までお願いいたします。</p>
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

function EnglishContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-3">
      <p className="text-[12px] text-gray-500">
        <strong>Last Updated:</strong> June 10, 2026
      </p>
      <p>
        slime LLC (&ldquo;we&rdquo;) establishes this Privacy Policy (the &ldquo;Policy&rdquo;) regarding the handling of user information in the iOS application &ldquo;Weatherchime&rdquo; (the &ldquo;App&rdquo;) that we provide.
      </p>
      <p>
        The purpose of the App is to push the weather forecast for locations registered by the user, at a time the user sets, in an &ldquo;actionable form&rdquo; (whether an umbrella is needed, when rain will start, clothing guidance, and so on).
      </p>

      <div>
        <h3 className="font-semibold mb-1">1. Information We Collect</h3>
        <p>The App does not require account registration (entry of name, email address, etc.) and can be used <strong>anonymously</strong>. The information the App collects and stores is limited to the minimum necessary to provide the App&rsquo;s functions.</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left">Category</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Specific Information</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Purpose of Collection</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Anonymous identifier</td>
                <td className="border border-gray-300 px-2 py-1">A user ID automatically issued by Firebase Anonymous Authentication (does not identify the individual)</td>
                <td className="border border-gray-300 px-2 py-1">To store and identify each user&rsquo;s locations and notification settings</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Push notification token</td>
                <td className="border border-gray-300 px-2 py-1">APNs / Firebase Cloud Messaging device token</td>
                <td className="border border-gray-300 px-2 py-1">To deliver weather forecast push notifications to the device</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Location information</td>
                <td className="border border-gray-300 px-2 py-1">The name, latitude, longitude, and time zone of locations the user searches for and registers</td>
                <td className="border border-gray-300 px-2 py-1">To obtain and send notifications about the weather forecast for that location</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Notification settings</td>
                <td className="border border-gray-300 px-2 py-1">Notification time, target day (today / tomorrow), enabled/disabled state, display language</td>
                <td className="border border-gray-300 px-2 py-1">To deliver notifications at the set time and under the set conditions</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Purchase information</td>
                <td className="border border-gray-300 px-2 py-1">Purchase/renewal status of subscription / one-time purchases (whether Pro features are available)</td>
                <td className="border border-gray-300 px-2 py-1">To manage the availability of paid (Pro) features</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">The App <strong>does not continuously track your current location via the device GPS</strong>. Locations are registered by the user searching for a place name.</p>
        <p className="mt-2">The App does not collect names, email addresses, phone numbers, contacts, photos, activity history, advertising identifiers (IDFA), or the like. No analytics SDK or advertising SDK is embedded.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">2. Purposes of Use</h3>
        <p>We use the collected information solely for the following purposes:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-1">
          <li>Delivering weather forecast push notifications based on the locations and times registered by the user.</li>
          <li>Displaying weather information on the home screen and detail screens.</li>
          <li>Managing the purchase status of paid (Pro) features.</li>
          <li>Addressing defects in the App and improving its quality.</li>
        </ol>
        <p className="mt-2">We do not use the collected information beyond the scope of the above purposes. Nor do we use user information for advertising-purpose tracking or sell it to third parties.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">3. Provision to and Integration with Third-Party Services</h3>
        <p>The App uses the following external services to provide its functions. The information transmitted to each service is limited to the scope necessary to provide the App&rsquo;s functions.</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left">Service</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Provider</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Main Information Transmitted</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Apple WeatherKit</td>
                <td className="border border-gray-300 px-2 py-1">Apple Inc.</td>
                <td className="border border-gray-300 px-2 py-1">Latitude and longitude of the registered location</td>
                <td className="border border-gray-300 px-2 py-1">Obtaining weather forecast data</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Open-Meteo Geocoding API</td>
                <td className="border border-gray-300 px-2 py-1">Open-Meteo</td>
                <td className="border border-gray-300 px-2 py-1">The place-name search string entered by the user</td>
                <td className="border border-gray-300 px-2 py-1">Converting a place name to latitude, longitude, and time zone</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Firebase (Authentication / Cloud Firestore / Cloud Functions / Cloud Messaging)</td>
                <td className="border border-gray-300 px-2 py-1">Google LLC</td>
                <td className="border border-gray-300 px-2 py-1">Anonymous user ID, location and notification settings, push notification token</td>
                <td className="border border-gray-300 px-2 py-1">Backend infrastructure for authentication, data storage, and notification delivery</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">RevenueCat</td>
                <td className="border border-gray-300 px-2 py-1">RevenueCat, Inc.</td>
                <td className="border border-gray-300 px-2 py-1">Anonymous user ID, purchase/renewal status</td>
                <td className="border border-gray-300 px-2 py-1">Managing purchase status such as subscriptions</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">For how each service handles information, please review the privacy policy of each respective provider.</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>Apple: <a href="https://www.apple.com/legal/privacy/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a></li>
          <li>Open-Meteo: <a href="https://open-meteo.com/en/terms" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://open-meteo.com/en/terms</a></li>
          <li>Google (Firebase): <a href="https://firebase.google.com/support/privacy" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://firebase.google.com/support/privacy</a></li>
          <li>RevenueCat: <a href="https://www.revenuecat.com/privacy/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.revenuecat.com/privacy/</a></li>
        </ul>
        <p className="mt-2">The display of weather information uses Apple&rsquo;s WeatherKit, and the App includes an Apple Weather attribution.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">4. Storage and Management of Information</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Collected information is stored on Firebase (Google LLC) servers.</li>
          <li>We take appropriate safety management measures to prevent unauthorized access to, leakage of, and falsification of the collected information.</li>
          <li>Notification delivery history is stored temporarily to prevent duplicate delivery.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">5. Deletion of Information</h3>
        <p>Users can delete the locations and notification settings they have registered in the App at any time. If the App is deleted (uninstalled), the push notification token for that device becomes invalid, and no further notifications will be delivered.</p>
        <p className="mt-2">If you wish to delete information already stored, please contact us at the address listed in Section 8. By providing your anonymous user ID, we will handle the deletion of the relevant data.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">6. Children&rsquo;s Privacy</h3>
        <p>The App is not directed at any specific age group and does not collect personally identifying information. In the unlikely event it becomes clear that a child&rsquo;s personal information has been provided to us without parental consent, we will promptly delete such information.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">7. Changes to This Policy</h3>
        <p>We may revise this Policy in response to changes in law or service content. When making important changes, we will provide notice within the App or on our website. The revised Policy takes effect from the time it is posted on this page.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">8. Contact</h3>
        <p>For inquiries regarding this Policy and requests to delete information, please contact us at:</p>
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
