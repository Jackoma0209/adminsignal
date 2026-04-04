import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using the AdminSignal website and its content.',
}

export default function TermsPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: April 2026</p>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Acceptance</h2>
              <p>
                By accessing AdminSignal you agree to these terms. If you do not agree, please do
                not use this site.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Content Use</h2>
              <p>
                All content on AdminSignal — articles, scripts, guides, and code samples — is
                provided for informational purposes. You may use code samples in your own
                environments but may not republish or resell site content without written permission.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">No Warranty</h2>
              <p>
                Content is provided &quot;as is&quot; without warranty of any kind. Scripts and
                configurations should be tested in a non-production environment before deployment.
                AdminSignal accepts no liability for damages arising from use of content on this
                site.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Intellectual Property</h2>
              <p>
                The AdminSignal name, logo, and original content are the property of AdminSignal.
                Third-party product names and trademarks are property of their respective owners.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Privacy &amp; Cookies</h2>
              <p>
                Use of this site is also subject to our{' '}
                <a href="/privacy" className="text-primary underline underline-offset-2">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/cookies" className="text-primary underline underline-offset-2">
                  Cookie Policy
                </a>
                , which explain how we collect and process data and how you can manage your
                consent preferences.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Changes</h2>
              <p>
                We may update these terms at any time. Continued use of the site constitutes
                acceptance of the revised terms.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
