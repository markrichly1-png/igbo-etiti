import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative bg-background text-foreground overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_oklch,var(--gold)_18%,white)] to-[color-mix(in_oklch,var(--faded-green)_12%,white)] opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
            Official Igbo-Etiti Local Government Portal
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            Access essential government services, stay informed, and engage with your local administration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/services/identification">
              <Button size="lg" className="w-full sm:w-auto bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold)]/90">
                Apply for Services
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        {/**Images container */}
        <div className='flex items-center justify-center'>
          {/**image1 */}
        <div className="flex-1 relative h-64 md:h-80 w-full">
          <Image
            src="/images/hero.jpg"
            alt="Government Building"
            fill
            className="object-cover rounded-lg shadow-2xl"
            priority
          />
        </div>
          <div className="flex-1 relative h-64 md:h-80 w-full">
          <Image
            src="/images/hero.jpg"
            alt="Government Building"
            fill
            className="object-cover rounded-lg shadow-2xl"
            priority
          />
        </div>
        </div>
      </div>
    </section>
  )
}
