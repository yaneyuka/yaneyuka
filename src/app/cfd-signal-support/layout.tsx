import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support | CFD Signal',
  description: 'Support page for the CFD Signal iOS app — FAQ and contact information. Available in Japanese and English.',
  alternates: {
    canonical: 'https://yaneyuka.com/cfd-signal-support',
  },
  openGraph: {
    title: 'Support | CFD Signal | yaneyuka',
    description: 'Support page for the CFD Signal iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/cfd-signal-support',
  },
};

export default function CfdSignalSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Support | CFD Signal',
    description: 'Support page for the CFD Signal iOS app.',
    url: 'https://yaneyuka.com/cfd-signal-support',
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
