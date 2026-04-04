import Container from '@/components/layout/Container'

const signals = [
  'Real-world tested content',
  'No filler, no SEO padding',
  'Production-ready scripts',
  'Practitioner-reviewed guidance',
]

export default function TrustStripSection() {
  return (
    <section className="border-b border-border py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {signals.map((signal, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted">
              <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
              {signal}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
