import Container from '@/components/layout/Container'

const stats = [
  { value: '28,000+', label: 'IT professionals' },
  { value: '4,200+', label: 'organizations' },
  { value: '2,400+', label: 'technical articles' },
  { value: '180+', label: 'production scripts' },
]

export default function TrustStripSection() {
  return (
    <section className="border-b border-border py-12">
      <Container>
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
          <p className="max-w-sm text-center text-sm font-medium text-muted sm:text-left">
            Trusted by IT professionals at{' '}
            <span className="text-foreground-soft">
              Fortune 500 companies, MSPs, and government agencies
            </span>{' '}
            worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-0.5 text-xs text-muted/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
