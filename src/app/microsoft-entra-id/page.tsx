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

const topicName = 'Microsoft Entra ID'
const topicDescription =
  'Identity management, Conditional Access, PIM, app registrations, hybrid join, and audit logging for Microsoft 365 and endpoint environments.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'microsoft-entra-id',
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

export default function EntraIdPage() {
  const news = signals
    .filter((s) => s.tags?.includes('Entra ID') || s.category === 'Microsoft Entra ID')
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
        g.tags?.includes('Entra ID') ||
        g.category === 'Microsoft Entra ID' ||
        g.tags?.includes('Conditional Access') ||
        g.tags?.includes('Identity') ||
        g.tags?.includes('LAPS'),
    )
    .slice(0, 4)
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Entra ID') || s.tags.includes('Graph API'))
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
        a.affectedProducts.includes('Entra ID') ||
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

  const entraComparisons = comparisons
    .filter((c) => c.category === 'Microsoft Entra ID')
    .slice(0, 1)

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Microsoft 365', href: '/microsoft-365' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/microsoft-entra-id',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/microsoft-entra-id' },
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
            Microsoft Entra ID
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Identity management, Conditional Access, Privileged Identity Management, app
            registrations, hybrid join, and audit logging — practical coverage for admins running
            Microsoft 365 and endpoint environments on Entra ID.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* What Entra ID Is Used For */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What Microsoft Entra ID Is Used For in Real Environments"
            description="Entra ID (formerly Azure Active Directory) is the identity and access control plane for Microsoft 365, Azure, and Intune. It is the system that decides who can sign in, from where, on what device, and what they are allowed to do once authenticated."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Authentication and single sign-on',
                body: 'Entra ID authenticates users for Microsoft 365, Azure, and thousands of SaaS applications via SAML, OAuth 2.0, and OIDC federation. SSO means one sign-in session grants access to all integrated apps — users are not prompted per application once the Entra token is established.',
              },
              {
                heading: 'Conditional Access enforcement',
                body: 'CA policies evaluate every sign-in attempt against conditions — user risk, device compliance state, location, application sensitivity — and grant, block, or require additional verification. CA is the primary enforcement layer for Zero Trust in Microsoft environments.',
              },
              {
                heading: 'Device identity and management',
                body: 'Entra ID maintains device objects for every Entra-joined, hybrid-joined, and Entra-registered device. Device objects carry compliance state from Intune, BitLocker recovery keys, and group memberships used for CA policy evaluation and Intune group targeting.',
              },
              {
                heading: 'Privileged access governance',
                body: 'Privileged Identity Management (P2) provides just-in-time role activation with approval workflows and time limits — replacing always-on Global Admin assignments. Combined with access reviews, PIM gives audit teams a defensible record of who had privileged access and when.',
              },
              {
                heading: 'App registration and API access control',
                body: 'Enterprise applications and app registrations define how third-party and custom applications authenticate against the Microsoft identity platform. Permission scopes and admin consent control what each application can access — a misconfigured app registration is a common lateral movement path.',
              },
              {
                heading: 'Identity governance and lifecycle',
                body: 'Entitlement Management (P2) automates access package assignment for new joiners, movers, and leavers. Access reviews periodically certify group and role membership. Lifecycle Workflows trigger automated tasks — provisioning, deprovisioning, manager notifications — based on HR events.',
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

      {/* Entra Joined vs Hybrid Joined vs Entra Registered */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Device identity"
            title="Entra Joined vs Hybrid Joined vs Entra Registered"
            description="Device join state determines how the device authenticates, what CA policies apply, and whether Intune can fully manage it. Getting the join type wrong is one of the most common sources of policy not applying and Conditional Access blocking unexpected users."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'Entra Joined',
                label: 'Cloud-native — recommended for new deployments',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'What it is', v: 'Device joins Entra ID only — no on-premises AD domain join. The identity plane is entirely in the cloud. Primary user signs in with a work or school account during OOBE.' },
                  { k: 'Best for', v: 'New device deployments using Autopilot, cloud-first environments with no requirement for on-premises resource access via Kerberos, and remote-first workforces.' },
                  { k: 'Intune management', v: 'Full MDM enrollment via Intune is the standard management path. Device compliance state feeds directly into Conditional Access with no hybrid sync delay.' },
                  { k: 'On-premises resource access', v: 'Requires line-of-sight to Entra ID via internet. On-premises file shares and printers require Kerberos Cloud Trust or NTLM passthrough — not automatic.' },
                  { k: 'CA device filter', v: '"Require Entra joined device" CA grant control applies. Devices show as compliant or not compliant based on Intune policy — no hybrid join grace period.' },
                ],
              },
              {
                name: 'Hybrid Joined',
                label: 'Mixed on-premises / cloud',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'What it is', v: 'Device is joined to both on-premises AD and Entra ID via Microsoft Entra Connect sync. The device object exists in both directories, linked by the objectGUID.' },
                  { k: 'Best for', v: 'Environments with existing AD infrastructure, on-premises LOB applications requiring Kerberos, or fleets in migration from SCCM co-management to full Intune.' },
                  { k: 'Entra Connect dependency', v: 'Hybrid join registration requires Entra Connect (or Cloud Sync for smaller environments) to be healthy. A stale or broken sync will prevent new devices from registering and existing devices from updating their certificate.' },
                  { k: 'CA compliance delay', v: 'Compliance state from Intune propagates to Entra ID device object via sync — typically within minutes but dependent on sync cycle. A device can appear compliant in Intune but not yet in Entra during the window.' },
                  { k: 'Policy conflict risk', v: 'Hybrid-joined devices can receive both GPO and Intune policy. Audit for management authority conflicts on Windows Update, BitLocker, and Defender settings.' },
                ],
              },
              {
                name: 'Entra Registered',
                label: 'BYOD / user-enrolled',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'What it is', v: 'Device registers a work account (Settings > Access Work or School) without full domain or Entra join. The device object exists in Entra but the device OS is not under full MDM control.' },
                  { k: 'Best for', v: 'BYOD scenarios where users access Microsoft 365 apps (Outlook, Teams) from personal devices. MAM (app protection policies) can enforce data controls without full device management.' },
                  { k: 'Intune management scope', v: 'Entra-registered devices can enroll in Intune via the Company Portal for user-initiated MDM enrollment — but this is opt-in, not automatic at registration. MAM-only is the more common BYOD stance.' },
                  { k: 'CA grant limitation', v: '"Require Entra joined or hybrid joined device" CA grant does NOT match registered-only devices. Use "Require approved client app" or "Require app protection policy" grants for BYOD-compatible access control.' },
                  { k: 'Opt-in MDM preview', v: 'A 2026 preview allows admins to block automatic MDM enrollment triggered during Microsoft account sign-in — important for tenants where BYOD devices should not automatically enroll under corporate MDM policy.' },
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

      {/* Conditional Access and Device Compliance */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Conditional Access"
            title="Conditional Access and Device Compliance"
            description="Conditional Access is the enforcement mechanism — it reads signals from Entra ID and Intune and decides what a sign-in is allowed to do. Building a CA baseline correctly is the single highest-impact identity security action in a Microsoft 365 environment."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Report-only mode before enforcement',
                body: 'Every new CA policy should run in Report-only mode for at least two weeks before switching to On. Use the CA Insights and Reporting workbook in Entra > Monitoring to see which sign-ins would have been blocked — identify service accounts, break-glass accounts, and application service principals before the policy affects them.',
              },
              {
                heading: 'Emergency access (break-glass) accounts',
                body: 'Emergency access accounts must be excluded from every CA policy — including MFA and device compliance requirements. These accounts exist to recover the tenant if all other admin access is lost. Store the credentials offline, configure alerts for any sign-in from these accounts, and test them quarterly.',
              },
              {
                heading: 'Require compliant device grant',
                body: '"Require device to be marked as compliant" uses Intune compliance state. It only works for Intune-managed devices — it will block Entra-registered BYOD devices that have never enrolled in MDM. Scope the policy to Microsoft 365 apps and exclude device platforms you are not yet managing.',
              },
              {
                heading: 'Named locations and trusted networks',
                body: 'Define office IP ranges as Trusted Named Locations in Entra > Security > Named locations. CA policies can then use "Any location except trusted" as the condition — requiring MFA or compliant device from any network that is not an approved office location without blocking office-based users.',
              },
              {
                heading: 'Sign-in frequency and session controls',
                body: 'Session controls set how long a token is valid before re-authentication is required. Set sign-in frequency to 1 hour for high-sensitivity apps (Entra admin portal, Exchange admin). Persistent browser session: Never for shared or kiosk devices. Continuous Access Evaluation (CAE) revokes tokens in near-real-time on policy changes.',
              },
              {
                heading: 'Authentication strengths',
                body: 'Authentication strength CA policies require a specific authenticator type — phishing-resistant (hardware key or Windows Hello for Business) rather than any MFA. Require phishing-resistant MFA for any access to the Entra admin portal, Azure, and other privileged surfaces. This resists MFA fatigue and adversary-in-the-middle attacks that standard TOTP does not.',
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

      {/* P1 vs P2 */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Licensing"
            title="Entra ID P1 vs P2 — What Each Licence Unlocks"
            description="P1 covers Conditional Access, SSPR, and group-based licensing. P2 adds the three capabilities that matter most for privileged access and compliance: PIM, Identity Protection, and Access Reviews."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Entra ID P1</p>
              <p className="mb-4 text-base font-bold text-foreground">Included in Microsoft 365 Business Premium, E3, F3</p>
              <ul className="space-y-2">
                {[
                  'Conditional Access — full policy engine with all grant and session controls',
                  'Self-Service Password Reset (SSPR) with on-premises writeback',
                  'Group-based licensing and dynamic group membership rules',
                  'Application proxy for on-premises app publishing',
                  'Hybrid identity with Entra Connect sync and cloud sync',
                  'Microsoft Entra MFA (per-user or Conditional Access driven)',
                  'Banned password list and smart lockout',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-xs leading-relaxed text-muted">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-blue-400/20 bg-blue-400/5 p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">Entra ID P2</p>
              <p className="mb-4 text-base font-bold text-foreground">Included in Microsoft 365 E5, E5 Security; add-on for E3</p>
              <ul className="space-y-2">
                {[
                  'Everything in P1, plus:',
                  'Privileged Identity Management (PIM) — JIT role activation, approval workflows, time-limited assignments',
                  'Entra ID Identity Protection — risk-based Conditional Access, user and sign-in risk policies',
                  'Access Reviews — periodic certification of group, role, and application membership',
                  'Entitlement Management — access packages, auto-assignment policies, connected organisations',
                  'Lifecycle Workflows — automated joiner/mover/leaver task orchestration',
                  'PIM for Groups — extend JIT activation to group membership, not just directory roles',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-xs leading-relaxed text-muted">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {entraComparisons.length > 0 && (
            <div className="mt-4">
              <Link
                href={`/comparisons/${entraComparisons[0].slug}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Read the full P1 vs P2 analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </Container>
      </div>

      {/* Privileged Identity Management */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Privileged access"
            title="Privileged Identity Management (PIM)"
            description="PIM eliminates standing privileged access — the practice of keeping accounts permanently in Global Admin, Exchange Admin, or other high-privilege roles. Instead, eligible users activate roles on demand, for a defined time window, with optional approval and justification required."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Eligible vs Active role assignments',
                body: 'Eligible assignments give a user the ability to activate a role — they do not have it permanently. Active assignments grant the role continuously (avoid except for break-glass and automation service principals). Audit your directory for permanent Active assignments as a first step when enabling PIM.',
              },
              {
                heading: 'Role activation settings',
                body: 'Configure per-role: maximum activation duration (recommend 1–4 hours for admin roles), require MFA or phishing-resistant MFA on activation, require justification text, require approval from one or more designated approvers. For highly sensitive roles (Global Admin, Privileged Role Admin), require approval from a second named person.',
              },
              {
                heading: 'Approval workflows',
                body: 'Designated approvers receive an email and Teams notification when activation is requested. Approvers review the justification and approve or deny via the PIM portal or the MyAccess portal. Set approval timeout to 4–8 hours so requests do not pend indefinitely — unapproved requests expire automatically.',
              },
              {
                heading: 'PIM for Groups',
                body: 'PIM can manage membership in Entra ID security groups, not just directory roles. Use this to provide JIT access to groups that are used for CA policy exclusions, Intune assignment targets, or SharePoint permissions — without granting a permanent directory role. Requires P2 and the group to be a role-assignable group.',
              },
              {
                heading: 'Access Reviews for privileged roles',
                body: 'Configure recurring access reviews for all PIM-eligible role assignments — quarterly is the standard frequency for admin roles. Reviews are sent to the role member, their manager, or a designated reviewer. Memberships that are not reviewed or approved within the review window are automatically removed if you configure auto-removal on deny.',
              },
              {
                heading: 'PIM alerts and audit log',
                body: 'PIM generates built-in alerts for: roles with too many permanent admins, roles not using PIM, duplicate role assignments, and stale eligible assignments. The PIM audit log records every activation, approval, denial, and assignment change — export to Log Analytics for retention beyond the default 30-day portal view.',
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

      {/* App Registrations and Consent Risk */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="App registrations"
            title="App Registrations, Enterprise Apps, and Consent Risk"
            description="App registrations define how applications authenticate against the Microsoft identity platform. Enterprise applications are the tenant-specific service principals created when an app registration is used — or when a third-party SaaS app is added to the tenant. Misconfigured permissions and over-consented apps are a persistent attack surface."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'App registration vs Enterprise application',
                body: 'An app registration is the identity definition — client ID, redirect URIs, certificate or secret. An enterprise application (service principal) is the tenant-specific instance of that app, where permissions are granted and user assignment is configured. When you add a SaaS app from the gallery, Entra creates an enterprise application service principal in your tenant.',
              },
              {
                heading: 'Delegated vs Application permissions',
                body: 'Delegated permissions run in the context of a signed-in user — the app can do what the user can do, scoped by the permission. Application permissions run as the app identity itself, without a user — they require admin consent and can access all resources in scope regardless of who is signed in. Application permissions with write scope (User.ReadWrite.All, Mail.Send) are high-risk and should be assigned sparingly.',
              },
              {
                heading: 'Admin consent vs user consent',
                body: 'User consent (if permitted by tenant policy) allows individual users to grant low-risk delegated permissions to apps. Admin consent is required for application permissions and for any permission flagged as requiring admin consent. Configure the tenant user consent policy (Entra > Enterprise applications > Consent and permissions) to restrict or disable user consent entirely for high-security tenants.',
              },
              {
                heading: 'Application credential expiry',
                body: 'Client secrets expire — typically after 1–2 years. When a secret expires, any automation, script, or integration using that credential stops working. Track expiry dates via Entra > App registrations > Owned applications > Certificates & secrets. Prefer certificate credentials over secrets for non-interactive apps — certificates are harder to leak and can be rotated without re-deploying the secret value.',
              },
              {
                heading: 'Risky OAuth grants — consent phishing',
                body: 'Consent phishing attacks trick users into granting OAuth permissions to malicious apps. Review Entra > Enterprise applications > All applications > filter by "User consent" to see apps users have consented to. Revoke suspicious grants via Remove-MgServicePrincipalAppRoleAssignment or the portal. Enable admin consent workflow to gate all app consent through an approval process.',
              },
              {
                heading: 'Quarterly app permission audit',
                body: 'Run Get-MgServicePrincipal | Where-Object { $_.AppRoles.Count -gt 0 } to list all apps with application permissions. Cross-reference with the app owners and assess whether each permission scope is still required. Remove app registrations for decommissioned services — orphaned registrations with valid credentials are a long-term compromise risk.',
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

      {/* BitLocker key escrow and device object checks */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Device objects"
            title="BitLocker Key Escrow and Device Object Checks"
            description="Entra ID stores BitLocker recovery keys and device registration certificates in the device object. These are the device-side checks most commonly needed when troubleshooting Conditional Access failures, compliance state mismatches, or BitLocker lockouts."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Finding a device object in Entra',
                body: 'Entra ID > Devices > All devices. Filter by device name, operating system, join type, or compliance state. The device detail page shows join type, registration time, last activity, Intune management state, and the Recovery Keys tab for BitLocker keys. Use Get-MgDevice -Filter "displayName eq \'DEVICE-NAME\'" for scripted lookups.',
              },
              {
                heading: 'BitLocker recovery key location',
                body: 'For Entra-joined and hybrid-joined devices with BitLocker policy configured to escrow to Entra: Devices > [device name] > Recovery Keys tab shows the key ID and the recovery key itself (visible to users with sufficient RBAC). If Recovery Keys tab is empty, the key has not escrowed — see the BitLocker troubleshooting guide for the force-escrow procedure.',
              },
              {
                heading: 'Stale device objects',
                body: 'Devices that have been re-imaged, renamed, or re-enrolled create new Entra device objects. The old object retains its last compliance state and may hold a now-invalid BitLocker key or group membership. Identify stale objects using Get-StaleDevices — cross-referencing Intune last check-in with Entra last activity date. Delete stale objects after confirming the current device object is healthy.',
              },
              {
                heading: 'Device registration certificate renewal',
                body: 'Hybrid-joined devices register a device certificate in Entra ID that is renewed automatically by the Automatic-Device-Join scheduled task. If the renewal fails (Entra Connect sync issue, certificate store problem, or network access to sts.windows.net blocked), the device will eventually fail CA device-based checks. Run dsregcmd /status on the device to verify AzureAdJoined state and certificate validity.',
              },
              {
                heading: 'dsregcmd — the first diagnostic tool',
                body: 'dsregcmd /status on any Windows machine shows join type (AzureAdJoined, DomainJoined, WorkplaceJoined), the device certificate thumbprint, SSO state, and whether the PRT (Primary Refresh Token) is present. A missing PRT is why a device cannot satisfy device-based CA controls even if it appears joined. Run as the affected user — PRT is user-scoped.',
              },
              {
                heading: 'Compliance state propagation delay',
                body: 'Intune marks a device compliant, but Entra ID still shows it as non-compliant. Compliance state syncs from Intune to the Entra device object within minutes under normal conditions. Trigger a manual device sync in Intune (Devices > [device] > Sync), then wait 5–10 minutes before re-testing CA. If the state does not update, check the Intune device configuration status and the Entra Connect sync health.',
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

      {/* Scripts */}
      <ContentRow items={scriptItems} sectionTitle="Scripts & Automation" viewAllHref="/scripts" />

      {/* Reporting and Audit Logs */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Monitoring"
            title="Reporting and Audit Logs"
            description="Entra ID sign-in and audit logs are the primary evidence source for access investigations, compliance audits, and identity incident response. Default retention is 30 days in the portal — export to Log Analytics or a SIEM for longer-term retention."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Sign-in logs',
                body: 'Entra > Monitoring & health > Sign-in logs. Every interactive, non-interactive, and service principal sign-in is recorded with the applied CA policies, authentication methods used, device compliance state, location, and failure reason. Filter by user, application, or IP. Non-interactive sign-ins (background token refresh) are in a separate tab — often the source of unexpected CA failures.',
              },
              {
                heading: 'Audit logs',
                body: 'Entra > Monitoring & health > Audit logs. Records all administrative operations: role assignments, group membership changes, app consent grants, user creation and deletion, CA policy changes. Audit log entries include the initiating user, target, and changed properties. Use the date range filter and "Initiated by (actor)" column to trace changes made during a specific incident window.',
              },
              {
                heading: 'Diagnostic settings — export to Log Analytics',
                body: 'Entra > Diagnostic settings > Add diagnostic setting. Select SignInLogs, AuditLogs, RiskyUsers, and UserRiskEvents. Send to a Log Analytics workspace. Retention in Log Analytics is configurable up to 730 days (vs 30 days in the Entra portal). Essential for compliance audit retention requirements and SIEM integration.',
              },
              {
                heading: 'Microsoft Entra Workbooks',
                body: 'Entra > Monitoring > Workbooks provides pre-built Log Analytics workbooks: Conditional Access gap analyser, sign-in health, risky sign-ins, and authentication methods. The CA gap analyser shows sign-ins that succeeded without any CA policy applying — helps identify users or apps that have fallen through policy targeting gaps.',
              },
              {
                heading: 'Identity Protection risk reports',
                body: 'Entra > Protection > Identity Protection. Risky users report shows accounts flagged for leaked credentials, impossible travel, or anomalous activity. Risky sign-ins shows individual sign-in events with risk reason. Dismiss false positives after investigation — dismissing without investigation skips the risk remediation for the user.',
              },
              {
                heading: 'Graph API — sign-in log queries',
                body: 'GET /auditLogs/signIns?$filter=createdDateTime ge 2026-01-01 and status/errorCode ne 0 returns failed sign-ins. Combine with $select to retrieve only needed fields. Use application permissions AuditLog.Read.All for non-interactive script access. The beta endpoint exposes more fields including applied CA policy detail and authentication step information.',
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
            title="Where Entra ID Configurations Go Wrong"
            description="Most Entra ID problems in production fall into a small set of repeating patterns — mostly around CA policy targeting, device join state, and sync health."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'CA policy blocks service accounts and automation',
                detail:
                  'A new CA policy requiring MFA or device compliance inadvertently applies to service accounts used by Azure Automation, third-party integrations, or on-premises scripts. Service principals and automation accounts must be explicitly excluded from MFA and device-based CA policies — they cannot satisfy interactive challenges. Use workload identity CA policies for service principal sign-in control.',
              },
              {
                title: 'No break-glass account — admin locked out',
                detail:
                  'A CA policy requiring compliant device applies to all users including Global Admins. The admin\'s device falls out of compliance due to a pending update or certificate issue. Without a break-glass account excluded from the policy, no admin can access the Entra portal to fix the policy. Create two break-glass accounts, store credentials offline, and exclude them from every CA policy.',
              },
              {
                title: 'Hybrid join failing silently — device not appearing in Entra',
                detail:
                  'The Automatic-Device-Join scheduled task runs but the device does not appear in Entra. Usually caused by SCP (Service Connection Point) misconfiguration in AD, Entra Connect sync not running, or network access to device registration endpoints blocked. Run dsregcmd /status and check the "AzureAdJoined" field and any error codes in the output.',
              },
              {
                title: 'Stale Entra Connect sync — compliance state not updating',
                detail:
                  'Intune marks devices compliant but CA continues to block them. Entra Connect sync has stalled (check Entra > Entra Connect Health). Compliance state writes back from Intune through the Entra device object — if sync is not running, the device object does not update. Restart the Microsoft Entra Connect Sync (ADSync) service and verify the next sync cycle completes.',
              },
              {
                title: 'PIM eligible assignment not activating — MFA prompt failing',
                detail:
                  'User tries to activate a PIM role but the MFA prompt fails because their authenticator method is not compatible with the authentication strength requirement set on that role. Check the PIM role settings for the authentication context requirement and verify the user has registered a compatible method (hardware FIDO2 key or Windows Hello if phishing-resistant is required).',
              },
              {
                title: 'App consent granted too broadly — user-consented apps with write permissions',
                detail:
                  'A user consented to a third-party OAuth app that requested Mail.Send or Files.ReadWrite.All. The app is now sending mail as the user or reading all their OneDrive files. Review Enterprise applications > User consent report. Revoke the grant and enable the admin consent workflow to prevent future broad consent grants without admin approval.',
              },
              {
                title: 'SSPR not working — writeback not configured',
                detail:
                  'Users attempt self-service password reset but the change does not write back to on-premises AD. Password writeback requires Entra Connect with the Password writeback option enabled, the Entra Connect service account having the required AD permissions, and the user\'s on-premises account not being excluded from writeback scope.',
              },
              {
                title: 'Dynamic group membership not updating',
                detail:
                  'A device or user meets the dynamic group membership rule criteria but is not added to the group within the expected time. Dynamic group processing can take up to 24 hours for large tenants. Check Entra > Groups > [group] > Membership processing status for errors. Test the rule against the specific user or device using the Validate rules function before assuming the rule is correct.',
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
            description="Work through content in this order to build a complete Entra ID security configuration — from Conditional Access baseline through privileged access governance."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Configuring Conditional Access for a Microsoft 365 Tenant: The Complete Policy Map',
                href: '/tutorials/conditional-access-m365-policy-map',
                note: 'Start here. Covers the full CA baseline — MFA, compliant device enforcement, emergency access accounts, and the correct order to build and test policies without locking anyone out.',
              },
              {
                step: '2',
                title: 'Deploying Windows LAPS with Microsoft Intune',
                href: '/tutorials/deploy-windows-laps-intune',
                note: 'Local admin credential management feeds directly into Entra device security posture. Covers Intune LAPS policy, Entra ID key storage, retrieval permissions, and legacy migration.',
              },
              {
                step: '3',
                title: 'BitLocker Recovery Key Not Backed Up to Entra ID',
                href: '/troubleshooting/bitlocker-recovery-key-not-backed-up-entra',
                note: 'Verify your BitLocker keys are actually in Entra ID device objects — and learn to detect and force-escrow keys before a user lockout makes it urgent.',
              },
              {
                step: '4',
                title: 'Intune Compliance Policy Not Evaluating',
                href: '/troubleshooting/intune-compliance-policy-not-evaluating',
                note: 'Compliance state drives CA device grant decisions. This troubleshooting guide covers the four most common reasons a device is stuck in Not evaluated — which shows as non-compliant to CA.',
              },
              {
                step: '5',
                title: 'Entra ID Premium P1 vs P2: Is the Upgrade Worth It?',
                href: '/comparisons/entra-id-p1-vs-p2',
                note: 'Understand which P2 capabilities (PIM, Identity Protection, Access Reviews) apply to your environment before committing to the licence cost — or building a business case for it.',
              },
              {
                step: '6',
                title: 'Export-IntuneDeviceReport — Script Library',
                href: '/scripts/export-intune-device-report',
                note: 'Entra Graph API query for device inventory and compliance state — the starting point for building your own Entra-connected reporting scripts.',
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
            description="Authoritative references for Entra ID configuration, Conditional Access, PIM, and identity governance. Use alongside AdminSignal guides for policy syntax and service-specific limits."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Microsoft Entra ID documentation',
                href: 'https://learn.microsoft.com/en-us/entra/identity/',
                note: 'Core identity documentation — authentication, hybrid identity, groups, SSPR, and device management.',
              },
              {
                title: 'Conditional Access documentation',
                href: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/',
                note: 'Policy building, conditions, grant controls, session controls, and the named locations reference.',
              },
              {
                title: 'Privileged Identity Management',
                href: 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/',
                note: 'PIM setup, role assignment settings, approval workflow configuration, and access review integration.',
              },
              {
                title: 'App registrations quickstart',
                href: 'https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app',
                note: 'Register an app, configure redirect URIs, add certificates or secrets, and assign API permissions.',
              },
              {
                title: 'Entra ID audit logs',
                href: 'https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs',
                note: 'Audit log schema, filter options, retention limits, and export to Log Analytics or Event Hub.',
              },
              {
                title: 'Identity governance overview',
                href: 'https://learn.microsoft.com/en-us/entra/id-governance/',
                note: 'Entitlement Management, access packages, access reviews, and Lifecycle Workflows — all P2 features.',
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
