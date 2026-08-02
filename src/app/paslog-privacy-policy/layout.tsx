import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PasLog | yaneyuka',
  description: 'Privacy Policy for the PasLog iOS app. PasLog stores all data only on your device. This page is also available in Japanese.',
  alternates: {
    canonical: 'https://yaneyuka.com/paslog-privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | PasLog | yaneyuka',
    description: 'Privacy Policy for the PasLog iOS app.',
    type: 'website',
    url: 'https://yaneyuka.com/paslog-privacy-policy',
  },
};

export default function PasLogPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | PasLog',
    description: 'Privacy Policy for the PasLog iOS app.',
    url: 'https://yaneyuka.com/paslog-privacy-policy',
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
