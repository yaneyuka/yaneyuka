import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CFD Signal',
  description: 'Privacy Policy for the CFD Signal iOS app. This page is also available in Japanese.',
  alternates: {
    canonical: 'https://yaneyuka.com/cfd-signal-privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | CFD Signal | yaneyuka',
    description: 'Privacy Policy for the CFD Signal iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/cfd-signal-privacy-policy',
  },
};

export default function CfdSignalPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | CFD Signal',
    description: 'Privacy Policy for the CFD Signal iOS app.',
    url: 'https://yaneyuka.com/cfd-signal-privacy-policy',
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
