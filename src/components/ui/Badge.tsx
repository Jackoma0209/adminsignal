import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'category' | 'new' | 'language' | 'difficulty' | 'tool'
  className?: string
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default:    'bg-surface-elevated text-foreground-soft border-border-strong',
  category:   'bg-primary-soft text-primary border-primary/20',
  new:        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  language:   'bg-violet-500/10 text-violet-400 border-violet-500/20',
  difficulty: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  tool:       'bg-surface-elevated text-foreground-soft border-border',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium leading-none',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
