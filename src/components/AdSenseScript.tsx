'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { adsenseScriptEnabled, ADSENSE_CLIENT_ID, isAdScriptEligiblePath } from '@/lib/consent'

/**
 * Loads adsbygoogle.js only after NEXT_PUBLIC_ADSENSE_ENABLED is true and a
 * certified CMP is in place. Funding Choices lives in FundingChoicesScript and
 * must not be confused with this ads tag. Keep ads flags false.
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
