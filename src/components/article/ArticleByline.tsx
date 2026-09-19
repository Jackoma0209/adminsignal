import Link from 'next/link'

export default function ArticleByline({
  authorName,
  labTested,
}: {
  authorName?: string
  labTested?: string
}) {
  const verification = labTested
    ? 'Tested in a lab'
    : 'Reviewed against documentation'

  return <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1" data-article-byline>
    {authorName && <Link href="/about" className="hover:text-primary hover:underline">{authorName}</Link>}
    {authorName && <span aria-hidden="true">·</span>}
    <Link href="/editorial-policy" className="hover:text-primary hover:underline">{verification}</Link>
  </span>
}
