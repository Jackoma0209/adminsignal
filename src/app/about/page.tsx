import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { primaryAuthor } from '@/data/authors'
import {
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  Mail,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import Container from '@/components/layout/Container'
import StructuredData from '@/components/StructuredData'

const SITE_URL = 'https://www.adminsignal.com'
const SITE_NAME = 'AdminSignal'
const ABOUT_URL = `${SITE_URL}/about`
const JACK_ID = `${ABOUT_URL}#jack`
const ORGANIZATION_ID = `${SITE_URL}#organization`
const WEBSITE_ID = `${SITE_URL}#website`

const title = 'About Jack, Author of AdminSignal'
const description =
  'Learn who writes AdminSignal and how its practical Microsoft admin guidance is produced, reviewed, and updated for Intune, Entra ID, Windows Server, PowerShell, patching, and endpoint security.'

const coverageTopics = [
  'Microsoft Intune',
  'Windows endpoint management',
  'Microsoft Entra ID',
  'Active Directory',
  'Windows Server',
  'PowerShell',
  'patch management',
  'endpoint security',
]

const trustSignals = [
  'Written by Jack, a senior enterprise sysadmin and AdminSignal author',
  'Focused on practical Microsoft administration work for real users, devices, and identity controls',
  'Checked against Microsoft documentation and release notes where relevant',
  'Reviewed for operational risk before recommending admin changes',
]

const methodology = [
  'Start with a real admin workflow, failure mode, reporting gap, or rollout decision.',
  'Check commands, portal paths, and assumptions against Microsoft Learn, product documentation, and release notes where relevant.',
  'Review the operational risk, especially for identity, security, endpoint policy, patching, and automation changes.',
  'Call out prerequisites, permissions, blast radius, validation evidence, and rollback considerations when they matter.',
  'Update affected articles when Microsoft behaviour changes or when a reader reports a material correction.',
]

const coverageAreas = [
  {
    title: 'Intune and Windows endpoints',
    icon: FileText,
    text: 'Configuration profiles, Settings Catalog migrations, Autopilot, enrolment failures, compliance state, Windows update rings, application deployment, and endpoint reporting.',
  },
  {
    title: 'Identity and directory operations',
    icon: BadgeCheck,
    text: 'Microsoft Entra ID, Active Directory, Conditional Access, hybrid join behaviour, stale device cleanup, delegated access, and the overlap between cloud and on-premises administration.',
  },
  {
    title: 'Windows Server and patching',
    icon: Wrench,
    text: 'Windows Server administration, update readiness, Patch Tuesday checks, rollback planning, maintenance windows, and evidence that helps an admin explain what changed.',
  },
  {
    title: 'PowerShell and endpoint security',
    icon: ShieldCheck,
    text: 'PowerShell automation, Microsoft Graph reporting, Defender for Endpoint, BitLocker, LAPS, hardening baselines, and scripts that report clearly before they change anything.',
  },
]

const selectedItems = [
  {
    title: 'Deploy Windows 11 25H2 with Intune and Autopilot v2',
    href: '/guides/windows-11-25h2-autopilot-v2',
    type: 'Guide',
  },
  {
    title: 'Rolling Out Microsoft Defender for Endpoint with Intune',
    href: '/tutorials/microsoft-defender-for-endpoint-intune-rollout',
    type: 'Tutorial',
  },
  {
    title: 'Migrating Intune Administrative Templates to Settings Catalog',
    href: '/tutorials/intune-admin-templates-to-settings-catalog-migration',
    type: 'Tutorial',
  },
  {
    title: 'Migrating AzureAD and MSOnline Scripts to Microsoft Graph PowerShell',
    href: '/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration',
    type: 'Tutorial',
  },
  {
    title: 'Get-PatchComplianceReport',
    href: '/scripts/get-patch-compliance-report',
    type: 'Script',
  },
  {
    title: 'Get-StaleDevices',
    href: '/scripts/get-stale-devices',
    type: 'Script',
  },
]

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: ABOUT_URL },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: ABOUT_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

function organizationRef() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
  }
}

