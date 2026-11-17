import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  FileBadge as Certificate,
  Baby,
  Archive,
  Image,
  Newspaper,
  Users,
  FolderLock,
  Folder,
} from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: Certificate,
      title: 'Local Government ID',
      description: 'Apply for official local government identification with simplified online processing.',
      href: '/services/identification',
      index: '01',
    },
    {
      icon: Baby,
      title: 'Birth Certificate',
      description: 'Register and obtain certified birth certificates for vital records.',
      href: '/services/birth-certificate',
      index: '02',
    },
    {
      icon: Folder,
      title: 'Government Archive',
      description: 'Access historical records, reports, and official government documents.',
      href: '/archive',
      index: '03',
    },
    {
      icon: Image,
      title: 'Gallery',
      description: 'View community events, celebrations, and government activities.',
      href: '/gallery',
      index: '04',
    },
    {
      icon: Newspaper,
      title: 'News & Updates',
      description: 'Stay informed with latest announcements and development updates.',
      href: '/blog',
      index: '05',
    },
    {
      icon: Users,
      title: 'Staff Directory',
      description: 'Connect with government officials and department heads.',
      href: '/staff',
      index: '06',
    },
  ]

  return (
    <section className="landing-band paper-panel py-16 md:py-20">
      <div className="landing-wrap">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow">Citizen services</p>
            <h2 className="text-3xl text-foreground md:text-5xl">Public services built for everyday access</h2>
            <div className="gold-rule" />
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-[color-mix(in_oklch,var(--gold)_30%,var(--border))] bg-white/60 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
            6 essential tools
          </div>
        </div>

        <div className="landing-services  gap-4 rounded-[1.5rem] border-0 bg-transparent">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className="glass-card group relative flex min-h-[14rem] flex-col justify-between overflow-hidden rounded-[1.35rem] p-5 text-left sm:p-6"
              >
                <div className="pointer-events-none group-hover:animate-pulse rotate-15 absolute -top-4 -right-4 text-[var(--gold)]/10">
                  <Icon className="h-28 w-28 opacity-70" />
                </div>

                <div className="flex items-start justify-between gap-3">
                  {/* <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color-mix(in_oklch,var(--gold)_32%,var(--border))] bg-[color-mix(in_oklch,var(--gold)_14%,white)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <Icon className="h-5 w-5 text-[var(--gold)] transition duration-300 group-hover:scale-110" />
                  </div> */}
                  <span className="font-display text-xs tracking-[0.22em] text-muted-foreground group-hover:text-[var(--gold)]">
                    {service.index}
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  <h3 className="glass-card__title text-[var(--ink)]">{service.title}</h3>
                  <p className="glass-card__body max-w-[28ch]">{service.description}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[color-mix(in_oklch,var(--gold)_18%,var(--border))] pt-3">
                  <span className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Open service
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_oklch,var(--gold)_28%,white)] bg-white/75 text-[var(--gold)] shadow-sm transition duration-300 group-hover:translate-x-1 group-hover:shadow-md">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
