import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { buildArticleMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import EditorialReviewNotice from '@/components/article/EditorialReviewNotice'

const PAGE_URL = 'https://www.adminsignal.com/guides/windows-11-25h2-autopilot-v2'

export const metadata: Metadata = withNoindex(
  buildArticleMetadata({
    title: 'Windows Autopilot Device Preparation Guide — Under Editorial Review',
    description:
      'This AdminSignal guide is temporarily unavailable while its Autopilot device preparation instructions are rewritten against current Microsoft documentation.',
    url: PAGE_URL,
    category: 'Microsoft Intune',
    publishedTime: '2026-04-10',
    tags: ['Windows Autopilot', 'Device Preparation', 'Microsoft Intune'],
    authorName: 'Jack Hadcroft',
  }),
)

const officialSources = [
  {
    title: 'Windows Autopilot device preparation FAQ',
    href: 'https://learn.microsoft.com/en-us/autopilot/device-preparation/faq',
    detail:
      'Microsoft’s current answers on supported join types, assignment, registration, ESP, and deployment modes.',
  },
  {
    title: 'Compare device preparation and Windows Autopilot',
    href: 'https://learn.microsoft.com/en-us/autopilot/device-preparation/compare',
    detail:
      'A feature-by-feature comparison of device preparation and the legacy Windows Autopilot workflows.',
  },
  {
    title: 'Create a device preparation policy',
    href: 'https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-autopilot-policy',
    detail:
      'Microsoft’s supported user-driven Microsoft Entra join policy workflow and assignment model.',
  },
]

export default function Windows1125H2AutopilotV2Page() {
  return (
    <>
      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Tutorials', href: '/tutorials' },
              { label: 'Autopilot guide under editorial review' },
            ]}
          />
        </Container>
      </div>

      <Container>
        <main className="mx-auto max-w-3xl py-12 lg:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Microsoft Intune
          </p>
          <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Windows Autopilot device preparation guide under editorial review
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
            The previous version mixed concepts from legacy Windows Autopilot with the newer Windows
            Autopilot device preparation workflow. It has been withdrawn from the normal publication
            surface rather than left online as deployment guidance.
          </p>

          <EditorialReviewNotice reason="Microsoft's current documentation distinguishes device preparation from legacy Autopilot in its use of assigned device groups, user-group policy assignment, Microsoft Entra join support, registration requirements, and the absence of Enrollment Status Page processing." />

          <section className="mt-10" aria-labelledby="official-sources-heading">
            <h2 id="official-sources-heading" className="mb-4 text-xl font-semibold text-foreground">
              Use these Microsoft sources meanwhile
            </h2>
            <div className="space-y-3">
              {officialSources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
                >
                  <span className="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary">
                    {source.title}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{source.detail}</span>
                </a>
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            Continue with the{' '}
            <Link href="/tutorials" className="font-medium text-primary hover:underline">
              verified tutorial index
            </Link>{' '}
            or the{' '}
            <Link href="/intune" className="font-medium text-primary hover:underline">
              Microsoft Intune topic hub
            </Link>
            .
          </div>
        </main>
      </Container>
    </>
  )
}
