import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'AdminSignal may participate in affiliate programmes. This page explains how those relationships work and how they affect our content.',
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
          <p className="mb-8 text-sm text-muted">Last updated: April 2026</p>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Disclosure</h2>
              <p>
                AdminSignal may participate in affiliate advertising programmes. Where an affiliate
                relationship exists and a link could result in a commission, that link is clearly
                marked with{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 text-sm font-mono text-foreground">
                  rel=&quot;sponsored&quot;
                </code>{' '}
                in the page markup. Most links on this site go directly to official product or
                documentation pages and are not affiliate links.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Current State</h2>
              <p>
                At the time of this writing, AdminSignal does not have active affiliate arrangements
                in place. Tool and product links point to each vendor&apos;s official site. This
                page will be updated if and when affiliate programmes are established.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Editorial Independence</h2>
              <p>
                Commercial relationships — affiliate or otherwise — do not influence which products
                we recommend, how we rate them, or the conclusions we reach in reviews and
                comparisons. We only recommend tools we would genuinely suggest to colleagues. See
                our{' '}
                <a href="/editorial-policy" className="text-primary underline underline-offset-2">
                  editorial policy
                </a>{' '}
                for full details.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Questions</h2>
              <p>
                If you have questions about a specific recommendation,{' '}
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
