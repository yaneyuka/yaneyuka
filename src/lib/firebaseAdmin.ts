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

// ⚠️ パッケージ名を実行時に組み立てる理由。
//
// createRequire() を使っても、引数が **文字列リテラル** だと Turbopack はそれを
// 静的解析して `firebase-admin-<hash>/app` というビルド時エイリアスに書き換える
// （next.config.js の serverExternalPackages に入れても書き換え自体は起きる）。
// エイリアスの実体は .next/node_modules/ に作られるシンボリックリンクで、中身は
// **ビルドしたマシンの絶対パス**。Linux のコンテナには存在しないため、本番では
//   ERR_MODULE_NOT_FOUND: Cannot find package 'firebase-admin-<hash>'
// で落ち、getAdminDb() が null を返して API が server_unavailable(503) になる。
//
// 文字列リテラルにしなければ解析対象にならず、Node が実行時に
// コンテナ内の node_modules/firebase-admin を普通に解決する
// （firebase-admin は package.json の dependencies にあるので必ず入っている）。
//
// ★ここを 'firebase-admin/...' のリテラルに戻すと本番だけ静かに壊れる。
//   直したら必ず本番の API に実リクエストを投げて確認すること。
const ADMIN_PKG = ['firebase', 'admin'].join('-')

type AdminAppModule = {
  cert: (sa: ServiceAccount) => unknown
  getApps: () => App[]
  initializeApp: (options?: object) => App
  applicationDefault: () => unknown
}

let _app: App | null = null
let _db: Firestore | null = null
let _initFailed = false

/**
 * Admin App を用意する。
 *
 * ⚠️ initializeApp() の戻り値を必ず保持し、getFirestore(app) / getAuth(app) に
 * 明示的に渡すこと。引数なしで呼ぶと「デフォルトアプリ」のレジストリを引きにいくが、
 * firebase-admin/app と firebase-admin/firestore を別々に require している都合上
 * そのレジストリを共有できないことがあり、本番で
 *   app/no-app: The default Firebase app does not exist.
 * になっていた（以前は `void app` で戻り値を捨てていた）。
 */
function getAdminApp(): App | null {
  if (_app) return _app
  const { cert, getApps, initializeApp, applicationDefault } =
    nodeRequire(`${ADMIN_PKG}/app`) as AdminAppModule

  const existing = getApps()
  if (existing.length > 0) {
    _app = existing[0]
    return _app
  }

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (json) {
    _app = initializeApp({ credential: cert(JSON.parse(json) as ServiceAccount) })
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.K_SERVICE) {
    // Cloud Run / Firebase Functions の Application Default Credentials
    _app = initializeApp({ credential: applicationDefault() })
  } else {
    console.warn('[firebaseAdmin] サービスアカウント未設定（FIREBASE_SERVICE_ACCOUNT_JSON / ADC）。Firestore蓄積はスキップ。')
    return null
  }
  return _app
}

export function getAdminDb(): Firestore | null {
  if (_db) return _db
  if (_initFailed) return null
  try {
    const app = getAdminApp()
    if (!app) {
      _initFailed = true
      return null
    }
    const { getFirestore } = nodeRequire(`${ADMIN_PKG}/firestore`) as {
      getFirestore: (app?: App) => Firestore
    }
    _db = getFirestore(app)
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
    const { getAuth } = nodeRequire(`${ADMIN_PKG}/auth`) as { getAuth: (app?: App) => Auth }
    // getFirestore と同じ理由で、App を明示的に渡す
    return getAuth(_app ?? undefined)
  } catch (e) {
    console.error('[firebaseAdmin] auth init error:', e)
    return null
  }
}

/**
 * FieldValue（increment / serverTimestamp などの番兵値）。
 *
 * ⚠️ `import { FieldValue } from 'firebase-admin/firestore'` と静的に書いてはいけない。
 * 上のコメントのとおり Turbopack が firebase-admin をビルドマシンの絶対パス経由で
 * 参照するコードを吐くため、Linux のコンテナではモジュール解決に失敗し、
 * そのルートが起動時に落ちて 500 を返すようになる（本文もJSONではなく
 * "Internal Server Error" になるので、ルート内の try/catch では拾えない）。
 */
export function getFieldValue(): typeof import('firebase-admin/firestore').FieldValue | null {
  if (!getAdminDb()) return null
  try {
    const { FieldValue } = nodeRequire(`${ADMIN_PKG}/firestore`) as {
      FieldValue: typeof import('firebase-admin/firestore').FieldValue
    }
    return FieldValue
  } catch (e) {
    console.error('[firebaseAdmin] FieldValue load error:', e)
    return null
  }
}
