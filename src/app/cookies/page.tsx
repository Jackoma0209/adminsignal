import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How AdminSignal uses cookies and similar technologies, and how you can control them.',
  alternates: { canonical: 'https://www.adminsignal.com/cookies' },
}

export default function CookiesPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cookie Policy
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: April 2026</p>

          <div className="space-y-6 text-base leading-relaxed text-muted">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. This
                site uses cookies set by trusted third-party services, not our own application
                cookies.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Analytics Cookies</h2>
              <p>
                We use <strong className="text-foreground-soft">Google Analytics 4</strong> to
                understand aggregate traffic patterns — pages visited, referral sources, and
                general device categories. GA4 operates under{' '}
                <strong className="text-foreground-soft">Google Consent Mode v2</strong>: if you
                have not granted consent, analytics runs in cookieless mode and does not store
                identifying data on your device. No personal profile is built without your
                consent.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Advertising Cookies</h2>
              <p>
                This site intends to display ads served by{' '}
                <strong className="text-foreground-soft">Google AdSense</strong>. AdSense may set
                cookies used for ad personalisation, frequency capping, and fraud prevention.
                These cookies are only activated after you grant consent via the consent prompt
                shown on your first visit. You can withdraw or update your consent at any time
                using the cookie preferences link in the site footer.
              </p>
              <p className="mt-2">
                Until a consent management platform (CMP) is fully active on this site, live
                personalised ad serving is not enabled.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Consent Management</h2>
              <p>
                Visitors in regions where consent is legally required (including the EU/EEA and
                UK) will be presented with a consent prompt before any non-essential cookies are
                set. This prompt is delivered through a Google-certified consent management
                platform. Your choices are stored and respected on subsequent visits.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">How to Manage Cookies</h2>
              <p>
                You can control or delete cookies through your browser settings. Note that
                disabling all cookies may affect the functionality of some sites. For more
                information, visit{' '}
                <a
                  href="https://www.aboutcookies.org"
                  className="text-primary underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aboutcookies.org
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Further Information</h2>
              <p>
                See our{' '}
                <a href="/privacy" className="text-primary underline underline-offset-2">
                  Privacy Policy
                </a>{' '}
                for full details on how we handle personal data. Questions? Use our{' '}
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
