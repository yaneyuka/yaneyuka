import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support | World Folkbook | yaneyuka',
  description: 'Support page for the World Folkbook iOS app — FAQ and contact information. Available in Japanese and English.',
  alternates: {
    canonical: 'https://yaneyuka.com/world-folkbook-support',
  },
  openGraph: {
    title: 'Support | World Folkbook | yaneyuka',
    description: 'Support page for the World Folkbook iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/world-folkbook-support',
  },
};

export default function WorldFolkbookSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Support | World Folkbook',
    description: 'Support page for the World Folkbook iOS app.',
    url: 'https://yaneyuka.com/world-folkbook-support',
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
