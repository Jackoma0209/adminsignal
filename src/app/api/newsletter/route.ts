import { NextRequest, NextResponse } from 'next/server'

/**
 * Newsletter subscription endpoint.
 *
 * Provider: MailerLite (https://www.mailerlite.com)
 * Required env vars:
 *   MAILERLITE_API_TOKEN  — MailerLite API token
 *   MAILERLITE_GROUP_ID   — ID of the group/segment to add subscribers to
 */

async function subscribe(email: string): Promise<{ ok: boolean; alreadySubscribed?: boolean }> {
  const token = process.env.MAILERLITE_API_TOKEN!
  const groupId = process.env.MAILERLITE_GROUP_ID!

  // Upsert subscriber
  const upsertRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!upsertRes.ok && upsertRes.status !== 409) {
    return { ok: false }
  }

  const upsertData = await upsertRes.json().catch(() => ({}))
  const subscriberId: string | undefined = upsertData?.data?.id

  if (!subscriberId) return { ok: false }

  const alreadySubscribed = upsertRes.status === 409

  // Add to group
  const groupRes = await fetch(
    `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${groupId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  )

  if (!groupRes.ok && groupRes.status !== 409) {
    return { ok: false }
  }

  return { ok: true, alreadySubscribed }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}))

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  if (!process.env.MAILERLITE_API_TOKEN || !process.env.MAILERLITE_GROUP_ID) {
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
