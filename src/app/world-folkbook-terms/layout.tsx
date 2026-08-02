import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | World Folkbook',
  description: 'Terms of Service for the World Folkbook iOS app. This page is also available in Japanese.',
  alternates: {
    canonical: 'https://yaneyuka.com/world-folkbook-terms',
  },
  openGraph: {
    title: 'Terms of Service | World Folkbook | yaneyuka',
    description: 'Terms of Service for the World Folkbook iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/world-folkbook-terms',
  },
};

export default function WorldFolkbookTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service | World Folkbook',
    description: 'Terms of Service for the World Folkbook iOS app.',
    url: 'https://yaneyuka.com/world-folkbook-terms',
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
