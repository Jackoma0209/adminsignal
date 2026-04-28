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

const topicName = 'Group Policy'
const topicDescription =
  'GPO design, processing order, scope filtering, RSoP, gpresult, and hybrid Intune coexistence for Windows administrators.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'group-policy',
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

export default function GroupPolicyPage() {
  const news = signals
    .filter((s) => s.tags?.includes('Group Policy') || s.tags?.includes('ADMX'))
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
        g.tags?.includes('Group Policy') ||
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
        s.tags.includes('Group Policy') ||
        s.tags.includes('Active Directory') ||
        s.tags.includes('Hardening') ||
        s.tags.includes('Patch Management'),
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
        a.category === 'Group Policy' ||
        a.affectedProducts.includes('Group Policy') ||
        a.slug === 'wufb-deferral-not-respected',
    )
    .slice(0, 3)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const relatedTopics = [
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
  ]

  const allItems = [...news, ...tutorials, ...scriptItems, ...troubleshootingItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/group-policy',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/group-policy' },
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
            Group Policy
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            GPO design, processing order, ADMX templates, WMI filters, loopback processing, and
            hybrid Intune coexistence. Practical guidance for administrators still running Windows
            through Active Directory Group Policy.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and analysis</p>
        </Container>
      </div>

      {/* What Group Policy Is Still Used For */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What Group Policy Is Still Used For"
            description="Group Policy remains the default control plane for domain-joined Windows machines, especially where servers, shared workstations, legacy applications, and on-premises authentication still matter."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Domain-joined workstation baseline',
                body: 'GPO still handles Windows security options, audit policy, firewall rules, drive maps, certificates, browser controls, and legacy desktop configuration for machines joined to Active Directory.',
              },
              {
                heading: 'Windows Server configuration',
                body: 'Most server estates are not Intune-managed. GPO is still the practical way to apply security baselines, Windows Update settings, Event Log policy, and administrative template settings to member servers and domain controllers.',
              },
              {
                heading: 'Legacy app and device policy',
                body: 'Line-of-business applications, VDI pools, kiosk-like shared PCs, and peripherals often depend on registry policy, scripts, printers, mapped drives, or Group Policy Preferences that are not cleanly replaced by MDM.',
              },
              {
                heading: 'Security baseline enforcement',
                body: 'CIS, Microsoft Security Baseline, and STIG-style controls are frequently deployed as imported GPOs. Many map to Intune Settings Catalog, but GPO remains common for hybrid and server scope.',
              },
              {
                heading: 'Logon, startup, and network assumptions',
                body: 'Scripts, folder redirection, software installation policy, and synchronous first-logon workflows are still used where the client has line-of-sight to domain controllers and SYSVOL during startup or sign-in.',
              },
              {
                heading: 'Migration reference point',
                body: 'Even when Intune is the destination, existing GPOs document the current state. Exporting and analyzing them is usually the first step before moving workloads to Settings Catalog policies.',
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

      {/* Processing basics */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Processing"
            title="GPO Processing Basics"
            description="When policy does not apply, start with processing order and scope before changing settings. Most failures are explained by where the object lives, which GPOs are linked, and whether the client can read SYSVOL and Active Directory."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'LSDOU precedence',
                label: 'Order of application',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'Sequence', v: 'Local policy applies first, then site-linked GPOs, domain-linked GPOs, and finally OU-linked GPOs. In nested OUs, parent OU links process before child OU links.' },
                  { k: 'Precedence', v: 'Later policy normally wins when two settings conflict. The OU closest to the user or computer usually has the final say unless an enforced link or block inheritance changes the result.' },
                  { k: 'Link order', v: 'Multiple GPOs can be linked to the same site, domain, or OU. In GPMC, lower link order has higher precedence within that container.' },
                  { k: 'Not every setting conflicts', v: 'Some client-side extensions merge settings, such as security policy. Others overwrite. Read the specific extension behavior before assuming last writer wins.' },
                ],
              },
              {
                name: 'Foreground and background refresh',
                label: 'Timing',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'Computer policy', v: 'Computer Configuration applies at startup and during the periodic background refresh cycle. Some extensions require startup processing to complete.' },
                  { k: 'User policy', v: 'User Configuration applies at sign-in and during background refresh. Folder redirection and some software deployment behavior depend on foreground logon processing.' },
                  { k: 'Refresh interval', v: 'Clients normally refresh Group Policy about every 90 minutes with a random offset. Domain controllers refresh more frequently.' },
                  { k: 'gpupdate', v: 'gpupdate triggers a refresh, but it does not fix scope, permissions, replication, WMI filter, or client-side extension failures. Use it after you know the policy should apply.' },
                ],
              },
              {
                name: 'Client-side extensions',
                label: 'What applies the setting',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'Examples', v: 'Registry policy, Security Settings, Scripts, Folder Redirection, Software Installation, Drive Maps, Printers, and Scheduled Tasks are processed by different extensions.' },
                  { k: 'Failure mode', v: 'A GPO can be in scope while one extension fails. That is why Event Viewer often matters more than the visible GPO list.' },
                  { k: 'SYSVOL dependency', v: 'The client reads policy files from SYSVOL. DFSR backlog, DNS issues, or domain controller reachability can make a correctly linked GPO fail at application time.' },
                  { k: 'Version mismatch', v: 'The AD object and SYSVOL version must line up. Replication problems can leave clients reading an older or incomplete copy of a policy.' },
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

      {/* Scope and filtering */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Scope"
            title="OU Links, Security Filtering, WMI Filters, and Loopback"
            description="A GPO only matters if the user or computer is in scope and allowed to apply it. Build a clear targeting model before adding more GPOs."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'OU and link design',
                body: 'Link GPOs where the target objects live. Separate user and computer OUs when the setting model is different, and keep baseline GPOs broad while making application or department policy narrow.',
              },
              {
                heading: 'Security filtering',
                body: 'Security filtering depends on Read and Apply Group Policy permissions. If Authenticated Users is removed, make sure the computer account can still read the GPO or the client may never evaluate it.',
              },
              {
                heading: 'WMI filtering',
                body: 'WMI filters evaluate on the target computer during processing. Keep filters simple and fast. Slow or broken WMI queries can delay logon and make a valid GPO look like it disappeared.',
              },
              {
                heading: 'Enforced and block inheritance',
                body: 'Enforced is a link setting that prevents lower containers from overriding that GPO. Block inheritance is a container setting that stops normal inherited links, but it does not stop enforced links.',
              },
              {
                heading: 'User vs computer side',
                body: 'Computer Configuration only applies to computers, and User Configuration only applies to users. A GPO can be linked correctly but still do nothing if the wrong side is disabled or the wrong object type is targeted.',
              },
              {
                heading: 'Loopback processing',
                body: 'Loopback applies user policy based on the computer object. Use Merge for adding computer-scoped user policy and Replace for shared devices where the computer location should fully control user settings.',
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

      {/* Troubleshooting workflow */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Diagnostics"
            title="RSoP, gpresult, and Event Viewer Troubleshooting"
            description="The fastest diagnosis is to prove three things in order: the policy is in scope, the client evaluated it, and the relevant client-side extension applied the setting without error."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Start with gpresult /h',
                body: 'Run gpresult /h C:\\Temp\\gpresult.html from an elevated prompt for computer policy, and as the affected user for user policy. Check Applied GPOs, Denied GPOs, security filtering, WMI filter results, and winning settings.',
              },
              {
                heading: 'Use RSoP for visual inspection',
                body: 'rsop.msc is useful when you need a quick MMC view of applied Administrative Template and security settings. It is less complete than gpresult, so use both when diagnosing complex scope issues.',
              },
              {
                heading: 'Read Event Viewer',
                body: 'Check Applications and Services Logs > Microsoft > Windows > GroupPolicy > Operational. Extension timing, WMI filter failures, inaccessible OUs, and SYSVOL read issues usually surface here.',
              },
              {
                heading: 'Separate scope from application',
                body: 'If the GPO appears under Denied GPOs, fix OU, link, security, or WMI targeting. If it appears under Applied GPOs but the setting is missing, investigate the specific client-side extension and setting path.',
              },
              {
                heading: 'Check domain controller and SYSVOL path',
                body: 'gpresult shows the domain controller used. Confirm the client can resolve and reach that DC, read SYSVOL, and see the expected policy version after AD and DFSR replication complete.',
              },
              {
                heading: 'Do not rely on gpupdate alone',
                body: 'gpupdate /force reruns policy processing, but repeated refreshes hide the real problem. Capture gpresult and the GroupPolicy Operational log before and after the refresh so you can compare what changed.',
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

      {/* Troubleshooting articles */}
      <ContentRow
        items={troubleshootingItems}
        sectionTitle="Troubleshooting"
        viewAllHref="/troubleshooting"
      />

      {/* Hybrid coexistence */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Hybrid management"
            title="Group Policy and Intune Coexistence"
            description="Hybrid environments often run GPO, ConfigMgr, and Intune at the same time. That can work, but each setting needs one clear authority."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'Keep GPO',
                label: 'Best for domain-bound workloads',
                color: 'text-blue-400',
                border: 'border-blue-400/20',
                bg: 'bg-blue-400/5',
                rows: [
                  { k: 'Good fit', v: 'Servers, domain controllers, shared workstations, VDI pools, certificate auto-enrollment, printer and drive mapping, and settings tied to on-premises resources.' },
                  { k: 'Operational model', v: 'Use clear OU structure, small purpose-built GPOs, documented link order, and regular backup/export from GPMC.' },
                  { k: 'Watch out for', v: 'Do not leave old workstation GPOs targeting devices that have already moved to Entra join and Intune-only management.' },
                ],
              },
              {
                name: 'Migrate to Intune',
                label: 'Best for cloud-managed endpoints',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'Good fit', v: 'Windows 10/11 endpoints that are Entra joined or hybrid joined, especially settings available in Settings Catalog or Endpoint security profiles.' },
                  { k: 'Migration path', v: 'Export GPOs as XML, import them into Group Policy analytics, review MDM support, then rebuild supported settings as Settings Catalog policy.' },
                  { k: 'Watch out for', v: 'Unsupported, deprecated, or preference-based settings may need scripts, remediations, app packaging, or a decision to keep a scoped GPO.' },
                ],
              },
              {
                name: 'Coexist carefully',
                label: 'Transitional state',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'Good fit', v: 'Phased migrations where existing domain-joined devices keep baseline GPO while selected workloads move to Intune or ConfigMgr co-management.' },
                  { k: 'Conflict control', v: 'Avoid configuring the same setting in both GPO and MDM. MDMWinsOverGP only applies to supported Policy CSP settings, not every equivalent control.' },
                  { k: 'Validation', v: 'Compare gpresult with the Intune per-setting status page. A device can show both policies present while only one actually controls the setting.' },
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
          <div className="mt-6">
            <Link
              href="/intune"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              See the Intune hub for Settings Catalog, compliance, and co-management guidance
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Scripts */}
      <ContentRow items={scriptItems} sectionTitle="Scripts & Automation" viewAllHref="/scripts" />

      {/* Common failure points */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Common problems"
            title="Where Group Policy Goes Wrong"
            description="Most GPO incidents repeat the same patterns. Work through these before assuming Windows ignored the policy."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Computer is in the wrong OU',
                detail:
                  'The policy is linked correctly, but the device object was moved, reimaged into a staging OU, or renamed and recreated. Confirm the object path in Active Directory before changing the GPO.',
              },
              {
                title: 'Security filtering removed Read permission',
                detail:
                  'A GPO filtered to a security group can disappear from processing if the computer cannot read the GPO. When replacing Authenticated Users, keep read permission for the right principals.',
              },
              {
                title: 'WMI filter evaluates false or slowly',
                detail:
                  'Filters based on OS version, chassis type, or installed software can fail after upgrades or hardware refresh. Test the WMI query locally on the affected client and keep the filter narrow.',
              },
              {
                title: 'User setting linked to a computer-only OU',
                detail:
                  'User Configuration will not apply just because a computer is in scope. Either link the GPO to the user OU or intentionally use loopback processing on the computer side.',
              },
              {
                title: 'SYSVOL or AD replication lag',
                detail:
                  'A client reads the GPO from a domain controller that has not received the latest SYSVOL or AD copy. Check the DC listed in gpresult and verify policy version consistency.',
              },
              {
                title: 'Conflicting Intune or ConfigMgr policy',
                detail:
                  'Hybrid-joined devices may receive GPO, MDM, and ConfigMgr settings. Windows Update, Defender, BitLocker, and firewall controls need one authority per setting.',
              },
              {
                title: 'ADMX Central Store mismatch',
                detail:
                  'Admins editing from different workstations may see different settings if the Central Store is stale or missing vendor ADMX files. Maintain a versioned PolicyDefinitions source before copying into SYSVOL.',
              },
              {
                title: 'Slow link or VPN timing',
                detail:
                  'Remote devices may process before the VPN is available, or be treated as slow-link connections. Startup scripts, software installation, and folder redirection are especially sensitive to network timing.',
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
            description="Use this path when you are auditing an existing Group Policy estate or preparing a hybrid migration to Intune."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Group Policy Troubleshooting with RSoP, gpresult, and Policy Scope Analysis',
                href: '/tutorials/group-policy-troubleshooting-rsop-gpresult',
                note: 'Start with the core diagnostic workflow: RSoP, gpresult output, WMI filters, and OU/link scope analysis.',
              },
              {
                step: '2',
                title: 'Group Policy Not Applying to Users or Computers',
                href: '/troubleshooting/group-policy-not-applying-diagnosis',
                note: 'Use the decision tree for denied GPOs, loopback, slow links, security filtering, and common scope failures.',
              },
              {
                step: '3',
                title: 'Hardening Windows 11 Endpoints with CIS Benchmark Level 1',
                href: '/tutorials/hardening-windows-11-cis-benchmark',
                note: 'Apply and validate baseline controls via GPO or Intune, then compare policy outcomes before broad rollout.',
              },
              {
                step: '4',
                title: 'Windows Update for Business Deferral Not Being Respected',
                href: '/troubleshooting/wufb-deferral-not-respected',
                note: 'Diagnose update policy conflicts between WSUS-targeting GPOs, WUfB, and Intune update rings.',
              },
              {
                step: '5',
                title: 'Microsoft Intune Hub',
                href: '/intune',
                note: 'Plan the MDM side of a migration: Settings Catalog, compliance, update rings, and co-management boundaries.',
              },
              {
                step: '6',
                title: 'SCCM / MECM Hub',
                href: '/sccm-mecm',
                note: 'Understand co-management workload sliding and the places where ConfigMgr, GPO, and Intune can overlap.',
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
            description="Authoritative references for Group Policy processing, scope, ADMX templates, RSoP, gpresult, and Intune migration planning."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Group Policy processing',
                href: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-processing',
                note: 'Processing order, foreground and background refresh, enforced links, block inheritance, filtering, and loopback behavior.',
              },
              {
                title: 'Group Policy scope',
                href: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope',
                note: 'How OU position, security filtering, and WMI filtering determine whether a GPO applies.',
              },
              {
                title: 'gpresult command reference',
                href: 'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/gpresult',
                note: 'Command syntax for reporting the Resultant Set of Policy for local and remote users or computers.',
              },
              {
                title: 'Use RSoP to manage Group Policy',
                href: 'https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn789183(v=ws.11)',
                note: 'Microsoft reference for Resultant Set of Policy planning and logging modes in GPMC.',
              },
              {
                title: 'Create and manage the ADMX Central Store',
                href: 'https://learn.microsoft.com/en-us/troubleshoot/windows-client/group-policy/create-and-manage-central-store',
                note: 'Central Store layout, ADMX/ADML handling, and policy template version management.',
              },
              {
                title: 'Intune Group Policy analytics',
                href: 'https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics',
                note: 'Import on-premises GPO XML, analyze MDM support, and plan Settings Catalog migration.',
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
