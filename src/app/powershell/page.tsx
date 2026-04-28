import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import { troubleshootingArticles } from '@/data/troubleshooting'
import StructuredData from '@/components/StructuredData'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'PowerShell'
const topicDescription =
  'Automation, Graph API integration, AD administration, endpoint reporting, and safe scripting patterns for Windows and Microsoft 365 administrators.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'powershell',
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

export default function PowerShellPage() {
  const tutorials = guides
    .filter(
      (g) =>
        g.tags?.includes('PowerShell') ||
        g.category === 'PowerShell' ||
        g.tags?.includes('WMI') ||
        g.tags?.includes('Automation'),
    )
    .slice(0, 4)
    .map((g) => ({
      title: g.title,
      href: g.href ?? `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.language === 'PowerShell')
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: s.language,
    }))

  const troubleshootingItems = troubleshootingArticles
    .filter(
      (a) =>
        a.affectedProducts.includes('Group Policy') ||
        a.affectedProducts.includes('Windows Update for Business') ||
        a.affectedProducts.includes('Windows Autopilot'),
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
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'Group Policy', href: '/group-policy' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
  ]

  const allItems = [...tutorials, ...scriptItems]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/powershell',
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/powershell' },
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
            PowerShell
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Automation, Graph API integration, Active Directory administration, Intune and endpoint
            reporting, patch compliance, and safe scripting patterns for Windows and Microsoft 365
            administrators.
          </p>
          <p className="mt-4 text-xs text-muted/60">Guides, scripts and reference</p>
        </Container>
      </div>

      {/* What PowerShell Is Used For */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="What PowerShell Is Used For in Windows and M365 Administration"
            description="PowerShell is the primary automation runtime for Microsoft environments. In production it runs everything from one-off AD queries to scheduled compliance reports — and with the Microsoft Graph PowerShell SDK, it now reaches every service in the Microsoft 365 stack."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Active Directory and on-premises automation',
                body: 'The ActiveDirectory module (RSAT) provides Get-ADUser, Get-ADComputer, Get-ADGroup, and set/move/disable equivalents. Bulk operations — disabling stale accounts, syncing attribute sets, generating OU membership reports — are standard daily-use cases.',
              },
              {
                heading: 'Microsoft Graph API integration',
                body: 'The Microsoft.Graph module wraps Graph API endpoints as PowerShell cmdlets. Use it to query Intune device inventory, Entra ID users, group memberships, Teams, SharePoint, and Exchange Online without the admin portals.',
              },
              {
                heading: 'Intune and endpoint management',
                body: 'Get-MgDeviceManagementManagedDevice and related Graph cmdlets export compliance state, OS version, last check-in, and primary user for every enrolled device. Proactive Remediation script pairs (detect + remediate) run on Intune-managed endpoints on a configurable schedule.',
              },
              {
                heading: 'Patch and vulnerability reporting',
                body: 'Query the Windows Update Agent via COM API, WSUS database, or WUfB Reports in Log Analytics. Generate per-device patch lag reports, identify devices missing critical KBs, and produce HTML dashboards for weekly review.',
              },
              {
                heading: 'Security baseline validation',
                body: 'Scripts like Invoke-WindowsHardening apply CIS Level 1/2 controls and generate a pre/post compliance delta report. Run as an Intune Proactive Remediation to continuously validate that baseline settings have not drifted from policy.',
              },
              {
                heading: 'Infrastructure provisioning and lab work',
                body: 'Hyper-V management (New-VM, Checkpoint-VM), WinRM configuration for remoting, unattend.xml-driven OS deployments, and repeatable lab baseline scripts reduce setup time from hours to minutes and make environments reproducible.',
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

      {/* Safe Scripting Practices */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Safe scripting"
            title="Safe Scripting Practices for Production Environments"
            description="Scripts running against production AD, Intune, or Exchange Online can cause outages or data loss if written carelessly. These practices separate scripts that are safe to schedule from ones that should never leave a test environment."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Use -WhatIf and -Confirm before destructive actions',
                body: 'Any cmdlet that modifies, removes, or moves objects should be tested with -WhatIf first to preview what would change. Build -WhatIf support into your own functions using [CmdletBinding(SupportsShouldProcess)] so callers can do the same. Never run bulk set/remove operations against production without a -WhatIf pass first.',
              },
              {
                heading: 'Validate input at script boundaries',
                body: 'Use [Parameter(Mandatory)] with [ValidateNotNullOrEmpty()] and type constraints on all inputs. Fail fast with a meaningful error if inputs are outside expected range — before touching any real objects. Untrusted input (CSV files, API responses) should always be sanitised before being passed to cmdlets that accept pipeline input.',
              },
              {
                heading: 'Never hardcode credentials',
                body: 'Credentials in script files get committed to version control, stored in scheduled task history, and logged in transcripts. Use Get-StoredCredential (CredentialManager module), certificate-based app registrations, managed identities, or Windows Credential Manager via [System.Net.NetworkCredential]. For service accounts, use gMSAs where available.',
              },
              {
                heading: 'Scope to least privilege',
                body: 'Graph API app registrations should request only the permission scopes the script actually uses — never Directory.ReadWrite.All when User.Read.All is sufficient. AD scripts should run as a service account with delegation scoped to the specific OU or attribute. Audit permission scopes quarterly as scripts evolve.',
              },
              {
                heading: 'Test against a non-production target',
                body: 'For Intune scripts, use a test Entra ID group with non-critical devices before assigning to production groups. For AD scripts, run against a test OU. For Exchange scripts, run against a mailbox you own. The cost of a test environment is always less than the cost of a production rollback.',
              },
              {
                heading: 'Version control and peer review',
                body: 'Production scripts belong in source control (Git). Changes to scheduled scripts should go through a pull request review — the same bar you apply to application code. Comment the WHY of non-obvious logic, not the WHAT. Include a changelog block in the script header with author, date, and summary of each change.',
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

      {/* Execution Policy, Signing, and Trust */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Trust and policy"
            title="Execution Policy, Script Signing, and AMSI"
            description="Execution policy is not a security boundary — it is a speed bump. Actual script security in enterprise environments comes from code signing, constrained language mode, and AMSI integration with your AV or EDR stack."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                name: 'Execution Policy',
                label: 'Configuration, not a security control',
                color: 'text-amber-400',
                border: 'border-amber-400/20',
                bg: 'bg-amber-400/5',
                rows: [
                  { k: 'Restricted', v: 'Default on Windows clients — no scripts run. Interactive commands only. Enforce via GPO (Turn on Script Execution = Disabled) for kiosks and standard user machines.' },
                  { k: 'RemoteSigned', v: 'Recommended baseline for managed admin machines — locally authored scripts run freely, scripts downloaded from the internet require a trusted signature. Set via GPO or Intune CSP.' },
                  { k: 'AllSigned', v: 'Every script must be signed by a trusted code signing certificate. Appropriate for high-security environments. Requires a code signing CA and signing workflow for all team-authored scripts.' },
                  { k: 'Bypass', v: 'No policy applied — used by automated pipelines running pre-validated signed scripts in a controlled runner context. Never set as the user-scope default on a managed workstation.' },
                  { k: 'Scope precedence', v: 'MachinePolicy (GPO) > UserPolicy > Process > CurrentUser > LocalMachine. GPO wins — a user cannot override a machine policy set via Group Policy or Intune.' },
                ],
              },
              {
                name: 'Code Signing',
                label: 'Enterprise signing workflow',
                color: 'text-primary',
                border: 'border-primary/20',
                bg: 'bg-primary/5',
                rows: [
                  { k: 'Obtain a code signing cert', v: 'Issue from an internal PKI CA (recommended — free, trusted by domain members) or purchase an EV code signing certificate from a public CA. Self-signed certificates are only suitable for single-machine testing.' },
                  { k: 'Sign a script', v: 'Set-AuthenticodeSignature -FilePath .\\script.ps1 -Certificate (Get-Item Cert:\\CurrentUser\\My\\<thumbprint>). The signature block is appended to the script file as a comment.' },
                  { k: 'Trust the certificate', v: 'Add the signing CA to Trusted Publishers via GPO (Computer Configuration > Windows Settings > Security Settings > Public Key Policies > Trusted Publishers) or Intune certificate profile.' },
                  { k: 'Signature invalidation', v: 'Any edit to a signed script — including whitespace changes — invalidates the signature. Re-sign after every change. Use a signing step in your CI/CD pipeline to enforce this.' },
                  { k: 'Timestamp signing', v: 'Sign with a timestamp (Set-AuthenticodeSignature ... -TimestampServer http://timestamp.digicert.com) so the signature remains valid after the signing certificate expires.' },
                ],
              },
              {
                name: 'AMSI and Constrained Language Mode',
                label: 'Runtime enforcement',
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
                bg: 'bg-emerald-400/5',
                rows: [
                  { k: 'What AMSI does', v: 'The Antimalware Scan Interface passes script content to the registered AV/EDR before execution. Defender and CrowdStrike both hook AMSI — obfuscated or malicious script content is caught at runtime regardless of execution policy.' },
                  { k: 'Constrained Language Mode', v: 'CLM restricts which .NET types and methods PowerShell scripts can access — blocking most post-exploitation techniques. Enabled automatically when AppLocker or WDAC is enforcing Allow rules. Scripts in CLM cannot call arbitrary .NET methods or use Add-Type.' },
                  { k: 'Script Block Logging', v: 'Enable via GPO (Turn on PowerShell Script Block Logging) or Intune. Logs the full de-obfuscated script content to the Microsoft-Windows-PowerShell/Operational event log (Event ID 4104) before execution — useful for incident response.' },
                  { k: 'Module logging', v: 'Enable Turn on Module Logging via GPO to log all pipeline execution detail per module. Verbose but comprehensive — captures all cmdlet invocations including those from imported modules.' },
                  { k: 'Transcript logging', v: 'Enable Turn on PowerShell Transcription via GPO to write a per-session transcript to a central share. Captures all input and output including interactive sessions — useful for SOC visibility into admin activity.' },
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

      {/* Tutorials */}
      <ContentRow items={tutorials} sectionTitle="Tutorials & Guides" viewAllHref="/tutorials" />

      {/* Microsoft Graph Automation */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Graph API"
            title="Microsoft Graph Automation with PowerShell"
            description="The Microsoft.Graph module (v2+) is the recommended way to interact with Microsoft 365 services from PowerShell. It replaces the older AzureAD, MSOnline, and individual service modules — most of which are now deprecated."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Authentication: delegated vs application',
                body: 'Delegated authentication (Connect-MgGraph -Scopes) prompts for user sign-in and inherits user permissions. Use for interactive admin sessions. Application authentication uses a client ID and secret or certificate registered in Entra — required for scheduled scripts and pipelines where no user is present. Prefer certificate over client secret for non-interactive auth.',
              },
              {
                heading: 'Requesting minimum scopes',
                body: 'Connect-MgGraph -Scopes "User.Read.All","DeviceManagementManagedDevices.Read.All" requests only what the session needs. The first connection with a new scope combination triggers admin consent. Check Find-MgGraphCommand -Command Get-MgUser to discover which scopes a specific cmdlet requires before building your app registration.',
              },
              {
                heading: 'Handling pagination with -All',
                body: 'Graph API returns results in pages of 100 by default. Add -All to any Get-Mg* cmdlet to automatically follow @odata.nextLink until all results are returned. For large tenants (10k+ devices or users), pipe through Select-Object immediately to avoid holding the full result set in memory.',
              },
              {
                heading: 'Throttling and retry logic',
                body: 'Graph API enforces per-tenant, per-app, and per-resource throttling limits. A 429 response includes a Retry-After header. The Microsoft.Graph module does not automatically retry throttled requests — wrap calls in a do/while loop that checks $_.Exception.Response.StatusCode -eq 429 and sleeps for the Retry-After value.',
              },
              {
                heading: 'Filtering server-side with $filter',
                body: 'Always filter on the server when possible: Get-MgDeviceManagementManagedDevice -Filter "complianceState eq \'noncompliant\'" instead of retrieving all devices and filtering in PowerShell. Server-side filtering reduces response size, latency, and throttle consumption — critical for large Intune tenants.',
              },
              {
                heading: 'Batch requests for high-volume operations',
                body: 'Graph batch requests combine up to 20 individual API calls into a single HTTP request. Use Invoke-MgGraphRequest with a $batch body to run 20 GET requests in one round trip — effective for per-device lookups across a list of IDs. Batching reduces overall latency and throttle impact compared to 20 sequential calls.',
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

      {/* Active Directory and Windows Server Automation */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Active Directory"
            title="Active Directory and Windows Server Automation"
            description="The ActiveDirectory PowerShell module (part of RSAT) covers the majority of daily AD administration tasks. For server management across multiple machines, PowerShell remoting and CIM sessions provide a consistent execution layer."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'RSAT and the AD module',
                body: 'Install on Windows 10/11 via Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0. On Windows Server, Install-WindowsFeature RSAT-AD-PowerShell. The module loads automatically when you call an AD cmdlet — no explicit Import-Module required on domain-joined machines.',
              },
              {
                heading: 'Querying AD objects efficiently',
                body: 'Use -Filter instead of -LDAPFilter for simpler queries; use -LDAPFilter for complex multi-attribute filters. Always specify -Properties to retrieve only the attributes you need — Get-ADUser -Properties * is expensive on large directories. Use Get-ADOrganizationalUnit with -SearchBase to scope queries to a specific container.',
              },
              {
                heading: 'Bulk account operations',
                body: 'Get-ADUser -Filter {Enabled -eq $true} | Where-Object {$_.LastLogonDate -lt (Get-Date).AddDays(-90)} | Disable-ADAccount is the standard pattern for stale account cleanup. Always pipe to a report first, review the list, then run the disable pass with confirmation or a -WhatIf sweep.',
              },
              {
                heading: 'PowerShell remoting (WinRM)',
                body: 'Enable-PSRemoting on target machines. Use Enter-PSSession for interactive remote sessions and Invoke-Command -ComputerName for scriptblock execution across one or many machines. Use -Credential with a service account — never pass plain-text credentials. For cross-domain or workgroup machines, configure TrustedHosts and use HTTPS transport.',
              },
              {
                heading: 'CIM sessions for WMI queries',
                body: 'New-CimSession creates a persistent connection to a remote machine for WMI/CIM queries. Use Get-CimInstance -CimSession $session -ClassName Win32_OperatingSystem instead of deprecated Get-WmiObject. CIM sessions use WinRM by default (DCOM with -SessionOption as fallback for older machines).',
              },
              {
                heading: 'Group Policy reporting from PowerShell',
                body: 'Get-GPResultantSetOfPolicy -ReportType HTML generates an RSoP report for a user/computer combination without requiring a logon. Get-GPO -All | Get-GPOReport -ReportType XML exports all GPO settings for offline analysis or version-controlled backup. Combine with Backup-GPO for disaster recovery.',
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

      {/* Intune and endpoint reporting */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Intune automation"
            title="Intune and Endpoint Reporting Scripts"
            description="The Graph API surfaces every piece of data visible in the Intune portal — and more. These are the most operationally useful queries for endpoint management at scale."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Device inventory and compliance export',
                body: 'Get-MgDeviceManagementManagedDevice -All -Filter "operatingSystem eq \'Windows\'" | Select-Object DeviceName,ComplianceState,OsVersion,LastSyncDateTime | Export-Csv gives you the core fleet inventory. Add UserPrincipalName via the primaryUsers relationship for a per-user view. See Export-IntuneDeviceReport in the script library.',
              },
              {
                heading: 'Stale device cleanup workflow',
                body: 'Get-StaleDevices cross-references Intune, Entra ID, and on-premises AD for devices that have not checked in within a configurable threshold. The script outputs a CSV with recommended actions (retire, delete, hybrid-join reconcile) rather than acting directly — review before any destructive step.',
              },
              {
                heading: 'Proactive Remediation script pairs',
                body: 'Detection scripts return exit code 0 (compliant) or 1 (non-compliant). Remediation scripts run when detection returns 1. Use $env:COMPUTERNAME and $env:USERNAME for context. Write output to stdout — it appears in the Intune portal under device proactive remediation status. Keep each script under 200KB and avoid downloading additional files from within a remediation script.',
              },
              {
                heading: 'App installation state queries',
                body: 'GET /deviceAppManagement/managedDevices/{id}/deviceAppStates returns per-app install state for a device. Run across your fleet to identify devices where a required app is in Pending or Failed state — the portal surfaces this per device but not as a fleet-wide exportable report.',
              },
              {
                heading: 'Targeting with Entra ID dynamic groups',
                body: 'Dynamic group membership rules use deviceOSVersion, deviceModel, displayName, and enrollmentProfileName attributes — all settable via PowerShell. Use Get-MgGroup -Filter "displayName eq \'Ring0-Pilot\'" | Get-MgGroupMember to verify group membership before using the group as an Intune assignment target.',
              },
              {
                heading: 'Graph API vs. Intune module methods',
                body: 'The Microsoft.Graph module wraps Graph REST endpoints. For fine-grained control — custom $select/$expand/$filter, beta API endpoints, or operations the module does not yet expose — use Invoke-MgGraphRequest -Method GET -Uri "/v1.0/deviceManagement/managedDevices?$select=id,deviceName,complianceState&$filter=complianceState eq \'noncompliant\'".',
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

      {/* Patch and compliance reporting */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Patch reporting"
            title="Patch and Compliance Reporting Scripts"
            description="Automated patch compliance reporting closes the gap between what Intune or WSUS reports in the portal and what leadership or audit needs in an exportable format."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Windows Update Agent (COM API)',
                body: 'The Microsoft.Update.Session COM object exposes the local Windows Update client without requiring admin rights for read operations. $Searcher.Search("IsInstalled=0 and IsHidden=0") returns all missing updates with Title, KBID, and MsrcSeverity properties. Use in Get-PatchComplianceReport for per-device missing update lists.',
              },
              {
                heading: 'WSUS database queries',
                body: 'WSUS stores update and client data in a SQL Server (or WID) database. Invoke-Sqlcmd against the SUSDB lets you build custom reports beyond what the WSUS console exposes — e.g., all computers that have not reported in 30 days, or all updates approved but not installed across the fleet. Requires db_datareader on SUSDB.',
              },
              {
                heading: 'WUfB Reports via Log Analytics',
                body: 'Windows Update for Business Reports populates UCClient, UCDeviceAlert, and UCUpdateAlert tables in a Log Analytics workspace. Query via Invoke-AzOperationalInsightsQuery (Az.OperationalInsights module) or the REST API. Useful for fleet-wide deferral compliance across Intune-managed and hybrid-joined devices.',
              },
              {
                heading: 'Graph-based update compliance',
                body: 'GET /deviceManagement/managedDevices?$select=deviceName,osVersion,complianceState,lastSyncDateTime returns OS version and compliance state per Intune device. Cross-reference osVersion against the minimum OS version in your compliance policy to identify devices on end-of-support or non-compliant builds.',
              },
              {
                heading: 'Exporting to HTML dashboards',
                body: 'ConvertTo-Html with -PreContent and -PostContent generates styled HTML reports from PowerShell output. Embed CSS inline for portability. Schedule via Task Scheduler or Azure Automation to drop a dated report file to a network share or SharePoint document library each week.',
              },
              {
                heading: 'Scheduled email delivery',
                body: 'Send-MgUserMail (Graph API) or Send-MailMessage (SMTP, deprecated in PS7) delivers reports to a distribution list on a schedule. Prefer Graph API for M365 tenants — it uses OAuth and does not require SMTP AUTH, which is increasingly blocked. Attach the CSV as a base64-encoded blob in the message body.',
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

      {/* Logging, transcripts, and error handling */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Error handling and logging"
            title="Logging, Transcript, and Error Handling Patterns"
            description="Scripts that run unattended need to communicate failure clearly — either by writing structured output, raising alerts, or producing logs that a human can read after the fact. Silent failure is the most dangerous pattern in scheduled automation."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                heading: 'Try / Catch / Finally structure',
                body: 'Wrap every operation that can fail in a try block. Set $ErrorActionPreference = "Stop" at the top of the script to ensure non-terminating errors (e.g., cmdlet warnings) are promoted to terminating exceptions that Catch can intercept. In the Catch block, log $_.Exception.Message with context — not just "an error occurred."',
              },
              {
                heading: 'Start-Transcript for unattended scripts',
                body: 'Call Start-Transcript -Path "$LogPath\\$(Get-Date -Format yyyyMMdd-HHmmss)-scriptname.log" -Append at the start of every scheduled script. Stop-Transcript in the Finally block ensures the log closes even if the script exits unexpectedly. Transcripts capture all output — useful for debugging after the fact without needing to reproduce the run.',
              },
              {
                heading: 'Write-EventLog for Windows event integration',
                body: 'New-EventLog -LogName Application -Source "AdminSignal-Scripts" once (at setup time), then Write-EventLog -LogName Application -Source "AdminSignal-Scripts" -EventId 1000 -EntryType Error -Message $errorDetail writes structured events that IT monitoring and SIEM tools can alert on — without requiring file share access to the transcript.',
              },
              {
                heading: '$ErrorActionPreference and -ErrorAction',
                body: 'Set $ErrorActionPreference = "Stop" globally to catch all errors. Override per-cmdlet with -ErrorAction SilentlyContinue when you intentionally want to ignore a specific failure (e.g., Test-Path returning false). Never set SilentlyContinue globally — it masks real failures. Use -ErrorVariable to capture errors without stopping execution for non-critical steps.',
              },
              {
                heading: 'Structured output over Write-Host',
                body: 'Write-Host writes to the host and cannot be captured or redirected. Use Write-Output for data, Write-Verbose for diagnostic detail (shown with -Verbose), Write-Warning for non-fatal issues, and Write-Error for failures. Scripts that return structured objects (not formatted strings) can be piped and composed by callers.',
              },
              {
                heading: 'Exit codes for scheduled tasks and pipelines',
                body: 'Task Scheduler and CI/CD pipelines read the script exit code to determine success or failure. Use Exit 0 for success and Exit 1 (or a non-zero code) in your Catch block for failures — this triggers task scheduler failure notification or pipeline step failure. PowerShell scripts invoked via powershell.exe return $LASTEXITCODE to the caller; pwsh.exe (PS7) does the same.',
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

      {/* Scheduled Task / Automation Runner */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Automation runners"
            title="Scheduled Task and Automation Runner Considerations"
            description="Where a script runs and what account it runs under determines what it can reach and what it leaves behind. These considerations separate a script that works on your workstation from one that runs reliably on a schedule in production."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                heading: 'Task Scheduler — action account',
                body: 'Run As: SYSTEM has local machine rights but no network credentials — useless for AD queries or Graph API calls. Run As: NETWORK SERVICE gets Kerberos tickets for network resources but has minimal local rights. For most admin scripts, create a dedicated service account with only the AD, Exchange, or Graph permissions required. Use "Run whether user is logged on or not" and store credentials in the task definition (encrypted by DPAPI to the machine key).',
              },
              {
                heading: 'Group Managed Service Accounts (gMSA)',
                body: 'gMSAs remove the need to manage passwords for service accounts — AD rotates the password automatically and makes it available only to authorised servers. Configure with New-ADServiceAccount and Install-ADServiceAccount on each machine that will run the task. Grant the gMSA the specific AD permissions it needs rather than adding it to Domain Admins.',
              },
              {
                heading: 'Azure Automation and Managed Identity',
                body: 'Azure Automation runbooks run PowerShell in Azure on a schedule without requiring an on-premises server. Assign a system-assigned managed identity to the Automation Account and grant it the Graph API application permissions needed — no client secret or certificate to manage. Hybrid Runbook Workers extend runbooks to on-premises machines for AD or WMI operations.',
              },
              {
                heading: 'Execution environment: PS5.1 vs PS7',
                body: 'Windows PowerShell 5.1 (powershell.exe) ships with Windows and is the default for Task Scheduler actions. PowerShell 7 (pwsh.exe) must be installed separately and supports parallel execution (ForEach-Object -Parallel), ternary operators, and newer SDK features. The Microsoft.Graph module fully supports both. Specify the full path to pwsh.exe in Task Scheduler if you need PS7 features.',
              },
              {
                heading: 'Module availability in the runner context',
                body: 'Modules installed in your user profile (Install-Module -Scope CurrentUser) are not available when a script runs as SYSTEM or a service account. Install modules machine-wide (Install-Module -Scope AllUsers) on any machine that will run the script, or include a #Requires -Modules block and handle installation in a setup script. Verify module versions match between dev and production.',
              },
              {
                heading: 'Network path and firewall dependencies',
                body: 'Scripts that write to a UNC share, query a SQL database, or call a REST API need the firewall, DNS, and network path to be available at the time the task runs. Document these dependencies explicitly. Add a Test-NetConnection check at script start and fail gracefully with a logged error if connectivity is absent — rather than hanging until a timeout.',
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
        sectionTitle="Related Troubleshooting"
        viewAllHref="/troubleshooting"
      />

      {/* Common Failure Points */}
      <div className="border-t border-border py-12">
        <Container>
          <SectionHeader
            eyebrow="Common problems"
            title="Where PowerShell Scripts Fail in Production"
            description="Most PowerShell failures in scheduled or automated contexts are environment and account problems, not logic errors. These are the patterns that appear most often."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Module not installed in the runner context',
                detail:
                  'The script works at the console but fails as a scheduled task. The Microsoft.Graph or ActiveDirectory module was installed for the current user, not AllUsers. Install-Module -Scope AllUsers on the runner machine, or add a setup step that installs missing modules before the script body runs.',
              },
              {
                title: 'Execution policy blocks the script',
                detail:
                  'The task runs but the script is blocked by RemoteSigned policy because the file was downloaded from a network share and has the Zone.Identifier alternate data stream marking it as internet-origin. Unblock-File -Path .\\script.ps1 removes the mark, or set the task to run with -ExecutionPolicy Bypass in the pwsh.exe arguments (not as a permanent policy change).',
              },
              {
                title: 'Graph API token expiry mid-script',
                detail:
                  'Connect-MgGraph tokens expire after one hour. A script that runs longer than 60 minutes against large tenants will start receiving 401 errors mid-run. Break long-running scripts into smaller batches with a reconnect between batches, or use an app registration with a client certificate and handle token refresh explicitly.',
              },
              {
                title: 'Silent failure — no exit code, no log',
                detail:
                  'The task shows "Last Run Result: 0x0" (success) but nothing happened. The script caught an error, logged nothing, and exited 0. Add $ErrorActionPreference = "Stop" and a Catch block that calls Exit 1 on failure. Task Scheduler and Azure Automation both interpret non-zero exit codes as task failure and can trigger email alerts.',
              },
              {
                title: 'Credential double-hop over WinRM',
                detail:
                  'Invoke-Command -ComputerName ServerA -ScriptBlock { Get-ChildItem \\\\ServerB\\Share } fails because Kerberos credentials cannot be delegated a second time over WinRM by default. Solutions: enable CredSSP (use cautiously — it delegates full credentials), use Kerberos constrained delegation, or run the script directly on ServerA rather than tunnelling through remoting.',
              },
              {
                title: 'Script runs as SYSTEM — no AD access',
                detail:
                  'SYSTEM has no domain identity and cannot authenticate to AD, Exchange, or Graph API. Change the task to run as a service account or gMSA with the specific permissions the script needs, not Domain Admins.',
              },
              {
                title: 'Rate limiting and 429 errors from Graph API',
                detail:
                  'A script looping through thousands of devices hits Graph throttling limits. The script does not handle the Retry-After header and retries immediately, making the throttling worse. Add a [int]$retryAfter = $_.Exception.Response.Headers["Retry-After"]; Start-Sleep -Seconds $retryAfter pattern in your catch block for 429 responses.',
              },
              {
                title: 'Working directory assumption',
                detail:
                  'The script uses relative paths (Import-Csv .\\data.csv) that work in the console but fail in a scheduled task where the working directory is System32. Always use $PSScriptRoot to build absolute paths: Join-Path $PSScriptRoot "data.csv". This works whether the script runs interactively, via a task, or from a different working directory.',
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
            description="Work through this sequence to go from writing your first admin script to building production-grade Graph-connected automation."
          />
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Building a PowerShell-Driven Software Inventory System for Unmanaged Endpoints',
                href: '/tutorials/powershell-software-inventory-system',
                note: 'Start here. Covers WMI queries, registry enumeration, structured output, and building a report pipeline — the foundations that appear in every admin script.',
              },
              {
                step: '2',
                title: 'Export-IntuneDeviceReport — Script Library',
                href: '/scripts/export-intune-device-report',
                note: 'Your first Graph API script. Covers Connect-MgGraph, scope selection, -All pagination, and CSV/JSON export. Read the code before running it.',
              },
              {
                step: '3',
                title: 'Get-StaleDevices — Script Library',
                href: '/scripts/get-stale-devices',
                note: 'Cross-references three data sources (Intune, Entra ID, AD) in one script. Good example of multi-source correlation and building a report before taking any action.',
              },
              {
                step: '4',
                title: 'Get-PatchComplianceReport — Script Library',
                href: '/scripts/get-patch-compliance-report',
                note: 'Combines Windows Update Agent COM API and Graph queries to produce a patch lag report. Introduces COM object instantiation and HTML output generation.',
              },
              {
                step: '5',
                title: 'Invoke-WindowsHardening — Script Library',
                href: '/scripts/invoke-windows-hardening',
                note: 'A production remediation script with detect and remediate modes. Shows how to structure a script that runs as an Intune Proactive Remediation and reports compliance delta.',
              },
              {
                step: '6',
                title: 'Group Policy Troubleshooting with RSoP, gpresult, and Policy Scope Analysis',
                href: '/tutorials/group-policy-troubleshooting-rsop-gpresult',
                note: 'Covers Get-GPResultantSetOfPolicy and gpresult output interpretation — useful when debugging why a PowerShell execution policy or security setting is not applying as expected.',
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
            title="Key Microsoft and PowerShell Documentation"
            description="Authoritative references for PowerShell scripting, the Graph SDK, remoting, and execution policy. Use these alongside AdminSignal guides for syntax and API reference."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'PowerShell documentation',
                href: 'https://learn.microsoft.com/en-us/powershell/',
                note: 'Language reference, scripting guide, and module documentation for Windows PowerShell 5.1 and PowerShell 7.',
              },
              {
                title: 'Microsoft Graph PowerShell SDK',
                href: 'https://learn.microsoft.com/en-us/powershell/microsoftgraph/',
                note: 'SDK overview, authentication guide, cmdlet reference, and migration guide from the deprecated AzureAD and MSOnline modules.',
              },
              {
                title: 'About Execution Policies',
                href: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies',
                note: 'Policy scope, precedence rules, and the distinction between execution policy and actual security boundaries.',
              },
              {
                title: 'Active Directory module reference',
                href: 'https://learn.microsoft.com/en-us/powershell/module/activedirectory/',
                note: 'Full cmdlet reference for the ActiveDirectory module — Get-ADUser, Get-ADComputer, Set-ADUser, and all related cmdlets.',
              },
              {
                title: 'PowerShell remoting (WinRM)',
                href: 'https://learn.microsoft.com/en-us/powershell/scripting/learn/remoting/running-remote-commands',
                note: 'Enabling WinRM, running remote commands with Invoke-Command, Enter-PSSession, and troubleshooting common remoting errors.',
              },
              {
                title: 'PowerShell Gallery',
                href: 'https://www.powershellgallery.com/',
                note: 'The official repository for PowerShell modules and scripts. Verify publisher identity and module download counts before trusting a module from the Gallery.',
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
