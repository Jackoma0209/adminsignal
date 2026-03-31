export interface Tool {
  id: string
  name: string
  category: string
  description: string
  url: string
  badge: 'Free' | 'Freemium' | 'Paid' | 'Open Source'
  isVerified?: boolean
}

export const tools: Tool[] = [
  {
    id: '1',
    name: 'Sysinternals Suite',
    category: 'Diagnostics',
    description:
      'The essential diagnostic toolkit for Windows: Process Monitor, Autoruns, TCPView, and 70+ utilities for deep system inspection.',
    url: 'https://learn.microsoft.com/sysinternals',
    badge: 'Free',
    isVerified: true,
  },
  {
    id: '2',
    name: 'PowerShell 7',
    category: 'Automation',
    description:
      'Cross-platform, open-source shell and scripting language. The standard for Windows automation, now with foreach-parallel and improved error handling.',
    url: 'https://github.com/PowerShell/PowerShell',
    badge: 'Open Source',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Microsoft Intune',
    category: 'Endpoint Management',
    description:
      'Cloud-native MDM and MAM platform for managing Windows, macOS, iOS, and Android. Integrates natively with Entra ID and Defender for Endpoint.',
    url: 'https://intune.microsoft.com',
    badge: 'Paid',
    isVerified: true,
  },
  {
    id: '4',
    name: 'BgInfo',
    category: 'Diagnostics',
    description:
      'Overlays live system information — IP address, hostname, OS version, domain — onto the desktop background. Essential for multi-server environments.',
    url: 'https://learn.microsoft.com/sysinternals/downloads/bginfo',
    badge: 'Free',
    isVerified: true,
  },
  {
    id: '5',
    name: 'Winget',
    category: 'Package Management',
    description:
      'Native Windows package manager for automated software deployment, updates, and removal. Scriptable via PowerShell and supported in Intune remediations.',
    url: 'https://github.com/microsoft/winget-cli',
    badge: 'Open Source',
    isVerified: true,
  },
  {
    id: '6',
    name: 'PolicyAnalyzer',
    category: 'Group Policy',
    description:
      'Microsoft Security Compliance Toolkit utility that compares GPOs, security baselines, and local policy snapshots side-by-side to identify drift and conflicts.',
    url: 'https://www.microsoft.com/download/details.aspx?id=55319',
    badge: 'Free',
    isVerified: true,
  },
]
