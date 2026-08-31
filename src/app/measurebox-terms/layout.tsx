import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 | 計測ボックス MeasureBox',
  description: '計測ボックス(MeasureBox)の利用規約。計測値は内蔵センサーによる目安値であり、法定計測器・医療機器の代替ではありません。買い切り型のアプリ内購入です。',
  alternates: {
    canonical: 'https://yaneyuka.com/measurebox-terms',
  },
  openGraph: {
    title: '利用規約 | 計測ボックス MeasureBox | yaneyuka',
    description: '計測ボックス(MeasureBox)の利用規約。計測値は内蔵センサーによる目安値です。',
    type: 'website',
    url: 'https://yaneyuka.com/measurebox-terms',
  },
};

export default function MeasureBoxTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '利用規約 | 計測ボックス MeasureBox',
    description: '計測ボックス(MeasureBox)の利用規約。',
    url: 'https://yaneyuka.com/measurebox-terms',
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
