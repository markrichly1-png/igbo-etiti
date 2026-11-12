import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, FileText, FileUser, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'

const deskLinks = [
  {
    href: '/services/identification',
    index: '01',
    title: 'Local Government ID',
    description: 'Apply for official identification.',
    icon: FileUser,
  },
  {
    href: '/services/birth-certificate',
    index: '02',
    title: 'Birth Certificate',
    description: 'Register and collect vital records.',
    icon: FileText,
  },
  {
    href: '/verify',
    index: '03',
    title: 'Verify a document',
    description: 'Confirm certificates issued by this LGA.',
    icon: ShieldCheck,
  },
]

export function HeroSection() {
  return (
    <section className="landing-band bg-muted relative overflow-hidden">
      {/* <div aria-hidden className="hero-watermark" /> */}

      <div className="landing-wrap relative">
        <div className="landing-hero">
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Enugu State, Nigeria</p>

            <h1 className="mt-5 max-w-xl text-[2.75rem] leading-[0.92] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Igbo-Etiti
              <span className="mt-2 block text-[var(--gold)]">Local Government</span>
            </h1>

            <p className="mt-5 max-w-lg font-display text-xl italic leading-snug text-foreground/80 md:text-2xl">
              Progress Agenda. Tomorrow is here.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              The official e-governance portal for records, development updates, and direct contact with the administration in Ogbede.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-sm bg-[var(--gold)] px-5 py-3 text-sm font-semibold text-[#111] transition hover:brightness-110"
              >
                Access services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify a document
              </Link>
              <Link
                href="/anonymous-message"
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-muted-foreground transition hover:text-[var(--gold)]"
              >
                <MessageCircle className="h-4 w-4" />
                Confidential message
              </Link>
            </div>

            <dl className="hero-facts">
              <div>
                <dt>Headquarters</dt>
                <dd className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[var(--gold)]" />
                  Ogbede
                </dd>
              </div>
              <div>
                <dt>Wards</dt>
                <dd>20</dd>
              </div>
              <div>
                <dt>Land area</dt>
                <dd>325 km²</dd>
              </div>
              {/* <div>
                <dt>Office hours</dt>
                <dd>Mon to Fri, 8am to 5pm</dd>
              </div> */}
            </dl>
          </div>

          <div className="hero-stage">
            <figure className="hero-portrait">
              <Image
                src="/lgaChairman.png"
                alt="Hon. Martins Ugwu-Amadieze O., Executive Chairman of Igbo-Etiti Local Government"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="hero-portrait__shade" />
              <Image
                src="/coatOfArm.png"
                alt=""
                width={72}
                height={72}
                className="hero-portrait__seal"
              />
              <figcaption className="hero-portrait__caption">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  Executive Chairman
                </p>
                <p className="mt-1 font-display text-xl leading-tight md:text-2xl">
                  Hon. Martins Ugwu-Amadieze O.
                </p>
              </figcaption>
            </figure>

            <div className="hero-desk" role="navigation" aria-label="Priority services">
              {deskLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} className="hero-desk__link">
                    <span className="hero-desk__index">{item.index}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">{item.title}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{item.description}</span>
                    </span>
                    <Icon className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
