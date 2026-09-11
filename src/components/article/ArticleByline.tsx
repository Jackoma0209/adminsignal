import Link from 'next/link'

export default function ArticleByline({ authorName }: { authorName?: string }) {
  return <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1" data-article-byline>
    {authorName && <Link href="/about" className="hover:text-primary hover:underline">{authorName}</Link>}
    {authorName && <span aria-hidden="true">·</span>}
    <Link href="/editorial-policy" className="hover:text-primary hover:underline">Reviewed against documentation</Link>
  </span>
}
