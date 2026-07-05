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
      'AVD and Windows 365 management layer to evaluate when host pool scaling, image lifecycle, and Intune visibility have become regular operational work.',
    url: 'https://getnerdio.com',
    badge: 'Paid',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Veeam Backup for M365',
    category: 'Backup & Recovery',
    description:
      'Microsoft 365 backup option to assess for Exchange, SharePoint, OneDrive, and Teams recovery where native retention does not meet restore requirements.',
    url: 'https://www.veeam.com/backup-microsoft-office-365.html',
    badge: 'Paid',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Sysinternals Suite',
    category: 'Diagnostics',
    description:
      'Microsoft-maintained diagnostic toolkit for Windows admins: Process Monitor, Autoruns, TCPView, and other utilities for troubleshooting and defensive investigation.',
    url: 'https://learn.microsoft.com/sysinternals',
    badge: 'Free',
    isVerified: true,
  },
  {
    id: '4',
    name: 'PowerShell Pro Tools',
    category: 'Automation',
    description:
      'PowerShell development tooling to evaluate for GUI wrappers, script packaging, signing workflows, and debugging complex runbooks inside VS Code.',
    url: 'https://ironmansoftware.com/powershell-pro-tools',
    badge: 'Paid',
    isVerified: true,
  },
  {
    id: '5',
    name: 'Intune Graph Explorer',
    category: 'Endpoint Management',
    description:
      'Official Microsoft Graph Explorer for testing Intune and Entra API queries before turning them into approved reports or automation.',
    url: 'https://developer.microsoft.com/en-us/graph/graph-explorer',
    badge: 'Free',
    isVerified: true,
  },
  {
    id: '6',
    name: 'Windows Admin Center',
    category: 'Server Management',
    description:
      'Browser-based Microsoft management hub for Windows Server, clusters, and Azure Arc scenarios where a modern admin console is useful alongside PowerShell.',
    url: 'https://www.microsoft.com/en-us/windows-server/windows-admin-center',
    badge: 'Free',
    isVerified: true,
  },
]
