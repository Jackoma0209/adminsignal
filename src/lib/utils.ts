import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Returns true if the ISO 8601 date string is within `days` of today at build time. */
export function isRecentItem(publishedAt: string, days = 30): boolean {
  const pub = new Date(publishedAt)
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return pub >= cutoff
}
