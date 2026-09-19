import { CheckCircle2 } from 'lucide-react'

interface TrustBannerProps {
  lastReviewed: string
  note?: string
  labTested?: string
  labScope?: string
}

export default function TrustBanner({ lastReviewed, note, labTested, labScope }: TrustBannerProps) {
  const label = labTested
    ? `Tested in a lab ${labTested}${labScope ? `: ${labScope}` : ''}.`
    : `Reviewed against documentation ${lastReviewed}.`

  return (
    <div className="mb-8 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
      <p className="text-sm text-muted">
        <span className="font-medium text-foreground-soft">{label}</span>
        {note && ` ${note}`}
      </p>
    </div>
  )
}
