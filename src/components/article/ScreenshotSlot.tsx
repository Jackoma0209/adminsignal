/**
 * Operator evidence figure.
 * Renders nothing until `src` is a real redacted capture.
 * Do not generate fake Intune, Entra, or Exchange admin centre images.
 */
export default function ScreenshotSlot({
  alt,
  caption,
  src,
}: {
  alt: string
  caption?: string
  src?: string
}) {
  if (!src) return null

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-border bg-surface">
      <img src={src} alt={alt} className="h-auto w-full" />
      <figcaption className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted">
        {caption ?? alt}
      </figcaption>
    </figure>
  )
}
