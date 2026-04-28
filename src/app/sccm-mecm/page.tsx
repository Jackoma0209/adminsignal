import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import { troubleshootingArticles } from '@/data/troubleshooting'
import { comparisons } from '@/data/comparisons'
import StructuredData from '@/components/StructuredData'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'SCCM / MECM'
const topicDescription =
  'Microsoft Configuration Manager for OSD, software distribution, patch management, co-management with Intune, and migration planning. Operational guidance for teams running on-premises and hybrid endpoint management.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'sccm-mecm',
})

interface ContentItem {
  title: string
  href: string
  excerpt: string
  meta: string
}

function ContentRow({
  items,
  sectionTitle,
  viewAllHref,
}: {
  items: ContentItem[]
  sectionTitle: string
  viewAllHref: string
}) {
  if (items.length === 0) return null
  return (
    <div className="border-t border-border py-12">
      <Container>
        <SectionHeader
          title={sectionTitle}
          action={
            <Link
              href={viewAllHref}
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
            >
              <p className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </p>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted">{item.excerpt}</p>
              <p className="mt-auto text-xs text-muted/60">{item.meta}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default function SccmMecmPage() {
  // Patch Tuesday news is directly relevant to ConfigMgr/WSUS admins
  const news = signals
    .filter(
      (s) =>
        s.tags?.includes('SCCM') ||
        s.tags?.includes('MECM') ||
        s.category === 'SCCM / MECM' ||
        s.category === 'Patch Tuesday',
    )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  // Surface Autopilot and Group Policy guides — both directly relevant to co-management
  // and hybrid environments where ConfigMgr is in play
  const tutorials = guides
    .filter(
      (g) =>
        g.tags?.includes('SCCM') ||
        g.tags?.includes('MECM') ||
        g.category === 'SCCM / MECM' ||
        g.tags?.includes('Autopilot') ||
        g.category === 'Group Policy',
    )
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter(
      (s) =>
        s.tags.includes('WSUS') ||
        s.tags.includes('Patch Management') ||
        s.tags.includes('Reporting') ||
        s.tags.includes('Active Directory'),
    )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: s.language,
    }))

  const troubleshootingItems = troubleshootingArticles
    .filter(
      (a) =>
        a.affectedProducts.includes('Windows Update for Business') ||
        a.affectedProducts.includes('Group Policy') ||
        a.affectedProducts.includes('BitLocker') ||
        a.category === 'Patch Management',
    )
    .slice(0, 4)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const mecmComparison = comparisons.find((c) => c.slug === 'intune-vs-sccm-mecm-2025')

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Group Policy', href: '/group-policy' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/sccm-mecm',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/sccm-mecm' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      {/* Hero */}
      <div className="border-b border-border bg-surface/20 py-14">
        <Container>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Topic Hub
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            SCCM / MECM
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Microsoft Configuration Manager for OS deployment, software distribution, patch
            management, and co-management with Intune. Operational guidance for teams running
            on-premises and hybrid endpoint management — and those planning migration.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* Naming clarification */}
      <div className="border-t border-border py-10">
        <Container>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              Naming reference
            </p>
            <p className="mb-3 text-base font-bold text-foreground">
              SCCM, ConfigMgr, MECM, or Microsoft Intune? The name history explained.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              The product has been renamed several times and is still searched under all previous names — they all refer to the same on-premises endpoint management platform:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { era: 'Until 2011', name: 'System Center Configuration Manager (SCCM)', note: 'The original name — still the most widely searched term.' },
                { era: '2011 – 2019', name: 'System Center Configuration Manager (still SCCM)', note: 'Product refreshed but name unchanged. Current branch introduced in 2015.' },
                { era: '2019 – 2022', name: 'Microsoft Endpoint Configuration Manager (MECM)', note: 'Rebranded alongside the Microsoft Endpoint Manager umbrella (now discontinued as a brand).' },
                { era: '2022 – present', name: 'Microsoft Configuration Manager (ConfigMgr)', note: 'Current official name. The product itself is unchanged — still the same on-premises tool.' },
              ].map((item) => (
                <div key={item.era} className="rounded-lg border border-border p-4">
                  <p className="mb-1 text-xs font-semibold text-primary">{item.era}</p>
                  <p className="mb-1 text-xs font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs leading-relaxed text-muted">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted/60">
              On this site: SCCM/MECM and ConfigMgr are used interchangeably to match how practitioners search. The Intune management layer now sits in the Microsoft Intune admin centre (intune.microsoft.com).
            </p>
          </div>
        </Container>
      </div>

      {/* What MECM Is Still Used For */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What ConfigMgr Is Still Used For in Real Enterprise Environments"
            description="ConfigMgr is not a legacy product pending retirement. It receives bi-annual current branch releases and is actively developed. For specific workloads — particularly complex OSD, large-scale on-premises software distribution, and server management — it remains the stronger tool."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Complex OS deployment (OSD)',
                body: 'Task sequences in ConfigMgr support multi-phase deployments with driver injection, WIM capture, MDT integration, pre-staging content, and conditional steps based on hardware model or disk configuration. For large fleets with diverse hardware and complex imaging requirements, ConfigMgr OSD is significantly more flexible than Autopilot alone.',
              },
              {
                heading: 'Large-scale software distribution',
                body: 'The ConfigMgr content library and distribution point infrastructure supports distributing large application packages (multi-GB installers, SQL, Visual Studio) across thousands of machines with bandwidth throttling, scheduled distribution windows, and BranchCache for branch office scenarios — without each device pulling from the cloud.',
              },
              {
                heading: 'WSUS-integrated patch management',
                body: 'ConfigMgr Software Update Point integrates directly with WSUS for per-KB approval, ADR (Automatic Deployment Rules) for monthly Patch Tuesday automation, and phased deployment for update rings. The reporting and maintenance window integration is more granular than Intune update rings for environments with complex patching requirements.',
              },
              {
                heading: 'On-premises compliance and reporting',
                body: 'Configuration baseline assessment in ConfigMgr evaluates device compliance against custom rules and reports results to SSRS (SQL Server Reporting Services). For environments where cloud reporting is not permitted or where compliance data must stay on-premises, ConfigMgr provides a full reporting stack without data leaving the datacenter.',
              },
              {
                heading: 'Server management',
                body: 'ConfigMgr manages Windows Server endpoints — software distribution, patch management, hardware inventory, and software metering — alongside workstation fleets. Intune does not manage on-premises servers. For environments needing a unified management view across workstations and servers, ConfigMgr remains the only Microsoft-native option.',
              },
              {
                heading: 'Co-management and migration staging',
                body: 'Co-management lets ConfigMgr and Intune share management authority simultaneously, with each workload explicitly assigned to one or the other. This makes ConfigMgr the practical bridge for organisations migrating to cloud-only management — you can slide workloads to Intune incrementally without a hard cutover.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-border bg-surface p-5 shadow-card"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Co-management */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Co-management"
            title="Co-management with Microsoft Intune"
            description="Co-management is the simultaneous management of Windows 10/11 devices by both ConfigMgr and Intune. Each management workload is explicitly assigned to one authority — you decide the pace of migration workload by workload."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'Prerequisites',
                label: 'What you need before enabling',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'ConfigMgr version', v: 'Current branch 2103 or later recommended. Co-management was introduced in 1710 but later versions have significantly improved workload control and Intune integration.' },
                  { k: 'Device requirements', v: 'Windows 10 1709 or later (Windows 11 supported). Devices must be hybrid Entra joined or Entra joined — purely domain-joined devices cannot use Intune workloads.' },
                  { k: 'Intune licence', v: 'Each co-managed device needs an Intune licence assigned. Included in Microsoft 365 Business Premium, E3, E5, and available as a standalone add-on.' },
                  { k: 'Entra Connect', v: 'Hybrid Entra join requires Entra Connect (or Cloud Sync) to sync the on-premises computer object to Entra ID. The device then registers a certificate used for Intune MDM enrolment.' },
                  { k: 'CMG (optional)', v: 'Cloud Management Gateway allows ConfigMgr to manage internet-based devices — useful for co-managed devices that are not always on the corporate network or VPN.' },
                ],
              },
              {
                name: 'Workload sliding',
                label: 'Per-workload authority assignment',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'Compliance policies', v: 'Slide to Intune to use Intune compliance baselines and feed device compliance state into Conditional Access. This is usually the first workload to migrate — low risk, high CA value.' },
                  { k: 'Device configuration', v: 'Slide to Intune to replace ConfigMgr configuration items and baselines with Intune Settings Catalog profiles. Test on a Pilot Intune collection first.' },
                  { k: 'Windows Update policies', v: 'Slide to Intune to use Intune update rings and Windows Autopatch. You cannot have both WSUS (via ConfigMgr SUP) and Intune update rings managing the same device — this is the highest-conflict workload to migrate.' },
                  { k: 'Endpoint Protection', v: 'Slide to Intune to manage Defender AV, ASR rules, and firewall via Intune Endpoint security policies. ConfigMgr Endpoint Protection policies are then ignored for workloads in the Intune authority.' },
                  { k: 'Client apps', v: 'The most complex workload to migrate. ConfigMgr application deployments stop applying once slid to Intune. Plan app re-packaging as Win32 .intunewin before sliding this workload.' },
                ],
              },
              {
                name: 'Pilot Intune collections',
                label: 'Staged workload migration',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'What Pilot Intune does', v: 'Each workload can be set to ConfigMgr, Pilot Intune, or Intune. Pilot Intune applies the Intune authority only to devices in a designated ConfigMgr collection — the rest stay on ConfigMgr.' },
                  { k: 'Collection design', v: 'Create a co-management pilot collection targeting IT staff machines, then specific business unit machines as confidence builds. Use a direct membership rule initially, not a query-based rule, to control scope precisely.' },
                  { k: 'Validating the slide', v: 'After sliding a workload to Pilot Intune, verify the Intune policy applies in the Intune portal (Devices > Configuration) and that the ConfigMgr policy is no longer the effective setting on the device. Use the co-management dashboard in ConfigMgr to track slide status.' },
                  { k: 'Rollback', v: 'Sliding a workload back from Intune to ConfigMgr is possible — change the authority in the co-management properties and ConfigMgr policies re-apply on the next client policy cycle (default 60 minutes). Test rollback before committing a broad workload migration.' },
                  { k: 'Dashboard', v: 'ConfigMgr Monitoring > Co-management dashboard shows workload distribution, Intune enrolment status, and per-device authority. Use this to track progress across the fleet.' },
                ],
              },
            ].map((model) => (
              <div key={model.name} className={`rounded-xl border ${model.border} ${model.bg} p-5`}>
                <p className={`mb-0.5 text-xs font-semibold uppercase tracking-widest ${model.color}`}>
                  {model.label}
                </p>
                <p className="mb-4 text-base font-bold text-foreground">{model.name}</p>
                <dl className="space-y-3">
                  {model.rows.map((row) => (
                    <div key={row.k}>
                      <dt className="text-xs font-semibold text-foreground/80">{row.k}</dt>
                      <dd className="mt-0.5 text-xs leading-relaxed text-muted">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Latest News */}
      <ContentRow items={news} sectionTitle="Latest from Patch Tuesday" viewAllHref="/news" />

      {/* Collections, Deployments, Maintenance Windows */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Core operations"
            title="Collections, Deployments, and Maintenance Windows"
            description="Collections and deployments are the operational core of ConfigMgr. Almost every action — software distribution, patch deployment, configuration baseline evaluation — is targeted at a collection and scheduled within a maintenance window."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Device vs User collections',
                body: 'Device collections target the machine — useful for OS-level deployments, patches, and configuration items that should apply regardless of who is logged on. User collections target the user object in AD — useful for application deployments that should follow the user across devices. Most patch deployments use device collections for predictable scheduling behaviour.',
              },
              {
                heading: 'Query-based vs direct membership',
                body: 'Query-based collections use WQL queries against the ConfigMgr database to dynamically include devices matching criteria (OS version, installed software, last logon, hardware attributes). Direct membership adds specific devices explicitly. Hybrid: use a query rule as the base and direct membership for exceptions. Always test queries in the collection simulator before creating a production collection.',
              },
              {
                heading: 'Limiting collections',
                body: 'Every collection must be limited by a parent collection. The limiting collection defines the maximum scope — a collection cannot include a device not in its limiting collection. Use "All Systems" as the limiting collection only at the top of the hierarchy. Create intermediate limiting collections per site, per department, or per management group to prevent accidental over-targeting.',
              },
              {
                heading: 'Deployment purpose: Required vs Available',
                body: 'Required deployments install automatically at the deadline — the client enforces installation regardless of user activity (within maintenance window rules). Available deployments appear in Software Center for user-initiated install. For patches and security software, use Required. For productivity apps with user adoption considerations, Available is appropriate. Never use Required for software that needs user data migration.',
              },
              {
                heading: 'Maintenance windows',
                body: 'Maintenance windows define when ConfigMgr is permitted to make changes to a device — install software, apply patches, or reboot. Without a maintenance window, deployments can run at any time. Configure non-overlapping windows for servers (weekend nights), shift workers (daytime), and office desktops (business hours + weekend). Software updates and all deployments have separate maintenance window overrides.',
              },
              {
                heading: 'Phased deployments',
                body: 'ConfigMgr phased deployments automate multi-collection rollouts — starting with a pilot collection and automatically advancing to the production collection when the pilot success criteria are met (e.g., 95% deployment success rate with zero failure threshold). Use for major application updates and feature update deployments to reduce manual monitoring.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-border bg-surface p-5 shadow-card"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Task Sequences and OS Deployment */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="OS deployment"
            title="Task Sequences and OS Deployment"
            description="ConfigMgr task sequences are the most flexible OS deployment mechanism in the Microsoft stack. A task sequence is a series of ordered steps — partitioning, WIM application, driver injection, software installation, configuration, and domain join — that run in the Windows PE or full OS context."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Boot image and WinPE',
                body: 'Task sequences boot devices into Windows PE via PXE (via Distribution Point with PXE role) or bootable media. The boot image contains ConfigMgr client components, network drivers, and storage drivers needed to reach the distribution point. Customise boot images via the Windows ADK — add drivers for network adapters on new hardware before the boot image can reach SCCM content.',
              },
              {
                heading: 'Driver management',
                body: 'ConfigMgr driver management imports driver packages into the driver catalogue, matched to hardware models via the Auto Apply Drivers step or explicit Apply Driver Package steps. The best practice for large fleets is model-based driver packages — one package per hardware model family — applied via a task sequence condition checking %Model% or Win32_ComputerSystem.Model.',
              },
              {
                heading: 'MDT integration (Zero Touch Installation)',
                body: 'Microsoft Deployment Toolkit integration with ConfigMgr (ConfigMgr + MDT) adds the Use Toolkit Package and Gather steps, enabling MDT rules, the CustomSettings.ini variable engine, and offline domain join. MDT integration is the standard approach for environments that need complex conditional logic beyond what native task sequence conditions support.',
              },
              {
                heading: 'In-place upgrade task sequences',
                body: 'The Upgrade Operating System step runs Windows Setup in an upgrade scenario, preserving user data, installed apps, and settings. In-place upgrade task sequences are lower-risk than wipe-and-reload OSD for feature update migrations (Windows 10 to Windows 11). Add pre-check steps to fail the task sequence early if the device does not meet hardware requirements.',
              },
              {
                heading: 'Content pre-staging and BranchCache',
                body: 'For branch offices without a local distribution point, pre-stage content to a local server or enable BranchCache to allow devices to pull content from each other after the first download. Without pre-staging, large task sequences pull from a remote DP over WAN — causing slow deployments and potential deployment failures during the WIM apply phase.',
              },
              {
                heading: 'Task sequence variables and conditions',
                body: 'Built-in variables (_SMSTSMachineName, OSDComputerName, SMSTSUserStatePath) and custom variables set via Set Task Sequence Variable steps control flow. Condition checks on steps (WMI query, file existence, task sequence variable match) allow hardware-specific or environment-specific branching without maintaining separate task sequences per scenario.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-border bg-surface p-5 shadow-card"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Software Updates and WSUS */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Patch management"
            title="Software Update Management and WSUS Integration"
            description="ConfigMgr software updates are built on WSUS — ConfigMgr provides the collection targeting, maintenance window enforcement, phased rollout, and reporting layer on top of the WSUS approval and distribution infrastructure."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Software Update Point (SUP) role',
                body: 'The SUP role installs and manages WSUS on the site server. It synchronises update metadata from Microsoft Update on a configurable schedule and downloads updates to the content library. WSUS still manages the approval database — ConfigMgr controls which updates are deployed to which collections, using WSUS approvals as the delivery mechanism.',
              },
              {
                heading: 'Automatic Deployment Rules (ADRs)',
                body: 'ADRs automate monthly Patch Tuesday deployments. Configure an ADR to run on the second Tuesday of each month, filter by classification (Security Updates, Critical Updates), and deploy to a pilot collection with a 7-day deadline. A second ADR phase targets the broad production collection two weeks later. ADRs create deployment packages and software update groups automatically.',
              },
              {
                heading: 'Software update groups',
                body: 'A software update group is a container of specific KBs targeted for deployment. ADRs add updates to a group automatically. Manual update groups are used for out-of-band patches (zero-day fixes between Patch Tuesdays). A single update group can be deployed to multiple collections with different maintenance windows and deadline offsets.',
              },
              {
                heading: 'Deployment rings via collections',
                body: 'Create separate device collections for each ring (Pilot, IT, Early Adopter, Production). Deploy the same software update group to each collection with staggered deadlines — Pilot: 0 days, IT: 7 days, Early Adopter: 14 days, Production: 21 days. ConfigMgr compliance reports show deployment progress per collection, per update.',
              },
              {
                heading: 'WSUS cleanup and maintenance',
                body: 'WSUS databases grow significantly without regular maintenance. Declined and superseded updates accumulate in the WSUS catalogue. Run the built-in WSUS Cleanup Wizard monthly, or use the WSUS maintenance tasks in ConfigMgr site maintenance. A WSUS database over 10GB often causes synchronisation timeouts — run the WSUS database maintenance script against the SUSDB to re-index and defragment.',
              },
              {
                heading: 'Conflict with Intune update rings on co-managed devices',
                body: 'If Windows Update policies workload remains with ConfigMgr, Intune update ring policies are ignored on co-managed devices. If it is slid to Intune, ConfigMgr SUP policies are ignored. Running both simultaneously causes unpredictable behaviour — devices may defer updates based on ConfigMgr policy then receive them from the Windows Update cloud service via Intune, bypassing the ConfigMgr ring structure.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-border bg-surface p-5 shadow-card"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/patch-management"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Full patch management coverage including WSUS, WUfB, and Intune update rings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Scripts */}
      <ContentRow items={scriptItems} sectionTitle="Scripts & Automation" viewAllHref="/scripts" />

      {/* Client Health and Troubleshooting */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Client health"
            title="Client Health and Troubleshooting"
            description="ConfigMgr client problems fall into three categories: the client is not installed, the client is installed but not communicating with the management point, or the client is communicating but specific features (software updates, inventory) are not functioning. Each category has a different diagnostic path."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'CCMSetup and client installation logs',
                body: 'CCMSetup.log (on the device, at C:\\Windows\\ccmsetup\\Logs\\) records the installation process. ccmsetup.exe failures are usually network (DP unreachable), prerequisite (missing .NET or VC++ runtime), or permissions issues. On the site server, client.msi.log records MSI installation detail. Use the Client Push Installation status in the console to identify devices where push installation failed and why.',
              },
              {
                heading: 'Key client log files',
                body: 'C:\\Windows\\CCM\\Logs\\ contains all operational client logs. The most useful: LocationServices.log (DP and MP discovery), CcmMessaging.log (communication with MP), PolicyAgent.log (policy download and application), UpdatesDeployment.log (software update installation), AppDiscovery.log (application detection), and ExecMgr.log (program execution). CMTrace.exe (bundled with ConfigMgr) is the recommended viewer.',
              },
              {
                heading: 'Client health check triggers',
                body: 'The ConfigMgr Client Health evaluation (CCMEval) runs daily and checks: WMI repository integrity, SMS Agent Host service state, Configuration Manager bits, client version currency, and hardware inventory cycle recency. If CCMEval detects a problem it attempts auto-remediation. Results appear in the Client Health dashboard under Monitoring > Client Health.',
              },
              {
                heading: 'WMI repository corruption',
                body: 'A corrupt WMI repository is one of the most common causes of ConfigMgr client failure — inventory stops reporting, policies do not apply, and CCMEval flags the device. Repair with winmgmt /salvagerepository followed by a client reinstallation if salvage does not resolve. CCMEval auto-remediation handles this in most cases without manual intervention.',
              },
              {
                heading: 'Management Point communication',
                body: 'If a client cannot reach the management point, it cannot download policies, report inventory, or receive deployments. Test MP reachability from the client with: Test-NetConnection -ComputerName <MP FQDN> -Port 80 (or 443 for HTTPS). Check LocationServices.log for MP detection failures. Common causes: DNS resolution failure, firewall blocking port 80/443, or the client boundary not being assigned to a boundary group containing the MP.',
              },
              {
                heading: 'CMTrace vs OneTrace',
                body: 'CMTrace.exe is the classic ConfigMgr log viewer bundled since SCCM 2012. OneTrace is the successor, integrated into Support Center (installed via the ConfigMgr toolkit). OneTrace supports multiple log tabs, advanced filtering, and merged log views — useful when correlating events across UpdatesDeployment.log, WUAHandler.log, and RebootCoordinator.log simultaneously.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-border bg-surface p-5 shadow-card"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* CMPivot, Inventory, and Reporting */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Visibility"
            title="CMPivot, Inventory, and Reporting"
            description="ConfigMgr's reporting stack — hardware inventory, software inventory, SSRS reports, and CMPivot — provides a level of fleet visibility that Intune's reporting does not yet match for on-premises environments. CMPivot in particular delivers real-time query capability that is unique in the on-premises toolchain."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'CMPivot — real-time device queries',
                body: 'CMPivot runs WMI, registry, file system, and event log queries against live devices in real time — without waiting for hardware inventory cycles. Run a CMPivot query against a collection to get immediate results from all online devices: OS.Caption, InstalledSoftware where Name contains "VPN", File("C:\\sensitive.txt").Exists, or EventLog("System") where EventID == 7036. Results appear within seconds for online devices.',
              },
              {
                heading: 'Hardware inventory',
                body: 'Hardware inventory collects WMI class data from every client on a configurable cycle (default: 7 days). The collected data populates the ConfigMgr database and is queryable via collections, reports, and CMPivot. Extend hardware inventory to collect custom WMI classes or registry values not in the default set — useful for software licence audit, BIOS version reporting, or TPM state verification.',
              },
              {
                heading: 'Software inventory and metering',
                body: 'Software inventory scans installed files for product metadata. Software metering tracks execution frequency and last-used date for configured executables — useful for identifying unused licences. Both are separate from hardware inventory and have independent cycles and enable/disable settings. Software metering data is held for a configurable retention period in the SSRS database.',
              },
              {
                heading: 'SQL Server Reporting Services (SSRS)',
                body: 'ConfigMgr ships with hundreds of built-in SSRS reports covering hardware, software, deployment status, client health, update compliance, and asset intelligence. Reports run against the ConfigMgr database and are accessible via the reporting services point URL. Custom reports use SQL queries against the CM_* database views — the view schema is documented and queryable directly for custom dashboard development.',
              },
              {
                heading: 'Asset Intelligence',
                body: 'Asset Intelligence catalogues installed software, hardware, and licence data against the Microsoft Asset Intelligence online catalogue. It identifies software titles, normalises names across hardware inventory, and produces licence reconciliation reports. Useful for software asset management and identifying unlicensed or unexpected software at scale across the fleet.',
              },
              {
                heading: 'Tenant attach and cloud-connected CMPivot',
                body: 'Tenant attach (a co-management feature enabled separately from workload sliding) uploads ConfigMgr device inventory to Intune. This lets you run CMPivot queries from the Microsoft Intune admin centre against on-premises ConfigMgr-managed devices — without the devices being MDM-enrolled. Useful for security teams who primarily work in the cloud portals.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-border bg-surface p-5 shadow-card"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Tutorials */}
      <ContentRow items={tutorials} sectionTitle="Tutorials & Guides" viewAllHref="/tutorials" />

      {/* Troubleshooting */}
      <ContentRow
        items={troubleshootingItems}
        sectionTitle="Troubleshooting"
        viewAllHref="/troubleshooting"
      />

      {/* Migration paths */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Migration"
            title="Migration Paths from ConfigMgr to Intune"
            description="Migration from ConfigMgr to Intune is not a single event — it is a workload-by-workload progression. These are the most common migration patterns and their practical trade-offs."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Co-management first — slide workloads gradually',
                body: 'Enable co-management on existing ConfigMgr-managed hybrid-joined devices, then slide workloads to Intune one at a time — Compliance policies first, then Device configuration, then Windows Updates, then Endpoint Protection, and finally Client apps. This is the lowest-risk path because ConfigMgr remains the fallback authority until you are confident in the Intune configuration. The migration takes 12–24 months for most enterprises.',
              },
              {
                heading: 'New device Autopilot — Intune-only for all new builds',
                body: 'Stop imaging new devices via ConfigMgr task sequence. Register new hardware in Autopilot, provision them as Entra-joined Intune-only devices, and leave the existing fleet on ConfigMgr co-management. Natural device refresh over 3–5 years progressively shifts the fleet to Intune. This is the most realistic path for large organisations that cannot afford a big-bang migration.',
              },
              {
                heading: 'App re-packaging for Win32 Intune delivery',
                body: 'ConfigMgr applications must be re-packaged as .intunewin files using the Win32 Content Prep Tool before they can be deployed via Intune. Detection rules replace ConfigMgr detection methods. This is the highest-effort part of migration — plan 2–4 hours per application for packaging, detection rule authoring, and testing. Prioritise by deployment frequency: the 20 most-deployed apps cover 80% of your fleet.',
              },
              {
                heading: 'Keeping ConfigMgr for servers and OSD',
                body: 'Intune does not manage on-premises Windows Server. Organisations that complete workstation migration to Intune often retain ConfigMgr specifically for server patch management, software deployment to servers, and complex OSD scenarios. A reduced ConfigMgr footprint — fewer distribution points, no full site redundancy — remains appropriate and is a supported long-term configuration.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-border bg-surface p-5 shadow-card"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Intune vs SCCM comparison */}
      {mecmComparison && (
        <div className="border-t border-border py-12">
          <Container>
            <SectionHeader
              eyebrow="Comparison"
              title="Intune vs SCCM / MECM — The Full Analysis"
              description="Co-management has blurred the lines, but the strategic direction is clear. Read the full breakdown to understand where ConfigMgr still earns its place and where Intune is the right call."
            />
            <Link
              href={`/comparisons/${mecmComparison.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
            >
              <div>
                <p className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                  {mecmComparison.title}
                </p>
                <p className="text-xs leading-relaxed text-muted">{mecmComparison.verdict}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-primary" />
            </Link>
          </Container>
        </div>
      )}

      {/* Common Failure Points */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Common problems"
            title="Where ConfigMgr Deployments Go Wrong"
            description="Most ConfigMgr failures are either infrastructure problems (WSUS, DP, MP, SQL) or targeting problems (collection scope, maintenance window, deployment purpose). These are the patterns that appear most often in production environments."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Software update deployment failing fleet-wide — WSUS sync broken',
                detail:
                  'Updates are not reaching devices because WSUS synchronisation has failed or the Software Update Point role is unhealthy. Check wsyncmgr.log on the site server for sync errors. Common causes: WSUS certificate expiry, proxy configuration change, Windows Update endpoint blocked by firewall, or the WSUS application pool recycled under load. Run a manual sync from the ConfigMgr console: Software Library > Software Updates > Synchronise Software Updates.',
              },
              {
                title: 'Client not receiving policy — boundary group misconfiguration',
                detail:
                  'Devices are enrolled in ConfigMgr but not receiving software deployments. The device\'s IP subnet or AD site is not assigned to a boundary group, or the boundary group does not have a distribution point or management point assigned. Check LocationServices.log on the client for "No MP found" or "No DP found" messages. Verify the device\'s IP appears in a boundary and that boundary is in a group with an assigned DP.',
              },
              {
                title: 'Deployment stuck at 0% — content not distributed to DP',
                detail:
                  'The deployment exists and the device is in the target collection, but nothing downloads. The deployment package content has not been distributed to the distribution point serving the device\'s boundary group. Check the deployment\'s Content Status in the console — if the DP shows "In Progress" or "Failed," the content has not transferred. Trigger a content redistribution or check distmgr.log on the site server.',
              },
              {
                title: 'Co-management workload conflict — device getting policy from both authorities',
                detail:
                  'A device on the Windows Update Policies workload receives both a ConfigMgr SUP-controlled update schedule and an Intune update ring policy. The resulting behaviour is unpredictable — devices may install updates outside the intended ring window or bypass ConfigMgr-controlled maintenance windows. Verify the workload assignment in co-management properties and confirm only one authority is active on the device via PolicyAgent.log.',
              },
              {
                title: 'WSUS database bloat causing timeout errors',
                detail:
                  'WSUS synchronisation starts failing with timeout errors as the SUSDB grows beyond 10–15GB. Declined and superseded updates are never purged without explicit maintenance. Run the WSUS Database Maintenance SQL script (available from Microsoft) against SUSDB to re-index and purge orphaned data, then run the WSUS Cleanup Wizard from the ConfigMgr console. Schedule this as a recurring maintenance task.',
              },
              {
                title: 'Task sequence failing at Apply Driver Package — no matching driver',
                detail:
                  'OSD task sequence fails during driver injection because the driver package does not contain a driver matching the hardware in the target device (new model, new NIC or storage controller). Check smsts.log in X:\\Windows\\Temp\\SMSTSLog\\ during the failure — it will show the device model and the driver query that returned no results. Add the missing driver to the driver catalogue and re-import to the affected driver package.',
              },
              {
                title: 'Client health shows healthy but updates not installing',
                detail:
                  'CCMEval reports the client as healthy and the software update group shows as deployed, but updates are not applying. Check UpdatesDeployment.log on the device for the update evaluation cycle result and WUAHandler.log for the Windows Update Agent response. Common cause: the maintenance window is too short for the number of updates required, causing deployments to be skipped until the next window. Increase the maintenance window or reduce the update group size.',
              },
              {
                title: 'Hybrid Entra join failing — devices not appearing in Entra ID',
                detail:
                  'Co-management requires hybrid Entra joined devices. If the Automatic-Device-Join scheduled task is failing, the device will not get an Entra device object and cannot enrol in Intune. Run dsregcmd /status on the device and check the "Join Info" section. Common causes: SCP not configured in AD, Entra Connect sync not running for the computer object, or network access to device registration endpoints blocked by proxy or firewall.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-xl border border-border bg-surface p-4 shadow-card"
              >
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs leading-relaxed text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Recommended Reading Path */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Reading path"
            title="Recommended AdminSignal Reading Path"
            description="Work through this content to strengthen ConfigMgr operations — with a migration and co-management thread running through it."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Microsoft Intune vs. SCCM/MECM in 2025: Which Should You Use?',
                href: '/comparisons/intune-vs-sccm-mecm-2025',
                note: 'Start with the strategic picture — understand where ConfigMgr still earns its place versus where Intune is the better tool for your specific workloads and environment.',
              },
              {
                step: '2',
                title: 'Get-PatchComplianceReport — Script Library',
                href: '/scripts/get-patch-compliance-report',
                note: 'Query WSUS and WUfB compliance state via PowerShell. Useful for ConfigMgr environments where SSRS patch reports are not available or you need a quick scriptable compliance export.',
              },
              {
                step: '3',
                title: 'Patch Management hub',
                href: '/patch-management',
                note: 'Diagnose policy conflicts between WSUS targeting GPOs, WUfB, Intune update rings, and ConfigMgr software update workloads.',
              },
              {
                step: '4',
                title: 'Group Policy Troubleshooting with RSoP, gpresult, and Policy Scope Analysis',
                href: '/tutorials/group-policy-troubleshooting-rsop-gpresult',
                note: 'ConfigMgr co-managed environments often have overlapping GPO and Intune policy. Use RSoP and gpresult to identify which policy source is winning for a specific setting on a co-managed device.',
              },
              {
                step: '5',
                title: 'Deploy Windows 11 25H2 with Intune + Autopilot v2',
                href: '/guides/windows-11-25h2-autopilot-v2',
                note: 'The Autopilot migration path for new devices — the practical alternative to ConfigMgr OSD for cloud-joined workstations, with a PowerShell pre-flight toolkit for tenant readiness.',
              },
              {
                step: '6',
                title: 'Patch Management hub',
                href: '/patch-management',
                note: 'The full patch management reference — covering WSUS, WUfB, and Intune update rings. Essential context for ConfigMgr admins managing the Windows Update workload migration.',
              },
            ].map((item) => (
              <li key={item.step}>
                <Link
                  href={item.href}
                  className="group flex gap-4 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                    {item.step}
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted">{item.note}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      {/* Official Microsoft Resources */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Official docs"
            title="Key Microsoft Documentation"
            description="Authoritative references for ConfigMgr configuration, co-management, OSD, and software updates. Use alongside AdminSignal guides for product-specific syntax and role configuration details."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Microsoft Configuration Manager docs',
                href: 'https://learn.microsoft.com/en-us/mem/configmgr/',
                note: 'The full ConfigMgr documentation — infrastructure, client management, OSD, software updates, and reporting.',
              },
              {
                title: 'Co-management overview',
                href: 'https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview',
                note: 'Prerequisites, workload definitions, Pilot Intune collection setup, and the co-management dashboard reference.',
              },
              {
                title: 'Task sequence steps reference',
                href: 'https://learn.microsoft.com/en-us/mem/configmgr/osd/understand/task-sequence-steps',
                note: 'Every task sequence step — description, variables, conditions, and supported contexts (WinPE vs full OS).',
              },
              {
                title: 'Software updates introduction',
                href: 'https://learn.microsoft.com/en-us/mem/configmgr/sum/understand/software-updates-introduction',
                note: 'SUP role architecture, WSUS integration, ADR configuration, and the update deployment workflow.',
              },
              {
                title: 'CMPivot overview',
                href: 'https://learn.microsoft.com/en-us/mem/configmgr/core/servers/manage/cmpivot',
                note: 'CMPivot query syntax, entity reference, and examples for real-time device data collection.',
              },
              {
                title: 'Monitor clients in ConfigMgr',
                href: 'https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/monitor-clients',
                note: 'Client health evaluation, CCMEval auto-remediation, and the client health dashboard reference.',
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
              >
                <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title} ↗
                </p>
                <p className="text-xs leading-relaxed text-muted">{item.note}</p>
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* Related topics */}
      <div className="border-t border-border py-12">
        <Container>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted/60">
            Related topics
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground-soft"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </>
  )
}
