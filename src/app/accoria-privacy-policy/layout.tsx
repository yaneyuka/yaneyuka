import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Accoria',
  description: 'Accoriaアプリのプライバシーポリシー。帳簿データは端末内にのみ保存し、当社サーバーへ送信しません。',
  alternates: {
    canonical: 'https://yaneyuka.com/accoria-privacy-policy',
  },
  openGraph: {
    title: 'プライバシーポリシー | Accoria | yaneyuka',
    description: 'Accoriaアプリのプライバシーポリシー。帳簿データは端末内にのみ保存し、当社サーバーへ送信しません。',
    type: 'website',
    url: 'https://yaneyuka.com/accoria-privacy-policy',
  },
};

export default function AccoriaPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'プライバシーポリシー | Accoria',
    description: 'Accoriaアプリのプライバシーポリシー。帳簿データは端末内にのみ保存し、当社サーバーへ送信しません。',
    url: 'https://yaneyuka.com/accoria-privacy-policy',
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
