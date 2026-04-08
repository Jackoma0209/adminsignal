'use client'

declare global {
  interface Window {
    googlefc?: {
      callbackQueue: { push: (fn: () => void) => void }
      showRevocationMessage: () => void
    }
  }
}

/** Opens the Google AdSense Privacy & Messaging consent revocation dialog. */
export default function PrivacySettingsButton() {
  function handleClick() {
    if (typeof window === 'undefined') return
    const fc = window.googlefc
    if (fc?.callbackQueue && typeof fc.showRevocationMessage === 'function') {
      fc.callbackQueue.push(fc.showRevocationMessage)
    }
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
