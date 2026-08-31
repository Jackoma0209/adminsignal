import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'Editorial Policy',
  description:
    'How AdminSignal produces, reviews, and maintains content — our standards for accuracy, independence, and transparency.',
  path: '/editorial-policy',
})

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
          <p className="mb-8 text-sm text-muted">Last updated: August 2026</p>
          <p className="mb-8 text-base leading-relaxed text-muted">
            This policy explains how AdminSignal produces and maintains content. For background on
            the site and who writes for it, see the{' '}
            <a href="/about" className="text-primary underline underline-offset-2">
              About page
            </a>
            .
          </p>
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
                Content is checked against current official Microsoft documentation before
                publication. Scripts, portal paths, and procedures are executed in a lab or tenant
                only when the article says they were. If you find an error, please{' '}
                <a href="/contact" className="text-primary underline underline-offset-2">
                  let us know
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                How verification is labelled
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground">Tested in a tenant or lab:</strong> the
                  commands, portal path, or procedure were run in a named class of environment. The
                  article will say so.
                </li>
                <li>
                  <strong className="text-foreground">Reviewed against documentation:</strong> the
                  article was checked against current Microsoft Learn, MSRC, or product
                  documentation. That is source review, not a claim that every command was executed.
                </li>
                <li>
                  <strong className="text-foreground">Example output only:</strong> sample commands
                  and expected output are illustrative. Adapt them to the estate and test before
                  production use.
                </li>
                <li>
                  <strong className="text-foreground">AI assistance:</strong> drafting tools may be
                  used for structure or copy-edit. Technical claims, sources, and operational
                  recommendations are reviewed before publication. AI output is not published
                  unedited as a finished guide.
                </li>
              </ul>
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
                relationships do not affect editorial scores or recommendations. Advertisers,
                sponsors, and affiliate partners do not control reviews, comparisons, ratings,
                verdicts, rankings, or conclusions.
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
