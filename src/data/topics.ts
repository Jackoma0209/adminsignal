export interface Topic {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  iconBg: string
  iconColor: string
}

export const topics: Topic[] = [
  {
    id: '1',
    name: 'Microsoft Intune',
    slug: 'intune',
    description: 'MDM, MAM, Autopilot, compliance policies, and app deployment.',
    icon: 'Monitor',
    iconBg: 'bg-primary-soft',
    iconColor: 'text-primary',
  },
  {
    id: '2',
    name: 'Windows Server',
    slug: 'windows-server',
    description: 'Active Directory, DNS, DHCP, file services, and server hardening.',
    icon: 'Server',
    iconBg: 'bg-muted/10',
    iconColor: 'text-muted',
  },
  {
    id: '3',
    name: 'PowerShell',
    slug: 'powershell',
    description: 'Automation, scripting, modules, DSC, and Graph API integration.',
    icon: 'Terminal',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    id: '4',
    name: 'Microsoft Entra ID',
    slug: 'microsoft-entra-id',
    description: 'Identity, Conditional Access, PIM, SSPR, and hybrid join.',
    icon: 'KeyRound',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    id: '5',
    name: 'Endpoint Security',
    slug: 'endpoint-security',
    description: 'AV, EDR, attack surface reduction, Defender for Endpoint.',
    icon: 'Shield',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    id: '6',
    name: 'Group Policy',
    slug: 'group-policy',
    description: 'GPO design, ADMX templates, WMI filters, and loopback processing.',
    icon: 'Settings',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    id: '7',
    name: 'Patch Management',
    slug: 'patch-management',
    description: 'WSUS, Windows Update for Business, patch rings, and compliance reporting.',
    icon: 'PackageCheck',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
  },
  {
    id: '8',
    name: 'Microsoft 365',
    slug: 'microsoft-365',
    description: 'Exchange Online, Teams, SharePoint, licensing, and tenant governance.',
    icon: 'Cloud',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
]
