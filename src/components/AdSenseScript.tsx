'use client'

import Script from 'next/script'
import { adsenseScriptEnabled, ADSENSE_PUBLISHER_ID } from '@/lib/consent'

/**
 * Loads adsbygoogle.js so the AdSense Privacy & Messaging CMP can surface consent dialogs.
 * Controlled by NEXT_PUBLIC_ADSENSE_ENABLED — independent of live ad unit rendering.
 */
export default function AdSenseScript() {
  if (!adsenseScriptEnabled) return null

  return (
    <Script
      id="adsense-script"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
