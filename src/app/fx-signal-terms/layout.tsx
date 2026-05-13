import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | FX Signal | yaneyuka',
  description: 'Terms of Use for the FX Signal iOS app. This page is also available in Japanese.',
  alternates: {
    canonical: 'https://yaneyuka.com/fx-signal-terms',
  },
  openGraph: {
    title: 'Terms of Use | FX Signal | yaneyuka',
    description: 'Terms of Use for the FX Signal iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/fx-signal-terms',
  },
};

export default function FxSignalTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use | FX Signal',
    description: 'Terms of Use for the FX Signal iOS app.',
    url: 'https://yaneyuka.com/fx-signal-terms',
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
