'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { adsenseScriptEnabled, ADSENSE_CLIENT_ID, isAdScriptEligiblePath } from '@/lib/consent'

/**
 * Loads adsbygoogle.js only after a real Google-certified CMP has been configured.
 * Controlled by NEXT_PUBLIC_ADSENSE_ENABLED and NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED.
 * Live ad unit rendering remains separately gated by NEXT_PUBLIC_ADS_ENABLED.
 */
export default function AdSenseScript() {
  const pathname = usePathname()

  if (!adsenseScriptEnabled || !isAdScriptEligiblePath(pathname)) return null

  return (
    <Script
      id="adsense-script"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
