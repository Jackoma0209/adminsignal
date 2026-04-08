import { NextRequest, NextResponse } from 'next/server'

/**
 * Newsletter subscription endpoint.
 *
 * Provider: Buttondown (https://buttondown.com)
 * Required env var: NEWSLETTER_API_KEY — Buttondown API key.
 *
 * To swap providers, replace only the `subscribe` function below.
 * The route contract (request shape, response shape) stays the same.
 */

async function subscribe(email: string): Promise<{ ok: boolean; alreadySubscribed?: boolean }> {
  const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.NEWSLETTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_address: email, type: 'regular' }),
  })

  if (res.ok) return { ok: true }

  // Buttondown returns 400 + "already_subscribed" code for duplicates
  if (res.status === 400) {
    const body = await res.json().catch(() => ({}))
    if (JSON.stringify(body).includes('already_subscribed')) {
      return { ok: true, alreadySubscribed: true }
    }
  }

  return { ok: false }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}))

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  if (!process.env.NEWSLETTER_API_KEY) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  try {
    const result = await subscribe(email.trim().toLowerCase())
    if (result.ok) {
      return NextResponse.json({ ok: true, alreadySubscribed: result.alreadySubscribed ?? false })
    }
    return NextResponse.json({ error: 'provider_error' }, { status: 502 })
  } catch {
    return NextResponse.json({ error: 'provider_error' }, { status: 502 })
  }
}
