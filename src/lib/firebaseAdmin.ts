import { createRequire } from 'node:module'
import type { App, ServiceAccount } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import type { Auth } from 'firebase-admin/auth'

// Server-side Firebase Admin 初期化。
// FIREBASE_SERVICE_ACCOUNT_JSON 環境変数にサービスアカウントJSON（文字列）を設定する。
// Firebase Functions / Cloud Run 環境では自動的にADCが使われるためJSONは不要。
// 設定が無い場合は null を返し、呼び出し側でフォールバック動作を選択できる。
//
// ⚠️ firebase-admin は `import` せず、実行時に require で読む。
// Turbopack は firebase-admin を外部パッケージとして扱い、
// `.next/node_modules/firebase-admin-<hash>` という別名のシンボリックリンクを作って
// そこ経由で require するコードを吐く。このリンクの中身は**ビルドしたマシンの絶対パス**
// （例: C:\Users\...\node_modules\firebase-admin）なので、Linux のコンテナに配ると
// 解決できず、このモジュールを使う API ルートが起動時に落ちて 500 になる。
// 動的 require なら静的解析されず別名も作られないため、コンテナ内の実体
// （generated functions/package.json 経由で npm install される）が普通に使われる。
const nodeRequire = createRequire(`${process.cwd()}/`)

type AdminAppModule = {
  cert: (sa: ServiceAccount) => unknown
  getApps: () => App[]
  initializeApp: (options?: object) => App
  applicationDefault: () => unknown
}

let _db: Firestore | null = null
let _initFailed = false

export function getAdminDb(): Firestore | null {
  if (_db) return _db
  if (_initFailed) return null
  try {
    const { cert, getApps, initializeApp, applicationDefault } =
      nodeRequire('firebase-admin/app') as AdminAppModule
    const { getFirestore } = nodeRequire('firebase-admin/firestore') as {
      getFirestore: () => Firestore
    }

    if (getApps().length === 0) {
      const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
      let app: App
      if (json) {
        const serviceAccount = JSON.parse(json)
        app = initializeApp({ credential: cert(serviceAccount) })
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.K_SERVICE) {
        // Cloud Run / Firebase Functions の Application Default Credentials
        app = initializeApp({ credential: applicationDefault() })
      } else {
        console.warn('[firebaseAdmin] サービスアカウント未設定（FIREBASE_SERVICE_ACCOUNT_JSON / ADC）。Firestore蓄積はスキップ。')
        _initFailed = true
        return null
      }
      void app
    }
    _db = getFirestore()
    return _db
  } catch (e) {
    console.error('[firebaseAdmin] init error:', e)
    _initFailed = true
    return null
  }
}

/**
 * Admin Auth。ID トークン検証に使う。
 * 初期化は getAdminDb() と共通なので、そちらを先に呼んで App を用意する。
 */
export function getAdminAuth(): Auth | null {
  if (!getAdminDb()) return null
  try {
    const { getAuth } = nodeRequire('firebase-admin/auth') as { getAuth: () => Auth }
    return getAuth()
  } catch (e) {
    console.error('[firebaseAdmin] auth init error:', e)
    return null
  }
}
