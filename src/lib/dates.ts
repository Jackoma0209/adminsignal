const MONTHS: Record<string, string> = {
  jan: '01',
  january: '01',
  feb: '02',
  february: '02',
  mar: '03',
  march: '03',
  apr: '04',
  april: '04',
  may: '05',
  jun: '06',
  june: '06',
  jul: '07',
  july: '07',
  aug: '08',
  august: '08',
  sep: '09',
  sept: '09',
  september: '09',
  oct: '10',
  october: '10',
  nov: '11',
  november: '11',
  dec: '12',
  december: '12',
}

export function toIsoDate(value?: string): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined

  if (/^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/.test(trimmed)) {
    return trimmed
  }

  const humanDate = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/)
  if (!humanDate) return undefined

  const [, monthName, day, year] = humanDate
  const month = MONTHS[monthName.toLowerCase()]
  if (!month) return undefined

  return `${year}-${month}-${day.padStart(2, '0')}`
}
