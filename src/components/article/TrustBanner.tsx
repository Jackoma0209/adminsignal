import { CheckCircle2 } from 'lucide-react'

interface TrustBannerProps {
  lastReviewed: string
  note?: string
}

export default function TrustBanner({ lastReviewed, note }: TrustBannerProps) {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
      <p className="text-sm text-muted">
        <span className="font-medium text-foreground-soft">Reviewed and updated {lastReviewed}.</span>
        {note && ` ${note}`}
      </p>
    </div>
  )
}
