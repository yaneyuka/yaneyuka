import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 計測ボックス MeasureBox',
  description: '計測ボックス(MeasureBox)のプライバシーポリシー。計測データは端末内で処理し、当社サーバーへ送信しません。広告・解析・トラッキングSDKは使用していません。',
  alternates: {
    canonical: 'https://yaneyuka.com/measurebox-privacy-policy',
  },
  openGraph: {
    title: 'プライバシーポリシー | 計測ボックス MeasureBox | yaneyuka',
    description: '計測ボックス(MeasureBox)のプライバシーポリシー。計測データは端末内で処理し、当社サーバーへ送信しません。',
    type: 'website',
    url: 'https://yaneyuka.com/measurebox-privacy-policy',
  },
};

export default function MeasureBoxPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'プライバシーポリシー | 計測ボックス MeasureBox',
    description: '計測ボックス(MeasureBox)のプライバシーポリシー。計測データは端末内で処理し、当社サーバーへ送信しません。',
    url: 'https://yaneyuka.com/measurebox-privacy-policy',
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
