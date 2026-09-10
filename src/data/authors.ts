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
  role: 'Band 6 Endpoint Specialist and author of AdminSignal',
  bio: 'Jack Hadcroft has worked in NHS IT since 2013 and is a Band 6 Endpoint Specialist. His hands-on experience includes MECM/SCCM, Intune co-management, PowerShell, Windows deployment and large Windows estates in an NHS enterprise environment. AdminSignal is his independent publication; it does not represent employer endorsement.',
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
