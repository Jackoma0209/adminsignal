export interface Script {
  id: string
  title: string
  slug: string
  language: 'PowerShell' | 'Python' | 'Bash' | 'Registry'
  description: string
  tags: string[]
  codePreview?: string
  status: 'implementation-guide' | 'full-script-available'
  version: string
  environmentAssumptions: string[]
  requiredPermissions: string[]
  intendedOutput: string
  sourceUrl?: string
  sourceFileUrl?: string
  isNew?: boolean
  isFeatured?: boolean
}

/**
 * Implementation notes. None of the entries below should be described as
 * tested, supported, downloadable, or production-ready. They document
 * command shape, permissions, and intended output only.
 */
export const scripts: Script[] = [
  {
    id: '1',
    title: 'Get-StaleDevices',
    slug: 'get-stale-devices',
    language: 'PowerShell',
    description:
      'Design notes for building a review-first report of inactive device records across Intune, Microsoft Entra ID, and optional on-premises Active Directory sources.',
    tags: ['Intune', 'Entra ID', 'Active Directory', 'Reporting'],
    status: 'implementation-guide',
    version: 'Guide v0.2',
    environmentAssumptions: [
      'An authorised Windows admin workstation',
      'A current Microsoft Graph PowerShell SDK installation',
      'Access to the relevant Microsoft Intune and Entra ID tenant',
      'Optional Active Directory access through approved RSAT tooling',
    ],
    requiredPermissions: [
      'Device.Read.All for Entra device records',
      'DeviceManagementManagedDevices.Read.All for Intune managed-device records',
      'Directory read access when an on-premises Active Directory source is included',
    ],
    intendedOutput:
      'A review queue or report that identifies potentially stale records, records the evidence used, and avoids deleting any object automatically.',
    codePreview: `$Cutoff = (Get-Date).AddDays(-90)
# Query the authorised source and review records older than $Cutoff
# Do not delete objects automatically from an example fragment.`,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Invoke-WindowsHardening',
    slug: 'invoke-windows-hardening',
    language: 'PowerShell',
    description:
      'Design notes for a report-first Windows hardening workflow that maps approved controls to devices, records current state, and separates audit from remediation.',
    tags: ['CIS', 'Hardening', 'Security', 'Compliance'],
    status: 'implementation-guide',
    version: 'Guide v0.2',
    environmentAssumptions: [
      'A disposable lab or approved pilot device matching the target Windows build',
      'An organisation-approved hardening baseline and change record',
      'A tested recovery path for registry, security policy, Defender, firewall, and BitLocker changes',
      'Separate audit and remediation execution modes',
    ],
    requiredPermissions: [
      'Local Administrator or an approved device-management execution context',
      'Permission to deploy remediation scripts when Intune is used',
      'Change approval for every control that alters device security or availability',
    ],
    intendedOutput:
      'An audit report that records each evaluated control as compliant, non-compliant, not applicable, skipped, or failed before any approved remediation is attempted.',
    codePreview: `# Example structure only
foreach ($Control in $ApprovedControls) {
    # Test current state and record evidence before remediation
}`,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Get-PatchComplianceReport',
    slug: 'get-patch-compliance-report',
    language: 'PowerShell',
    description:
      'Design notes for combining approved Windows update data sources into a device-level patch review report with explicit source and freshness limitations.',
    tags: ['Patch Management', 'WSUS', 'WUfB', 'Reporting'],
    status: 'implementation-guide',
    version: 'Guide v0.2',
    environmentAssumptions: [
      'A documented choice of WSUS, Windows Update for Business reporting, or another authoritative source',
      'Representative pilot devices with known update state',
      'A reporting definition for compliant, overdue, unknown, and excluded devices',
      'Awareness that local update search results and cloud reporting can differ in freshness and scope',
    ],
    requiredPermissions: [
      'Read-only access to the selected update-reporting source',
      'Approved Microsoft Graph permissions if cloud update data is queried',
      'No remediation permissions for a report-only implementation',
    ],
    intendedOutput:
      'A timestamped report that shows the source, last-seen evidence, update state, exclusions, unknown devices, and the limitations of the collected data.',
    codePreview: `# Example local evidence query only
$Session = New-Object -ComObject Microsoft.Update.Session
$Searcher = $Session.CreateUpdateSearcher()`,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'New-AdminLabVM',
    slug: 'new-admin-lab-vm',
    language: 'PowerShell',
    description:
      'Design notes for creating an isolated Hyper-V test virtual machine with explicit media, networking, storage, security, and optional domain-join checks.',
    tags: ['Hyper-V', 'Lab', 'Automation', 'Windows 11'],
    status: 'implementation-guide',
    version: 'Guide v0.2',
    environmentAssumptions: [
      'An authorised Hyper-V host with sufficient storage and memory',
      'Valid Windows installation media and licensing',
      'An isolated or controlled virtual network',
      'A disposable lab workflow rather than an unattended production provisioning process',
    ],
    requiredPermissions: [
      'Local Administrator on the Hyper-V host',
      'Permission to create VMs, virtual disks, switches, and media attachments',
      'Separately approved domain-join rights only when that optional step is used',
    ],
    intendedOutput:
      'A documented lab VM definition and validation checklist; the example fragments do not constitute a complete provisioning script or answer-file generator.',
    codePreview: `# Example fragment only
New-VM -Name 'AdminLab-01' -MemoryStartupBytes 4GB -Generation 2
# Validate paths, networking and media before continuing.`,
  },
  {
    id: '5',
    title: 'Export-IntuneDeviceReport',
    slug: 'export-intune-device-report',
    language: 'PowerShell',
    description:
      'Design notes for a read-only Microsoft Graph inventory export with explicit field selection, paging, null handling, permission review, and data-protection controls.',
    tags: ['Intune', 'Graph API', 'Reporting', 'Inventory'],
    status: 'implementation-guide',
    version: 'Guide v0.2',
    environmentAssumptions: [
      'An authorised admin workstation with a current Microsoft Graph PowerShell SDK',
      'A Microsoft Intune tenant containing representative test records',
      'A defined data-minimisation and retention policy for exported device and user data',
      'Validation against portal records and Graph paging behaviour',
    ],
    requiredPermissions: [
      'DeviceManagementManagedDevices.Read.All for managed-device inventory',
      'Additional read scopes only when the selected report fields require them',
      'Approved access to any exported personal or device-identifying information',
    ],
    intendedOutput:
      'A read-only CSV or JSON export containing only approved fields, with collection time, query scope, paging status, null values, and any failed lookups recorded.',
    codePreview: `Connect-MgGraph -Scopes 'DeviceManagementManagedDevices.Read.All'
# Select only approved fields and handle paging and null values explicitly.`,
  },
]
