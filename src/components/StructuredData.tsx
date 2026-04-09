import { safeJsonLd } from '@/lib/schema'

export default function StructuredData({
  data,
}: {
  data: Record<string, unknown>
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  )
}
