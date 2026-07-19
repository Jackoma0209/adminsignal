import Link from 'next/link'

interface EditorialReviewNoticeProps {
  reason?: string
}

export default function EditorialReviewNotice({ reason }: EditorialReviewNoticeProps) {
  return (
    <section
      className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/8 p-5 text-sm leading-relaxed text-muted"
      aria-labelledby="editorial-review-heading"
    >
      <h2 id="editorial-review-heading" className="mb-2 text-base font-semibold text-amber-300">
        Editorial review in progress
      </h2>
      <p>
        This page is temporarily excluded from search, recommendations, structured data, and
        advertising while its technical claims are checked against current primary documentation.
        Do not use it as deployment or incident-response guidance yet.
      </p>
      {reason && <p className="mt-2">{reason}</p>}
      <p className="mt-3">
        Use the vendor documentation linked from the relevant product portal, or return to the{' '}
        <Link href="/tutorials" className="font-medium text-primary hover:underline">
          verified guide index
        </Link>
        .
      </p>
    </section>
  )
}
