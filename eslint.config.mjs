import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

// ESLint 9 のフラット設定。Next 16 で `next lint` が廃止されたため、
// `npm run lint` は eslint を直接呼ぶ（package.json 参照）。
export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.firebase/**',
      'out/**',
      'build/**',
      'dist/**',
      'functions/lib/**',
      'functions/node_modules/**',
      'public/**',
      '共有/**',
      'next-env.d.ts',
      // 使い捨ての解析スクリプト類（本番バンドルに入らない）
      'scripts/**',
      'deploy.js',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    // 2026-08-02 に ESLint を再導入した時点で既に存在していた指摘を warn に落とし、
    // `npm run lint` が「これから増える問題」を検出できる状態にする。
    // warn の件数はそのまま技術的負債の残量なので、減らす方向で扱うこと。
    // 内訳: no-explicit-any 211 / set-state-in-effect 96 / immutability 25 /
    //       purity 8 / refs 7 / static-components 4
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/static-components': 'warn',
    },
  },
];
