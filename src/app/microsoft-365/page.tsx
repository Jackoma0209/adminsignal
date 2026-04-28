import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import { troubleshootingArticles } from '@/data/troubleshooting'
import { reviews } from '@/data/reviews'
import StructuredData from '@/components/StructuredData'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Microsoft 365'
const topicDescription =
  'Exchange Online, SharePoint, Teams, tenant governance, security, compliance, and licensing. Practical guidance for IT admins managing Microsoft 365 environments.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'microsoft-365',
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

export default function Microsoft365Page() {
  // Broaden news: include Zero Trust and Security Alert signals — relevant to M365 admins
  const news = signals
    .filter(
      (s) =>
        s.tags?.includes('Microsoft 365') ||
        s.category === 'Microsoft 365' ||
        s.tags?.includes('Zero Trust') ||
        s.category === 'Security Alert',
    )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  // Broaden tutorials: include Conditional Access, Identity, Entra ID category
  const tutorials = guides
    .filter(
      (g) =>
        g.tags?.includes('Microsoft 365') ||
        g.category === 'Microsoft 365' ||
        g.tags?.includes('Conditional Access') ||
        g.tags?.includes('Identity') ||
        g.category === 'Microsoft Entra ID',
    )
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Graph API') || s.tags.includes('Reporting'))
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
        a.affectedProducts.includes('Microsoft Intune') ||
        a.affectedProducts.includes('Entra ID') ||
        a.affectedProducts.includes('Windows Autopilot'),
    )
    .slice(0, 3)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const m365Reviews = reviews
    .filter((r) => r.category === 'Microsoft 365')
    .map((r) => ({
      title: r.title,
      href: `/reviews/${r.slug}`,
      excerpt: r.excerpt,
      meta: `${r.readTime} · ${r.rating}/5`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
    { name: 'Group Policy', href: '/group-policy' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/microsoft-365',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/microsoft-365' },
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
            Microsoft 365
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Exchange Online, SharePoint, Teams, tenant governance, security baselines, audit
            logging, and backup considerations. Practical reference for IT admins and sysadmins
            managing Microsoft 365 environments.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* What M365 Administration Covers */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What Microsoft 365 Administration Covers in Real Environments"
            description="Microsoft 365 administration spans multiple product families — Exchange Online, SharePoint, Teams, Entra ID, Intune, and the Purview compliance stack — each with its own admin centre, PowerShell module, and operational surface. The Microsoft 365 admin centre (admin.microsoft.com) is the entry point, but most workload-specific administration happens in the dedicated portals."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Tenant admin and licensing',
                body: 'User creation, licence assignment, domain verification, and admin role management live in the Microsoft 365 admin centre. Service health, message centre announcements, and tenant-wide configuration (security defaults, multi-tenant settings) are monitored here. Licence management affects which features are available per user — misconfigured licences are one of the most common sources of "feature X is not available" tickets.',
              },
              {
                heading: 'Exchange Online',
                body: 'Mailbox provisioning, mail flow rules, accepted domains, connectors, anti-spam and anti-phishing policies, shared mailboxes, distribution groups, resource mailboxes, and email authentication (SPF, DKIM, DMARC) are managed in the Exchange admin centre (admin.exchange.microsoft.com). Litigation hold and compliance archiving require Exchange Online Plan 2 or above.',
              },
              {
                heading: 'SharePoint Online and OneDrive',
                body: 'Site collection creation and management, external sharing controls, storage quotas, content type governance, and hub site configuration are managed in the SharePoint admin centre. OneDrive admin controls per-user storage, sync client policy, and known folder move. Both integrate with Microsoft Purview for sensitivity labels and data loss prevention.',
              },
              {
                heading: 'Microsoft Teams',
                body: 'Teams admin covers calling policies, meeting policies, messaging policies, external access, guest access, app permission policies, and channel governance. Phone System (PSTN calling) and Direct Routing configuration also lives in the Teams admin centre. Teams data — channels, chats, meetings — has separate retention and eDiscovery considerations from Exchange mailbox data.',
              },
              {
                heading: 'Identity and Conditional Access',
                body: 'Every Microsoft 365 authentication event passes through Entra ID. Conditional Access policies, MFA configuration, SSPR, and user risk policies all affect M365 access. The identity layer is the highest-impact security surface in a Microsoft 365 tenant — a misconfigured CA policy can lock out users or leave access ungated across the entire service.',
              },
              {
                heading: 'Security, compliance, and audit',
                body: 'Microsoft Purview (compliance.microsoft.com) hosts the unified audit log, data loss prevention policies, sensitivity labels, insider risk management, eDiscovery, and communication compliance. Microsoft Defender for Office 365 provides anti-phishing, safe attachments, safe links, and the email threat explorer. Both require specific licence tiers.',
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

      {/* Tenant Baseline and Admin Centre Workflow */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Tenant administration"
            title="Tenant Baseline and Admin Centre Workflow"
            description="A new Microsoft 365 tenant ships with permissive defaults. These are the first areas to configure before users and services are fully onboarded — each one represents a common audit finding when left at default."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Disable security defaults — use Conditional Access instead',
                body: 'Security defaults (Entra ID > Properties > Manage security defaults) apply basic MFA to all users via a blunt policy. Once you deploy Conditional Access policies — which provide per-application, per-device, per-location granularity — disable security defaults. Running both simultaneously causes unexpected MFA prompts and is not a supported configuration.',
              },
              {
                heading: 'Global Admin hygiene',
                body: 'Global Admin is the highest-privilege role in a Microsoft 365 tenant. No one\'s day-to-day account should be Global Admin. Create dedicated admin accounts used only for administrative tasks, protect them with phishing-resistant MFA, and use PIM (P2) for just-in-time activation. Audit Global Admin membership monthly — the Microsoft 365 admin centre flags this as a Secure Score recommendation.',
              },
              {
                heading: 'Secure Score as a baseline tracker',
                body: 'Microsoft Secure Score (security.microsoft.com > Secure Score) aggregates security control implementation into a single score. Use it to identify the highest-impact unimplemented controls — MFA coverage, admin role hygiene, anti-phishing policy configuration, and legacy auth blocking consistently appear in the top recommendations. Track score trend weekly rather than chasing individual actions in isolation.',
              },
              {
                heading: 'Service health and message centre',
                body: 'The Microsoft 365 admin centre Service health dashboard shows current and historical service incidents. The Message centre posts planned changes — feature additions, deprecations, and behaviour changes — with a target date. Subscribe the message centre to a shared mailbox or Teams channel so the team sees upcoming changes before users are affected. Filter by your specific services to reduce noise.',
              },
              {
                heading: 'Delegated admin and partner access',
                body: 'If a Microsoft partner manages your tenant, delegated admin relationships appear in Settings > Partner relationships. Review these periodically — a former MSP may retain delegated admin access after a transition. Granular Delegated Admin Privileges (GDAP) replaced the legacy DAP model; verify partners use GDAP with scoped roles rather than Global Admin delegation.',
              },
              {
                heading: 'Legacy authentication blocking',
                body: 'Legacy authentication protocols (IMAP, POP3, SMTP Auth, Exchange Web Services with basic auth) bypass Conditional Access and MFA. Block legacy authentication via a CA policy (Condition: client apps = Exchange ActiveSync and Other clients; Grant: Block) before retiring it in Exchange Online. Monitor the Sign-in logs in Entra for client apps using legacy auth before enforcing the block to avoid breaking Outlook 2010/2013 or third-party mail clients.',
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

      {/* Exchange Online */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Exchange Online"
            title="Exchange Online Operational Areas"
            description="Exchange Online is the most operationally dense service in Microsoft 365. These are the areas that generate the most admin tickets, security incidents, and compliance requirements in production tenants."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Email authentication: SPF, DKIM, DMARC',
                body: 'SPF (TXT record in DNS) authorises sending IP ranges. DKIM (CNAME records) cryptographically signs outbound messages — enable in Exchange admin > Mail flow > DKIM for every accepted domain. DMARC (TXT record) tells receiving servers what to do when SPF and DKIM fail — start with p=none to monitor, then move to p=quarantine and p=reject once you have confirmed all legitimate senders are covered. All three are required for Microsoft 365 to deliver consistently to Gmail and other major providers.',
              },
              {
                heading: 'Mail flow rules and connectors',
                body: 'Transport rules (mail flow rules) in the Exchange admin centre intercept messages based on sender, recipient, subject, attachment type, or header and apply actions — redirect, add disclaimer, encrypt, reject. Inbound and outbound connectors configure SMTP relay for on-premises mail servers, multi-function devices, and third-party email hygiene services. Connector configuration errors cause silent mail delivery failures that are difficult to diagnose without message trace.',
              },
              {
                heading: 'Anti-spam and anti-phishing policies',
                body: 'Microsoft 365 includes Exchange Online Protection (EOP) by default. Configure the anti-spam inbound policy for high-confidence spam action (quarantine vs junk folder), anti-phishing impersonation protection for key executive names, and the outbound spam policy threshold. Defender for Office 365 Plan 1 adds Safe Attachments and Safe Links — these are not enabled by default even when licensed.',
              },
              {
                heading: 'Shared mailboxes and resource mailboxes',
                body: 'Shared mailboxes (no licence required if under 50GB) are accessed via full access permission. Do not set a password on a shared mailbox account — disable sign-in on the Entra account. Resource mailboxes (room/equipment) accept or decline booking requests automatically based on calendar policy. Both shared and resource mailboxes need a licence if they require litigation hold or the mailbox exceeds 50GB.',
              },
              {
                heading: 'Litigation hold and archiving',
                body: 'Litigation hold (Set-Mailbox -LitigationHoldEnabled $true) prevents the managed folder assistant from permanently deleting items — content is retained indefinitely in the Recoverable Items folder, which grows until the hold is removed. In-place archiving provides an additional mailbox for users to move older mail. Both require Exchange Online Plan 2 or Microsoft 365 E3/E5 — Plan 1 licences do not include unlimited archiving or indefinite holds.',
              },
              {
                heading: 'Message trace for delivery issues',
                body: 'Exchange admin centre > Mail flow > Message trace. Search by sender, recipient, or message ID to follow an email through the Exchange transport pipeline. Output shows each hop — EOP spam filter, transport rules applied, delivery status, and if rejected, the rejection reason and code. For messages older than 10 days, use the enhanced summary or extended reports which take longer to generate but cover up to 90 days.',
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

      {/* SharePoint, OneDrive, Teams */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Collaboration services"
            title="SharePoint Online, OneDrive, and Teams"
            description="SharePoint, OneDrive, and Teams are tightly coupled — a Teams team creates a SharePoint site and a shared mailbox. Understanding the data model helps when users report missing files, cannot access channels, or when you are planning a data governance strategy."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'SharePoint Online',
                label: 'Sites, permissions, external sharing',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'External sharing controls', v: 'SharePoint admin > Policies > Sharing. Set the tenant-level external sharing policy (Anyone, New and existing guests, Existing guests, Only people in your organization). Override per-site collection for sites that need stricter or more permissive sharing than the tenant default.' },
                  { k: 'Site collection admin vs site owner', v: 'Site collection admins have full control including closing and deleting the site. Site owners manage permissions and content. Assign site collection admin via the SharePoint admin centre — it does not appear in the site\'s permission groups and is easier to overlook in permission audits.' },
                  { k: 'Hub sites', v: 'Hub site association allows navigation, news, and search to roll up from associated sites to the hub. Use hub sites to organise intranet content by department or function without creating complex permission hierarchies. Hub association does not change permissions — sites maintain their own permission boundaries.' },
                  { k: 'Storage and quotas', v: 'Tenant storage pool is shared across all site collections. Individual site quotas prevent any single site consuming the pool. SharePoint admin > Sites > Active sites shows current usage per site. Tenant storage pool size depends on number of licenced users — 1TB base + 10GB per licensed user for E1/E3/E5.' },
                ],
              },
              {
                name: 'OneDrive for Business',
                label: 'Per-user storage and sync',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'Known Folder Move (KFM)', v: 'KFM silently redirects Desktop, Documents, and Pictures to OneDrive without user action. Deploy via Intune or Group Policy. KFM is the most effective way to ensure user data is backed up to the cloud — but test with a pilot group first: sync conflicts with locally-managed folders from other backup solutions are the most common failure.' },
                  { k: 'Sync client policy', v: 'The OneDrive sync client can be configured via Intune or GPO to require sign-in with corporate credentials, block consumer OneDrive accounts on corporate devices, and limit which SharePoint tenants can sync to the device. Essential for preventing corporate data from syncing to personal OneDrive accounts.' },
                  { k: 'Orphaned OneDrive accounts', v: 'When a user account is deleted, their OneDrive content is retained for a configurable period (default: 30 days, max: 180 days in admin settings). Designate a secondary owner to access the content during the retention window. After expiry, content is permanently deleted — there is no recycle bin at tenant level for expired personal sites.' },
                  { k: 'Storage per user', v: '1TB per user on E1/E3/Business Basic. Unlimited storage for E3/E5 users after 5 or more licensed users have the licence assigned (Microsoft administrative threshold, not automatic). Storage quotas are per OneDrive site — not enforced against a shared pool in the same way as SharePoint site collections.' },
                ],
              },
              {
                name: 'Microsoft Teams',
                label: 'Policies, guest access, data model',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'Teams data model', v: 'Each Team has a corresponding Microsoft 365 group, SharePoint team site, Exchange shared mailbox, and Planner plan. Channel files live in the SharePoint document library. Private channel files live in separate SharePoint sites — each private channel creates its own site. Understand this when planning retention policies and eDiscovery — Teams chat and channel messages are stored in Exchange, not SharePoint.' },
                  { k: 'Guest access vs external access', v: 'Guest access allows external users to be added to Teams channels and collaborate on files. External access (federation) allows real-time chat and calls with users from other Teams tenants without guest accounts. Configure both in Teams admin > Users > External access and Guest access — they are independent switches.' },
                  { k: 'Meeting and messaging policies', v: 'Teams admin > Meetings > Meeting policies controls what meeting features are available (recording, transcription, lobby bypass, external participants). Messaging policies control message editing, deletion, read receipts, and URL previews. Assign policies to specific groups rather than changing the global policy to allow exceptions for specific user groups.' },
                  { k: 'Teams lifecycle governance', v: 'Without governance, tenants accumulate hundreds of orphaned Teams. Configure expiry policies (Microsoft 365 Groups expiry) to automatically flag inactive Teams for renewal or deletion. Require an owner for all Teams — Microsoft 365 Groups without an active owner cannot renew. Set a naming policy to enforce department prefix or suffix in team names for discoverability.' },
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

      {/* Security, Compliance, and Audit Logging */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Security and compliance"
            title="Security, Compliance, and Audit Logging"
            description="Microsoft Purview and Microsoft Defender for Office 365 are the security and compliance layer for Microsoft 365 data. Neither is a set-and-forget system — both require active policy management and regular review to be effective."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Unified audit log',
                body: 'The Microsoft Purview unified audit log records user and admin operations across Exchange, SharePoint, Teams, OneDrive, Entra ID, and other services. Default retention: 180 days (E3 and above). Microsoft 365 E5 or the Audit (Premium) add-on extends retention to 1 year and adds crucial event types including MailItemsAccessed (needed to determine which mail was read during a compromise). Audit log must be enabled — it is not on by default in all tenants. Check via Set-AdminAuditLogConfig -UnifiedAuditLogIngestionEnabled.',
              },
              {
                heading: 'Searching the audit log',
                body: 'Purview compliance portal > Audit > New search. Filter by user, date range, activity type, and workload. Exchange admin audit and mailbox audit are separate from the unified log — enable mailbox auditing via Set-Mailbox -AuditEnabled $true -AuditOwner MailboxLogin,FolderBind,SendAs. For bulk export and scripted queries, use Search-UnifiedAuditLog in the ExchangeOnlineManagement PowerShell module.',
              },
              {
                heading: 'Data Loss Prevention (DLP)',
                body: 'DLP policies in Purview scan content in Exchange, SharePoint, OneDrive, and Teams for sensitive information types (credit card numbers, NHS numbers, social security numbers, custom regex patterns) and apply protective actions — block sharing, apply sensitivity label, notify user, alert admin. Start DLP policies in Audit mode and review matches for two weeks before switching to enforcement to avoid blocking legitimate business processes.',
              },
              {
                heading: 'Sensitivity labels',
                body: 'Sensitivity labels (Purview > Information protection) classify documents and emails with a persistent label that travels with the content. Labels can apply encryption, header/footer visual marking, and access restrictions. Deploy via Office apps through the Microsoft Information Protection unified labelling client. Labels require Entra ID P1 at minimum — encryption enforcement requires Azure Information Protection (included in E3/E5).',
              },
              {
                heading: 'Defender for Office 365',
                body: 'Safe Attachments detonates email attachments in a sandbox before delivery — configure via Defender portal > Policies & rules > Safe Attachments. Safe Links rewrites URLs and checks them at click time against Microsoft\'s threat intelligence feed. Both are enabled via policies — having the Defender for Office 365 Plan 1 licence does not enable them automatically. Apply policies to all users, not selected groups, to avoid protection gaps.',
              },
              {
                heading: 'eDiscovery and content search',
                body: 'Purview eDiscovery allows admins and compliance officers to search and export content from Exchange, SharePoint, Teams, and OneDrive for legal holds and investigations. Standard eDiscovery is included in E3. Premium eDiscovery (E5 or add-on) adds custodian management, advanced indexing, and relevance scoring. Content searches can be placed on legal hold to preserve content in place without affecting user experience.',
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

      {/* Backup, Retention, and Recovery */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Data resilience"
            title="Backup, Retention, and Recovery Considerations"
            description="Microsoft 365 is a SaaS platform with built-in redundancy — but redundancy is not backup. Microsoft's Shared Responsibility Model places responsibility for data recovery from accidental deletion, malicious deletion, and ransomware encryption on the customer."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: "Microsoft's native retention — what it actually covers",
                body: "Deleted emails go to Deleted Items, then Recoverable Items (retained 30 days by default, 14 days for soft-deleted mailboxes). Deleted SharePoint and OneDrive files go to the recycle bin (93 days). Deleted Teams messages are retained per your retention policy. None of this is a backup — it is versioning and recycle bin functionality. There is no restore to a specific point-in-time snapshot without a third-party tool.",
              },
              {
                heading: 'Retention policies vs backup',
                body: 'Purview retention policies preserve content for compliance — they prevent deletion during the retention period and can trigger deletion after it. This is not a backup: retained content cannot be restored to its original location after accidental deletion, and retention does not protect against an admin deleting a site or mailbox outright. Retention policies serve a legal compliance purpose; a third-party backup tool serves a recovery purpose. Both are needed.',
              },
              {
                heading: 'Deleted item and site recovery windows',
                body: 'Exchange: recoverable items default 30 days (extendable to 180 days via Set-Mailbox -RetainDeletedItemsFor). SharePoint and OneDrive: first-stage recycle bin 93 days, second-stage recycle bin an additional 93 days before permanent deletion. Teams channels: channel deletion gives 30 days to restore from Teams admin centre. Microsoft 365 Groups: soft-deleted groups can be restored within 30 days via Entra ID or PowerShell.',
              },
              {
                heading: 'Third-party backup: what to look for',
                body: 'Evaluate M365 backup tools on: granular restore (can you restore a single email, file version, or Teams message?), storage flexibility (your own Azure storage vs vendor-managed?), retention period support (do you need 7 years for GDPR or sector compliance?), and licensing model (per-user, per-seat, consumption-based?). The market leaders are Veeam Backup for Microsoft 365, Acronis, and Rubrik — each with different storage and licensing trade-offs.',
              },
              {
                heading: 'Ransomware recovery in Microsoft 365',
                body: 'OneDrive and SharePoint have built-in versioning (up to 500 versions per file) and a Files Restore feature that lets users roll back all files to a point up to 30 days ago. Exchange Online does not have an equivalent point-in-time restore. For ransomware scenarios where attackers remained in the tenant for weeks before triggering encryption, the 30-day window may not be sufficient — making third-party backup with longer retention critical.',
              },
              {
                heading: 'Microsoft 365 Backup (native — in preview/GA)',
                body: 'Microsoft has introduced a native Microsoft 365 Backup product covering Exchange, SharePoint, and OneDrive. It is charged per GB per month and managed from the Microsoft 365 admin centre. It provides point-in-time restore at a shorter retention window than most third-party tools. Evaluate against your RPO/RTO requirements and existing backup investment — it does not yet cover Teams chat history or cover all workloads at the same granularity as mature third-party products.',
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

      {/* Licensing and Feature Availability */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Licensing"
            title="Licensing and Feature Availability — What Each Tier Unlocks"
            description="Microsoft 365 licensing determines which admin capabilities, security features, and compliance tools are available. These are the key differences that matter most for endpoint and security administration."
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Capability', 'Business Basic', 'Business Premium', 'E3', 'E5'].map((h) => (
                    <th key={h} className="pb-3 pr-6 text-left text-xs font-semibold uppercase tracking-widest text-muted/60 first:min-w-48">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { cap: 'Conditional Access', b: '—', bp: '✓ (P1)', e3: '✓ (P1)', e5: '✓ (P1)' },
                  { cap: 'Intune device management', b: '—', bp: '✓', e3: '✓', e5: '✓' },
                  { cap: 'Entra ID PIM / Identity Protection', b: '—', bp: '—', e3: '—', e5: '✓ (P2)' },
                  { cap: 'Defender for Business / MDE P2', b: '—', bp: 'Defender for Business', e3: '—', e5: 'MDE P2 (full EDR)' },
                  { cap: 'Defender for Office 365', b: '—', bp: 'Plan 1', e3: '—', e5: 'Plan 2' },
                  { cap: 'Exchange Online mailbox size', b: '50 GB', bp: '100 GB', e3: '100 GB', e5: '100 GB' },
                  { cap: 'Exchange archiving / litigation hold', b: '—', bp: '—', e3: 'Unlimited archive', e5: 'Unlimited archive' },
                  { cap: 'Purview audit log retention', b: '90 days', bp: '90 days', e3: '180 days', e5: '1 year (Audit Premium)' },
                  { cap: 'eDiscovery', b: 'Content search only', bp: 'Content search only', e3: 'Standard eDiscovery', e5: 'Premium eDiscovery' },
                  { cap: 'DLP policies', b: '—', bp: 'Basic DLP', e3: 'Full DLP', e5: 'Full DLP + Insider Risk' },
                  { cap: 'Sensitivity labels / AIP', b: '—', bp: 'AIP P1', e3: 'AIP P1', e5: 'AIP P2' },
                  { cap: 'Max users', b: 'Unlimited', bp: '300', e3: 'Unlimited', e5: 'Unlimited' },
                ].map((row) => (
                  <tr key={row.cap} className="text-xs text-muted">
                    <td className="py-3 pr-6 font-semibold text-foreground/90">{row.cap}</td>
                    <td className="py-3 pr-6">{row.b}</td>
                    <td className="py-3 pr-6 text-primary">{row.bp}</td>
                    <td className="py-3 pr-6">{row.e3}</td>
                    <td className="py-3">{row.e5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted/60">
            Business Premium is capped at 300 users. Above 300 users, E3 is the equivalent baseline — but E3 excludes MDE P2 and Entra ID P2, which E5 adds. Licensing changes frequently — verify current inclusions at the Microsoft 365 product pages before purchasing.
          </p>
          <div className="mt-6">
            <Link
              href="/comparisons/entra-id-p1-vs-p2"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Entra ID P1 vs P2: what the upgrade actually adds
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Troubleshooting */}
      <ContentRow
        items={troubleshootingItems}
        sectionTitle="Related Troubleshooting"
        viewAllHref="/troubleshooting"
      />

      {/* Reviews */}
      <ContentRow
        items={m365Reviews}
        sectionTitle="Reviews"
        viewAllHref="/reviews"
      />

      {/* Common Failure Points */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Common problems"
            title="Where Microsoft 365 Configurations Go Wrong"
            description="Most Microsoft 365 problems in production fall into three categories: security defaults left on when CA is deployed, licence assignment gaps that hide features, and misconfigured email authentication. These are the patterns that appear most often."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Security defaults and Conditional Access running simultaneously',
                detail:
                  'Security defaults and Conditional Access are mutually exclusive. Running both causes duplicate MFA prompts, unexpected blocks on service accounts, and inconsistent user experience. Once any CA policy is created, disable security defaults in Entra ID > Properties > Manage security defaults. Do not disable security defaults before your CA baseline is complete and tested in report-only mode.',
              },
              {
                title: 'Safe Attachments and Safe Links not enabled despite Plan 1 licence',
                detail:
                  'Defender for Office 365 Plan 1 is included in Business Premium and E5, but the policies are not created automatically. Navigate to security.microsoft.com > Policies & rules > Threat policies and create Safe Attachments and Safe Links policies applied to all users. The licence does not enable the protection — the policy does.',
              },
              {
                title: 'Legacy authentication not blocked — CA bypass',
                detail:
                  'IMAP, POP3, and SMTP Auth clients bypass Conditional Access and MFA. An attacker with a stolen password can authenticate via these protocols even if the user has MFA enforced via CA. Check Entra sign-in logs for client apps showing "Exchange ActiveSync" or "Other clients" — these are legacy auth sign-ins. Block via CA policy before disabling in Exchange Online to identify affected clients first.',
              },
              {
                title: 'Mailbox audit log not enabled — forensic gap',
                detail:
                  'Unified audit log may be enabled but mailbox-level audit (owner actions — MailboxLogin, FolderBind, HardDelete) requires Set-Mailbox -AuditEnabled $true -AuditOwner MailboxLogin,FolderBind,SendAs on each mailbox. Without this, you cannot determine which emails were read during a mailbox compromise. The Microsoft 365 E5 / Audit Premium licence adds MailItemsAccessed — the most forensically valuable event type.',
              },
              {
                title: 'No third-party backup — relying on recycle bin',
                detail:
                  'The SharePoint recycle bin and Exchange Recoverable Items folder cover accidental deletion within their respective windows (93 and 30 days). They do not protect against an admin permanently deleting a site collection, a ransomware actor systematically emptying recycle bins, or a user purging their recoverable items. Document the gap and obtain management sign-off if no third-party backup is in place.',
              },
              {
                title: 'DMARC not configured — email spoofing risk',
                detail:
                  'Having SPF and DKIM configured does not prevent spoofing of your domain without DMARC. Without a DMARC record, receiving servers have no instruction on what to do when SPF/DKIM fails. Start with p=none;rua=mailto:dmarc-reports@yourdomain.com to collect reports and identify all sending sources. Move to p=quarantine after confirming all legitimate senders are covered in SPF and DKIM.',
              },
              {
                title: 'Guest access left open globally — data exfiltration risk',
                detail:
                  'SharePoint external sharing set to "Anyone with the link" allows anonymous access to files with no authentication or audit trail. Guest access in Teams allows external users to access channels, files, and meeting recordings. Review SharePoint admin > Policies > Sharing and Teams admin > Guest access. Restrict external sharing to "New and existing guests" at tenant level — site owners can relax this per site if needed with business justification.',
              },
              {
                title: 'Retention policy gaps — specific workloads not covered',
                detail:
                  'A Purview retention policy applied to "Exchange email" does not cover Teams chat or channel messages — those need a separate Teams retention policy. A SharePoint retention policy does not cover OneDrive unless OneDrive locations are explicitly included. Audit retention policy scope from Purview > Data lifecycle management > Microsoft 365 > Retention policies > each policy > Locations to verify all required workloads are included.',
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
            description="Work through this sequence to build a complete Microsoft 365 security and governance baseline — starting with the identity layer that all M365 services depend on."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Configuring Conditional Access for a Microsoft 365 Tenant: The Complete Policy Map',
                href: '/tutorials/conditional-access-m365-policy-map',
                note: 'The identity layer underpins every M365 service. Build the CA baseline first — MFA, compliant device enforcement, legacy auth blocking, and break-glass accounts.',
              },
              {
                step: '2',
                title: 'Entra ID Premium P1 vs P2: Is the Upgrade Worth It?',
                href: '/comparisons/entra-id-p1-vs-p2',
                note: 'Understand exactly what P2 adds (PIM, Identity Protection, Access Reviews) relative to the cost — the decision affects your whole M365 security posture.',
              },
              {
                step: '3',
                title: 'Export-IntuneDeviceReport — Script Library',
                href: '/scripts/export-intune-device-report',
                note: 'Graph API query for device compliance state — the foundation for verifying that device-based CA controls are actually enforced across your enrolled fleet.',
              },
              {
                step: '4',
                title: 'Intune Compliance Policy Not Evaluating',
                href: '/troubleshooting/intune-compliance-policy-not-evaluating',
                note: 'Device compliance state drives CA decisions for M365 access. Diagnose devices stuck in Not evaluated — a common barrier when standing up compliant device CA enforcement.',
              },
              {
                step: '5',
                title: 'Get-StaleDevices — Script Library',
                href: '/scripts/get-stale-devices',
                note: 'Cross-reference Intune and Entra ID for inactive device objects. Stale enrolled devices with valid tokens represent an access risk if their compliance state is not current.',
              },
              {
                step: '6',
                title: 'Veeam Backup for Microsoft 365: Admin Buyer Notes',
                href: '/reviews/veeam-backup-m365-review',
                note: 'Understand what Microsoft actually retains vs what a third-party backup provides — before deciding whether to add backup tooling to your M365 stack.',
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
            description="Authoritative references for Microsoft 365 admin, Exchange Online, SharePoint, Teams, and the compliance stack. Use alongside AdminSignal guides for product-specific configuration syntax."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Microsoft 365 admin centre docs',
                href: 'https://learn.microsoft.com/en-us/microsoft-365/admin/',
                note: 'User management, licence assignment, domain setup, admin roles, and service health — the core admin centre reference.',
              },
              {
                title: 'Exchange Online documentation',
                href: 'https://learn.microsoft.com/en-us/exchange/exchange-online',
                note: 'Mail flow rules, connectors, anti-spam, mailbox management, and Exchange Online PowerShell reference.',
              },
              {
                title: 'SharePoint Online admin docs',
                href: 'https://learn.microsoft.com/en-us/sharepoint/introduction',
                note: 'Site creation, sharing policies, hub sites, storage quotas, and the SharePoint admin centre reference.',
              },
              {
                title: 'Microsoft Teams admin docs',
                href: 'https://learn.microsoft.com/en-us/microsoftteams/',
                note: 'Meeting policies, messaging policies, guest and external access, lifecycle governance, and Teams PowerShell module reference.',
              },
              {
                title: 'Microsoft Purview compliance docs',
                href: 'https://learn.microsoft.com/en-us/purview/',
                note: 'Unified audit log, DLP policies, sensitivity labels, eDiscovery, retention policies, and Purview compliance portal reference.',
              },
              {
                title: 'Microsoft 365 service descriptions',
                href: 'https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-platform-service-description/office-365-platform-service-description',
                note: 'Authoritative per-plan feature availability — use this to verify what is and is not included in a specific Microsoft 365 licence.',
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
