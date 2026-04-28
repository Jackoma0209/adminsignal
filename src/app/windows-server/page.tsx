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

const topicName = 'Windows Server'
const topicDescription =
  'Active Directory, DNS, DHCP, file services, patching, hardening, backup, monitoring, and PowerShell administration for Windows Server environments.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'windows-server',
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

export default function WindowsServerPage() {
  const news = signals
    .filter(
      (s) =>
        s.tags?.includes('Windows') ||
        s.tags?.includes('Windows Server 2025') ||
        s.category === 'Windows Server' ||
        s.category === 'Patch Tuesday',
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
        g.tags?.includes('Windows Server') ||
        g.tags?.includes('Active Directory') ||
        g.category === 'Group Policy' ||
        g.slug === 'hardening-windows-11-cis-benchmark',
    )
    .slice(0, 4)
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter(
      (s) =>
        s.tags.includes('Active Directory') ||
        s.tags.includes('Windows Server') ||
        s.tags.includes('Patch Management') ||
        s.tags.includes('WSUS') ||
        s.tags.includes('Hardening'),
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
        a.affectedProducts.includes('Windows Server') ||
        a.affectedProducts.includes('Active Directory') ||
        a.affectedProducts.includes('Group Policy') ||
        a.category === 'Patch Management',
    )
    .slice(0, 4)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const relatedTopics = [
    { name: 'Group Policy', href: '/group-policy' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Microsoft Intune', href: '/intune' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/windows-server',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/windows-server' },
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
            Windows Server
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Active Directory, DNS, DHCP, file services, patching, hardening, backup, monitoring,
            and PowerShell administration. Practical guidance for sysadmins running Windows Server
            in on-premises, hybrid, and cloud-connected environments.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* What Windows Server Is Still Used For */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What Windows Server Is Still Used For"
            description="Microsoft 365, Entra ID, and Intune have moved many workloads to cloud management, but Windows Server remains the control plane for identity, name resolution, file access, line-of-business apps, and server-side infrastructure in many real environments."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Active Directory and Kerberos',
                body: 'Domain controllers still authenticate users, computers, and service accounts for domain-joined endpoints, file shares, SQL Server, legacy apps, and workloads that depend on Kerberos, LDAP, or NTLM compatibility.',
              },
              {
                heading: 'Core network services',
                body: 'Windows Server commonly hosts internal DNS, DHCP, IPAM, NPS/RADIUS, certificate services, and routing-adjacent roles that keep branch offices and datacenters reachable.',
              },
              {
                heading: 'File, print, and app hosting',
                body: 'SMB shares, DFS namespaces, print queues, scheduled tasks, IIS apps, and vendor line-of-business services often remain on Windows Server even when collaboration and endpoint management move to Microsoft 365.',
              },
              {
                heading: 'Server-side patch and compliance scope',
                body: 'Intune manages Windows clients, not traditional Windows Server workloads. Server patching still usually depends on WSUS, ConfigMgr, Azure Update Manager, maintenance windows, or operational runbooks.',
              },
              {
                heading: 'Hybrid identity and access bridge',
                body: 'Entra ID extends identity to cloud apps, but many tenants still sync from AD DS. Group Policy, AD sites, DNS, and domain controller placement continue to affect sign-in, device join, and application access.',
              },
              {
                heading: 'Operational boundary for regulated systems',
                body: 'Some environments keep critical services on controlled networks for latency, data residency, vendor support, or isolation reasons. Windows Server is often the supported platform for those systems.',
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

      {/* AD DS */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Identity"
            title="Active Directory Domain Services"
            description="AD DS is still the centre of many Windows Server estates. Treat it like critical infrastructure: design for replication, recovery, auditing, delegation, and controlled change."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'Domain controller health',
                label: 'Keep authentication reliable',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'Core checks', v: 'Monitor AD replication, DNS registration, SYSVOL health, time sync, disk space, and Directory Services event logs before users notice authentication failures.' },
                  { k: 'Placement', v: 'Place writable domain controllers close to sites that need low-latency sign-in, and use RODCs only where physical or administrative trust is limited.' },
                  { k: 'FSMO roles', v: 'Know where FSMO roles live and document transfer or seizure steps. Most outages are not FSMO-related, but recovery becomes harder when nobody knows role ownership.' },
                  { k: 'DNS dependency', v: 'AD depends heavily on DNS SRV records. Broken DNS registration can look like random logon, Group Policy, LDAP, or domain join failure.' },
                ],
              },
              {
                name: 'Directory design',
                label: 'Make administration survivable',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'OU model', v: 'Design OUs around administration and policy scope, not only company org charts. Keep server, workstation, privileged, and service-account objects easy to target.' },
                  { k: 'Delegation', v: 'Delegate specific OU and group tasks instead of granting broad Domain Admin rights. Privileged group membership should be short, reviewed, and alertable.' },
                  { k: 'Service accounts', v: 'Use group managed service accounts where supported. For legacy accounts, document SPNs, owners, password rotation process, and dependencies before changes.' },
                  { k: 'Schema and functional level changes', v: 'Treat schema changes and forest or domain functional level raises as change-controlled operations with rollback planning and verified backups.' },
                ],
              },
              {
                name: 'Hybrid identity',
                label: 'AD plus cloud identity',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'Entra Connect', v: 'Hybrid tenants commonly sync users, groups, and devices from AD DS. Sync health, object filtering, UPN alignment, and duplicate attributes can all affect cloud sign-in.' },
                  { k: 'Device join', v: 'Hybrid Entra join depends on AD, Entra Connect, SCP configuration, device registration endpoints, and certificate renewal. Use dsregcmd /status on affected clients.' },
                  { k: 'Conditional Access impact', v: 'Cloud access policies can depend on device state that begins on-premises. Stale or duplicate AD/Entra device objects can create confusing access failures.' },
                  { k: 'Admin model shift', v: 'Cloud tools do not remove AD operational duties. They add a second control plane, so changes need to be validated in both AD and Entra ID.' },
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

      {/* Core infrastructure roles */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Infrastructure roles"
            title="DNS, DHCP, File Services, Print, and Core Roles"
            description="The boring roles are often the business-critical ones. Keep them simple, documented, monitored, and recoverable."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'DNS Server',
                body: 'AD-integrated DNS zones, forwarders, conditional forwarders, scavenging, and secure dynamic updates directly affect authentication and application access. Test name resolution before chasing higher-level symptoms.',
              },
              {
                heading: 'DHCP Server',
                body: 'Scope design, exclusions, reservations, relay/IP helper configuration, failover pairs, and DNS dynamic update credentials determine whether clients receive usable network configuration.',
              },
              {
                heading: 'File services and SMB',
                body: 'SMB shares need access-based enumeration, NTFS/share permission hygiene, quota planning, shadow copies where appropriate, and clear ownership for stale data cleanup.',
              },
              {
                heading: 'DFS namespaces and replication',
                body: 'DFS namespaces can simplify user paths, but DFSR backlog, staging size, and conflict handling need monitoring. Do not treat DFSR as a general backup system.',
              },
              {
                heading: 'Print services',
                body: 'Print queues are still common in offices, warehouses, healthcare, and manufacturing. Driver isolation, queue naming, deployment method, and spooler hardening matter more than the role gets credit for.',
              },
              {
                heading: 'Certificates, NPS, IIS, and app roles',
                body: 'AD CS, NPS/RADIUS, IIS, Remote Desktop Services, and vendor apps often become hidden dependencies. Record owners, ports, certificates, service accounts, and recovery steps for each.',
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

      {/* Group Policy and hybrid management */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Hybrid management"
            title="Group Policy and Hybrid Management"
            description="Windows Server estates rarely use one management plane. Group Policy, ConfigMgr, Entra ID, Intune, and Azure Arc each solve different parts of the job."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Use GPO where domain context matters',
                body: 'Server baselines, Windows Firewall, audit policy, user rights assignment, certificate auto-enrollment, WSUS targeting, and local security policy are common server-side GPO use cases.',
              },
              {
                heading: 'Avoid duplicate authority',
                body: 'Hybrid-joined workstations can receive both GPO and Intune policy. Servers can also receive ConfigMgr or Arc policy. Define one owner per setting, especially update, Defender, BitLocker, and firewall controls.',
              },
              {
                heading: 'Intune changes endpoint administration',
                body: 'Intune moves many Windows client policies to MDM and Settings Catalog. That does not remove the need to manage domain controllers, DNS, DHCP, file servers, or server patch windows.',
              },
              {
                heading: 'Azure Arc and server governance',
                body: 'Azure Arc can surface inventory, policy, update, and monitoring workflows for servers across environments. Treat it as a management overlay, not a replacement for AD, DNS, backup, and local recovery planning.',
              },
              {
                heading: 'RSAT and Windows Admin Center',
                body: 'RSAT remains the daily toolkit for ADUC, DNS, DHCP, GPMC, and Failover Cluster Manager. Windows Admin Center adds browser-based server management without requiring the server itself to move to the cloud.',
              },
              {
                heading: 'Document the boundary',
                body: 'For each server class, document whether it is managed by GPO, ConfigMgr, Arc, manual PowerShell, or a vendor console. Most operational confusion starts when that boundary is assumed rather than written down.',
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
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/group-policy"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Full Group Policy hub
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sccm-mecm"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              ConfigMgr and co-management guidance
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Patching */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Maintenance"
            title="Patching, Maintenance Windows, and Reboot Planning"
            description="Server patching is less about clicking install and more about dependency order, rollback, maintenance windows, and business communication."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'Standalone and member servers',
                label: 'Routine patching',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'Patch source', v: 'Use WSUS, ConfigMgr, Azure Update Manager, or a documented manual process. Make sure the server is not receiving conflicting update policy from multiple sources.' },
                  { k: 'Window design', v: 'Group servers by business service, criticality, dependency order, and reboot tolerance. A generic monthly server window is rarely enough for databases, app tiers, and domain controllers.' },
                  { k: 'Pre-checks', v: 'Confirm backups, free disk space, pending reboot state, service owner approval, and monitoring suppression before the window begins.' },
                ],
              },
              {
                name: 'Domain controllers',
                label: 'Identity-sensitive',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'Sequence', v: 'Patch one domain controller per site or tier at a time where possible. Verify replication and authentication before moving to the next server.' },
                  { k: 'Health checks', v: 'Run dcdiag, repadmin /replsummary, DNS checks, and event log review before and after patching. Authentication failures after reboot are often DNS, time, or replication symptoms.' },
                  { k: 'Recovery', v: 'Know the difference between restoring a failed DC from backup, rebuilding it, and performing an authoritative restore. Do not improvise during an outage.' },
                ],
              },
              {
                name: 'Clusters and critical apps',
                label: 'Availability-aware',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'Cluster-Aware Updating', v: 'Use CAU or an equivalent runbook to drain roles, patch one node, reboot, validate, and move on. Never patch every node in a cluster at once.' },
                  { k: 'Application order', v: 'Patch dependencies first or last according to the app owner runbook. File, database, identity, and middleware layers often have strict order requirements.' },
                  { k: 'Rollback limits', v: 'Some updates are not cleanly removable. Test on non-production systems, capture VM snapshots only where supported, and have service-level recovery steps ready.' },
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

      {/* Scripts */}
      <ContentRow items={scriptItems} sectionTitle="Scripts & Automation" viewAllHref="/scripts" />

      {/* Hardening */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Hardening"
            title="Server Hardening and Baseline Configuration"
            description="A server baseline should reduce attack surface without breaking the workload. Start with role-aware controls, test them, and track exceptions explicitly."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Role-aware baselines',
                body: 'Domain controllers, file servers, IIS servers, SQL hosts, and jump boxes need different baselines. Apply common controls broadly, then layer role-specific policy on top.',
              },
              {
                heading: 'Local admin and privileged access',
                body: 'Limit local Administrators membership, use Windows LAPS where supported, separate daily and privileged accounts, and alert on membership changes to privileged groups.',
              },
              {
                heading: 'Firewall and service exposure',
                body: 'Enable Windows Firewall, restrict inbound management ports, disable unused roles and services, and document exceptions for vendor apps rather than leaving broad allow rules.',
              },
              {
                heading: 'Credential and protocol hardening',
                body: 'Review NTLM usage, SMB signing/encryption requirements, LDAP signing/channel binding, TLS configuration, and legacy protocol dependencies before enforcing controls.',
              },
              {
                heading: 'Audit policy and logging',
                body: 'Apply advanced audit policy for logon, account management, directory service changes, object access where needed, PowerShell logging, and process creation with command line for high-value servers.',
              },
              {
                heading: 'Configuration drift',
                body: 'Use GPO, ConfigMgr baselines, Desired State Configuration, Azure Policy guest configuration, or scripted checks to detect drift instead of relying on one-time build hardening.',
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

      {/* Monitoring and DR */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Operations"
            title="Event Logs, Monitoring, Backup, and Disaster Recovery"
            description="The recovery plan matters more than the monitoring dashboard. Make sure alerts lead to action and backups are restored often enough to prove they work."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Event logs to watch',
                body: 'System, Application, Security, Directory Service, DNS Server, DFS Replication, GroupPolicy/Operational, WindowsUpdateClient/Operational, and role-specific logs should feed your monitoring or SIEM.',
              },
              {
                heading: 'Practical alerting',
                body: 'Alert on service failures, disk exhaustion, failed backups, replication errors, certificate expiry, repeated authentication failures, unexpected reboots, and critical role-specific events.',
              },
              {
                heading: 'Backup scope',
                body: 'Back up system state for domain controllers, application-aware data for workloads, file server volumes, certificates/private keys, GPO backups, scripts, scheduled tasks, and documented configuration.',
              },
              {
                heading: 'Restore testing',
                body: 'A backup that has never been restored is only a hope. Test file restore, bare-metal restore where needed, system state restore, and application recovery in a lab or isolated recovery network.',
              },
              {
                heading: 'AD disaster recovery',
                body: 'Know when to rebuild a domain controller versus restore it. Practice DSRM access, authoritative restore scenarios, accidental deletion recovery, and forest recovery documentation before a real incident.',
              },
              {
                heading: 'Change and incident evidence',
                body: 'Preserve event logs, PowerShell transcripts, GPO change records, backup job history, and patch deployment logs. These records are often the fastest path from outage to root cause.',
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

      {/* PowerShell and RSAT */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Administration"
            title="PowerShell, RSAT, and Day-to-Day Administration"
            description="Good Windows Server administration is a mix of consoles, scripts, remoting, documentation, and repeatable checks."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'RSAT from an admin workstation',
                body: 'Run ADUC, DNS Manager, DHCP Manager, GPMC, Failover Cluster Manager, and Server Manager from a hardened admin workstation rather than signing into servers for routine work.',
              },
              {
                heading: 'PowerShell remoting',
                body: 'Use PowerShell remoting and CIM sessions for repeatable server checks. Standardize modules, execution policy, transcript logging, and Just Enough Administration where appropriate.',
              },
              {
                heading: 'Server Manager and Windows Admin Center',
                body: 'Server Manager remains useful for role visibility and multi-server tasks. Windows Admin Center gives a browser-based option for local and remote server administration.',
              },
              {
                heading: 'Scheduled maintenance scripts',
                body: 'Automate pre-patch checks, disk cleanup reporting, service status snapshots, certificate expiry checks, and event log summaries so maintenance windows start with known state.',
              },
              {
                heading: 'Least privilege workflows',
                body: 'Use separate admin accounts, Privileged Access Workstations where needed, role-based groups, and time-bound elevation. Avoid using Domain Admin for DNS, DHCP, file share, and print tasks.',
              },
              {
                heading: 'Inventory and ownership',
                body: 'Maintain server role, owner, patch ring, backup policy, certificate, service account, and recovery runbook metadata. The server nobody owns becomes the incident nobody can fix.',
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
            title="Where Windows Server Environments Go Wrong"
            description="Most incidents are not mysterious. They are undocumented dependencies, stale infrastructure, weak recovery testing, or overlapping management authority."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'DNS breaks authentication',
                detail:
                  'Clients or servers point to external DNS, stale domain controllers, or missing SRV records. AD symptoms then appear as logon failure, domain join failure, GPO failure, or application outage.',
              },
              {
                title: 'DHCP failover not actually healthy',
                detail:
                  'Scopes exist on two servers, but failover replication, DNS update credentials, exclusions, or relay configuration are wrong. Clients receive leases but not the options they need.',
              },
              {
                title: 'Domain controllers patched without validation',
                detail:
                  'All DCs reboot in the same window, then replication, DNS, or time sync issues surface after the change. Patch in sequence and verify health between servers.',
              },
              {
                title: 'File permissions drift for years',
                detail:
                  'Nested groups, direct user ACLs, inherited permissions, and orphaned SIDs make access reviews painful. Fix ownership and group design before attempting a large cleanup.',
              },
              {
                title: 'Backups exist but restores fail',
                detail:
                  'Backup jobs report success, but credentials, encryption keys, application consistency, or restore media were never tested. Recovery objectives should be proven, not assumed.',
              },
              {
                title: 'GPO, ConfigMgr, and manual settings conflict',
                detail:
                  'A server receives one setting from GPO, a different one from ConfigMgr, and a manual registry change from an old runbook. Document the authority per setting and remove stale policy.',
              },
              {
                title: 'Certificates expire quietly',
                detail:
                  'IIS, LDAPS, RADIUS, VPN, Wi-Fi, and internal apps depend on certificates. Expiry monitoring and ownership records prevent outages that look unrelated at first glance.',
              },
              {
                title: 'Admins manage servers interactively',
                detail:
                  'Routine RDP sign-ins with broad admin rights increase risk and make changes hard to audit. Prefer RSAT, PowerShell remoting, Windows Admin Center, and privileged workflow controls.',
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
            description="Work through this sequence when auditing a Windows Server estate or untangling hybrid management."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Group Policy Troubleshooting with RSoP, gpresult, and Policy Scope Analysis',
                href: '/tutorials/group-policy-troubleshooting-rsop-gpresult',
                note: 'Start with GPO visibility. Most Windows Server and workstation policy issues become clearer once scope, link order, WMI filters, and winning settings are known.',
              },
              {
                step: '2',
                title: 'Group Policy Not Applying to Users or Computers',
                href: '/troubleshooting/group-policy-not-applying-diagnosis',
                note: 'Use the decision tree for common AD/GPO failure patterns: OU placement, filtering, loopback, slow links, and replication timing.',
              },
              {
                step: '3',
                title: 'Get-StaleDevices Script Library',
                href: '/scripts/get-stale-devices',
                note: 'Clean up inactive objects across Intune, Entra ID, and on-prem AD before they create reporting, access, or policy targeting noise.',
              },
              {
                step: '4',
                title: 'Patch Management Hub',
                href: '/patch-management',
                note: 'Build the server patching model: WSUS, WUfB boundaries, maintenance windows, compliance checks, rollback, and reboot planning.',
              },
              {
                step: '5',
                title: 'Hardening Windows 11 Endpoints with CIS Benchmark Level 1',
                href: '/tutorials/hardening-windows-11-cis-benchmark',
                note: 'The endpoint-focused baseline still helps server admins think in controls, validation, exceptions, and drift reporting.',
              },
              {
                step: '6',
                title: 'SCCM / MECM Hub',
                href: '/sccm-mecm',
                note: 'Use this when servers or hybrid endpoints are managed with ConfigMgr, WSUS integration, maintenance windows, and co-management boundaries.',
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

      {/* Official Microsoft resources */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Official docs"
            title="Key Microsoft Documentation"
            description="Authoritative references for Windows Server roles, management, security baselines, patching, and recovery planning."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'AD DS deployment',
                href: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-deployment',
                note: 'Domain controller deployment, removal, functional levels, Adprep, and deployment troubleshooting.',
              },
              {
                title: 'DNS architecture in Windows Server',
                href: 'https://learn.microsoft.com/en-us/windows-server/networking/dns/dns-architecture',
                note: 'DNS concepts, zones, replication, resource records, and how Windows Server DNS fits into name resolution.',
              },
              {
                title: 'DHCP Server overview',
                href: 'https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top',
                note: 'DHCP role fundamentals, scopes, options, lease management, and centralized IP configuration.',
              },
              {
                title: 'SMB features in Windows Server',
                href: 'https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-feature-descriptions',
                note: 'SMB security, performance, availability, compression, signing, encryption, and management capabilities.',
              },
              {
                title: 'WSUS overview',
                href: 'https://learn.microsoft.com/en-us/windows-server/administration/windows-server-update-services/get-started/windows-server-update-services-wsus',
                note: 'WSUS role description, supported production use, update distribution, and deployment planning.',
              },
              {
                title: 'Cluster-Aware Updating',
                href: 'https://learn.microsoft.com/en-us/windows-server/failover-clustering/cluster-aware-updating',
                note: 'Automated patching flow for failover cluster nodes while maintaining service availability.',
              },
              {
                title: 'Windows security baselines',
                href: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines',
                note: 'Microsoft baseline guidance for Windows and Windows Server security configuration.',
              },
              {
                title: 'RSAT tools',
                href: 'https://learn.microsoft.com/en-us/windows-server/administration/install-remote-server-administration-tools',
                note: 'Remote Server Administration Tools for managing server roles from Windows client or server machines.',
              },
              {
                title: 'Windows Admin Center overview',
                href: 'https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview',
                note: 'Browser-based management for Windows Server, clusters, Azure Local, and hybrid server estates.',
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
