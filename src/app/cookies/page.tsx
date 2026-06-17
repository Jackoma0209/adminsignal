import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How AdminSignal uses cookies and similar technologies for site operation, analytics, advertising, and consent management.',
  alternates: { canonical: 'https://www.adminsignal.com/cookies' },
}

const linkClass = 'break-all text-primary underline underline-offset-2'

export default function CookiesPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cookie Policy
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: June 2026</p>

          <div className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              This Cookie Policy explains how AdminSignal uses cookies and similar technologies for
              site operation, analytics, advertising, and consent management.
            </p>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">What Cookies Are</h2>
              <p>
                Cookies are small text files stored on your device by a website or third-party
                service. They help websites remember settings, measure usage, secure services, and
                provide advertising or analytics features.
              </p>
              <p className="mt-3">
                Similar technologies may include local storage, pixels, tags, and device
                identifiers.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Types of Cookies We Use</h2>
              <p>
                AdminSignal uses the following categories of cookies and similar technologies:
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                <table className="min-w-[640px] divide-y divide-border text-left text-sm leading-relaxed">
                  <thead className="bg-surface/60 text-xs uppercase tracking-widest text-muted/70">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Purpose
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Provider Examples
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Consent Required
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <th scope="row" className="px-4 py-3 font-semibold text-foreground-soft">
                        Strictly necessary
                      </th>
                      <td className="px-4 py-3">Site operation, security, and consent storage</td>
                      <td className="px-4 py-3">AdminSignal, hosting and security providers</td>
                      <td className="px-4 py-3">Usually not</td>
                    </tr>
                    <tr>
                      <th scope="row" className="px-4 py-3 font-semibold text-foreground-soft">
                        Analytics
                      </th>
                      <td className="px-4 py-3">Measure traffic, page views, and usage trends</td>
                      <td className="px-4 py-3">Google Analytics 4</td>
                      <td className="px-4 py-3">Yes, where applicable</td>
                    </tr>
                    <tr>
                      <th scope="row" className="px-4 py-3 font-semibold text-foreground-soft">
                        Advertising
                      </th>
                      <td className="px-4 py-3">Serve ads, measure performance, prevent fraud</td>
                      <td className="px-4 py-3">Google AdSense</td>
                      <td className="px-4 py-3">Yes, where applicable</td>
                    </tr>
                    <tr>
                      <th scope="row" className="px-4 py-3 font-semibold text-foreground-soft">
                        Preference
                      </th>
                      <td className="px-4 py-3">Remember privacy and cookie choices</td>
                      <td className="px-4 py-3">AdminSignal or consent management provider</td>
                      <td className="px-4 py-3">Usually not</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Analytics Cookies</h2>
              <p>
                AdminSignal uses <strong className="text-foreground-soft">Google Analytics 4</strong>{' '}
                to understand how visitors use the site. This helps us improve guides, scripts,
                topic coverage, navigation, and performance.
              </p>
              <p className="mt-3">Google Analytics may collect information such as:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Pages viewed</li>
                <li>Referring websites</li>
                <li>Browser and device type</li>
                <li>Approximate location</li>
                <li>Time spent on pages</li>
              </ul>
              <p className="mt-3">
                AdminSignal uses Google Consent Mode v2 where applicable. If analytics consent is
                not granted, analytics cookies are not set, and Google Analytics operates with
                limited measurement.
              </p>
              <p className="mt-3">
                You can opt out of Google Analytics using Google&apos;s browser add-on:{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Advertising Cookies</h2>
              <p>
                AdminSignal uses, or may use,{' '}
                <strong className="text-foreground-soft">Google AdSense</strong> to display
                advertisements.
              </p>
              <p className="mt-3">
                Google AdSense and advertising partners may use cookies and similar technologies
                to:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Serve ads on AdminSignal</li>
                <li>Personalise ads where consent and applicable law allow</li>
                <li>Measure ad impressions and interactions</li>
                <li>Prevent fraud and abuse</li>
                <li>Limit how often the same ad is shown</li>
              </ul>
              <p className="mt-3">
                Google&apos;s use of advertising cookies may allow Google and its partners to serve
                ads based on visits to AdminSignal and/or other websites.
              </p>
              <p className="mt-3">
                You can manage Google ad personalisation here:{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.google.com/settings/ads
                </a>
              </p>
              <p className="mt-3">
                You can also opt out of some third-party personalised advertising here:{' '}
                <a
                  href="http://www.aboutads.info/choices/"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://www.aboutads.info/choices/
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Consent Management</h2>
              <p>
                Visitors in regions where cookie consent is required, including the UK and EU/EEA,
                are shown a consent prompt before non-essential analytics or advertising cookies
                are used.
              </p>
              <p className="mt-3">
                You can accept, reject, or customise cookie categories. You can update or withdraw
                your consent at any time using the privacy or cookie settings link in the site
                footer.
              </p>
              <p className="mt-3">
                Withdrawing consent does not remove cookies that were already stored. You can delete
                existing cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Managing Cookies in Your Browser
              </h2>
              <p>Most browsers allow you to block, delete, or limit cookies. Common options include:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Blocking third-party cookies</li>
                <li>Deleting cookies for a specific site</li>
                <li>Clearing all cookies</li>
                <li>Using private/incognito mode</li>
                <li>Enabling tracking protection</li>
              </ul>
              <p className="mt-3">
                Blocking all cookies may affect some website functionality, especially consent
                preferences.
              </p>
              <p className="mt-3">
                General cookie guidance is available here:{' '}
                <a
                  href="https://www.aboutcookies.org"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.aboutcookies.org
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy when our analytics, advertising, consent, or site
                infrastructure changes. Updates will be posted on this page with a revised
                &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
              <p>
                For questions about this Cookie Policy, use the{' '}
                <a href="/contact" className="text-primary underline underline-offset-2">
                  contact page
                </a>{' '}
                and include &quot;Cookie Policy&quot; in your message.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
