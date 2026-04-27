import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import { troubleshootingArticles } from '@/data/troubleshooting'
import StructuredData from '@/components/StructuredData'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Patch Management'
const topicDescription =
  'WSUS, Windows Update for Business, Intune update rings, and compliance reporting for enterprise Windows environments. Operational guidance for keeping endpoints current and secure.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'patch-management',
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

export default function PatchManagementPage() {
  const news = signals
    .filter(
      (s) =>
        s.tags?.includes('Patch Tuesday') ||
        s.category === 'Patch Tuesday' ||
        s.tags?.includes('CVE') ||
        s.tags?.includes('Patch Management'),
    )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  // Curated: GP troubleshooting (WUfB ring policy), CIS hardening (update controls), 25H2 deployment (ring setup)
  const tutorials = guides
    .filter((g) =>
      [
        'group-policy-troubleshooting-rsop-gpresult',
        'hardening-windows-11-cis-benchmark',
        'windows-11-25h2-autopilot-v2',
      ].includes(g.slug),
    )
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter(
      (s) =>
        s.tags.includes('Patch Management') ||
        s.tags.includes('WSUS') ||
        s.tags.includes('WUfB') ||
        s.tags.includes('Reporting'),
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
        a.category === 'Patch Management' ||
        a.affectedProducts.includes('Windows Update for Business') ||
        a.slug === 'april-2026-bitlocker-recovery-loop-kb5082063',
    )
    .slice(0, 3)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Group Policy', href: '/group-policy' },
    { name: 'PowerShell', href: '/powershell' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/patch-management',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/patch-management' },
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
            Patch Management
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            WSUS, Windows Update for Business, and Intune update rings — operational guidance for
            keeping enterprise Windows endpoints current and secure without breaking production.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* Overview */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What Patch Management Covers"
            description="Enterprise patch management is more than approving updates. It involves delivery infrastructure, ring strategy, compliance tracking, rollback planning, and integration with endpoint management tooling."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Update delivery infrastructure',
                body: 'WSUS server configuration, GPO targeting, bandwidth throttling, update category selection, and approval workflows for on-premises and hybrid environments.',
              },
              {
                heading: 'Windows Update for Business',
                body: 'Deferral policies via GPO or MDM CSP, quality and feature update separation, safeguard holds, and WUfB Reports integration for cloud-managed fleets.',
              },
              {
                heading: 'Intune update rings',
                body: 'Ring-based deployment policy configuration in Intune, quality update deferrals, deadline enforcement, and Windows Autopatch for fully managed update operations.',
              },
              {
                heading: 'Patch ring design',
                body: 'Defining pilot, early adopter, broad, and production rings — sizing each appropriately, setting deferral windows, and sequencing rollout to catch regressions before they reach the whole fleet.',
              },
              {
                heading: 'Compliance reporting',
                body: 'Identifying devices missing critical updates via WSUS console, Intune compliance blade, WUfB Reports, or PowerShell queries against the Update Agent COM API.',
              },
              {
                heading: 'Rollback and recovery',
                body: 'Pausing WUfB rings, uninstalling specific KBs via DISM or wusa.exe, safeguard hold awareness, and handling patch-induced regressions like BitLocker recovery loops.',
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

      {/* Delivery models comparison */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Delivery models"
            title="WSUS vs Windows Update for Business vs Intune Update Rings"
            description="Each model suits a different architecture. Most enterprise environments run two in parallel — typically WSUS for servers and WUfB or Intune rings for workstations."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'WSUS',
                label: 'On-premises / Hybrid',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'Best for', v: 'Large estates with bandwidth constraints, air-gapped networks, or a requirement for per-KB approval before deployment' },
                  { k: 'Ring config', v: 'GPO targets pointing clients to a WSUS server; approval workflow per update category' },
                  { k: 'Deferral granularity', v: 'Controlled by approval timing — approve when ready to deploy, defer by not approving' },
                  { k: 'Reporting', v: 'WSUS console, custom SQL against the WSUS database, or Get-PatchComplianceReport' },
                  { k: 'Watch out for', v: 'WSUS cleanup debt, large WsusContent directories, and client registry stale pointing to decommed WSUS servers' },
                ],
              },
              {
                name: 'Windows Update for Business',
                label: 'Cloud / Hybrid',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'Best for', v: 'Eliminating WSUS infrastructure for workstations while retaining ring-based deferral control' },
                  { k: 'Ring config', v: 'GPO (Update/DeferQualityUpdatesPeriodInDays) or Intune CSP; separate settings for quality and feature updates' },
                  { k: 'Deferral granularity', v: 'Day-level deferral for quality updates (0–30 days) and feature updates (0–365 days); no per-KB control' },
                  { k: 'Reporting', v: 'WUfB Reports (Azure Monitor workbook), Windows Autopatch reporting, or Graph API queries' },
                  { k: 'Watch out for', v: 'Conflicting WSUS GPOs on hybrid-joined devices; consumer update settings from Microsoft accounts overriding deferral' },
                ],
              },
              {
                name: 'Intune Update Rings',
                label: 'Cloud-managed',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'Best for', v: 'Intune-managed fleets where patch policy lives alongside device configuration and compliance in a single pane' },
                  { k: 'Ring config', v: 'Intune Devices → Update rings for Windows 10 and later; quality update deferral, deadlines, and active hours per ring' },
                  { k: 'Deferral granularity', v: 'Day-level deferral plus deadline enforcement and grace period; Windows Autopatch automates ring progression' },
                  { k: 'Reporting', v: 'Intune Update compliance blade, per-device policy status, and Export-IntuneDeviceReport for inventory cross-reference' },
                  { k: 'Watch out for', v: 'GPO and Intune policy conflicts on hybrid-joined devices; ensure only one management authority controls Windows Update settings' },
                ],
              },
            ].map((model) => (
              <div
                key={model.name}
                className={`rounded-xl border ${model.border} ${model.bg} p-5`}
              >
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

      {/* Latest news */}
      <ContentRow items={news} sectionTitle="Latest News" viewAllHref="/news" />

      {/* Recommended ring structure */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Ring strategy"
            title="Recommended Patch Ring Structure"
            description="Four rings cover most enterprise fleet sizes. Adjust sizing to fit your environment — the key constraint is that each ring must be large enough to reliably surface regressions before the next ring deploys."
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-widest text-muted/60">
                    Ring
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-widest text-muted/60">
                    Typical size
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-widest text-muted/60">
                    Quality update deferral
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-widest text-muted/60">
                    Target devices
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-widest text-muted/60">
                    Monitoring focus
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    ring: 'Ring 0 — Pilot',
                    size: '2–5%',
                    deferral: '0 days',
                    devices: 'IT staff, sysadmin workstations, lab machines',
                    monitor: 'Application crashes, driver conflicts, known-bad KBs from MSRC',
                  },
                  {
                    ring: 'Ring 1 — Early Adopters',
                    size: '10–15%',
                    deferral: '7 days',
                    devices: 'Technically confident users, dev/test machines, volunteers',
                    monitor: 'LOB app compatibility, BitLocker PCR state, boot time regressions',
                  },
                  {
                    ring: 'Ring 2 — Broad Phase 1',
                    size: '35–40%',
                    deferral: '14 days',
                    devices: 'Standard workforce, geographically mixed sample',
                    monitor: 'Helpdesk ticket volume, WER reports, compliance delta vs. previous ring',
                  },
                  {
                    ring: 'Ring 3 — Production',
                    size: '40–50%',
                    deferral: '21 days',
                    devices: 'Remaining fleet, including VDI base images and shift workers',
                    monitor: 'Final patch lag report, deadline compliance, any held devices',
                  },
                ].map((row) => (
                  <tr key={row.ring} className="text-xs text-muted">
                    <td className="py-3 pr-6 font-semibold text-foreground/90">{row.ring}</td>
                    <td className="py-3 pr-6">{row.size}</td>
                    <td className="py-3 pr-6">{row.deferral}</td>
                    <td className="py-3 pr-6">{row.devices}</td>
                    <td className="py-3">{row.monitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted/60">
            For Intune-managed fleets, map each ring to an Entra ID device group and assign a
            corresponding Intune update ring policy. For WUfB via GPO, use a separate OU or
            security group filter per ring.
          </p>
        </Container>
      </div>

      {/* Tutorials */}
      <ContentRow items={tutorials} sectionTitle="Deep-Dive Tutorials" viewAllHref="/tutorials" />

      {/* Scripts */}
      <ContentRow items={scriptItems} sectionTitle="Scripts & Automation" viewAllHref="/scripts" />

      {/* Monitoring and compliance */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Compliance"
            title="Monitoring and Compliance Checks"
            description="Patch compliance is only visible if you are actively querying it. These are the primary data sources and queries used in production environments."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Intune — Update compliance blade',
                body: 'Navigate to Devices → Monitor → Feature update failures or Quality update compliance. Shows per-device status, last scan time, and pending updates. Filter by OS version or ring assignment group.',
              },
              {
                heading: 'WUfB Reports (Azure Monitor)',
                body: 'The Windows Update for Business Reports workbook in Azure Monitor shows fleet-wide update status with device-level drill-down. Requires diagnostic data at Enhanced or Full level and the UCClient tables populated in Log Analytics.',
              },
              {
                heading: 'WSUS console',
                body: 'Computers → [target group] → Update Status shows approved vs. installed vs. failed counts. The "Updates needing approval" view is the fastest way to find KBs blocked at the approval stage.',
              },
              {
                heading: 'Get-PatchComplianceReport script',
                body: 'Queries the local Windows Update Agent via COM API or WSUS WMI to produce a per-device patch lag report with severity breakdown. Useful for scheduled compliance email reports.',
              },
              {
                heading: 'Event log',
                body: 'Microsoft-Windows-WindowsUpdateClient/Operational logs every update evaluation, download, install, and failure. Event ID 19 = update successfully installed. Event ID 20 = installation failure. Filter by event source on domain controllers or critical servers.',
              },
              {
                heading: 'Graph API (Intune-enrolled devices)',
                body: 'GET /deviceManagement/managedDevices?$select=deviceName,osVersion,complianceState,lastSyncDateTime returns OS version and compliance state for each enrolled device. Combine with Export-IntuneDeviceReport for exportable baselines.',
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

      {/* Troubleshooting */}
      <ContentRow
        items={troubleshootingItems}
        sectionTitle="Troubleshooting"
        viewAllHref="/troubleshooting"
      />

      {/* Common failure points */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Common problems"
            title="Where Patch Management Goes Wrong"
            description="Most patch management failures fall into a small set of repeating patterns. These are the ones most likely to appear in your environment."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'WUfB deferral settings ignored',
                detail:
                  'A WSUS-targeting GPO on a hybrid-joined device overrides WUfB deferral CSP settings. A Microsoft account signed into Windows can also trigger consumer update policies that bypass corporate deferral. See the WUfB deferral troubleshooting guide.',
              },
              {
                title: 'WSUS clients not reporting',
                detail:
                  'Clients pointing at a WSUS server that has been decommissioned, renamed, or is behind a firewall rule that has changed. Check the registry key HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\WUServer and confirm the server is reachable.',
              },
              {
                title: 'Update ring too thin to catch regressions',
                detail:
                  'A pilot ring of 5 devices across a fleet of 2,000 will statistically miss most application compatibility issues. Size Ring 0 to cover your full spread of hardware models, OS builds, and critical application profiles.',
              },
              {
                title: 'Quality update deferral bypassed by feature update',
                detail:
                  'The quality update deferral setting and the feature update deferral setting are separate. A device can be deferring quality updates correctly while receiving a feature update because the feature update policy has a shorter deferral or is unset.',
              },
              {
                title: 'Patch triggers BitLocker recovery loop',
                detail:
                  'Cumulative updates that include UEFI CA certificate rotations or Secure Boot database changes can break PCR7 binding on specific Dell and Lenovo hardware, placing devices into BitLocker recovery. Suspend BitLocker before deploying suspected updates to pilot ring first.',
              },
              {
                title: 'WSUS approval backlog',
                detail:
                  'In automatic approval rule environments, a misconfigured rule stops approving updates — often after a WSUS server OS upgrade or a service account password rotation. The WSUS console shows updates accumulating in "Any Except Declined" without entering "Approved."',
              },
              {
                title: 'Dual management conflict (GPO + Intune)',
                detail:
                  'Hybrid-joined devices with both a WSUS-targeting GPO and an Intune update ring policy will behave unpredictably. Microsoft\'s guidance is to use one management authority for Windows Update settings. Audit with gpresult /H and the Intune device policy status page.',
              },
              {
                title: 'No rollback plan for critical KBs',
                detail:
                  'KB uninstall via DISM or wusa.exe is not always available — some updates are non-removable once installed. Identify these before deployment, test on a snapshot or lab VM, and know which updates can and cannot be rolled back.',
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

      {/* Rollback and recovery */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Rollback"
            title="Rollback and Recovery Considerations"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Pausing WUfB rings',
                body: 'In the Intune portal: Devices → Update rings → select ring → Pause. This pauses quality updates for up to 35 days. For GPO-managed WUfB, set Update/PauseQualityUpdates to 1 and set the pause start date.',
              },
              {
                heading: 'Uninstalling a specific KB',
                body: 'Run wusa.exe /uninstall /kb:XXXXXXX /quiet /norestart or DISM /Online /Remove-Package /PackageName:Package_for_KBXXXXXXX~.... Not all KBs are removable — check with DISM /Online /Get-Packages first.',
              },
              {
                heading: 'WSUS update decline',
                body: 'In the WSUS console: Updates → right-click the update → Decline. This prevents further distribution to clients but does not uninstall from devices that have already received it.',
              },
              {
                heading: 'Safeguard holds',
                body: 'Microsoft can place a safeguard hold on a specific hardware or software configuration to prevent feature update delivery when a known incompatibility exists. These are not visible in WSUS; check the Windows Update Health Tools or WUfB Reports.',
              },
              {
                heading: 'BitLocker and patches',
                body: 'Some patches (particularly those touching Secure Boot or UEFI certificates) can trigger BitLocker recovery loops on specific hardware. Suspend BitLocker for one reboot before deploying suspected high-risk patches to your pilot ring.',
              },
              {
                heading: 'VDI base image refresh',
                body: 'Non-persistent VDI images need the patch applied at the golden image level. Patch the base image, seal it, and re-publish before the patch deadline. Persistent desktops patch like physical endpoints.',
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
