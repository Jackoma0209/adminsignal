interface AdSlotProps {
  variant?: 'banner' | 'sidebar'
  className?: string
}

export default function AdSlot({ variant = 'banner', className }: AdSlotProps) {
  const isBanner = variant === 'banner'

  return (
    <div
      className={[
        'flex items-center justify-center rounded-lg border border-border/60 bg-surface/50',
        isBanner ? 'h-24 w-full' : 'h-64 w-full',
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
