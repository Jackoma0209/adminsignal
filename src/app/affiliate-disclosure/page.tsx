import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'AdminSignal participates in affiliate programmes. This page explains how those relationships work and how they affect our content.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Affiliate Disclosure
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: April 2025</p>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">FTC Disclosure</h2>
              <p>
                AdminSignal participates in affiliate advertising programmes. This means that when
                you click certain links on this site and make a purchase or sign up for a service,
                we may earn a commission at no extra cost to you.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">How We Identify Affiliate Links</h2>
              <p>
                Affiliate and sponsored links are marked with{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 text-sm font-mono text-foreground">
                  rel=&quot;sponsored&quot;
                </code>{' '}
                in the page markup. Tool recommendation blocks and &quot;Best Tools&quot; listings
                may contain affiliate links.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Editorial Independence</h2>
              <p>
                Affiliate relationships do not influence which products we recommend, how we rate
                them, or the conclusions we reach in reviews and comparisons. We only recommend
                tools we would genuinely suggest to colleagues. See our{' '}
                <a href="/editorial-policy" className="text-primary underline underline-offset-2">
                  editorial policy
                </a>{' '}
                for full details.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Questions</h2>
              <p>
                If you have questions about a specific recommendation or affiliate relationship,{' '}
                <a href="/contact" className="text-primary underline underline-offset-2">
                  contact us
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
