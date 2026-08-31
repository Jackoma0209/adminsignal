'use client'

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
  if (!fc || typeof fc.showRevocationMessage !== 'function') return false

  if (fc.callbackQueue && typeof fc.callbackQueue.push === 'function') {
    fc.callbackQueue.push(fc.showRevocationMessage)
  } else {
    fc.showRevocationMessage()
  }
  return true
}

function cmpDialogLooksOpen() {
  return Boolean(
    document.querySelector(
      '[id*="googlefc" i], [class*="fc-dialog" i], [class*="fc-consent" i], iframe[src*="fundingchoices"]',
    ),
  )
}

/** Opens the Funding Choices revocation dialog, or /cookies if no dialog appears. */
export default function PrivacySettingsButton({
  className = 'text-sm text-muted/60 hover:text-foreground-soft',
}: {
  className?: string
}) {
  function handleClick() {
    const attempted = openFundingChoicesRevocation()
    if (!attempted) {
      window.location.assign(COOKIES_FALLBACK)
      return
    }

    window.setTimeout(() => {
      if (!cmpDialogLooksOpen()) {
        window.location.assign(COOKIES_FALLBACK)
      }
    }, 700)
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
