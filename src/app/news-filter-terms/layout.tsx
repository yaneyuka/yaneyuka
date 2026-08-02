import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 | News Filter',
  description: 'iOSアプリ News Filter の利用規約です。',
  alternates: {
    canonical: 'https://yaneyuka.com/news-filter-terms',
  },
  openGraph: {
    title: '利用規約 | News Filter | yaneyuka',
    description: 'iOSアプリ News Filter の利用規約です。',
    type: 'website',
    url: 'https://yaneyuka.com/news-filter-terms',
  },
};

export default function NewsFilterTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '利用規約 | News Filter',
    description: 'iOSアプリ News Filter の利用規約です。',
    url: 'https://yaneyuka.com/news-filter-terms',
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
