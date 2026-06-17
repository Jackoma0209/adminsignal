import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms governing access to AdminSignal articles, scripts, examples, advertising, and related resources.',
}

const linkClass = 'text-primary underline underline-offset-2'

export default function TermsPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mb-8 text-sm text-muted">Last updated: June 2026</p>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              These Terms of Use govern your access to and use of AdminSignal. By using this site,
              you agree to these terms. If you do not agree, please do not use the site.
            </p>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Acceptance of Terms</h2>
              <p>
                AdminSignal provides technical articles, scripts, examples, commentary, and related
                resources for sysadmins, endpoint engineers, Microsoft 365 administrators, and other
                technical professionals.
              </p>
              <p className="mt-3">
                By accessing or using AdminSignal, you agree to follow these Terms of Use and any
                applicable laws.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Intellectual Property</h2>
              <p>
                Unless otherwise stated, the original articles, guides, scripts, code examples,
                layout, branding, and other content on AdminSignal are owned by AdminSignal or its
                author.
              </p>
              <p className="mt-3">
                You may not copy, republish, sell, scrape, syndicate, or redistribute substantial
                portions of AdminSignal content without written permission.
              </p>
              <p className="mt-3">
                Third-party product names, trademarks, logos, and brands remain the property of
                their respective owners. References to Microsoft, Windows, Intune, PowerShell,
                Microsoft 365, Google, or other vendors do not imply endorsement.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Use of Content &amp; Scripts
              </h2>
              <p>
                AdminSignal publishes practical technical material intended for experienced IT
                professionals.
              </p>
              <p className="mt-3">
                You may use code samples, scripts, commands, and configuration examples from
                AdminSignal in your own internal lab, test, or production environments, provided
                that you are responsible for reviewing, testing, and adapting them to your
                requirements.
              </p>
              <p className="mt-3">You may not:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Repackage AdminSignal content as your own</li>
                <li>Sell or resell AdminSignal articles, scripts, or guides</li>
                <li>Use automated scraping to copy site content at scale</li>
                <li>Remove attribution or copyright notices</li>
                <li>Use the site in a way that disrupts, abuses, or overloads the service</li>
              </ul>
              <p className="mt-3">
                Technical environments vary. Always review scripts and configuration changes before
                running them, especially where administrative privileges, production systems,
                identity services, endpoint security, or tenant-wide settings are involved.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Disclaimers</h2>
              <p>
                AdminSignal content is provided for informational and educational purposes only.
              </p>
              <p className="mt-3">
                Although we aim to publish accurate, tested, practitioner-written technical
                material, no article, script, or example can account for every environment,
                dependency, policy, or business requirement.
              </p>
              <p className="mt-3">
                Content is provided &quot;as is&quot; without warranties of any kind, express or
                implied. AdminSignal does not guarantee that:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Content will be error-free or complete</li>
                <li>Scripts will work in every environment</li>
                <li>Guidance will remain current after publication</li>
                <li>The site will always be available</li>
                <li>A configuration will be suitable for your specific organisation</li>
              </ul>
              <p className="mt-3">
                You are responsible for testing, validating, and approving any technical change
                before applying it.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, AdminSignal and its author are not liable
                for any direct, indirect, incidental, consequential, special, or punitive damages
                arising from your use of the site or reliance on its content.
              </p>
              <p className="mt-3">
                This includes, without limitation, loss of data, service interruption, security
                incidents, tenant misconfiguration, business disruption, lost profits, or damage
                caused by running scripts, commands, or configuration changes based on site content.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Third-Party Links and Services
              </h2>
              <p>
                AdminSignal may link to third-party websites, documentation, repositories, tools,
                products, or services. These links are provided for reference and convenience.
              </p>
              <p className="mt-3">
                We do not control third-party sites and are not responsible for their content,
                availability, security, privacy practices, or accuracy.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Advertising</h2>
              <p>
                AdminSignal may display advertising, including ads served by Google AdSense.
                Advertising helps support the operation of the site.
              </p>
              <p className="mt-3">
                Advertising content may be selected or delivered by third-party vendors according to
                their own systems, policies, and privacy practices. See our{' '}
                <a href="/privacy" className={linkClass}>
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/cookies" className={linkClass}>
                  Cookie Policy
                </a>{' '}
                for more information.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Privacy and Cookies</h2>
              <p>Use of AdminSignal is also governed by our:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>
                  <a href="/privacy" className={linkClass}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/cookies" className={linkClass}>
                    Cookie Policy
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                These policies explain how we handle limited visitor data, analytics, advertising
                cookies, and consent choices.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Changes to the Site or Terms
              </h2>
              <p>
                We may update, remove, or change site content at any time. We may also update these
                Terms of Use from time to time.
              </p>
              <p className="mt-3">
                The updated terms will be posted on this page with a revised &quot;Last updated&quot;
                date. Continued use of the site after changes are posted means you accept the
                updated terms.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Governing Law</h2>
              <p>
                These Terms are governed by the laws applicable in the jurisdiction where
                AdminSignal is owned and operated, without regard to conflict-of-law rules, unless
                applicable local law requires otherwise.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
              <p>
                For questions about these Terms of Use, please use the{' '}
                <a href="/contact" className={linkClass}>
                  contact page
                </a>
                {'.'}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
