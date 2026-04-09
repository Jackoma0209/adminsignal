import Link from 'next/link'
import { ArrowRight, Terminal, Mail } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.022]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Horizontal scanlines — faint terminal feel */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.012]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, #94a3b8 3px, #94a3b8 4px)',
        }}
      />
      {/* Diagonal stripe — subtle depth */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.008]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #3b82f6 0px, #3b82f6 1px, transparent 1px, transparent 60px)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Practitioner-focused IT content
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Intelligence for the{' '}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Modern Sysadmin
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            In-depth guides, scripts, and analysis for endpoint specialists, Windows admins,
            and IT engineers who need signal — not noise.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Browse Latest Signals
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/scripts"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-6 py-3 text-sm font-semibold text-foreground-soft transition-colors hover:border-border-strong hover:text-foreground"
            >
              <Terminal className="h-4 w-4" />
              Browse All Scripts
            </Link>
            <Link
              href="/#newsletter"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary-soft px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary/50"
            >
              <Mail className="h-4 w-4" />
              Get Weekly Digest
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-sm text-muted/70">
            Growing library of real sysadmin guides, scripts &amp; analysis — written for working engineers.
          </p>
        </div>
      </div>
    </section>
  )
}
