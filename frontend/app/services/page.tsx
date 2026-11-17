import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, MessageSquareText, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Igbo-Etiti Services',
  description: 'Apply for a local government ID, register a birth certificate, or send an anonymous message to the council.',
}

const services = [
  {
    title: 'Local Government ID Application',
    description:
      'Apply for your official local government identification with a simple online form and transparent processing.',
    href: '/services/identification',
    icon: ShieldCheck,
    accent: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
    details: ['Quick online application', 'Verification support', 'Secure document processing'],
  },
  {
    title: 'Birth Certificate Application',
    description:
      'Register a child’s birth and receive a certified certificate using a streamlined digital submission process.',
    href: '/services/birth-certificate',
    icon: FileText,
    accent: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    details: ['Fast application review', 'Clear requirements checklist', 'Official certificate issuance'],
  },
  {
    title: 'Anonymous Drop Message',
    description:
      'Share feedback, concerns, or reports confidentially with the local government administration.',
    href: '/anonymous-message',
    icon: MessageSquareText,
    accent: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    details: ['Private message channel', 'Safe feedback submission', 'Reviewed by administrators'],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_40%),linear-gradient(to_bottom,_rgba(15,23,42,0.02),_rgba(15,23,42,0.06))] bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-[32px] border border-border/70 bg-card/80 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur-sm">
          <div className="border-b border-border/60 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="inline-flex items-center rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-sm font-medium text-primary shadow-sm">
                  Public Services
                </p>
              </div>
              {/* <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground/60 sm:text-sm">
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Fast processing</span>
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Secure submissions</span>
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Resident-first support</span>
              </div> */}
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h1 className="max-w-2xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Access the services you need.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70 sm:text-lg">
                  From official identification to birth registration and confidential feedback, Igbo-Etiti makes it easier for residents to access government services with clarity, speed, and trust.
                </p>

                {/* <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/services/identification">
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      Apply now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" className="gap-2 border-border bg-background hover:bg-accent">
                      Learn more
                    </Button>
                  </Link>
                </div> */}
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {services.map((service) => {
                  const Icon = service.icon

                  return (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="group rounded-2xl border border-border bg-background p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${service.accent}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{service.title}</p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-foreground/65">{service.description}</p>

                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        Open service
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-10">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Popular services</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Choose the right service for you</h2>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <Card
                  key={service.title}
                  className="group flex h-full flex-col border-border/80 bg-card/90 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.55)]"
                >
                  <CardHeader className="pb-5">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${service.accent}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl leading-tight text-foreground">{service.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col">
                    <p className="mb-5 text-base leading-7 text-foreground/70">{service.description}</p>

                    <ul className="space-y-3">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm text-foreground/70">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-4">
                      <Link href={service.href} className="block">
                        <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                          Open service
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div> */}

        <div className="mt-12 rounded-[28px] border border-primary/10 bg-primary/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Want to know about</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">Igbo-Etiti Local Government?</h2>
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
              Learn about us
              <ArrowRight className="h-4 w-4" />
              
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
