import { Cloud, Monitor, Terminal, Cpu, KeyRound } from 'lucide-react'
import Container from '@/components/layout/Container'

const trustedBy = [
  { name: 'Microsoft 365', Icon: Cloud },
  { name: 'Microsoft Intune', Icon: Monitor },
  { name: 'PowerShell', Icon: Terminal },
  { name: 'Sysinternals', Icon: Cpu },
  { name: 'Microsoft Entra ID', Icon: KeyRound },
]

export default function TrustStripSection() {
  return (
    <section className="border-b border-border py-10">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted/50">
          Written for engineers working with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {trustedBy.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground-soft"
            >
              <Icon className="h-3.5 w-3.5 text-muted/60" strokeWidth={1.75} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
