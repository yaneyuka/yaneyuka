import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サポート',
  description: 'yaneyuka.com で配信中の iOS アプリ全般のサポート情報。お問い合わせ・FAQ・対応アプリ一覧。日本語/英語対応。',
  alternates: {
    canonical: 'https://yaneyuka.com/support',
  },
  openGraph: {
    title: 'サポート | yaneyuka',
    description: 'yaneyuka.com で配信中の iOS アプリ全般のサポート情報。',
    type: 'website',
    url: 'https://yaneyuka.com/support',
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'サポート | yaneyuka',
    description: 'yaneyuka.com で配信中の iOS アプリ全般のサポート情報。',
    url: 'https://yaneyuka.com/support',
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
