import { adsEnabled, ADSENSE_CLIENT_ID } from '@/lib/consent'

interface AdSlotProps {
  variant?: 'banner' | 'sidebar'
  className?: string
  /**
   * AdSense client ID. Defaults to AdminSignal's configured ca-pub value.
   * When adSlot is provided and ads are enabled, renders a live AdSense unit.
   * Leave adSlot unset to render the development placeholder only.
   */
  adClient?: string
  /**
   * AdSense ad slot ID, e.g. "1234567890".
   * See AdSense → Ads → By ad unit for the slot value.
   */
  adSlot?: string
}

export default function AdSlot({ variant = 'banner', className, adClient, adSlot }: AdSlotProps) {
  const isBanner = variant === 'banner'
  // min-height communicates the reserved space to AdSense — the CSS class
  // `ad-slot-wrapper` collapses the container when the <ins> is empty (blocked).
  const minHeight = isBanner ? '90px' : '250px'

  // Live AdSense unit — requires adsEnabled flag + valid adClient + adSlot.
  // Set NEXT_PUBLIC_ADS_ENABLED=true and wire a CMP before activating.
  const clientId = adClient ?? ADSENSE_CLIENT_ID

  if (adsEnabled && clientId && adSlot) {
    return (
      <div
        className={['ad-slot-wrapper w-full overflow-hidden', className].filter(Boolean).join(' ')}
        aria-label="Advertisement"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight }}
          data-ad-client={clientId}
          data-ad-slot={adSlot}
          data-ad-format={isBanner ? 'horizontal' : 'rectangle'}
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Placeholder shown until AdSense credentials are configured.
  // Hidden in production-preview so layout matches ad-free experience.
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div
      className={[
        'flex items-center justify-center rounded-lg border border-dashed border-border/40 bg-surface/30',
        isBanner ? 'h-22.5 w-full' : 'h-62.5 w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-muted/20">
        Ad slot · {variant}
      </span>
    </div>
  )
}
