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
  name: 'Jack Hadcroft',
  role: 'Endpoint specialist and author of AdminSignal',
  bio: 'Jack Hadcroft is an endpoint specialist working with Microsoft Intune, Windows clients, Microsoft Entra ID, Group Policy, and PowerShell in Microsoft 365 estates. He publishes independent, source-backed guidance that focuses on prerequisites, validation evidence, operational risk, and safe rollout decisions, with examples and limitations labelled clearly.',
  initials: 'JH',
  avatarUrl: '/images/authors/jack.jpg',
  linkedIn: 'https://www.linkedin.com/in/jack-hadcroft-5710a068',
  github: 'https://github.com/Jackoma0209',
}

export const authors: Author[] = [primaryAuthor]

export function getAuthor(id: string): Author | undefined {
  if (id === 'jack') return primaryAuthor
  return authors.find((a) => a.id === id)
}
