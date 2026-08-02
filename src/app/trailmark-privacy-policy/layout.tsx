import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Trailmark',
  description: 'Trailmarkアプリのプライバシーポリシーです。位置情報・移動記録の取り扱いに関する方針をご説明します。',
  alternates: {
    canonical: 'https://yaneyuka.com/trailmark-privacy-policy',
  },
  openGraph: {
    title: 'プライバシーポリシー | Trailmark | yaneyuka',
    description: 'Trailmarkアプリのプライバシーポリシーです。位置情報・移動記録の取り扱いに関する方針をご説明します。',
    type: 'website',
    url: 'https://yaneyuka.com/trailmark-privacy-policy',
  },
};

export default function TrailmarkPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'プライバシーポリシー | Trailmark',
    description: 'Trailmarkアプリのプライバシーポリシーです。位置情報・移動記録の取り扱いに関する方針をご説明します。',
    url: 'https://yaneyuka.com/trailmark-privacy-policy',
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
