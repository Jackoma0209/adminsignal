export interface Tool {
  id: string
  name: string
  category: string
  description: string
  url: string
  affiliateUrl?: string
  badge: 'Free' | 'Freemium' | 'Paid' | 'Open Source'
  isVerified?: boolean
}

export const tools: Tool[] = [
  {
    id: '1',
    name: 'Nerdio for Intune',
    category: 'Endpoint Management',
    description:
      'Supercharge your Intune deployments with automation, cost optimisation, and enterprise-grade Azure Virtual Desktop management from a single pane of glass.',
    url: 'https://getnerdio.com',
    badge: 'Paid',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Veeam Backup for M365',
    category: 'Backup & Recovery',
    description:
      'Protect Exchange Online, SharePoint, OneDrive, and Teams data with immutable, air-gapped backups. Indispensable for compliance and ransomware recovery.',
    url: 'https://www.veeam.com/backup-microsoft-office-365.html',
    badge: 'Paid',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Sysinternals Suite',
    category: 'Diagnostics',
    description:
      'The essential diagnostic toolkit for Windows: Process Monitor, Autoruns, TCPView, and 70+ utilities for deep system inspection and incident response.',
    url: 'https://learn.microsoft.com/sysinternals',
    badge: 'Free',
    isVerified: true,
  },
  {
    id: '4',
    name: 'PowerShell Pro Tools',
    category: 'Automation',
    description:
      'Build production-grade Windows Forms GUIs, package scripts as signed executables, and debug complex runbooks directly inside VS Code.',
    url: 'https://ironmansoftware.com/powershell-pro-tools',
    badge: 'Paid',
    isVerified: true,
  },
  {
    id: '5',
    name: 'Intune Graph Explorer',
    category: 'Endpoint Management',
    description:
      'Query and manipulate Intune data via Microsoft Graph API with an interactive UI. Essential for custom reporting, bulk operations, and policy auditing.',
    url: 'https://developer.microsoft.com/en-us/graph/graph-explorer',
    badge: 'Free',
    isVerified: true,
  },
  {
    id: '6',
    name: 'Windows Admin Center',
    category: 'Server Management',
    description:
      'Browser-based management hub for Windows Server, clusters, and Azure Arc. Replaces MMC snap-ins with a modern, unified interface requiring no cloud dependency.',
    url: 'https://www.microsoft.com/en-us/windows-server/windows-admin-center',
    badge: 'Free',
    isVerified: true,
  },
]
