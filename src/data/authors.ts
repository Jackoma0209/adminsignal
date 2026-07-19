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
  /** Only publish credentials that the author has explicitly verified. */
  certifications?: string[]
}

/** Primary site author / founder */
export const primaryAuthor: Author = {
  id: 'jack',
  name: 'Jack',
  role: 'Endpoint Specialist and AdminSignal Author',
  bio: 'I publish independent, source-backed guidance for Windows endpoint management, Microsoft Intune, Active Directory, PowerShell, and related Microsoft administration work. Articles focus on prerequisites, validation, operational risk, and safe rollout decisions, with examples and limitations labelled clearly.',
  initials: 'J',
  avatarUrl: '/images/authors/jack.jpg',
  linkedIn: 'https://www.linkedin.com/in/jackoma0209',
  github: 'https://github.com/Jackoma0209',
}

export const authors: Author[] = [primaryAuthor]

export function getAuthor(id: string): Author | undefined {
  if (id === 'jack') return primaryAuthor
  return authors.find((a) => a.id === id)
}
