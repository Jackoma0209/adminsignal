export interface Script {
  id: string
  title: string
  slug: string
  language: 'PowerShell' | 'Python' | 'Bash' | 'Registry'
  description: string
  tags: string[]
  codePreview?: string
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
    codePreview: `Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
$Devices = Get-MgDeviceManagementManagedDevice -All
$Devices | Select Id,DeviceName,ComplianceState | Export-Csv inventory.csv`,
    isNew: true,
  },
]
