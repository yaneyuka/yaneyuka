import SheetViewClient from './SheetViewClient';

// 共有コードは実行時に発行されるため、静的生成の対象は空にする
// （share/[code] と同じ扱い）
export async function generateStaticParams(): Promise<Array<{ code: string }>> {
  return [];
}

export default async function SheetPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <SheetViewClient code={code} />;
}