function topicSchemaItems() {
  return coverageTopics.map((name) => ({
    '@type': 'Thing',
    name,
  }))
}

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    ...organizationRef(),
    description:
      'AdminSignal publishes practical guides, scripts, and analysis for sysadmins managing Microsoft environments.',
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': JACK_ID,
    name: 'Jack',
    url: ABOUT_URL,
    jobTitle: 'Senior enterprise sysadmin and site author',
    description:
      'Jack writes AdminSignal, a practical Microsoft administration site for sysadmins working with endpoints, identity, servers, patching, security, and automation.',
    knowsAbout: coverageTopics,
    mainEntityOfPage: {
      '@type': 'AboutPage',
      '@id': `${ABOUT_URL}#webpage`,
    },
  }

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${ABOUT_URL}#webpage`,
    name: title,
    description,
    url: ABOUT_URL,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: organizationRef(),
    about: topicSchemaItems(),
    mainEntity: {
      '@type': 'Person',
      '@id': JACK_ID,
      name: 'Jack',
    },
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
                About the author
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                About Jack
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-foreground-soft">
                I am Jack, the senior enterprise sysadmin and site author behind AdminSignal. I
                write for admins who need to deploy changes, explain risk, find evidence, and keep
                Microsoft environments manageable when the documentation is not enough on its own.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                I have spent more than 12 years managing Windows fleets, Microsoft Intune tenants,
                and Active Directory environments across finance, logistics, and professional
                services. AdminSignal focuses on practical Microsoft administration: Intune, Windows
                endpoint management, Entra ID, Active Directory, Windows Server, PowerShell, patch
                management, and endpoint security. The aim is to make the assumptions, checks, and
                operational trade-offs visible before a reader copies a command or changes a policy.
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

            <aside className="rounded-lg border border-border bg-surface p-5 shadow-card">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-background-soft ring-1 ring-border">
                {primaryAuthor.avatarUrl ? (
                  <Image
                    src={primaryAuthor.avatarUrl}
                    alt={`${primaryAuthor.name} — ${primaryAuthor.role}`}
                    fill
                    className="object-cover"
                    sizes="340px"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-primary/30 bg-primary-soft text-4xl font-bold text-primary">
                      J
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <p className="text-lg font-semibold text-foreground">Jack</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Senior enterprise sysadmin and AdminSignal author.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-border bg-surface p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted/60">
                  Trust signals
                </p>
                <ul className="space-y-3">
                  {trustSignals.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="space-y-14">
              <section aria-labelledby="background-heading">
                <h2
                  id="background-heading"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  Practical Microsoft admin background
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                  <p>
                    AdminSignal is written from the point of view of an admin responsible for
                    working systems, not from a generic content brief. The site covers the kind of
                    decisions that affect users, devices, identity controls, security posture, and
                    the evidence a team needs after a change.
                  </p>
                  <p>
                    That means guidance is framed around real workflows: preparing a rollout,
                    checking assignments, reading device state, finding logs, limiting blast radius,
                    handling rollback, and explaining what happened in plain language.
                  </p>
                </div>
              </section>

              <section aria-labelledby="coverage-heading">
                <h2
                  id="coverage-heading"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  What AdminSignal covers
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {coverageTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-muted"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {coverageAreas.map((area) => {
                    const Icon = area.icon

                    return (
                      <article key={area.title} className="rounded-lg border border-border bg-surface p-5">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-foreground">{area.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{area.text}</p>
                      </article>
                    )
                  })}
                </div>
              </section>

              <section aria-labelledby="methodology-heading">
                <h2
                  id="methodology-heading"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  How content is produced
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Each guide is written for an admin who may need to act on it. The goal is to show
                  what to check, why it matters, and where official Microsoft behaviour or service
                  changes can affect the advice.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {methodology.map((item) => (
                    <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="text-sm leading-relaxed text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="selected-heading">
                <h2
                  id="selected-heading"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  Selected guides and scripts
                </h2>
                <div className="mt-5 divide-y divide-border rounded-lg border border-border bg-surface">
                  {selectedItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col gap-2 p-5 transition-colors hover:bg-surface-elevated sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background-soft px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted">
                        {item.type}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section aria-labelledby="independence-heading">
                <h2
                  id="independence-heading"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  Editorial independence
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                  <p>
                    AdminSignal is independently produced. Commercial relationships do not decide
                    what gets recommended. If a page contains affiliate links or a sponsorship, it
                    should be disclosed clearly on that page.
                  </p>
                  <p>
                    Read the{' '}
                    <Link href="/editorial-policy" className="text-primary underline underline-offset-2">
                      editorial policy
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/affiliate-disclosure"
                      className="text-primary underline underline-offset-2"
                    >
                      affiliate disclosure
                    </Link>{' '}
                    for the site standards and current commercial disclosure.
                  </p>
                </div>
              </section>

              <section aria-labelledby="corrections-heading">
                <h2
                  id="corrections-heading"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  Contact and corrections
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                  <p>
                    If you spot an error, outdated Microsoft behaviour, a broken command, or a
                    safer operational approach, send the page URL and the section that needs review.
                    Corrections are prioritised when they affect security, deployment risk, or
                    operational accuracy.
                  </p>
                  <p>
                    Use the{' '}
                    <Link href="/contact" className="text-primary underline underline-offset-2">
                      contact page
                    </Link>{' '}
                    for corrections, source suggestions, and topic requests.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
