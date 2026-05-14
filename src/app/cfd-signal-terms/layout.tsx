import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | CFD Signal | yaneyuka',
  description: 'Terms of Use for the CFD Signal iOS app. This page is also available in Japanese.',
  alternates: {
    canonical: 'https://yaneyuka.com/cfd-signal-terms',
  },
  openGraph: {
    title: 'Terms of Use | CFD Signal | yaneyuka',
    description: 'Terms of Use for the CFD Signal iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/cfd-signal-terms',
  },
};

export default function CfdSignalTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use | CFD Signal',
    description: 'Terms of Use for the CFD Signal iOS app.',
    url: 'https://yaneyuka.com/cfd-signal-terms',
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
