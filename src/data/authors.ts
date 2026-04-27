export interface Author {
  id: string
  name: string
  role: string
  bio: string
  initials: string
  /** Path relative to /public, or undefined to show initials fallback */
  avatarUrl?: string
  linkedIn?: string
  twitter?: string
  github?: string
  /** Display label for certifications, e.g. "Microsoft Certified: Modern Desktop" */
  certifications?: string[]
}

/** Primary site author / founder */
export const primaryAuthor: Author = {
  id: 'jack',
  name: 'Jack',
  role: 'Senior Enterprise Sysadmin · 12+ Years Windows & Intune',
  bio: "I've spent 12+ years managing Windows fleets, Intune tenants, and Active Directory environments for enterprise clients across finance, logistics, and professional services. AdminSignal exists because I got tired of docs that stop at \"click Apply.\" Everything here is tested in production before it goes on the page.",
  initials: 'J',
  // Replace with /images/authors/jack.jpg once you have a real photo
  avatarUrl: undefined,
  linkedIn: 'https://www.linkedin.com/in/jackoma0209',
  github: 'https://github.com/Jackoma0209',
  certifications: [
    'Microsoft Certified: Modern Desktop Administrator Associate',
    'Microsoft Certified: Endpoint Administrator Associate',
  ],
}

const editorialAuthor: Omit<Author, 'id'> = {
  name: 'AdminSignal Editorial',
  role: 'Editorial Staff',
  bio: 'Written and reviewed by the AdminSignal editorial team. All content is independently verified for technical accuracy against official Microsoft documentation.',
  initials: 'AS',
}

export const authors: Author[] = [
  primaryAuthor,
  { id: 'marcus-webb', ...editorialAuthor },
  { id: 'sarah-chen', ...editorialAuthor },
  { id: 'james-holbrook', ...editorialAuthor },
  { id: 'priya-nair', ...editorialAuthor },
]

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id)
}
