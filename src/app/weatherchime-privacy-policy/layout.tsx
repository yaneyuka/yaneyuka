import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weatherchime プライバシーポリシー | 合同会社slime',
  description: 'Weatherchimeアプリのプライバシーポリシーです。地点情報・通知設定・プッシュ通知の取り扱いに関する方針をご説明します。',
  alternates: {
    canonical: 'https://yaneyuka.com/weatherchime-privacy-policy',
  },
  openGraph: {
    title: 'Weatherchime プライバシーポリシー | 合同会社slime',
    description: 'Weatherchimeアプリのプライバシーポリシーです。地点情報・通知設定・プッシュ通知の取り扱いに関する方針をご説明します。',
    type: 'website',
    url: 'https://yaneyuka.com/weatherchime-privacy-policy',
  },
};

export default function WeatherchimePrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Weatherchime プライバシーポリシー',
    description: 'Weatherchimeアプリのプライバシーポリシーです。地点情報・通知設定・プッシュ通知の取り扱いに関する方針をご説明します。',
    url: 'https://yaneyuka.com/weatherchime-privacy-policy',
    inLanguage: ['ja', 'en'],
    publisher: {
      '@type': 'Organization',
      name: '合同会社slime',
      url: 'https://yaneyuka.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
