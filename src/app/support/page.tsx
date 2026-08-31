import BilingualLegal from '@/components/BilingualLegal';

// 全 iOS アプリ共通のサポートページ。今後新規アプリはここに追記、
// 既存の *-support 個別ページ(cfd-signal / fx-signal / world-folkbook)は
// Apple 登録済 URL を維持するため触らない。
//
// アプリ一覧の追記が増えるため、SUPPORTED_APPS を切り出して両言語で再利用。
type SupportedApp = {
  name: string;
  jaDesc: string;
  enDesc: string;
  privacy: string;
  terms?: string;
  individualSupport?: string;
};

const SUPPORTED_APPS: SupportedApp[] = [
  {
    name: 'Trailmark',
    jaDesc: '移動記録アプリ',
    enDesc: 'Movement journal app',
    privacy: 'https://yaneyuka.com/trailmark-privacy-policy/',
  },
  {
    name: 'Noteleaf',
    jaDesc: '手書きノートアプリ',
    enDesc: 'Handwriting notebook app',
    privacy: 'https://yaneyuka.com/noteleaf-app-privacy-policy/',
  },
  {
    name: 'PasLog',
    jaDesc: '機密メモ金庫',
    enDesc: 'Secret memo vault',
    privacy: 'https://yaneyuka.com/paslog-privacy-policy/',
  },
  {
    name: 'World Folkbook',
    jaDesc: '世界の民話絵本',
    enDesc: 'Picture book of folktales',
    privacy: 'https://yaneyuka.com/world-folkbook-privacy-policy/',
    terms: 'https://yaneyuka.com/world-folkbook-terms/',
    individualSupport: 'https://yaneyuka.com/world-folkbook-support/',
  },
  {
    name: 'FX Signal',
    jaDesc: 'FX シグナル通知',
    enDesc: 'FX signal alerts',
    privacy: 'https://yaneyuka.com/fx-signal-privacy-policy/',
    terms: 'https://yaneyuka.com/fx-signal-terms/',
    individualSupport: 'https://yaneyuka.com/fx-signal-support/',
  },
  {
    name: 'CFD Signal',
    jaDesc: 'CFD シグナル通知',
    enDesc: 'CFD signal alerts',
    privacy: 'https://yaneyuka.com/cfd-signal-privacy-policy/',
    terms: 'https://yaneyuka.com/cfd-signal-terms/',
    individualSupport: 'https://yaneyuka.com/cfd-signal-support/',
  },
  {
    name: 'News Filter',
    jaDesc: 'ニュースフィルター',
    enDesc: 'News filter app',
    privacy: 'https://yaneyuka.com/news-filter-privacy-policy/',
    terms: 'https://yaneyuka.com/news-filter-terms/',
  },
  {
    name: 'Epoch Camera',
    jaDesc: '時代別カメラ',
    enDesc: 'Era-styled camera',
    privacy: 'https://yaneyuka.com/epoch-camera-privacy-policy/',
  },
  {
    name: 'Rules',
    jaDesc: '社内規則管理',
    enDesc: 'Internal rules manager',
    privacy: 'https://yaneyuka.com/rules-app-privacy-policy/',
  },
  {
    name: 'DayLine',
    jaDesc: '日々のタイムライン',
    enDesc: 'Daily timeline',
    privacy: 'https://yaneyuka.com/dayline-app-privacy-policy/',
  },
  {
    name: '建築基準法yaneyuka',
    jaDesc: '建築基準法リファレンス',
    enDesc: 'Japanese Building Standards Law reference',
    privacy: 'https://yaneyuka.com/kijyunhou-app-privacy-policy/',
  },
  {
    name: '消防法yaneyuka',
    jaDesc: '消防法リファレンス',
    enDesc: 'Japanese Fire Service Law reference',
    privacy: 'https://yaneyuka.com/shoubouhou-app-privacy-policy/',
  },
  {
    name: '計測ボックス / MeasureBox',
    jaDesc: 'iPhone のセンサーを使う24種の計測ツール',
    enDesc: '24 measuring tools using the iPhone sensors',
    privacy: 'https://yaneyuka.com/measurebox-privacy-policy/',
    terms: 'https://yaneyuka.com/measurebox-terms/',
  },
];

export default function SupportPage() {
  return (
    <BilingualLegal
      titleEn="Support"
      titleJa="サポート"
      en={<EnglishContent />}
      ja={<JapaneseContent />}
      defaultLang="ja"
    />
  );
}

const linkClass = 'text-blue-600 hover:text-blue-800 underline';

