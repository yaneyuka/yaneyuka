import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | News Filter',
  description: 'iOSアプリ News Filter のプライバシーポリシーです。個人情報の取り扱いに関する方針をご説明します。',
  alternates: {
    canonical: 'https://yaneyuka.com/news-filter-privacy-policy',
  },
  openGraph: {
    title: 'プライバシーポリシー | News Filter | yaneyuka',
    description: 'iOSアプリ News Filter のプライバシーポリシーです。',
    type: 'website',
    url: 'https://yaneyuka.com/news-filter-privacy-policy',
  },
};

export default function NewsFilterPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'プライバシーポリシー | News Filter',
    description: 'iOSアプリ News Filter のプライバシーポリシーです。',
    url: 'https://yaneyuka.com/news-filter-privacy-policy',
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
