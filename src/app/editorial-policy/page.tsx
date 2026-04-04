import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'How AdminSignal produces, reviews, and maintains content — our standards for accuracy, independence, and transparency.',
}

export default function EditorialPolicyPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Editorial
          </p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Editorial Policy
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: April 2025</p>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Independence</h2>
              <p>
                AdminSignal editorial content is produced independently of any commercial
                relationships. Advertisers and sponsors have no influence over article topics,
                conclusions, or ratings.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Accuracy</h2>
              <p>
                We test scripts, configurations, and procedures before publishing where possible.
                Content is reviewed for technical accuracy against official Microsoft documentation.
                If you find an error, please{' '}
                <a href="/contact" className="text-primary underline underline-offset-2">
                  let us know
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Corrections</h2>
              <p>
                Factual errors are corrected promptly and noted inline when a correction changes
                material advice. We do not silently rewrite published content.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Affiliate &amp; Sponsored Content
              </h2>
              <p>
                Some articles may contain affiliate links or be produced in partnership with a
                vendor. Sponsored or affiliate content is always clearly labelled. Commercial
                relationships do not affect editorial scores or recommendations.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Content Freshness</h2>
              <p>
                Microsoft products evolve rapidly. We review high-traffic articles periodically and
                update them when guidance has changed. The &quot;last updated&quot; date shown on
                articles reflects substantive revisions, not minor formatting edits.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
