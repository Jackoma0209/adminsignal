export interface Script {
  id: string
  title: string
  slug: string
  language: 'PowerShell' | 'Python' | 'Bash' | 'Registry'
  description: string
  tags: string[]
  codePreview?: string
  status: 'implementation-guide' | 'full-script-available'
  lastTested: string
  version: string
  supportedEnvironments: string[]
  requiredPermissions: string[]
  expectedOutput: string
  sourceUrl?: string
  downloadUrl?: string
  isNew?: boolean
  isFeatured?: boolean
}

export const scripts: Script[] = [
  {
    id: '1',
    title: 'Get-StaleDevices',
    slug: 'get-stale-devices',
    language: 'PowerShell',
    description:
      'Identifies devices inactive for a configurable threshold across Intune, Entra ID, and on-premises Active Directory. Outputs CSV and HTML reports with remediation actions.',
    tags: ['Intune', 'Entra ID', 'Active Directory', 'Reporting'],
    status: 'implementation-guide',
    lastTested: 'Apr 27, 2026',
    version: 'Guide v0.2',
    supportedEnvironments: [
      'Windows 10/11 admin workstation',
      'Microsoft Graph PowerShell SDK 2.x',
      'Microsoft Intune and Microsoft Entra ID tenants',
      'Optional on-premises Active Directory with RSAT tools',
    ],
    requiredPermissions: [
      'Device.Read.All',
      'DeviceManagementManagedDevices.Read.All',
      'Read access to Active Directory when using the AD source',
    ],
    expectedOutput:
      'CSV and HTML reports listing stale Intune, Entra ID, and Active Directory device records with review-first remediation recommendations.',
    codePreview: `$DaysThreshold = 90
$Devices = Get-MgDeviceManagementManagedDevice
$Stale = $Devices | Where-Object { $_.LastSyncDateTime -lt (Get-Date).AddDays(-$DaysThreshold) }`,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Invoke-WindowsHardening',
    slug: 'invoke-windows-hardening',
    language: 'PowerShell',
    description:
      'Applies a configurable subset of CIS Level 1 and Level 2 controls to Windows 10/11 endpoints. Runs locally or via Intune remediation script. Generates a pre/post compliance delta report.',
    tags: ['CIS', 'Hardening', 'Security', 'Compliance'],
    status: 'implementation-guide',
    lastTested: 'Apr 27, 2026',
    version: 'Guide v0.2',
    supportedEnvironments: [
      'Windows 10 22H2 and Windows 11 22H2 or later',
      'PowerShell 5.1 or PowerShell 7.4',
      'Local Administrator or Intune SYSTEM execution context',
      'CIS Windows 11 Benchmark aligned pilot devices',
    ],
    requiredPermissions: [
      'Local Administrator or SYSTEM on target devices',
      'Permission to deploy Intune remediation scripts when used through Intune',
      'Change approval for registry, security policy, Defender, firewall, and BitLocker settings',
    ],
    expectedOutput:
      'Pre/post HTML compliance report showing audited, applied, skipped, and failed controls with enough detail for rollback review.',
    codePreview: `$Controls = Import-Csv -Path .\\cis-controls.csv
foreach ($ctrl in $Controls) {
    Set-ItemProperty -Path $ctrl.RegPath -Name $ctrl.Name -Value $ctrl.Value
}`,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Get-PatchComplianceReport',
    slug: 'get-patch-compliance-report',
    language: 'PowerShell',
    description:
      'Queries WSUS or Windows Update for Business status via WMI and Graph API. Produces a per-device patch lag report with severity breakdown and exportable HTML dashboard.',
    tags: ['Patch Management', 'WSUS', 'WUfB', 'Reporting'],
    status: 'implementation-guide',
    lastTested: 'Apr 27, 2026',
    version: 'Guide v0.2',
    supportedEnvironments: [
      'Windows Server 2022 WSUS',
      'Windows 10/11 clients',
      'Windows Update for Business reporting through Microsoft Graph',
      'Microsoft Graph PowerShell SDK 2.x',
    ],
    requiredPermissions: [
      'WSUS Reporters role or higher for WSUS mode',
      'DeviceManagementManagedDevices.Read.All',
      'WindowsUpdates.ReadWrite.All',
    ],
    expectedOutput:
      'CSV and HTML patch compliance dashboard with device lag, missing update counts, severity breakdowns, and validation checks.',
    codePreview: `$Session = New-Object -ComObject Microsoft.Update.Session
$Searcher = $Session.CreateUpdateSearcher()
$Missing = $Searcher.Search("IsInstalled=0 and IsHidden=0")`,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'New-AdminLabVM',
    slug: 'new-admin-lab-vm',
    language: 'PowerShell',
    description:
      'Provisions a clean Windows 11 test VM on Hyper-V using an unattend.xml answer file. Configures networking, WinRM, and optional domain join for a repeatable lab baseline.',
    tags: ['Hyper-V', 'Lab', 'Automation', 'Windows 11'],
    status: 'implementation-guide',
    lastTested: 'Apr 27, 2026',
    version: 'Guide v0.2',
    supportedEnvironments: [
      'Windows 11 24H2 Hyper-V host',
      'Windows 11 Enterprise or Pro ISO',
      'PowerShell 5.1 or PowerShell 7.4',
      'Isolated lab or pilot network',
    ],
    requiredPermissions: [
      'Local Administrator on the Hyper-V host',
      'Permission to create VMs, VHDX files, and virtual network attachments',
      'Domain join rights only when -DomainJoin is used',
    ],
    expectedOutput:
      'Generation 2 Hyper-V lab VM with attached Windows ISO, dynamically expanding VHDX, optional domain join, and WinRM validation steps.',
    codePreview: `New-VM -Name "AdminLab-01" -MemoryStartupBytes 4GB -Generation 2
Add-VMDvdDrive -VMName "AdminLab-01" -Path .\\Win11.iso`,
  },
  {
    id: '5',
    title: 'Export-IntuneDeviceReport',
    slug: 'export-intune-device-report',
    language: 'PowerShell',
    description:
      'Uses the Microsoft Graph API to export a full Intune device inventory including compliance state, OS version, last check-in, and primary user to CSV or JSON.',
    tags: ['Intune', 'Graph API', 'Reporting', 'Inventory'],
    status: 'implementation-guide',
    lastTested: 'Apr 27, 2026',
    version: 'Guide v0.2',
    supportedEnvironments: [
      'Windows 11 24H2 admin workstation',
      'Microsoft Graph PowerShell SDK 2.x',
      'Microsoft Intune tenant',
      'CSV or JSON reporting workflow',
    ],
    requiredPermissions: [
      'DeviceManagementManagedDevices.Read.All',
      'DeviceManagementConfiguration.Read.All when using -IncludeCompliance',
      'Directory.Read.All for primary user resolution',
    ],
    expectedOutput:
      'CSV and/or JSON Intune inventory export with device name, OS, compliance state, last check-in, primary user, and optional compliance policy results.',
    codePreview: `Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
$Devices = Get-MgDeviceManagementManagedDevice -All
$Devices | Select Id,DeviceName,ComplianceState | Export-Csv inventory.csv`,
    isNew: true,
  },
]
