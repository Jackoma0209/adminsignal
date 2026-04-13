/**
 * Checklist — Server Component
 *
 * Renders a scannable checklist card for use in MDX content.
 * Ideal for prerequisites, action item lists, and parameter summaries.
 *
 * Usage in MDX:
 *   <Checklist items={["Item one", "Item two", "Item three"]} />
 *   <Checklist title="Prerequisites" items={["Intune P1 licence", "Entra ID join"]} />
 *   <Checklist title="What to do" variant="action" items={["Step A", "Step B"]} />
 */

import { Check, ListChecks } from 'lucide-react'

interface ChecklistProps {
  /**
   * List of plain-text items. Each renders on its own row with a check icon.
   * Markdown is not parsed — use plain strings or JSX for rich content.
   */
  items: string[]
  /** Optional heading shown above the list. */
  title?: string
  /**
   * Visual variant:
   * - `default`  — emerald check icons, neutral card (checklists, prerequisites)
   * - `action`   — blue check icons, blue-tinted card (action items, next steps)
   * - `warning`  — amber check icons, amber-tinted card (caveats, review items)
   */
  variant?: 'default' | 'action' | 'warning'
}

const variantStyles = {
  default: {
    card: 'border-border bg-surface/60',
    icon: 'text-emerald-400',
    titleIcon: 'text-emerald-400/70',
    title: 'text-foreground',
  },
  action: {
    card: 'border-primary/20 bg-primary/5',
    icon: 'text-primary',
    titleIcon: 'text-primary/70',
    title: 'text-foreground',
  },
  warning: {
    card: 'border-amber-500/25 bg-amber-500/5',
    icon: 'text-amber-400',
    titleIcon: 'text-amber-400/70',
    title: 'text-foreground',
  },
} as const

export default function Checklist({
  items,
  title,
  variant = 'default',
}: ChecklistProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`not-prose my-5 rounded-xl border p-5 ${styles.card}`}>
      {title && (
        <div className="mb-4 flex items-center gap-2">
          <ListChecks className={`h-4 w-4 shrink-0 ${styles.titleIcon}`} aria-hidden="true" />
          <span className={`text-sm font-semibold uppercase tracking-wider ${styles.title}`}>
            {title}
          </span>
        </div>
      )}

      <ul className="space-y-2.5" role="list">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${styles.icon}`}
              aria-hidden="true"
            />
            <span className="text-sm leading-relaxed text-foreground-soft">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
