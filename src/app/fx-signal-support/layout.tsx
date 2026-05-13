import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support | FX Signal | yaneyuka',
  description: 'Support page for the FX Signal iOS app — FAQ and contact information. Available in Japanese and English.',
  alternates: {
    canonical: 'https://yaneyuka.com/fx-signal-support',
  },
  openGraph: {
    title: 'Support | FX Signal | yaneyuka',
    description: 'Support page for the FX Signal iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/fx-signal-support',
  },
};

export default function FxSignalSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Support | FX Signal',
    description: 'Support page for the FX Signal iOS app.',
    url: 'https://yaneyuka.com/fx-signal-support',
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
