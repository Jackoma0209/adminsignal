import Image from 'next/image'
import { Camera, Terminal } from 'lucide-react'

interface EvidenceCalloutProps {
  type?: 'screenshot' | 'output'
  title: string
  capture: string
  redact?: string
  why: string
  image?: string
  imageAlt?: string
}

/**
 * Evidence collection guidance with optional HTML-generated illustrations.
 * These images are not real portal captures or execution evidence.
 */
export default function EvidenceCallout({
  type = 'screenshot',
  title,
  capture,
  redact = 'Tenant name, device names, UPNs, object IDs, serial numbers, and public IP addresses',
  why,
  image,
  imageAlt,
}: EvidenceCalloutProps) {
  const isOutput = type === 'output'
  const Icon = isOutput ? Terminal : Camera

  return (
    <aside className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div className="flex items-start gap-3 border-b border-border px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Evidence to collect
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{title}</p>
        </div>
      </div>

      {image ? (
        <figure className="mx-5 mt-4">
          <div className="overflow-hidden rounded-lg border border-border bg-background-soft">
            <Image
              src={image}
              alt={`Illustrative example: ${imageAlt ?? title}`}
              width={1280}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-2 text-xs leading-relaxed text-muted">
            Illustrative example, generated from a local HTML layout. This is not a tenant screenshot or evidence that the procedure was executed. Collect the equivalent evidence from your authorised environment.
          </figcaption>
        </figure>
      ) : null}

      <dl className="grid gap-4 px-5 py-4 text-sm leading-relaxed text-muted sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted/70">
            What to capture
          </dt>
          <dd className="mt-1">{capture}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted/70">
            Redact before sharing
          </dt>
          <dd className="mt-1">{redact}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted/70">
            Why this evidence matters
          </dt>
          <dd className="mt-1">{why}</dd>
        </div>
      </dl>
    </aside>
  )
}
