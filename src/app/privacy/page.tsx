import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What AdminSignal collects, how we use it, and how visitors can manage privacy and cookie choices.',
}

const linkClass = 'break-words text-primary underline underline-offset-2'

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: June 2026</p>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              AdminSignal publishes technical guides, scripts, and analysis for enterprise
              sysadmins, endpoint engineers, and Microsoft 365 administrators. This Privacy Policy
              explains what we collect, how we use it, and how visitors can manage their privacy
              and cookie choices.
            </p>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Information We Collect</h2>
              <p>
                When you visit AdminSignal, we may collect limited technical information
                automatically, including:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited</li>
                <li>Date and time of visit</li>
                <li>Referring URL</li>
                <li>General location derived from technical signals such as IP address</li>
                <li>Server log information used for security, diagnostics, and abuse prevention</li>
              </ul>
              <p className="mt-3">
                If you contact us through the site, we may also collect the information you choose
                to provide, such as your name, email address, message content, and any technical
                details included in your request.
              </p>
              <p className="mt-3">
                AdminSignal does not require user accounts, does not process payments, and does
                not intentionally collect sensitive personal information.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">How We Use Information</h2>
              <p>
                We use collected information to:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Operate, maintain, and secure the website</li>
                <li>Understand which articles, scripts, and technical topics are useful to readers</li>
                <li>Diagnose technical issues and prevent abuse</li>
                <li>Respond to messages submitted through the contact page</li>
                <li>Improve site content, navigation, and performance</li>
                <li>Measure traffic and aggregate usage trends</li>
                <li>Display and measure advertising where permitted</li>
                <li>Comply with applicable legal, security, and platform requirements</li>
              </ul>
              <p className="mt-3">We do not sell visitor personal information.</p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Analytics</h2>
              <p>
                AdminSignal uses <strong className="text-foreground-soft">Google Analytics 4</strong>{' '}
                to understand aggregate traffic patterns, such as page views, referral sources,
                device categories, approximate location, and article performance.
              </p>
              <p className="mt-3">
                Google Analytics 4 helps us improve technical content and site usability. We do not
                use Google Analytics to identify individual readers.
              </p>
              <p className="mt-3">
                AdminSignal uses Google Consent Mode v2 where applicable. Consent Mode allows
                Google tags to adjust their behaviour based on your consent choices for analytics
                storage, advertising storage, ad user data, and ad personalisation. If analytics
                consent is not granted, analytics cookies are not set by our Google tags, and
                measurement is limited.
              </p>
              <p className="mt-3">
                You can also opt out of Google Analytics using Google&apos;s browser add-on:{' '}
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
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Advertising &amp; Google AdSense
              </h2>
              <p>
                AdminSignal uses, or may use, <strong className="text-foreground-soft">Google AdSense</strong>{' '}
                to display advertising. AdSense and other third-party advertising vendors may use
                cookies, device identifiers, IP addresses, and similar technologies for ad serving,
                measurement, fraud prevention, and personalisation where permitted.
              </p>
              <p className="mt-3">Google requires publishers using AdSense to disclose the following:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Third-party vendors, including Google, use cookies to serve ads based on a
                  user&apos;s prior visits to your website or other websites.
                </li>
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads
                  to your users based on their visit to your sites and/or other sites on the
                  Internet.
                </li>
                <li>
                  Users may opt out of personalised advertising by visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.google.com/settings/ads
                  </a>
                  {
                    ". Alternatively, users can opt out of a third-party vendor's use of cookies for personalised advertising by visiting "
                  }
                  <a
                    href="http://www.aboutads.info/choices/"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://www.aboutads.info/choices/
                  </a>
                  {'.'}
                </li>
              </ul>
              <p className="mt-3">
                You can learn more about how Google uses information from sites that use its
                services here:{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://policies.google.com/technologies/partner-sites
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Cookies</h2>
              <p>
                AdminSignal uses cookies and similar technologies for analytics, advertising,
                consent management, and site security.
              </p>
              <p className="mt-3">Cookies may be set by:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>AdminSignal, for basic site operation or consent preferences</li>
                <li>Google Analytics 4, for analytics where consent permits</li>
                <li>
                  Google AdSense, for advertising, measurement, fraud prevention, and
                  personalisation where consent permits
                </li>
                <li>Other trusted service providers involved in hosting, security, or site delivery</li>
              </ul>
              <p className="mt-3">
                Visitors in regions where consent is required, including the UK and EU/EEA, are
                presented with cookie choices before non-essential cookies are used. You can update
                or withdraw your choices at any time using the privacy or cookie settings link in
                the site footer.
              </p>
              <p className="mt-3">
                For more detail, see our{' '}
                <a href="/cookies" className={linkClass}>
                  Cookie Policy
                </a>
                {'.'}
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Third-Party Links</h2>
              <p>
                AdminSignal articles may link to third-party websites, documentation, vendor
                portals, GitHub repositories, Microsoft Learn pages, product documentation, or other
                external resources.
              </p>
              <p className="mt-3">
                We are not responsible for the privacy practices, content, or security of
                third-party sites. You should review the privacy policies of any external site you
                visit.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Data Retention</h2>
              <p>
                We keep personal information only for as long as reasonably necessary for the
                purpose it was collected.
              </p>
              <p className="mt-3">Typical retention includes:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Server logs retained for security, diagnostics, and abuse prevention</li>
                <li>
                  Contact form messages retained as long as needed to respond and maintain
                  appropriate records
                </li>
                <li>Analytics data retained according to the configured Google Analytics retention settings</li>
                <li>Consent records retained as needed to respect and document visitor choices</li>
              </ul>
              <p className="mt-3">
                Aggregated or anonymised analytics data may be retained for longer because it does
                not identify individual visitors.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Your Rights</h2>
              <p>Depending on your location, you may have rights to:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Request access to personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of personal information</li>
                <li>Object to or restrict certain processing</li>
                <li>Withdraw cookie or advertising consent</li>
                <li>Opt out of personalised advertising</li>
                <li>Lodge a complaint with a relevant data protection authority</li>
              </ul>
              <p className="mt-3">
                To make a privacy request, use our{' '}
                <a href="/contact" className={linkClass}>
                  contact page
                </a>{' '}
                and include &quot;Privacy Request&quot; in your message.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Children&apos;s Privacy</h2>
              <p>
                AdminSignal is a professional technical website intended for IT professionals and
                technical readers. It is not directed at children, and we do not knowingly collect
                personal information from children.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Security</h2>
              <p>
                We use reasonable technical and organisational measures to protect the site and the
                limited information we process. No website or transmission method is completely
                secure, but we take practical steps to reduce risk.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in the site,
                advertising tools, analytics configuration, or legal requirements. The updated
                version will be posted on this page with a revised &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
              <p>
                For privacy questions or requests, please use the{' '}
                <a href="/contact" className={linkClass}>
                  contact page
                </a>{' '}
                and include &quot;Privacy Request&quot; in your message.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