function JapaneseContent() {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 text-[13px] leading-6 text-gray-800 space-y-4">
      <p className="text-[12px] text-gray-500">
        <strong>最終更新日:</strong> 2026年9月1日
      </p>
      <p>yaneyuka.com で配信している iOS アプリ全般のサポートページです。各アプリ共通のお問い合わせ先、よくある質問、対応アプリ一覧を掲載しています。</p>

      <div>
        <h3 className="font-semibold mb-1">お問い合わせ</h3>
        <p>ご質問・不具合報告・ご要望は、下記までお気軽にお問い合わせください。返信は 2〜3 営業日以内を目安に対応いたします。</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>メール:</strong> <a href="mailto:info@yaneyuka.com" className={linkClass}>info@yaneyuka.com</a></li>
        </ul>
        <p className="mt-2 text-[12px] text-gray-600">お問い合わせの際は、対象のアプリ名・iOS バージョン・端末モデルを記載いただくとスムーズに対応できます。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">よくある質問</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. 課金の解約・払い戻しはどうすればいい?</p>
          <p>サブスクリプション型アプリの解約は iOS の「設定 → ご自分の名前 → サブスクリプション」から行えます。買い切り型アプリは解約手続きそのものが不要です。返金が必要な場合は Apple のサポートにご連絡ください: <a href="https://reportaproblem.apple.com/" className={linkClass} target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a></p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 別の端末で購入を復元したい</p>
          <p>各アプリ内の「購入を復元」ボタンをタップしてください。または同じ Apple ID で App Store にサインインしてアプリを再ダウンロードすると、購入状態が引き継がれます。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 機種変更後にデータが見られない</p>
          <p>データの保存方式は各アプリによって異なります(端末内のみ保存のもの、クラウド同期するもの等)。詳しくは各アプリのプライバシーポリシーをご参照ください。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 不具合報告・要望を送りたい</p>
          <p>上記メールアドレスへご連絡ください。アプリ名・発生状況・iOS バージョン・端末モデルをお知らせいただけると対応がスムーズです。</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. 子どもが使っても安全?</p>
          <p>当社の iOS アプリは原則として 13 歳未満の方を対象としていません。各アプリの年齢区分は App Store の表示をご確認ください。</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">対応アプリ一覧</h3>
        <ul className="list-disc pl-5 space-y-1.5">
          {SUPPORTED_APPS.map((app) => (
            <li key={app.name}>
              <strong>{app.name}</strong> — {app.jaDesc}（
              <a href={app.privacy} className={linkClass}>プライバシーポリシー</a>
              {app.terms && (
                <>
                  {' / '}
                  <a href={app.terms} className={linkClass}>利用規約</a>
                </>
              )}
              {app.individualSupport && (
                <>
                  {' / '}
                  <a href={app.individualSupport} className={linkClass}>個別サポート</a>
                </>
              )}
              ）
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[12px] text-gray-600">独自の利用規約ページが無いアプリは Apple 標準 EULA を適用しています。</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">運営者情報</h3>
        <p>合同会社slime</p>
        <p>お問い合わせ: <a href="mailto:info@yaneyuka.com" className={linkClass}>info@yaneyuka.com</a></p>
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
        <strong>Last updated:</strong> September 1, 2026
      </p>
      <p>This page provides general support for all iOS apps distributed under yaneyuka.com. You will find contact information, frequently asked questions, and a list of supported apps below.</p>

      <div>
        <h3 className="font-semibold mb-1">Contact</h3>
        <p>For questions, bug reports, and feature requests, please reach out. We aim to respond within 2&ndash;3 business days.</p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li><strong>Email:</strong> <a href="mailto:info@yaneyuka.com" className={linkClass}>info@yaneyuka.com</a></li>
        </ul>
        <p className="mt-2 text-[12px] text-gray-600">When contacting us, including the app name, iOS version, and device model helps us respond faster.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Frequently Asked Questions</h3>

        <div className="mt-3">
          <p className="font-semibold">Q. How do I cancel my subscription or request a refund?</p>
          <p>For subscription apps, cancel via iOS Settings &rarr; Your Name &rarr; Subscriptions. One-time purchase apps do not require cancellation. For refunds, please contact Apple Support: <a href="https://reportaproblem.apple.com/" className={linkClass} target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a></p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How do I restore purchases on another device?</p>
          <p>Tap &ldquo;Restore Purchases&rdquo; inside the app, or sign in to the App Store with the same Apple ID and re-download the app. Your purchase will be restored automatically.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. My data is missing after switching devices.</p>
          <p>Data storage differs per app (some store on-device only, others sync to the cloud). Please refer to the privacy policy of the specific app for details.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. How do I report bugs or request features?</p>
          <p>Email us at the address above. Including the app name, what happened, your iOS version, and device model will help us address the issue quickly.</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Q. Are these apps safe for children?</p>
          <p>As a rule, our iOS apps are not intended for users under 13. Please check the App Store age rating for each app.</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Supported Apps</h3>
        <ul className="list-disc pl-5 space-y-1.5">
          {SUPPORTED_APPS.map((app) => (
            <li key={app.name}>
              <strong>{app.name}</strong> &mdash; {app.enDesc} (
              <a href={app.privacy} className={linkClass}>Privacy Policy</a>
              {app.terms && (
                <>
                  {' / '}
                  <a href={app.terms} className={linkClass}>Terms</a>
                </>
              )}
              {app.individualSupport && (
                <>
                  {' / '}
                  <a href={app.individualSupport} className={linkClass}>Individual Support</a>
                </>
              )}
              )
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[12px] text-gray-600">Apps without a dedicated terms page use Apple&rsquo;s Standard EULA.</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Operator</h3>
        <p>slime LLC (合同会社slime)</p>
        <p>Contact: <a href="mailto:info@yaneyuka.com" className={linkClass}>info@yaneyuka.com</a></p>
      </div>

      <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-4">
        © 2026 slime LLC. All rights reserved.
      </p>
    </div>
  );
}
