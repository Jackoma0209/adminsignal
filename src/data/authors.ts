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
  role: 'Microsoft Admin Practitioner and AdminSignal Author',
  bio: 'I write from practical experience managing Windows, Intune, and Active Directory environments, with a focus on source-backed guidance, operational risk, and clear admin workflows. AdminSignal exists because I wanted documentation that goes beyond "click Apply" without pretending every environment is the same.',
  initials: 'J',
  avatarUrl: '/images/authors/jack.jpg',
  linkedIn: 'https://www.linkedin.com/in/jackoma0209',
  github: 'https://github.com/Jackoma0209',
  certifications: [
    'Microsoft Certified: Modern Desktop Administrator Associate',
    'Microsoft Certified: Endpoint Administrator Associate',
  ],
}

export const authors: Author[] = [primaryAuthor]

export function getAuthor(id: string): Author | undefined {
  if (id === 'jack') return primaryAuthor
  return authors.find((a) => a.id === id)
}