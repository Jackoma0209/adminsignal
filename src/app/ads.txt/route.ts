import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

// pub- ID is read from the env var at build time so there is one source of truth.
// Set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX in Vercel / .env.local.
// The fallback below is the approved publisher ID — update it here if the env var is not set.
const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? 'ca-pub-5563142788194204'

export function GET() {
  const body = `google.com, ${PUB_ID}, DIRECT, f08c47fec0942fa0\n`
  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
