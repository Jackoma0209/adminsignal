import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'mb-10',
        isCenter ? 'text-center' : 'flex items-end justify-between gap-6',
        className,
      )}
    >
      <div className={isCenter ? 'mx-auto max-w-2xl' : undefined}>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {action && !isCenter && <div className="shrink-0">{action}</div>}
    </div>
  )
}
