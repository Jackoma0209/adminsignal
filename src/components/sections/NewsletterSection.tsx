import Link from 'next/link'
import { Mail, Shield } from 'lucide-react'
import Container from '@/components/layout/Container'
import NewsletterSignupForm from '@/components/sections/NewsletterSignupForm'

export default function NewsletterSection() {
  const newsletterEnabled = Boolean(
    process.env.MAILERLITE_API_TOKEN && process.env.MAILERLITE_GROUP_ID
  )

  // Do not render an inactive newsletter CTA during AdSense review. An unfinished
  // signup form is a common low-value signal; show a complete form only when live.
  if (!newsletterEnabled) {
    return (
      <section className="border-y border-border bg-surface/20 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Stay in the loop
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Corrections, tips, and topic requests welcome
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted">
              Prefer email over forms? Use the contact addresses for editorial corrections,
              guide requests, or privacy questions. New guides are published on the site and
              in the RSS feed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact AdminSignal
              </Link>
              <a
                href="/rss.xml"
                className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                RSS feed
              </a>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section id="newsletter" className="relative overflow-hidden border-y border-border py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.12), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft ring-1 ring-primary/25">
            <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            AdminSignal Weekly
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The signal, every Tuesday.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-muted">
            A curated digest of important security alerts, new guides, and PowerShell
            implementation notes, sent once a week. Practical admin context without vendor pitch-deck language.
          </p>

          <NewsletterSignupForm enabled={newsletterEnabled} />

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted/60">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            <span>No spam. Unsubscribe any time. We never share your email.</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
