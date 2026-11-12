'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface StatItemProps {
  number: number
  label: string
  image?: string
}

function StatItem({ number, label, image }: StatItemProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (count < number) {
      interval = setInterval(() => {
        setCount((prev) => Math.min(prev + Math.ceil(number / 30), number))
      }, 50)
    }
    return () => clearInterval(interval)
  }, [count, number])

  return (
    <article className="group relative overflow-hidden border-b border-border last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:border-r-0">
      {image ? (
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-500 group-hover:scale-105 group-hover:opacity-35"
        />
      ) : null}
      <div className="relative z-10 flex min-h-[11rem] flex-col justify-end p-6 md:min-h-[13rem]">
        <p className="font-display text-4xl text-[var(--gold)] md:text-5xl">
          {count.toLocaleString()}
        </p>
        <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{label}</p>
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
    <aside className="flex flex-col bg-muted text-foreground">
      <div className="border-b border-border px-6 py-8 md:px-10">
        {/* <p className="eyebrow">Impact highlights</p> */}
        <h2 className="mt-3 text-3xl md:text-4xl">Serving with measurable work</h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          We are committed to serve and develop Igbo-Etiti through impactful infrastructure, education, and youth empowerment opportunities.
        </p>
      </div>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        {stats.map((stat) => (
          <StatItem
            key={stat.label}
            number={stat.number}
            label={stat.label}
            image={stat.img}
          />
        ))}
      </div>
      <div className="border-t border-border p-6">
        <Button
          onClick={() => router.push('/gallery')}
          className="rounded-sm bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold)]/90"
        >
          View gallery
        </Button>
      </div>
    </aside>
  )
}
