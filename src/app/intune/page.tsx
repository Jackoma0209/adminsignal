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

const topicName = 'Microsoft Intune'
const topicDescription =
  'MDM policy, Autopilot, compliance baselines, app deployment, and co-management. Everything you need to run Intune at enterprise scale — from onboarding to remediation.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'intune',
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

export default function IntunePage() {
  const news = signals
    .filter((s) => s.tags?.includes('Intune') || s.category === 'Microsoft Intune')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Intune') || g.category === 'Microsoft Intune')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Intune'))
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
        a.category === 'Microsoft Intune' ||
        a.affectedProducts.includes('Microsoft Intune') ||
        a.affectedProducts.includes('Windows Autopilot'),
    )
    .slice(0, 4)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const relatedTopics = [
    { name: 'Microsoft 365', href: '/microsoft-365' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'Windows Server', href: '/windows-server' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/intune',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/intune' },
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
            Microsoft Intune
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            MDM policy, Autopilot enrollment, compliance baselines, app deployment, update rings,
            and co-management — operational coverage for endpoint engineers running Intune at
            enterprise scale.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* What Intune Is Used For */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What Intune Is Used For in Real Endpoint Environments"
            description="Intune is Microsoft's cloud-native MDM and MAM platform. In production it covers the full device lifecycle — from zero-touch provisioning through compliance enforcement, app distribution, and patch management — without requiring on-premises infrastructure."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Zero-touch device provisioning',
                body: 'Autopilot registers devices against your tenant so that when a machine is unboxed and powered on, it receives corporate policy, apps, and configuration with no imaging or manual setup required.',
              },
              {
                heading: 'Compliance and Conditional Access',
                body: 'Compliance policies evaluate device health — encryption state, OS version, threat protection scores — and feed into Entra Conditional Access to block or grant access to Microsoft 365 and other cloud resources based on device posture.',
              },
              {
                heading: 'App lifecycle management',
                body: 'Win32, Microsoft Store, and line-of-business apps are assigned as Required, Available, or Uninstall. Intune tracks install state per device and surfaces failures in the portal and via Graph API.',
              },
              {
                heading: 'Configuration profiles',
                body: 'Settings Catalog, administrative templates, and custom OMA-URI policies replace Group Policy for cloud-managed fleets. Profiles target Entra ID security groups and report per-device application state.',
              },
              {
                heading: 'Update rings and patch management',
                body: 'Quality and feature update deferral policies let you sequence rollout across pilot, early adopter, and production rings. Windows Autopatch can manage ring progression automatically for qualifying tenants.',
              },
              {
                heading: 'Endpoint analytics and remediation',
                body: 'Proactive Remediation scripts (detect + remediate pairs) run on a schedule and report pass/fail counts in the portal. Endpoint Analytics tracks startup performance, restart frequency, and resource bottlenecks across the managed fleet.',
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

      {/* Autopilot and Enrollment */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Enrollment"
            title="Autopilot and Device Enrollment"
            description="How a device reaches Intune management determines what it can do and what policies apply. Most enterprise deployments use a mix of Autopilot, hybrid join, and manual enrollment for edge cases."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[
              {
                name: 'Autopilot v2 — Device Preparation',
                label: 'Recommended for new deployments',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'What it does', v: 'Replaces v1 user-driven mode for Entra-joined devices. Uses a Device Preparation policy rather than an Autopilot profile, with faster provisioning time and simplified ESP.' },
                  { k: 'Prerequisites', v: 'Device registered in Autopilot hardware hash, Intune enrolled via OOBE, Device Preparation policy assigned to a device group (not user group).' },
                  { k: 'Enrollment Status Page', v: 'Tracks account setup and device setup phases. Configure minimum apps to block on before the user reaches the desktop — omit non-critical apps to cut provisioning time.' },
                  { k: 'Common failure point', v: 'ESP stuck at 0% usually indicates the device cannot reach Intune endpoints. Check WCD log at C:\\Windows\\Temp\\MDMDiagnostics and verify network connectivity to *.manage.microsoft.com.' },
                ],
              },
              {
                name: 'Autopilot v1 — User-Driven and Self-Deploying',
                label: 'Legacy / kiosk scenarios',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'User-driven mode', v: 'Device arrives pre-registered. User signs in with corporate credentials during OOBE and the device joins Entra ID and enrolls in Intune automatically.' },
                  { k: 'Self-deploying mode', v: 'No user interaction required — uses TPM attestation. Suited for kiosks, digital signage, and shared devices. Requires TPM 2.0.' },
                  { k: 'Pre-provisioning (White Glove)', v: 'IT or OEM pre-stages device policy and apps before delivering to the end user. Splits ESP into technician phase and user phase.' },
                  { k: 'Migration path', v: 'Microsoft recommends moving to v2 Device Preparation for new Entra-joined deployments. v1 profiles remain supported for hybrid join scenarios.' },
                ],
              },
              {
                name: 'Hybrid Azure AD Join + Co-management',
                label: 'Mixed on-premises / cloud',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'What it is', v: 'Devices joined to on-premises Active Directory and also registered in Entra ID. Enables co-management with SCCM — workloads split between ConfigMgr and Intune.' },
                  { k: 'Workload sliding', v: 'In SCCM co-management settings, each workload (Compliance, Device Configuration, Windows Update) can be set to Pilot Intune or Intune when you are ready to migrate it.' },
                  { k: 'Policy conflict risk', v: 'Hybrid-joined devices can receive both GPO and Intune policy. Ensure a single management authority for each setting — especially Windows Update, BitLocker, and Defender.' },
                  { k: 'Common failure point', v: 'AAD Connect sync delay causes the Entra object to not appear when Intune tries to match the enrollment. Check sync status and the device object in Entra ID.' },
                ],
              },
              {
                name: 'BYOD and Corporate-Owned Personal',
                label: 'MAM / user enrollment',
                color: 'text-amber-400',
                border: 'border-amber-400/20',
                bg: 'bg-amber-400/5',
                rows: [
                  { k: 'Entra registered (BYOD)', v: 'User enrolls via Company Portal or Settings > Access Work or School. Device receives MAM or MDM policy depending on tenant configuration. Not Entra joined.' },
                  { k: 'User enrollment (iOS/macOS)', v: 'Apple-specific enrollment mode that separates managed and personal data at the partition level. Intune can manage work apps and data without touching personal storage.' },
                  { k: 'Opt-in MDM enrollment', v: 'A 2026 preview setting lets admins block automatic MDM enrollment triggered during Microsoft account sign-in to Windows — important for BYOD and multi-tenant scenarios.' },
                  { k: 'App protection policies', v: 'MAM policies enforce encryption, copy-paste restrictions, and PIN on managed apps (Outlook, Teams, Edge) without full MDM enrollment — suited for unmanaged personal devices.' },
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
      <ContentRow items={news} sectionTitle="Latest News" viewAllHref="/news" />

      {/* Compliance and Conditional Access */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Compliance"
            title="Compliance Policies and Conditional Access"
            description="Compliance policies evaluate device state against a defined standard. Entra Conditional Access uses compliance signal as a gate — non-compliant devices can be blocked from Microsoft 365 services automatically."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Built-in compliance settings',
                body: 'Cover OS version minimum, BitLocker state, Secure Boot, code integrity, Defender real-time protection, and maximum allowed threat severity from Defender for Endpoint. Evaluated by the Intune management extension on a configurable schedule.',
              },
              {
                heading: 'Custom compliance scripts',
                body: 'For settings not covered by built-in rules, PowerShell detection scripts return JSON that Intune evaluates against compliance rules you define. Useful for third-party AV state, hardware inventory checks, or custom security controls.',
              },
              {
                heading: 'Actions for noncompliance',
                body: 'Configurable grace period before a device is marked noncompliant. Actions include: send email to user, remotely lock device, retire device, or mark as noncompliant immediately. The grace period gives IT time to remediate before access is blocked.',
              },
              {
                heading: 'Conditional Access integration',
                body: 'The "Require device to be marked as compliant" CA grant control uses Intune compliance signal. Pair with "Require Entra joined or hybrid joined device" and MFA to build a strong access baseline. Emergency access accounts must be excluded from device compliance requirements.',
              },
              {
                heading: 'Compliance policy targeting',
                body: 'Policies assign to Entra ID user or device groups. A device with no assigned compliance policy defaults to compliant — configure the tenant-wide default in Endpoint security > Device compliance > Compliance policy settings.',
              },
              {
                heading: 'Monitoring compliance state',
                body: 'Devices > Monitor > Noncompliant devices shows per-device noncompliance reasons. The compliance per setting report shows which specific settings are failing across the fleet. Export-IntuneDeviceReport surfaces complianceState for bulk analysis.',
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

      {/* Update Rings and Patch Management */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Patch management"
            title="Update Rings and Windows Autopatch"
            description="Intune update rings give you ring-based quality and feature update deferral without WSUS infrastructure. Windows Autopatch layers automation on top, managing ring assignment and pause decisions based on fleet signal."
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Ring', 'Quality deferral', 'Feature deferral', 'Target group', 'Deadline enforcement'].map((h) => (
                    <th key={h} className="pb-3 pr-6 text-left text-xs font-semibold uppercase tracking-widest text-muted/60">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { ring: 'Ring 0 — Pilot', quality: '0 days', feature: '0 days', target: 'IT staff, lab machines', deadline: '3 days' },
                  { ring: 'Ring 1 — Early Adopters', quality: '7 days', feature: '30 days', target: 'Technically confident users, dev machines', deadline: '5 days' },
                  { ring: 'Ring 2 — Broad Phase 1', quality: '14 days', feature: '60 days', target: 'Standard workforce sample', deadline: '7 days' },
                  { ring: 'Ring 3 — Production', quality: '21 days', feature: '90 days', target: 'Remaining managed fleet, VDI', deadline: '7 days' },
                ].map((row) => (
                  <tr key={row.ring} className="text-xs text-muted">
                    <td className="py-3 pr-6 font-semibold text-foreground/90">{row.ring}</td>
                    <td className="py-3 pr-6">{row.quality}</td>
                    <td className="py-3 pr-6">{row.feature}</td>
                    <td className="py-3 pr-6">{row.target}</td>
                    <td className="py-3">{row.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted/60">
            Map each ring to an Entra ID dynamic device group. Assign update ring policies to device groups, not user groups, to ensure consistent enforcement regardless of who signs in. For Windows Autopatch, ensure devices meet prerequisites (Windows 11 or Windows 10 22H2+, Intune-managed, Entra joined or hybrid joined).
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                heading: 'Pausing a ring',
                body: 'Devices > Update rings > select ring > Pause. Pauses quality updates for up to 35 days. Use immediately when a problematic KB is confirmed — before it hits your next ring.',
              },
              {
                heading: 'Windows Autopatch',
                body: 'Automates ring progression and pause decisions based on Microsoft telemetry. Releases devices from rings when update health metrics are green. Requires Intune P1 or Microsoft 365 E3/E5.',
              },
              {
                heading: 'Avoiding GPO conflicts',
                body: 'Hybrid-joined devices with both a WSUS-targeting GPO and an Intune update ring will behave unpredictably. Audit with gpresult /H — only one management authority should own Windows Update settings.',
              },
            ].map((item) => (
              <div key={item.heading} className="rounded-xl border border-border bg-surface p-5 shadow-card">
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Tutorials */}
      <ContentRow items={tutorials} sectionTitle="Deep-Dive Tutorials" viewAllHref="/tutorials" />

      {/* App Deployment and Remediation */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="App deployment"
            title="App Deployment and Remediation Scripts"
            description="Intune handles app deployment from discovery through installation tracking. Proactive Remediations let you enforce state beyond what configuration profiles cover, using detect-and-remediate PowerShell script pairs."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Win32 app deployment (.intunewin)',
                body: 'Package the installer and dependencies using the Win32 Content Prep Tool to create an .intunewin file. Define install and uninstall commands, return codes, and detection rules. Win32 apps support complex dependency chains and are the right choice for most enterprise applications.',
              },
              {
                heading: 'Detection rules',
                body: 'Detection rules tell Intune whether an app is installed. Use MSI product code for MSI packages, file or folder existence for custom installs, or registry key/value for apps that write a known key on install. Avoid version-only detection unless the app writes a consistent version string.',
              },
              {
                heading: 'Required vs Available vs Uninstall',
                body: 'Required: installs automatically on targeted devices without user interaction. Available: appears in Company Portal for user-initiated install. Uninstall: removes the app from targeted devices. Assign to device groups for kiosks and shared devices; user groups for personal use cases.',
              },
              {
                heading: 'Microsoft Store integration (new Store)',
                body: 'The refreshed Store app integration in Intune syncs Store apps directly — no sideloading or offline packaging required. Assigns like any other app type. Best suited for apps that publish to the new Store and maintain their own update mechanism.',
              },
              {
                heading: 'Proactive Remediation scripts',
                body: 'Script pairs — a detection script and a remediation script — run on a schedule and report pass/fail counts per device in Endpoint Analytics. Use for enforcing settings that fall outside compliance policy scope: time zone, proxy config, local group membership, or legacy app cleanup.',
              },
              {
                heading: 'PowerShell scripts (one-time)',
                body: 'One-time PowerShell scripts run once per device and are suited for configuration tasks at provisioning time. Unlike Proactive Remediations, they do not re-run on schedule. The Intune Management Extension (IME) log at C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log captures execution detail.',
              },
            ].map((item) => (
              <div key={item.heading} className="rounded-xl border border-border bg-surface p-5 shadow-card">
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Scripts */}
      <ContentRow items={scriptItems} sectionTitle="Scripts & Automation" viewAllHref="/scripts" />

      {/* Reporting and Troubleshooting Workflow */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Diagnostics"
            title="Reporting and Troubleshooting Workflow"
            description="Intune troubleshooting starts in the portal and goes deeper into device-side logs when the portal gives insufficient detail. Knowing where to look at each layer is what separates fast resolutions from hour-long guesses."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Intune portal — device detail blade',
                body: 'Devices > select device > Device configuration shows per-profile application status and the specific setting that failed. Devices > Troubleshoot + support > Troubleshoot shows assignment resolution for a specific user, including group membership and policy conflicts.',
              },
              {
                heading: 'MDM Diagnostic Tool',
                body: 'Run mdmdiagnosticstool.exe -area DeviceEnrollment;DeviceProvisioning;Autopilot -zip C:\\Temp\\mdm.zip on the affected device. The ZIP contains MDM event logs, registry snapshots, and the enrollment status page log — the fastest way to diagnose enrollment and ESP failures without remote access.',
              },
              {
                heading: 'Event Viewer — MDM channels',
                body: 'Applications and Services Logs > Microsoft > Windows > DeviceManagement-Enterprise-Diagnostics-Provider. The Admin and Debug channels log policy processing, setting application, and CSP errors. Event ID 404 = CSP setting failed. Event ID 814 = policy conflict.',
              },
              {
                heading: 'Intune Management Extension log',
                body: 'C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log records Win32 app downloads, installs, detection rule results, and PowerShell script execution. Filter by the app name or script ID for targeted investigation.',
              },
              {
                heading: 'Graph API queries',
                body: 'GET /deviceManagement/managedDevices/{id}/deviceConfigurationStates returns per-profile compliance state. GET /deviceManagement/managedDevices?$filter=complianceState eq \'noncompliant\' returns all noncompliant devices. Combine with Export-IntuneDeviceReport for exportable baselines.',
              },
              {
                heading: 'Windows Autopilot deployment report',
                body: 'Devices > Monitor > Autopilot deployments shows per-device phase timing, ESP step results, and failure codes. The deployment profile assignment column confirms which profile the device matched. Cross-reference with the hardware hash in Devices > Enrollment > Windows enrollment > Devices.',
              },
            ].map((item) => (
              <div key={item.heading} className="rounded-xl border border-border bg-surface p-5 shadow-card">
                <p className="mb-2 text-sm font-semibold text-foreground">{item.heading}</p>
                <p className="text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Troubleshooting articles */}
      <ContentRow
        items={troubleshootingItems}
        sectionTitle="Troubleshooting"
        viewAllHref="/troubleshooting"
      />

      {/* Common Failure Points */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Common problems"
            title="Where Intune Deployments Go Wrong"
            description="Most Intune failures are configuration or targeting problems, not platform bugs. These are the patterns that appear most often in production environments."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'ESP stuck at 0%',
                detail:
                  'The Enrollment Status Page hangs because the device cannot reach Intune service endpoints during OOBE. Check that *.manage.microsoft.com and *.cdn.manage.microsoft.com are reachable before the user completes sign-in. A proxy or firewall blocking these endpoints is the most common cause.',
              },
              {
                title: 'Policy not applied — wrong group type',
                detail:
                  'Configuration profiles and update rings assigned to device groups apply based on the device object in Entra. If you assign to user groups, the policy applies when the user signs in — not at provisioning time. Kiosk and Autopilot self-deploy scenarios must use device groups.',
              },
              {
                title: 'Compliance shows "Not evaluated"',
                detail:
                  'A device shows Not evaluated when it has not checked in since a compliance policy was assigned, when the IME service is not running, or when the device object in Entra does not match the Intune-enrolled identity. Trigger a sync via the Sync action in the portal or the Settings app.',
              },
              {
                title: 'Win32 app stuck in pending install',
                detail:
                  'Check the IME log for download or detection failures. Common causes: incorrect detection rule (app is installed but detection returns false), install command not running as SYSTEM when required, or a dependency app that failed installation first.',
              },
              {
                title: 'Hybrid join device not enrolling in Intune',
                detail:
                  'SCCM co-management must be configured with the Intune enrollment workload enabled. The co-management authority and the MDM auto-enrollment GPO (HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\MDM\\MDMEnrollmentURL) must point to Intune. Check the SCCM co-management dashboard for blocked devices.',
              },
              {
                title: 'BitLocker key not escrowed to Entra',
                detail:
                  'This is a silent failure — no error on device, no alert in Intune. The key escrow happens via the BitLocker configuration profile CSP. Verify the profile is applied, then force escrow with Manage-bde -protectors -adbackup C: -id {keyprotectorID}. Check Entra ID device properties for the Recovery Keys tab.',
              },
              {
                title: 'Duplicate or stale device objects',
                detail:
                  'Re-enrolled devices sometimes create a second Intune object. The old object retains the last compliance state and group memberships. Delete the stale object in Intune (Devices > All devices) — but verify it is not the active enrollment before deleting.',
              },
              {
                title: 'Policy conflict on hybrid-joined devices',
                detail:
                  'A device receiving both a GPO and an Intune CSP for the same setting will apply whichever wins the MDM vs GPO precedence rules for that specific CSP. Use gpresult /H and the Intune device configuration state page together to identify which settings are being overridden.',
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
            description="If you are building out Intune coverage or onboarding to an existing deployment, work through content in this order — each piece builds on the previous."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Understanding Autopilot v2: Enrollment Profiles, ESP, and Common Failure Modes',
                href: '/tutorials/autopilot-v2-enrollment-esp-troubleshooting',
                note: 'Start here if you are new to Autopilot or migrating from v1. Covers the Device Preparation policy, ESP configuration, and failure decision tree.',
              },
              {
                step: '2',
                title: 'Deploy Windows 11 25H2 with Intune + Autopilot v2 (Zero-Touch, Production-Ready)',
                href: '/guides/windows-11-25h2-autopilot-v2',
                note: 'End-to-end production deployment guide — tenant readiness, ESP config, app tiering, update rings, phased rollout, and pre-flight PowerShell toolkit.',
              },
              {
                step: '3',
                title: 'Configuring Conditional Access for a Microsoft 365 Tenant',
                href: '/tutorials/conditional-access-m365-policy-map',
                note: 'Build the Conditional Access baseline that uses Intune compliance as a device gate. Covers compliant device enforcement, MFA, and emergency access.',
              },
              {
                step: '4',
                title: 'Deploying Windows LAPS with Microsoft Intune',
                href: '/tutorials/deploy-windows-laps-intune',
                note: 'Covers Windows LAPS policy configuration, reporting, and migration from legacy LAPS — a common early Intune hardening task.',
              },
              {
                step: '5',
                title: 'Intune Compliance Policy Not Evaluating',
                href: '/troubleshooting/intune-compliance-policy-not-evaluating',
                note: 'Troubleshoot devices stuck in Not evaluated or incorrect compliance states — the most common day-two operational issue.',
              },
              {
                step: '6',
                title: 'Autopilot Enrollment Status Page Stuck at 0%',
                href: '/troubleshooting/autopilot-enrollment-status-page-stuck',
                note: 'ESP failure diagnosis — Event Viewer locations, MDM logs, and the six most frequent root causes with fixes.',
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

      {/* Intune vs SCCM comparison link */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Comparison"
            title="Intune vs SCCM / MECM"
            description="Co-management has blurred the lines between the two platforms, but the strategic direction is clear. Read the full breakdown to understand where each tool still earns its place."
          />
          <Link
            href="/comparisons/intune-vs-sccm-mecm-2025"
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
          >
            <div>
              <p className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                Microsoft Intune vs. SCCM/MECM in 2025: Which Should You Use?
              </p>
              <p className="text-xs leading-relaxed text-muted">
                For new deployments and cloud-first organisations, Intune is the clear path. SCCM still has a role in environments with complex OSD requirements or significant on-premises infrastructure — but plan your exit strategy.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-primary" />
          </Link>
        </Container>
      </div>

      {/* Official Microsoft resources */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Official docs"
            title="Key Microsoft Documentation"
            description="Authoritative references for Intune configuration, compliance, and deployment. Use these alongside AdminSignal guides when you need policy syntax or service limits."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Microsoft Intune overview',
                href: 'https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune',
                note: 'Platform capabilities, licensing requirements, and supported platforms.',
              },
              {
                title: 'Windows Autopilot documentation',
                href: 'https://learn.microsoft.com/en-us/autopilot/',
                note: 'All Autopilot scenarios, prerequisites, and deployment modes including v2 Device Preparation.',
              },
              {
                title: 'Device compliance policies',
                href: 'https://learn.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started',
                note: 'Built-in compliance settings, custom compliance scripts, and noncompliance actions.',
              },
              {
                title: 'Update rings for Windows',
                href: 'https://learn.microsoft.com/en-us/mem/intune/protect/windows-10-update-rings',
                note: 'Quality and feature update deferral policy configuration in Intune.',
              },
              {
                title: 'Win32 app management',
                href: 'https://learn.microsoft.com/en-us/mem/intune/apps/apps-win32-app-management',
                note: 'Packaging, uploading, detection rules, dependencies, and supersedence.',
              },
              {
                title: 'Windows Autopatch overview',
                href: 'https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview',
                note: 'Automated update ring management on top of Intune — prerequisites and how ring progression works.',
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
