export interface Topic {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  iconBg: string
  iconColor: string
  /** When false, the hub URL stays live but the card is omitted from Topics and home grids. */
  listedOnTopicsPage?: boolean
}

export const topics: Topic[] = [
  {
    id: '1',
    name: 'Microsoft Intune',
    slug: 'intune',
    description: 'Enrolment, compliance, Win32 apps, Autopilot imports, and Settings Catalog migrations.',
    icon: 'Monitor',
    iconBg: 'bg-primary-soft',
    iconColor: 'text-primary',
  },
  {
    id: '4',
    name: 'Microsoft Entra ID',
    slug: 'microsoft-entra-id',
    description: 'Conditional Access baselines, emergency access accounts, and dynamic group troubleshooting.',
    icon: 'KeyRound',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    id: '5',
    name: 'Endpoint Security',
    slug: 'endpoint-security',
    description: 'Defender for Endpoint rollout, BitLocker escrow, LAPS, and Windows hardening.',
    icon: 'Shield',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    id: '7',
    name: 'Patch Management',
    slug: 'patch-management',
    description: 'Windows Update for Business rings, Patch Tuesday admin notes, and Intune update troubleshooting.',
    icon: 'PackageCheck',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
  },
  {
    id: '8',
    name: 'Microsoft 365',
    slug: 'microsoft-365',
    description: 'SMTP AUTH migration, admin MFA readiness, and Conditional Access policy maps.',
    icon: 'Cloud',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
  {
    id: '3',
    name: 'PowerShell',
    slug: 'powershell',
    description: 'Graph PowerShell migration and software inventory worked examples inside guides.',
    icon: 'Terminal',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    id: '9',
    name: 'Configuration Manager',
    slug: 'sccm-mecm',
    description: 'ConfigMgr and Intune decisions, co-management ownership, application diagnosis, and OSD planning.',
    icon: 'Server',
    iconBg: 'bg-primary-soft',
    iconColor: 'text-primary',
  },
  {
    id: '6',
    name: 'Group Policy',
    slug: 'group-policy',
    description: 'Prove why a setting is not applying, then decide whether Active Directory or Intune owns it. Not a domain-design library.',
    icon: 'Settings',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    listedOnTopicsPage: false,
  },
  {
    id: '2',
    name: 'Windows Server',
    slug: 'windows-server',
    description: 'Group Policy processing and Secure Boot CA 2023 readiness. Not DNS, DHCP, or file-services tutorials.',
    icon: 'Server',
    iconBg: 'bg-muted/10',
    iconColor: 'text-muted',
    listedOnTopicsPage: false,
  },
]

export const listedTopics = topics.filter((topic) => topic.listedOnTopicsPage !== false)
