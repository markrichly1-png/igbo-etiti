'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface StatItemProps {
  number: number
  label: string
  image?: string
  index: number
}

function StatItem({ number, label, image, index }: StatItemProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (count < number) {
      interval = setInterval(() => {
        setCount((prev) => Math.min(prev + Math.ceil(number / 30), number))
      }, 50)
    }

    return () => clearInterval(interval)
  }, [count, number])

  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#171515]/60 shadow-[0_20px_50px_rgba(15,14,12,0.12)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(15,14,12,0.18)]">
      {image ? (
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-700 group-hover:scale-105 group-hover:opacity-45"
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1713] via-[#1a1713]/55 to-[#1a1713]/10" />

      <div className="relative z-10 flex min-h-[240px] flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
         
          <span className="rounded-full border border-[var(--gold)]/35 bg-[var(--gold)]/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--gold)]">
            EVENT
          </span>
        </div>

        <div>
          <p className="font-display text-4xl leading-none text-[var(--gold)] sm:text-5xl">
            {count.toLocaleString()}
          </p>
          <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-white/80">{label}</p>
        </div>
      </div>
    </article>
  )
}

export function StatsSection() {
  const stats = [
    { number: 4500, label: 'Capacity modern secretariat building', img: 'projects/buildingProject.jpg' },
    { number: 3500, label: 'Youths trained and empowered', img: 'projects/aiTraining.jpg' },
    { number: 10000, label: 'Students supported in WAEC & JAMB', img: 'projects/jambEmpowerment.jpg' },
    { number: 2300, label: 'Kilometers of new asphalted roads', img: 'projects/roadConstruction.jpg' },
  ]

  const router = useRouter()

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border bg-[radial-gradient(circle_at_top_left,_rgba(200,152,69,0.16),transparent_28%),linear-gradient(135deg,_rgba(255,255,255,0.82),_rgba(246,242,234,0.9))] p-5 shadow-[0_30px_80px_rgba(22,18,12,0.08)] sm:p-8 lg:p-10">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-[var(--gold)]/18 via-transparent to-transparent" />

      <div className="relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center rounded-full border border-[var(--gold)]/35 bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ink)]">
              Gallery overview
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)] md:text-4xl">
              Serving with measurable work
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            We are committed to serve and develop Igbo-Etiti through impactful infrastructure, education, and youth empowerment opportunities.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              number={stat.number}
              label={stat.label}
              image={stat.img}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => router.push('/gallery')}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_16px_30px_rgba(21,18,12,0.15)] transition hover:bg-[var(--ink)]/90"
          >
            View gallery
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
