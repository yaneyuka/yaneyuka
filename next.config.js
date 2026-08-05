/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  // firebase-admin を Next のファイル追跡から外し、実行時に node_modules から
  // 解決させる。追跡させると .next/node_modules/ に「ビルドしたマシンの絶対パス」を
  // 指すシンボリックリンクが作られ、Linux のコンテナ上では解決できず、
  // このパッケージを使う API ルートが 500 を返す。
  serverExternalPackages: ['firebase-admin'],
  reactStrictMode: false, // Leafletマップの初期化エラーを防ぐため
  turbopack: {}, // 空の設定でエラーを回避（実際には--webpackフラグでwebpackを使用）
  // 画像最適化: 環境変数で制御可能（デフォルトは無効化）
  // NEXT_PUBLIC_ENABLE_IMAGE_OPTIMIZATION=true で有効化
  images: {
    unoptimized: process.env.NEXT_PUBLIC_ENABLE_IMAGE_OPTIMIZATION !== 'true',
    ...(process.env.NEXT_PUBLIC_ENABLE_IMAGE_OPTIMIZATION === 'true' && {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    }),
  },
  async headers() {
    return [
      {
        source: '/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // キルスイッチSWが既存ユーザーに確実に配信されるよう、sw.jsはキャッシュさせない
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
