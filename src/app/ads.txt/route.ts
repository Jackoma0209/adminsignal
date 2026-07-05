import { NextResponse } from 'next/server'
import { ADSENSE_SELLER_PUBLISHER_ID } from '@/lib/consent'

export const dynamic = 'force-static'

// Live AdSense seller Publisher ID for AdminSignal ads.txt.
// Do not use the ca-pub client ID here. ads.txt requires the pub- seller ID.

export function GET() {
  const body = `google.com, ${ADSENSE_SELLER_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`
  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
