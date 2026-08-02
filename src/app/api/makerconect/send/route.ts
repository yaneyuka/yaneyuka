import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { isPurpose, resolveManufacturerEmail } from '@/lib/makerContacts'

export const runtime = 'nodejs'

// シンプルなインメモリレート制限（IPベース、1分あたり3リクエスト）
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 3

const MAX_BODY_LEN = 5000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(req: NextRequest) {
  try {
    // レート制限
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
    }

    const body = await req.json()
    const { category, manufacturer, purpose, text } = body

    // 宛先はクライアントから受け取らず、サーバー側のレジストリから解決する。
    // `to` を受け付けるとオープンメールリレーになり、第三者宛のなりすまし送信に悪用される。
    const to = resolveManufacturerEmail(category, manufacturer)
    if (!to) {
      return NextResponse.json({ error: 'unknown_recipient' }, { status: 400 })
    }
    if (!isPurpose(purpose)) {
      return NextResponse.json({ error: 'invalid_purpose' }, { status: 400 })
    }
    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
    }
    if (text.length > MAX_BODY_LEN) {
      return NextResponse.json({ error: 'field too long' }, { status: 400 })
    }

    // 件名もサーバー側で組み立てる（クライアント指定の文字列は使わない）
    const subject =
      purpose === '打合せ依頼'
        ? 'yaneyuka.comより打合せ依頼が届いています'
        : `yaneyuka.comより${purpose}が届いています`

    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM || user

    // 開発中や未設定時はドライラン
    if (!host || !port || !user || !pass || !from) {
      console.log('[makerconect/send] DRY RUN =>', { to, subject, text: text.slice(0, 100) })
      return NextResponse.json({ ok: true, dryRun: true })
    }

    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
    await transporter.sendMail({ from, to, subject, text })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[makerconect/send] error', e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
