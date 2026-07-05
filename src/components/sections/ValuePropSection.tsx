import { BookOpen, Terminal, Wrench, Zap } from 'lucide-react'
import Container from '@/components/layout/Container'

const pillars = [
  {
    icon: Zap,
    title: 'Operational Context First',
    description:
      'Articles, guides, and alerts are written for working IT engineers who need context, caveats, and next actions instead of generic summaries.',
  },
  {
    icon: BookOpen,
    title: 'Deep Technical Depth',
    description:
      'Step-by-step guides that go beyond surface documentation. From Group Policy internals to Intune Graph API calls, we go where the manuals stop.',
  },
  {
    icon: Terminal,
    title: 'Script Patterns With Guardrails',
    description:
      'PowerShell examples and implementation notes written for admin workflows, with prerequisites, permissions, rollback risk, and usage notes called out.',
  },
  {
    icon: Wrench,
    title: 'Curated Tool Intelligence',
    description:
      'Tool notes based on practical admin needs, official documentation, commercial disclosures, and clear trade-offs for busy sysadmins.',
  },
]

export default function ValuePropSection() {
  return (
    <section className="border-y border-border bg-surface/20 py-20">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Why AdminSignal
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Built for engineers who&rsquo;ve been burned by bad docs
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
                <pillar.icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
