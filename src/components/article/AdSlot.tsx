interface AdSlotProps {
  variant?: 'banner' | 'sidebar'
  className?: string
  /**
   * AdSense publisher ID, e.g. "ca-pub-0000000000000000".
   * When both adClient and adSlot are provided, renders a live AdSense unit.
   * Leave unset to render the placeholder.
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
  const sizeClass = isBanner ? 'h-24 w-full' : 'h-64 w-full'

  // Live AdSense unit — swap in adClient + adSlot to activate
  if (adClient && adSlot) {
    return (
      <div className={[sizeClass, className].filter(Boolean).join(' ')} aria-label="Advertisement">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={isBanner ? 'horizontal' : 'rectangle'}
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Placeholder shown until AdSense credentials are configured
  return (
    <div
      className={[
        'flex items-center justify-center rounded-lg border border-border/60 bg-surface/50',
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Advertisement"
      role="complementary"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-muted/30">
        Advertisement
      </span>
    </div>
  )
}
