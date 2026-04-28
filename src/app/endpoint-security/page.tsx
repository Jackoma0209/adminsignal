import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import { troubleshootingArticles } from '@/data/troubleshooting'
import { reviews } from '@/data/reviews'
import { comparisons } from '@/data/comparisons'
import StructuredData from '@/components/StructuredData'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Endpoint Security'
const topicDescription =
  'Hardening baselines, Defender for Endpoint, BitLocker, local admin control, and Conditional Access. Practical guidance for locking down Windows endpoints in Microsoft environments.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'endpoint-security',
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

export default function EndpointSecurityPage() {
  const news = signals
    .filter(
      (s) =>
        s.tags?.includes('Security') ||
        s.category === 'Endpoint Security' ||
        s.category === 'Security Alert',
    )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter(
      (g) =>
        g.tags?.includes('Endpoint Security') ||
        g.category === 'Endpoint Security' ||
        g.tags?.includes('Hardening') ||
        g.tags?.includes('CIS Benchmark') ||
        g.tags?.includes('LAPS') ||
        g.tags?.includes('Security Baseline'),
    )
    .slice(0, 4)
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Security') || s.tags.includes('Hardening') || s.tags.includes('CIS'))
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
        a.category === 'Endpoint Security' ||
        a.affectedProducts.includes('BitLocker') ||
        a.affectedProducts.includes('Windows Autopilot'),
    )
    .slice(0, 4)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const endpointReviews = reviews
    .filter((r) => r.category === 'Endpoint Security')
    .slice(0, 2)
    .map((r) => ({
      title: r.title,
      href: `/reviews/${r.slug}`,
      excerpt: r.excerpt,
      meta: `${r.readTime} · ${r.rating}/5`,
    }))

  const endpointComparisons = comparisons
    .filter((c) => c.category === 'Endpoint Security' || c.category === 'Endpoint Management')
    .slice(0, 2)
    .map((c) => ({
      title: c.title,
      href: `/comparisons/${c.slug}`,
      excerpt: c.excerpt,
      meta: c.readTime,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'Group Policy', href: '/group-policy' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/endpoint-security',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/endpoint-security' },
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
            Endpoint Security
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Hardening baselines, Defender for Endpoint, BitLocker, LAPS, and Conditional Access
            enforcement. Practical guidance for securing Windows endpoints in Microsoft-managed
            environments — from first boot through ongoing operations.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* What Endpoint Security Covers */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What Endpoint Security Covers in Windows Environments"
            description="Endpoint security is not a single product — it is a stack of overlapping controls. In a Microsoft environment, that stack runs from hardware-level Secure Boot through identity-linked Conditional Access, with Intune and Defender providing the management and detection layers in between."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Hardening baselines',
                body: 'Applying a defined security configuration — CIS Benchmark, Microsoft Security Baseline, or DISA STIG — reduces the attack surface by disabling unused services, enforcing audit policy, restricting credential exposure, and enabling exploit mitigations.',
              },
              {
                heading: 'Antivirus and EDR',
                body: 'Microsoft Defender Antivirus is the built-in AV layer. Defender for Endpoint (MDE) adds behavioural detection, threat intelligence, automated investigation, and the advanced hunting query interface. Third-party EDR (CrowdStrike, SentinelOne) replaces or supplements these capabilities.',
              },
              {
                heading: 'Device encryption',
                body: 'BitLocker encrypts the OS volume using TPM-backed key protection. Proper deployment requires Secure Boot, a TPM 2.0 chip, and key escrow to Entra ID or Active Directory before encryption is enforced — so keys are retrievable when users are locked out.',
              },
              {
                heading: 'Local administrator control',
                body: 'Unmanaged local admin accounts are a persistent lateral movement risk. Windows LAPS rotates the local administrator password automatically and stores it in Entra ID or AD, making the credential unique per device and auditable.',
              },
              {
                heading: 'Conditional Access and compliance',
                body: 'Entra Conditional Access uses device compliance state from Intune as a gate for cloud resource access. Non-compliant or unmanaged devices can be blocked from Microsoft 365, SharePoint, and other services — without VPN.',
              },
              {
                heading: 'Vulnerability and patch exposure',
                body: 'Unpatched endpoints are the most common initial access vector. Defender Vulnerability Management scores exposure per device based on installed software, OS version, and configuration weaknesses — and integrates with Intune for remediation tracking.',
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

      {/* Windows Hardening Baseline */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Hardening"
            title="Windows Hardening Baseline"
            description="A hardening baseline is a documented, repeatable configuration applied to every managed endpoint. Three major baselines are in common enterprise use — each with different scope, update cadence, and compliance mapping requirements."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'CIS Benchmark — Level 1',
                label: 'Most widely adopted',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'What it covers', v: 'Account policies, local policies, Windows Firewall, audit policy, user rights, and security options. Level 1 is intended for broad deployment without impacting usability.' },
                  { k: 'Level 2 additions', v: 'More aggressive restrictions — AppLocker, Windows Installer restrictions, SMBv1 disablement, and stricter audit policy. May require application compatibility testing before broad rollout.' },
                  { k: 'Deployment method', v: 'GPO import (CIS provides a GPO pack), Intune Settings Catalog, or a PowerShell script such as Invoke-WindowsHardening running as a Proactive Remediation.' },
                  { k: 'Validation', v: 'CIS-CAT Pro or Invoke-WindowsHardening with reporting mode generates a per-control pass/fail delta against the current state.' },
                ],
              },
              {
                name: 'Microsoft Security Baseline',
                label: 'Built for M365 environments',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'What it covers', v: 'Microsoft\'s recommended settings for Windows 11 and Windows Server — aligned to their own Secure Score framework. Delivered as GPO templates and Intune configuration profile exports.' },
                  { k: 'Tooling', v: 'Download via the Microsoft Security Compliance Toolkit. Includes Policy Analyzer for diffing baseline against current GPO state and LGPO.exe for local policy import.' },
                  { k: 'Update cadence', v: 'Released per Windows feature update cycle. The baseline for 24H2 differs from 23H2 — review the changelog before applying to a new OS ring.' },
                  { k: 'Intune integration', v: 'Settings Catalog templates in Intune map directly to many baseline controls. The Endpoint security > Security baselines node provides a pre-built Intune profile based on the Microsoft baseline.' },
                ],
              },
              {
                name: 'DISA STIG',
                label: 'Regulated / government',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'What it covers', v: 'The most prescriptive of the three. Covers every configurable security setting with a Finding ID, severity category (CAT I/II/III), and fix text. Used in US federal and regulated sectors.' },
                  { k: 'Application scope', v: 'Separate STIGs for Windows 11, Windows Server 2022, Defender AV, Edge, and Office. Each must be applied and assessed independently.' },
                  { k: 'Tooling', v: 'STIG Viewer (DISA) for reading findings. OpenSCAP or SCC (SCAP Compliance Checker) for automated assessment. GPO packages are available from DISA for each STIG.' },
                  { k: 'Trade-off', v: 'Full STIG compliance often conflicts with usability in standard enterprise environments. Tailor findings with an accepted risk documentation process rather than applying everything wholesale.' },
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
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                heading: 'Attack Surface Reduction rules',
                body: 'ASR rules block specific attack techniques at the OS level — Office macro spawning child processes, credential theft from LSASS, and executable content from email. Audit mode before enforcement to find false positives.',
              },
              {
                heading: 'Credential Guard',
                body: 'Isolates LSASS credentials in a Hyper-V protected container, preventing pass-the-hash and credential dump attacks. Enabled via Intune device configuration or GPO. Requires UEFI with Secure Boot and 64-bit Windows.',
              },
              {
                heading: 'SMB and legacy protocol hardening',
                body: 'Disable SMBv1 (disabled by default in Windows 11 but verify on older builds), enforce SMB signing, disable NetBIOS over TCP/IP, and restrict NTLMv1 via security policy — all standard CIS Level 1 controls.',
              },
              {
                heading: 'LSASS protection',
                body: 'Enable RunAsPPL (Protected Process Light) for LSASS via registry or Intune CSP. Prevents credential dumping tools from accessing LSASS memory. Verify driver compatibility before fleet-wide rollout.',
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

      {/* Latest News */}
      <ContentRow items={news} sectionTitle="Latest News" viewAllHref="/news" />

      {/* Defender, EDR, and Third-Party Tooling */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Detection and response"
            title="Defender, EDR, and Third-Party Security Tooling"
            description="Microsoft Defender for Endpoint is the primary EDR platform for Microsoft-managed environments. How you deploy and configure it — and whether you supplement it with a third-party tool — depends on your licensing, threat model, and operational maturity."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Microsoft Defender for Endpoint (MDE)',
                body: 'Behavioural detection engine, threat intelligence, automated investigation and response (AIR), and the advanced hunting interface. Available in Plan 1 (device-based controls, ASR, firewall management) and Plan 2 (full EDR, threat analytics, vulnerability management). Included in Microsoft 365 E5 Security.',
              },
              {
                heading: 'Deploying MDE via Intune',
                body: 'Onboard devices via Intune using the Endpoint security > Endpoint detection and response policy. The onboarding package is generated in the Defender portal and deployed as a configuration profile. Verify onboarding status in the Defender portal under Devices — a device should appear within 24 hours of policy assignment.',
              },
              {
                heading: 'Defender Antivirus exclusions',
                body: 'Over-exclusion is one of the most common ways MDE is weakened in production. Exclusions should be path-specific and time-limited where possible, documented, and reviewed quarterly. Broad folder exclusions (e.g., C:\\) are never appropriate outside of isolated test environments.',
              },
              {
                heading: 'Attack Surface Reduction in production',
                body: 'Run ASR rules in Audit mode for at least two weeks before switching to Block. Review the ASR audit event log (Event ID 1121/1122 in Microsoft-Windows-Windows Defender/Operational) and the MDE advanced hunting table DeviceEvents to identify false positives before enforcement.',
              },
              {
                heading: 'Third-party EDR (CrowdStrike, SentinelOne)',
                body: 'When a third-party EDR is deployed, Defender AV runs in passive mode — it scans but does not block independently. The third-party sensor owns the active prevention role. Confirm passive mode is set correctly via the registry key ForceDefenderPassiveMode or Intune policy to avoid dual-blocking conflicts.',
              },
              {
                heading: 'Defender Vulnerability Management',
                body: 'Available in MDE Plan 2, DVM scores each device\'s exposure based on installed software CVEs, OS vulnerabilities, and configuration weaknesses. Security recommendations link directly to Intune remediation tasks. The Exposure Score aggregates fleet-wide risk into a single trackable metric.',
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

      {/* BitLocker and Device Encryption */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Encryption"
            title="BitLocker and Device Encryption"
            description="BitLocker protects data at rest on lost or stolen devices. The silent failure mode — encryption enabled but keys not escrowed — is the most consequential misconfiguration. Design your policy around escrow verification, not just encryption state."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'TPM and hardware requirements',
                body: 'BitLocker with TPM binding provides the strongest protection — the key is sealed to the TPM and released only when boot measurements match the expected PCR values. Requires TPM 1.2 minimum; TPM 2.0 is required for Autopilot and Windows 11 compliance policies. Devices without a TPM can use a USB startup key, but this is not suitable for unattended deployment.',
              },
              {
                heading: 'Intune BitLocker policy',
                body: 'Configure via Endpoint security > Disk encryption or via a Settings Catalog profile. Key settings: require encryption on OS drive, enforce TPM-only or TPM+PIN protector, configure recovery key backup to Entra ID, and set the encryption method (XTS-AES 128 or 256). Require device encryption in the compliance policy to gate Conditional Access.',
              },
              {
                heading: 'Key escrow to Entra ID',
                body: 'Keys escrow silently when the BitLocker policy applies and the device is Entra joined or hybrid joined. Escrow failure is silent — no error appears on the device or in Intune. Verify escrow by checking Entra ID > Devices > [device] > Recovery Keys. Force re-escrow using Manage-bde -protectors -adbackup C: if keys are missing.',
              },
              {
                heading: 'PCR7 binding and patch risk',
                body: 'Patches that modify Secure Boot databases or UEFI CA certificates can break PCR7 binding, triggering BitLocker recovery on next boot — even when encryption and keys are configured correctly. Suspend BitLocker for one reboot before applying high-risk patches (especially those involving Secure Boot or UEFI) to pilot rings first.',
              },
              {
                heading: 'Recovery workflow',
                body: 'When a user hits a recovery screen: retrieve the 48-digit recovery key from Entra ID (Devices > [device] > Recovery Keys) or from on-prem AD (using the BitLocker Recovery Password Viewer in ADUC). After recovery, investigate why recovery was triggered — PCR7 change, TPM clear, or policy conflict — before the device returns to service.',
              },
              {
                heading: 'Device Encryption vs BitLocker',
                body: 'Consumer editions of Windows use Device Encryption (a simplified BitLocker subset) which activates automatically on compatible hardware. Enterprise environments should use full BitLocker with explicit policy to control protector type, algorithm, and key escrow. Device Encryption does not appear in the Intune Disk encryption report.',
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

      {/* LAPS */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Local admin control"
            title="Windows LAPS and Local Administrator Management"
            description="An unmanaged local administrator account with a shared or default password is one of the highest-impact lateral movement risks in an enterprise network. Windows LAPS (Local Administrator Password Solution) removes shared credentials by making every local admin password unique, rotated, and auditable."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'What Windows LAPS does',
                body: 'LAPS rotates the local administrator password on a configurable schedule (default: 30 days) and stores the encrypted password in Entra ID or on-premises Active Directory. Admins retrieve passwords per-device via the Intune portal, Entra ID device blade, or the Get-LapsAADPassword PowerShell cmdlet — with retrieval logged for audit.',
              },
              {
                heading: 'Deploying LAPS with Intune',
                body: 'Enable via Endpoint security > Account protection > Local admin password solution policy. Configure the managed account name, password complexity, password length (minimum 14 characters recommended), and rotation period. Verify deployment status per-device in the Intune device configuration blade.',
              },
              {
                heading: 'Native LAPS for Entra-joined devices',
                body: 'Windows LAPS (built into Windows 11 22H2+ and Windows Server 2025) supports Entra ID as the backup directory natively — no on-premises AD required. Keys are backed up using the Entra ID device object. This replaces the previous requirement for hybrid join or the legacy Microsoft LAPS client.',
              },
              {
                heading: 'Migrating from legacy Microsoft LAPS',
                body: 'Legacy LAPS (the separate download) stores passwords in a plaintext AD attribute and requires domain join. If you have legacy LAPS deployed on hybrid-joined devices, migrate to Windows LAPS by deploying the new Intune LAPS policy, which will take over management of the designated account. Remove the legacy LAPS GPO once the new policy is confirmed active.',
              },
              {
                heading: 'Account naming and scope',
                body: 'Target the built-in Administrator account (SID S-1-5-21-...-500) or a named local account. Do not target all local accounts — LAPS manages one account per policy. If your image creates a custom admin account, specify that account name in the policy configuration.',
              },
              {
                heading: 'Audit and access control',
                body: 'Every password retrieval from Entra ID generates an audit log entry. Configure Entra ID diagnostic settings to export these to a Log Analytics workspace for retention beyond the default 30-day portal window. Restrict password retrieval to specific admin roles — avoid granting Global Admin or Intune Admin roles solely for LAPS retrieval.',
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
      <ContentRow items={tutorials} sectionTitle="Deep-Dive Tutorials" viewAllHref="/tutorials" />

      {/* Conditional Access and Compliance */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Access control"
            title="Conditional Access and Device Compliance"
            description="Compliance policy and Conditional Access form the enforcement layer — they translate device security state into access decisions for cloud resources. A device that does not meet the compliance baseline loses access to Microsoft 365 without VPN or firewall changes required."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Intune compliance settings for security',
                body: 'Key compliance checks for a security baseline: minimum OS version, BitLocker enabled, Secure Boot on, code integrity on, Defender real-time protection active, and maximum allowed threat severity from Defender for Endpoint set to Medium or lower.',
              },
              {
                heading: 'Conditional Access: Require compliant device',
                body: 'The "Require device to be marked as compliant" grant control in Entra Conditional Access blocks access from any device not registered in Intune or not meeting the compliance baseline. Apply to Microsoft 365 apps at minimum. Exclude emergency access (break-glass) accounts from all CA policies.',
              },
              {
                heading: 'Noncompliance grace period',
                body: 'Set a grace period (typically 1–3 days) before a device is officially marked noncompliant. This gives users and IT time to respond to a compliance drift before access is blocked. For high-security environments, set grace period to 0 for immediate blocking.',
              },
              {
                heading: 'Named locations and network-based CA',
                body: 'Trusted IP ranges (office networks, VPN exit nodes) can be defined as Named Locations in Entra. CA policies can require compliant device OR trusted location — reducing friction for desk-based users while enforcing MDM enrollment for remote access.',
              },
              {
                heading: 'Sign-in risk and user risk policies',
                body: 'Entra ID Protection (P2 licence) generates risk signals based on impossible travel, leaked credentials, and anomalous sign-in patterns. Risk-based CA policies require MFA re-authentication or password change when elevated risk is detected — without requiring admin intervention.',
              },
              {
                heading: 'Monitoring compliance drift',
                body: 'Intune Devices > Monitor > Noncompliant devices shows current noncompliance by reason. The Conditional Access Insights and Reporting workbook in Entra shows which policies are blocking sign-ins and for which users — essential for validating policy before enabling enforced mode.',
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

      {/* Patching and Vulnerability Exposure */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Vulnerability exposure"
            title="Patching and Vulnerability Exposure"
            description="Unpatched endpoints are the most frequently exploited initial access vector. Patch compliance reporting and vulnerability management close the gap between what is deployed and what is exposed."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'CVSS vs EPSS for prioritisation',
                body: 'CVSS (Common Vulnerability Scoring System) rates severity — but high-CVSS vulnerabilities are not always actively exploited. EPSS (Exploit Prediction Scoring System) estimates the probability a CVE will be exploited in the wild within 30 days. Combining both gives a better triage signal than CVSS alone.',
              },
              {
                heading: 'Defender Vulnerability Management',
                body: 'MDE Plan 2 includes Defender Vulnerability Management, which scores each device\'s software inventory against the CVE database and flags configuration weaknesses. Security recommendations appear in the Defender portal and can be pushed as Intune remediation tasks.',
              },
              {
                heading: 'Patch ring timing relative to CVEs',
                body: 'CVSS ≥ 9.0 or CISA KEV listed? Deploy to all rings within 14 days of patch availability — compress the standard ring schedule. Actively exploited zero-days may warrant emergency out-of-band deployment to production if compensating controls are insufficient.',
              },
              {
                heading: 'Intune update compliance',
                body: 'Intune Devices > Monitor > Feature update failures and Quality update compliance show per-device patch state. Devices that have not applied a quality update within the deadline window appear as non-compliant — combine with the compliance policy to gate CA access.',
              },
              {
                heading: 'End-of-support exposure',
                body: 'Devices running Windows versions past end-of-support (Windows 10 21H2 reached EOS November 2023) receive no security patches. Defender Vulnerability Management flags EOS OS versions as high-risk. Prioritise feature update rollout for devices on EOS builds.',
              },
              {
                heading: 'Software inventory gaps',
                body: 'LOB applications installed outside of Intune app management may not appear in the Defender software inventory. Use Export-IntuneDeviceReport combined with Get-StaleDevices to cross-reference managed vs detected software, identifying unmanaged installs that may carry CVE exposure.',
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
              Full patch management coverage on the Patch Management hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Scripts */}
      <ContentRow items={scriptItems} sectionTitle="Scripts & Automation" viewAllHref="/scripts" />

      {/* Monitoring, Reporting, and Incident Response */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Monitoring"
            title="Monitoring, Reporting, and Incident Response Workflow"
            description="Detection is only useful if you act on it quickly. These are the primary data sources, tools, and workflows used to detect, investigate, and contain endpoint security incidents in Microsoft environments."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Defender portal — Incidents queue',
                body: 'security.microsoft.com > Incidents & alerts > Incidents. MDE correlates individual alerts into incidents based on shared entities (device, user, file hash). Start investigation at the incident level, not the alert level — the incident graph shows the full attack chain and reduces alert noise.',
              },
              {
                heading: 'Advanced Hunting (KQL)',
                body: 'The Advanced Hunting interface in the Defender portal accepts KQL queries across DeviceProcessEvents, DeviceNetworkEvents, DeviceFileEvents, DeviceLogonEvents, and other tables. Queries can be scheduled as Custom Detection rules that generate alerts when matching events occur.',
              },
              {
                heading: 'Windows Event log — Security channel',
                body: 'Event ID 4624 (logon success), 4625 (logon failure), 4648 (logon with explicit credentials), 4688 (process creation with command line logging enabled), and 4698/4702 (scheduled task created/modified). Enable command-line auditing via GPO or Intune for 4688 to be useful in incident response.',
              },
              {
                heading: 'Microsoft Sentinel integration',
                body: 'MDE data can be forwarded to Microsoft Sentinel via the Microsoft Defender XDR connector. Sentinel provides extended retention (up to 12 years), cross-product correlation (MDE + Entra + Defender for Cloud), and SOAR playbooks for automated response actions.',
              },
              {
                heading: 'Live Response in MDE',
                body: 'MDE Plan 2 Live Response provides a remote shell into managed devices without requiring RDP or a VPN tunnel. Use it to collect forensic artefacts, run investigation scripts, or isolate a device from the network. All Live Response sessions are logged and auditable in the Defender portal.',
              },
              {
                heading: 'Device isolation and containment',
                body: 'MDE can isolate a compromised device from the network (blocking all traffic except to the Defender cloud and the configured management channel) from the portal or via API. The device remains manageable through Intune and Defender during isolation. Confirm with the user before isolating shared or kiosk devices.',
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

      {/* Common Failure Points */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Common problems"
            title="Where Endpoint Security Deployments Go Wrong"
            description="Most endpoint security failures are configuration gaps rather than technology limits. These are the patterns that appear most often in production environments."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'BitLocker enabled but keys not escrowed',
                detail:
                  'Encryption shows as active in the Intune compliance blade but the recovery key is absent from Entra ID. This is a silent failure — no alert is raised. Verify key escrow by checking Entra ID device properties for each enrolled device. Force re-escrow with Manage-bde -protectors -adbackup C: on affected devices.',
              },
              {
                title: 'ASR rules causing application breakage',
                detail:
                  'Attack Surface Reduction rules in Block mode can silently kill LOB application functionality — Office macro spawning processes, custom update mechanisms, or signed scripts that match a rule signature. Always run Audit mode for two weeks and review DeviceEvents in advanced hunting before switching to Block.',
              },
              {
                title: 'Defender in passive mode without a replacement AV',
                detail:
                  'When a third-party AV is installed, Defender switches to passive mode and stops actively blocking. If the third-party AV is later uninstalled or disabled, Defender may not automatically return to active mode — leaving the device with no active AV protection. Verify Defender state after any AV software changes.',
              },
              {
                title: 'Compliance policy missing a device — default is compliant',
                detail:
                  'Intune\'s default compliance stance for devices with no assigned policy is "Compliant." A device that falls through group targeting gaps gets a free pass to Conditional Access-gated resources. Audit group membership regularly and set the default to "Not Compliant" in Endpoint security > Compliance policy settings if appropriate for your environment.',
              },
              {
                title: 'LAPS policy deployed but wrong account targeted',
                detail:
                  'LAPS manages one account per policy. If the policy targets "Administrator" but your image renames the built-in account or creates a different admin account, the policy applies to a non-existent account and no rotation occurs. Confirm the target account name matches what actually exists on the device using Get-LocalUser.',
              },
              {
                title: 'CIS baseline applied without application compatibility testing',
                detail:
                  'CIS Level 2 controls — AppLocker, strict NTLM restrictions, or UAC settings — can break LOB application workflows that developers or vendors never tested against a hardened baseline. Test Level 1 first across your application profile before adding Level 2 controls, and document any exceptions.',
              },
              {
                title: 'MDE not fully onboarded — device appears in Intune but not Defender',
                detail:
                  'The Intune MDM enrollment and the MDE onboarding are separate processes. A device enrolled in Intune will not appear in the Defender portal until the onboarding policy is applied and processed. Check Endpoint security > Endpoint detection and response policy assignment status for devices not appearing in Defender.',
              },
              {
                title: 'Exclusion scope too broad',
                detail:
                  'Broad Defender AV exclusions — entire directory trees, all processes from an application vendor, or specific file extensions applied globally — create blind spots exploited by attackers who know the exclusion patterns. Scope exclusions to the minimum path or process required, document the business justification, and review quarterly.',
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

      {/* Reviews and Comparisons */}
      {(endpointReviews.length > 0 || endpointComparisons.length > 0) && (
        <div className="border-t border-border py-12">
          <Container>
            <SectionHeader
              eyebrow="Product coverage"
              title="Reviews and Comparisons"
              description="Independent analysis of endpoint security tools — evaluated for real enterprise and SMB deployment scenarios, not vendor marketing."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[...endpointReviews, ...endpointComparisons].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
                >
                  <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted">{item.excerpt}</p>
                  <p className="mt-auto text-xs text-muted/60">{item.meta}</p>
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Recommended Reading Path */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Reading path"
            title="Recommended AdminSignal Reading Path"
            description="Work through content in this order to build a complete endpoint security configuration — each piece addresses the next layer of the stack."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Hardening Windows 11 Endpoints with CIS Benchmark Level 1',
                href: '/tutorials/hardening-windows-11-cis-benchmark',
                note: 'Start here. Apply the CIS L1 benchmark via GPO or Intune and run the validation script to report compliance gaps before moving to later controls.',
              },
              {
                step: '2',
                title: 'Deploying Windows LAPS with Microsoft Intune',
                href: '/tutorials/deploy-windows-laps-intune',
                note: 'Remove shared local admin credentials early — LAPS is a high-impact, low-disruption control that every managed fleet should have before going further.',
              },
              {
                step: '3',
                title: 'BitLocker Recovery Key Not Backed Up to Entra ID',
                href: '/troubleshooting/bitlocker-recovery-key-not-backed-up-entra',
                note: 'Verify your BitLocker deployment is actually escrowing keys — and learn how to detect and fix the silent failure before a user gets locked out.',
              },
              {
                step: '4',
                title: 'Configuring Conditional Access for a Microsoft 365 Tenant',
                href: '/tutorials/conditional-access-m365-policy-map',
                note: 'Build the CA baseline that uses device compliance as a gate. Covers compliant device enforcement, MFA, and emergency access account exclusions.',
              },
              {
                step: '5',
                title: 'Intune Compliance Policy Not Evaluating',
                href: '/troubleshooting/intune-compliance-policy-not-evaluating',
                note: 'Diagnose devices stuck in "Not evaluated" or wrong compliance state — the most common blocker when standing up CA enforcement for the first time.',
              },
              {
                step: '6',
                title: 'Fixing the April 2026 BitLocker Recovery Loop (KB5082063)',
                href: '/troubleshooting/april-2026-bitlocker-recovery-loop-kb5082063',
                note: 'A case study in patch-triggered encryption failures. The diagnosis and fix pattern applies to any future UEFI CA or Secure Boot database update.',
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
            description="Authoritative references for Defender configuration, hardening baselines, and encryption policy. Use these alongside AdminSignal guides when you need policy syntax or service limits."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Microsoft Defender for Endpoint',
                href: 'https://learn.microsoft.com/en-us/defender-endpoint/',
                note: 'Onboarding, configuration, advanced hunting schema, and automated investigation documentation.',
              },
              {
                title: 'Windows security baselines',
                href: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines',
                note: 'Microsoft\'s recommended settings for Windows 11 and Windows Server, with download links for GPO templates and Intune profiles.',
              },
              {
                title: 'Attack Surface Reduction rules reference',
                href: 'https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference',
                note: 'Per-rule GUID, description, scope, and recommended mode — essential for ASR Audit to Block migration.',
              },
              {
                title: 'BitLocker overview',
                href: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/',
                note: 'Architecture, TPM interaction, recovery key management, and policy configuration reference.',
              },
              {
                title: 'Windows LAPS overview',
                href: 'https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview',
                note: 'Windows LAPS architecture, Entra ID backup, migration from legacy LAPS, and PowerShell management cmdlets.',
              },
              {
                title: 'Defender Vulnerability Management',
                href: 'https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management',
                note: 'Exposure Score, security recommendations, software inventory, and Intune integration for remediation tasks.',
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
