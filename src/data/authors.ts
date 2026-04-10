export interface Author {
  id: string
  name: string
  role: string
  bio: string
  initials: string
  linkedIn?: string
  twitter?: string
}

/** Primary site author / founder */
export const primaryAuthor: Author = {
  id: 'jack',
  name: 'Jack',
  role: 'Senior Enterprise Sysadmin · 12+ Years Windows & Intune',
  bio: "I've spent 12+ years managing Windows fleets, Intune tenants, and Active Directory environments for enterprise clients across finance, logistics, and professional services. AdminSignal exists because I got tired of docs that stop at \"click Apply.\" Everything here is tested in production before it goes on the page.",
  initials: 'J',
  linkedIn: 'https://www.linkedin.com/in/jackoma0209',
}

export const authors: Author[] = [
  primaryAuthor,
  {
    id: 'marcus-webb',
    name: 'Marcus Webb',
    role: 'Senior Security Engineer',
    bio: 'Marcus has spent 14 years hardening Windows environments for financial services and critical infrastructure. Specialises in endpoint detection, CIS benchmarks, and Intune security baselines.',
    initials: 'MW',
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Endpoint Management Specialist',
    bio: 'Sarah manages Intune and SCCM deployments for enterprise clients across retail and logistics. She focuses on Autopilot, compliance policy design, and the Microsoft co-management transition.',
    initials: 'SC',
  },
  {
    id: 'james-holbrook',
    name: 'James Holbrook',
    role: 'Windows Infrastructure Lead',
    bio: 'James architects Active Directory and Group Policy environments for mid-market and enterprise organisations. He has led migrations from Windows Server 2008 to hybrid AD for over 40 clients.',
    initials: 'JH',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Microsoft 365 & Entra ID Specialist',
    bio: 'Priya designs identity and access management solutions across Microsoft 365 tenants. Her focus areas are Conditional Access architecture, Privileged Identity Management, and hybrid identity.',
    initials: 'PN',
  },
]

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id)
}
