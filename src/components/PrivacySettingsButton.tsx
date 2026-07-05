'use client'

import Link from 'next/link'
import { googleCertifiedCmpConfigured } from '@/lib/consent'

declare global {
  interface Window {
    googlefc?: {
      callbackQueue: { push: (fn: () => void) => void }
      showRevocationMessage: () => void
    }
  }
}

/** Opens the configured CMP revocation dialog, or links to policy guidance until CMP setup is complete. */
export default function PrivacySettingsButton() {
  function handleClick() {
    if (typeof window === 'undefined') return
    const fc = window.googlefc
    if (fc?.callbackQueue && typeof fc.showRevocationMessage === 'function') {
      fc.callbackQueue.push(fc.showRevocationMessage)
    } else {
      window.location.href = '/cookies#manage-consent'
    }
  }

  if (!googleCertifiedCmpConfigured) {
    return (
      <Link href="/cookies#manage-consent" className="text-sm text-muted/60 hover:text-foreground-soft">
        Privacy and cookie settings
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm text-muted/60 hover:text-foreground-soft"
    >
      Privacy and cookie settings
    </button>
  )
}
