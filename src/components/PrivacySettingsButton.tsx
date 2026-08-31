'use client'

declare global {
  interface Window {
    googlefc?: {
      showRevocationMessage?: () => void
    }
  }
}

const COOKIES_FALLBACK = '/cookies'

function openFundingChoicesRevocation() {
  if (typeof window === 'undefined') return false
  const fc = window.googlefc
  if (!fc || typeof fc.showRevocationMessage !== 'function') return false

  try {
    fc.showRevocationMessage()
    return true
  } catch {
    return false
  }
}

function cmpDialogLooksOpen() {
  const candidates = document.querySelectorAll<HTMLElement>(
    '[role="dialog"], [class*="fc-dialog" i], [class*="fc-consent" i], iframe[src*="fundingchoices" i], iframe[name^="googlefc" i]',
  )

  return Array.from(candidates).some((candidate) => {
    if (candidate.getAttribute('name') === 'googlefcPresent') return false

    const styles = window.getComputedStyle(candidate)
    const bounds = candidate.getBoundingClientRect()
    return (
      styles.display !== 'none' &&
      styles.visibility !== 'hidden' &&
      Number(styles.opacity || '1') > 0 &&
      bounds.width > 1 &&
      bounds.height > 1
    )
  })
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

    // showRevocationMessage reloads the Funding Choices script, so allow time
    // for its cross-origin dialog to render before using the policy fallback.
    window.setTimeout(() => {
      if (!cmpDialogLooksOpen()) {
        window.location.assign(COOKIES_FALLBACK)
      }
    }, 2500)
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
