import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import StructuredData from '@/components/StructuredData'
import { organizationSchema, aboutPageSchema } from '@/lib/schema'

const description =
  'AdminSignal is a technical resource for IT professionals and sysadmins managing Microsoft environments — Intune, Windows Server, PowerShell, Entra ID, and beyond.'

export const metadata: Metadata = {
  title: 'About AdminSignal',
  description,
  alternates: { canonical: 'https://www.adminsignal.com/about' },
}

export default function AboutPage() {
  const jsonLdOrg = organizationSchema({ description })
  const jsonLdPage = aboutPageSchema({ description })

  return (
    <>
      <StructuredData data={jsonLdOrg} />
      <StructuredData data={jsonLdPage} />

      <div className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">About</p>
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              AdminSignal
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                AdminSignal is a technical resource for IT professionals and sysadmins managing
                Microsoft environments — Intune, Windows Server, PowerShell, Entra ID, and beyond.
              </p>

              <section>
                <h2 className="mb-2 text-lg font-semibold text-foreground">What we cover</h2>
                <p>
                  We publish in-depth tutorials, ready-to-run scripts, honest product reviews, tool
                  comparisons, and timely security news — focused on the tools and platforms that
                  endpoint and infrastructure teams use day to day. Our coverage centres on the
                  Microsoft ecosystem: Intune, Windows Server, Active Directory, Group Policy,
                  Entra ID, Microsoft 365, and PowerShell.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold text-foreground">How content is produced</h2>
                <p>
                  Articles are written by practitioners with hands-on experience in the areas they
                  cover. Scripts are tested before publication where practical. We cross-reference
                  official Microsoft documentation and note version-specific behaviour where it
                  matters. When guidance changes, we update articles and note the revision date — we
                  do not silently rewrite published content.
                </p>
                <p className="mt-3">
                  For full details on our standards, see our{' '}
                  <Link href="/editorial-policy" className="text-primary underline underline-offset-2">
                    Editorial Policy
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold text-foreground">Commercial relationships</h2>
                <p>
                  Some content on AdminSignal contains affiliate links or is produced in partnership
                  with vendors. Commercial relationships are always disclosed clearly and do not
                  influence editorial conclusions. See our{' '}
                  <Link
                    href="/affiliate-disclosure"
                    className="text-primary underline underline-offset-2"
                  >
                    Affiliate Disclosure
                  </Link>{' '}
                  for details.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold text-foreground">Get in touch</h2>
                <p>
                  Found an error? Have a topic you want covered? We read every message.{' '}
                  <Link href="/contact" className="text-primary underline underline-offset-2">
                    Contact us
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
