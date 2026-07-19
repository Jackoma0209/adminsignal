import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpenCheck, CheckCircle2, ExternalLink, FileWarning, Mail, ShieldCheck } from 'lucide-react'
import Container from '@/components/layout/Container'
import StructuredData from '@/components/StructuredData'
import { primaryAuthor } from '@/data/authors'

const SITE_URL = 'https://www.adminsignal.com'
const ABOUT_URL = `${SITE_URL}/about`
const AUTHOR_ID = `${ABOUT_URL}#jack`
const ORGANIZATION_ID = `${SITE_URL}#organization`

const title = 'About Jack and AdminSignal'
const description =
  'Learn who writes AdminSignal, what the publication covers, and how technical guidance, examples, sources, corrections, and commercial content are handled.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: ABOUT_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: ABOUT_URL,
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

const coverageTopics = [
  'Microsoft Intune',
  'Windows endpoint management',
  'Active Directory',
  'Microsoft Entra ID',
  'PowerShell',
  'Microsoft 365 administration',
  'patch management',
  'endpoint security',
]

const methodology = [
  'Start with a defined administrative task, failure state, rollout decision, or reporting need.',
  'Check product behaviour, portal paths, permissions, and support boundaries against current primary documentation where available.',
  'State prerequisites, assumptions, example values, validation evidence, and rollback considerations when they affect safety or correctness.',
  'Separate documented product facts from AdminSignal interpretation, recommendations, and example workflows.',
  'Correct material errors and record meaningful updates on the affected article rather than advancing a generic site-wide date.',
]

const limitations = [
  'An example environment is not evidence that a configuration works unchanged in every tenant or estate.',
  'A buyer note is not a lab benchmark, deployment case study, or claim of firsthand product use unless the page explicitly documents that evidence.',
  'PowerShell fragments and implementation patterns are not represented as complete downloadable scripts.',
  'Microsoft licensing, product names, portal paths, and feature availability can change after publication.',
]

const selectedReading = [
  {
    title: 'Migrating Intune Administrative Templates to Settings Catalog',
    href: '/tutorials/intune-admin-templates-to-settings-catalog-migration',
    type: 'Tutorial',
  },
  {
    title: 'Secure Boot CA 2023 Rollout Readiness',
    href: '/tutorials/secure-boot-ca-2023-rollout-enterprise-readiness',
    type: 'Tutorial',
  },
  {
    title: 'Intune Remediation Script Not Running',
    href: '/troubleshooting/intune-remediation-script-not-running',
    type: 'Troubleshooting',
  },
  {
    title: 'Intune Device Not Syncing',
    href: '/troubleshooting/intune-device-not-syncing',
    type: 'Troubleshooting',
  },
]

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'AdminSignal',
    url: SITE_URL,
    description:
      'An independent technical publication covering Microsoft administration, endpoint management, PowerShell, identity, patching, and endpoint security.',
    founder: { '@type': 'Person', '@id': AUTHOR_ID, name: primaryAuthor.name },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: primaryAuthor.name,
    url: ABOUT_URL,
    jobTitle: primaryAuthor.role,
    description: primaryAuthor.bio,
    knowsAbout: coverageTopics,
    sameAs: [primaryAuthor.linkedIn, primaryAuthor.github].filter(Boolean),
  }

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${ABOUT_URL}#webpage`,
    name: title,
    description,
    url: ABOUT_URL,
    inLanguage: 'en-GB',
    publisher: { '@type': 'Organization', '@id': ORGANIZATION_ID },
    mainEntity: { '@type': 'Person', '@id': AUTHOR_ID },
  }

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={personSchema} />
      <StructuredData data={aboutPageSchema} />

      <div className="border-b border-border bg-surface/10 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                About the publication
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                About Jack and AdminSignal
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-foreground-soft">
                I am Jack, an endpoint specialist and the author of AdminSignal. I publish independent technical guidance for administrators working with Windows endpoints, Microsoft Intune, Active Directory, PowerShell, Microsoft 365, identity, patching, and endpoint security.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                The purpose of the site is practical: explain the checks, evidence, risks, and decision points that are often missing from a short product document or portal walkthrough. The site does not use inflated job titles, unverified certifications, invented deployments, or automatic freshness dates as substitutes for useful content.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/editorial-policy"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                  Editorial policy
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Contact
                </Link>
              </div>
            </div>

            <aside className="rounded-xl border border-border bg-surface p-5 shadow-card">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-background-soft">
                {primaryAuthor.avatarUrl ? (
                  <Image
                    src={primaryAuthor.avatarUrl}
                    alt={`${primaryAuthor.name}, ${primaryAuthor.role}`}
                    fill
                    className="object-cover"
                    sizes="340px"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl font-bold text-primary">
                    {primaryAuthor.initials}
                  </div>
                )}
              </div>
              <p className="mt-5 text-lg font-semibold text-foreground">{primaryAuthor.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{primaryAuthor.role}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {primaryAuthor.linkedIn && (
                  <a
                    href={primaryAuthor.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
                  >
                    LinkedIn <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
                {primaryAuthor.github && (
                  <a
                    href={primaryAuthor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
                  >
                    GitHub <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-16">
          <main className="space-y-14">
            <section aria-labelledby="scope-heading">
              <h2 id="scope-heading" className="text-2xl font-bold tracking-tight text-foreground">
                Editorial scope
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                AdminSignal is deliberately focused on Microsoft administration and endpoint operations. Coverage is organised around tasks administrators actually need to complete: planning changes, identifying prerequisites, limiting blast radius, collecting logs, validating outcomes, and recovering safely when a change fails.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {coverageTopics.map((topic) => (
                  <span key={topic} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted">
                    {topic}
                  </span>
                ))}
              </div>
            </section>

            <section aria-labelledby="method-heading">
              <h2 id="method-heading" className="text-2xl font-bold tracking-tight text-foreground">
                How articles are produced
              </h2>
              <ol className="mt-5 space-y-3">
                {methodology.map((item, index) => (
                  <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="limits-heading">
              <div className="flex items-center gap-3">
                <FileWarning className="h-6 w-6 text-amber-400" aria-hidden="true" />
                <h2 id="limits-heading" className="text-2xl font-bold tracking-tight text-foreground">
                  Evidence and limitations
                </h2>
              </div>
              <ul className="mt-5 space-y-3">
                {limitations.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="reading-heading">
              <h2 id="reading-heading" className="text-2xl font-bold tracking-tight text-foreground">
                Representative reading
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {selectedReading.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.type}</span>
                    <span className="mt-2 block text-sm font-semibold leading-snug text-foreground">{item.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="font-semibold text-foreground">Publication commitments</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>No fabricated deployments, tests, ratings, credentials, or social proof.</li>
                <li>Commercial relationships disclosed where they exist.</li>
                <li>Corrections accepted through the contact page.</li>
                <li>Weak or unfinished resources kept out of search until they are ready.</li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
