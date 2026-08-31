'use client'

import { fundingChoicesEnabled } from '@/lib/consent'

declare global {
  interface Window {
    googlefc?: {
      callbackQueue?: {
        push: (item: (() => void) | Record<string, () => void>) => number
      }
      showRevocationMessage?: () => void
    }
  }
}

const COOKIES_FALLBACK = '/cookies'

function openFundingChoicesRevocation() {
  if (typeof window === 'undefined') return false
  const fc = window.googlefc
  if (!fc) return false

  if (typeof fc.showRevocationMessage === 'function') {
    if (fc.callbackQueue && typeof fc.callbackQueue.push === 'function') {
      fc.callbackQueue.push(fc.showRevocationMessage)
    } else {
      fc.showRevocationMessage()
    }
    return true
  }

  return false
}

/** Opens the Funding Choices revocation dialog, or /cookies if the CMP is not ready. */
export default function PrivacySettingsButton({
  className = 'text-sm text-muted/60 hover:text-foreground-soft',
}: {
  className?: string
}) {
  function handleClick() {
    if (openFundingChoicesRevocation()) return
    window.location.href = COOKIES_FALLBACK
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-haspopup="dialog"
    >
      Privacy and cookie settings
    </button>
  )
}

export { fundingChoicesEnabled, COOKIES_FALLBACK }
