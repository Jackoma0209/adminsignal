import Container from '@/components/layout/Container'

const testimonials = [
  {
    quote: 'Finally, Intune content that actually works in enterprise.',
    author: 'Sarah T., Senior Endpoint Engineer',
  },
  {
    quote: 'These scripts saved me hours every week.',
    author: 'Marcus D., Windows Admin · Fortune 500',
  },
  {
    quote: 'The only sysadmin site I actually read.',
    author: 'Priya K., MSP Owner',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="border-b border-border bg-surface/10 py-20">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            From the community
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            What engineers are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map(({ quote, author }) => (
            <figure
              key={author}
              className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card"
            >
              {/* Quote mark */}
              <span className="font-serif text-4xl leading-none text-primary/30" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="-mt-3 flex-1 text-sm leading-relaxed text-foreground-soft">
                {quote}
              </blockquote>
              <figcaption className="text-xs text-muted/60">
                — {author}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
