import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How AdminSignal collects, uses, and protects information about visitors to this site.',
}

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: April 2025</p>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Information We Collect</h2>
              <p>
                AdminSignal collects standard server logs (IP address, browser type, pages visited,
                referring URL) when you visit this site. We may also collect information you
                voluntarily submit via contact forms.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Analytics</h2>
              <p>
                We use privacy-respecting analytics to understand aggregate traffic patterns. No
                personally identifiable information is shared with third-party analytics providers.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Cookies</h2>
              <p>
                This site may use cookies for functional purposes such as remembering preferences.
                We do not use third-party tracking or advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Third-Party Links</h2>
              <p>
                Articles may contain links to external sites. We are not responsible for the privacy
                practices or content of those sites.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
              <p>
                If you have questions about this policy, please use our{' '}
                <a href="/contact" className="text-primary underline underline-offset-2">
                  contact page
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
