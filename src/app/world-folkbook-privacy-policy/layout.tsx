import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | World Folkbook',
  description: 'Privacy Policy for the World Folkbook iOS app. This page is also available in Japanese.',
  alternates: {
    canonical: 'https://yaneyuka.com/world-folkbook-privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | World Folkbook | yaneyuka',
    description: 'Privacy Policy for the World Folkbook iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/world-folkbook-privacy-policy',
  },
};

export default function WorldFolkbookPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | World Folkbook',
    description: 'Privacy Policy for the World Folkbook iOS app.',
    url: 'https://yaneyuka.com/world-folkbook-privacy-policy',
    inLanguage: ['en', 'ja'],
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
