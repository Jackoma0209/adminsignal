import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema, webPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'SCCM / MECM'
const topicDescription =
  'Practical Configuration Manager decision guidance: when MECM still earns its place, how to sequence co-management, and which published Intune comparison and app-delivery articles to read next. This hub does not yet include standalone ConfigMgr task-sequence or DP tutorials.'
const topicPath = '/sccm-mecm'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'sccm-mecm',
})

const introSections = [
  {
    title: 'When Configuration Manager still earns its place',
    body: 'Microsoft Configuration Manager (SCCM / MECM) remains useful where you need PXE or task-sequence bare-metal builds, multi-gigabyte package distribution over constrained WAN links, complex dependency and supersedence models, SQL-backed reporting that existing teams rely on, or internet-restricted networks that cannot treat Intune as the primary management plane. Keep those workloads intentional rather than assuming every estate must fully retire ConfigMgr this quarter.',
  },
  {
    title: 'Co-management is a control plane decision, not a switch',
    body: 'Co-management lets devices stay healthy in both Configuration Manager and Intune while you move workloads one capability at a time. The useful sequence for most estates is compliance first, then device configuration, Windows Update policies, endpoint protection, and only then app management. Do not slide a workload until the Intune process is documented, monitored, helpdesk-ready, and reversible.',
  },
  {
    title: 'What to inventory before migration',
    body: 'Before moving any production workload, list task sequences still required for imaging, packages larger than a few hundred megabytes, applications with multi-step detection and supersedence, maintenance windows and ADRs that enforce patch timing, custom SQL reports used for audit evidence, and any boundary or DP design that exists solely for bandwidth control. Those items define what can leave ConfigMgr safely and what should stay.',
  },
  {
    title: 'Failure modes that catch migration teams',
    body: 'Common failures include enabling co-management without healthy client communication, moving compliance without Conditional Access impact analysis, sliding apps before Win32 packaging and detection rules are proven, assuming Autopilot replaces every OSD path, and decommissioning distribution points before peer-cache or delivery optimisation has been validated for remote sites. Treat each slide as a change with pilot scope, success criteria, and rollback ownership.',
  },
  {
    title: 'Recommended operating model in 2026',
    body: 'For new cloud-managed Windows devices that fit Autopilot assumptions, start in Intune. For existing ConfigMgr estates, keep a documented dual-plane model: Intune owns cloud-first policy and remote devices; Configuration Manager retains complex OSD, heavy distribution, and any reporting path that has not been rebuilt. Revisit ownership quarterly rather than waiting for a single big-bang cutover date.',
  },
  {
    title: 'How AdminSignal covers this topic',
    body: 'This hub is a decision page, not a Configuration Manager tutorial library. The listing below is mostly Intune comparison, Win32 delivery, and update-ownership articles that matter when you are sequencing co-management. There are no standalone ConfigMgr task-sequence or distribution-point tutorials here yet. Official Microsoft co-management documentation remains the authority for product limits, supported workloads, and portal paths.',
  },
]

export default function SccmMecmPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['SCCM', 'MECM', 'Configuration Manager', 'Co-management'],
    newsCategories: ['SCCM / MECM'],
    guideTags: ['SCCM', 'MECM', 'Configuration Manager', 'Co-management'],
    guideCategories: ['SCCM / MECM'],
    troubleshootingCategories: ['SCCM / MECM'],
    affectedProducts: ['Microsoft Configuration Manager', 'SCCM', 'MECM'],
    newsLimit: 4,
    guideLimit: 4,
    troubleshootingLimit: 4,
  })

  const relatedArticles = [
    {
      title: 'Microsoft Intune vs. SCCM/MECM: Which Should You Use?',
      href: '/comparisons/intune-vs-sccm-mecm-2025',
      excerpt:
        'Capability comparison and migration sequencing for estates deciding how much endpoint management should stay on Configuration Manager.',
    },
    {
      title: 'Windows Update for Business Deferral Policy Not Applying in Intune',
      href: '/troubleshooting/wufb-deferral-not-respected',
      excerpt:
        'Diagnosis path when update ownership is split between Intune rings, feature update policies, WSUS, MECM, or co-management.',
    },
    {
      title: 'Intune Win32 App Install Stuck at Waiting, Pending, Installing, or Failed',
      href: '/troubleshooting/intune-win32-app-install-stuck-waiting',
      excerpt:
        'Evidence-led troubleshooting for Win32 delivery problems that often appear after app management leaves ConfigMgr.',
    },
  ]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: topicUrl,
    items: [
      ...allItems.map((item) => ({
        name: item.title,
        url: `https://www.adminsignal.com${item.href}`,
      })),
      ...relatedArticles.map((item) => ({
        name: item.title,
        url: `https://www.adminsignal.com${item.href}`,
      })),
    ],
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: topicUrl },
  ])

  const jsonLdPage = webPageSchema({
    title: `${topicName} — Guides, Troubleshooting & Analysis`,
    description: topicDescription,
    url: topicUrl,
  })

  return (
    <>
      <StructuredData data={jsonLdPage} />
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />
      <TopicHubPageTemplate
        topicName={topicName}
        description={topicDescription}
        introSections={introSections}
        news={news}
        tutorials={tutorials}
        troubleshooting={troubleshooting}
        relatedTopics={[
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'Patch Management', href: '/patch-management' },
          { name: 'Windows Server', href: '/windows-server' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'Group Policy', href: '/group-policy' },
        ]}
      />

      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
            Start with these decision pages
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{article.title}</p>
                <p className="text-xs leading-relaxed text-muted">{article.excerpt}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            Official product limits and supported co-management workloads change over time. Confirm
            current behaviour in{' '}
            <a
              href="https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview"
              className="text-primary underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              Microsoft co-management documentation
            </a>{' '}
            and your tenant&apos;s change-control process before sliding production workloads.
          </p>
        </div>
      </section>
    </>
  )
}
