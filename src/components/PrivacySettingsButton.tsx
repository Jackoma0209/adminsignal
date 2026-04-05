'use client'

declare global {
  interface Window {
    googlefc?: {
      showRevocationMessage: () => void
    }
  }
}

/** Opens the Google AdSense Privacy & Messaging consent revocation dialog. */
export default function PrivacySettingsButton() {
  function handleClick() {
    if (typeof window !== 'undefined' && window.googlefc?.showRevocationMessage) {
      window.googlefc.showRevocationMessage()
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
