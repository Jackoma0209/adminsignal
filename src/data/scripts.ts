export interface Script {
  id: string
  title: string
  slug: string
  language: 'PowerShell' | 'Python' | 'Bash' | 'Registry'
  description: string
  tags: string[]
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
  },
  {
    id: '5',
    title: 'Export-IntuneDeviceReport',
    slug: 'export-intune-device-report',
    language: 'PowerShell',
    description:
      'Uses the Microsoft Graph API to export a full Intune device inventory including compliance state, OS version, last check-in, and primary user to CSV or JSON.',
    tags: ['Intune', 'Graph API', 'Reporting', 'Inventory'],
    isNew: true,
  },
]
