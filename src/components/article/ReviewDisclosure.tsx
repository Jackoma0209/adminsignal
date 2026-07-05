import { Scale } from 'lucide-react'

interface ReviewDisclosureProps {
  kind: 'review' | 'comparison'
}

export default function ReviewDisclosure({ kind }: ReviewDisclosureProps) {
  const noun = kind === 'review' ? 'review' : 'comparison'

  return (
    <section className="mb-8 rounded-lg border border-border bg-surface p-5">
      <div className="flex gap-3">
        <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <div className="space-y-2 text-sm leading-relaxed text-muted">
          <h2 className="text-sm font-semibold text-foreground">Disclosure and evaluation basis</h2>
          <p>
            This {noun} is written for authorised IT administrators evaluating tools for business
            environments. Editorial conclusions are independent: advertisers, sponsors, and vendors
            do not control ratings, rankings, verdicts, or recommendations.
          </p>
          <p>
            We evaluate operational fit, deployment effort, permissions and security model,
            supportability, rollback options, documentation quality, and licensing clarity. Pricing,
            packaging, features, support terms, and availability can change, so verify current
            details with the vendor before purchasing or renewing.
          </p>
        </div>
      </div>
    </section>
  )
}
