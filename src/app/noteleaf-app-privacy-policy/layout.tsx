import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Noteleaf',
  description: 'Noteleafアプリのプライバシーポリシー。本アプリはデータを一切収集しません。アカウント不要、サーバーなし、すべて端末内完結。',
  alternates: {
    canonical: 'https://yaneyuka.com/noteleaf-app-privacy-policy',
  },
  openGraph: {
    title: 'プライバシーポリシー | Noteleaf | yaneyuka',
    description: 'Noteleafアプリのプライバシーポリシー。本アプリはデータを一切収集しません。',
    type: 'website',
    url: 'https://yaneyuka.com/noteleaf-app-privacy-policy',
  },
};

export default function NoteleafAppPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'プライバシーポリシー | Noteleaf',
    description: 'Noteleafアプリのプライバシーポリシー。本アプリはデータを一切収集しません。',
    url: 'https://yaneyuka.com/noteleaf-app-privacy-policy',
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
