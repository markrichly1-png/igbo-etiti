'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/staff', label: 'Our Staff' },
    { href: '/blog', label: 'News' },
  ]

  return (
    <nav className="sticky rounded-[40px] relative top-[8px] shadow-md z-50 overflow-hidden border-b border-border mx-4 md:mx-8 bg-[linear-gradient(180deg,var(--muted)_0%,var(--background)_100%)] text-foreground backdrop-blur-md">

      <div className='absolute z-[51] h-[4000%] w-[200%] animate-rotate -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 rotateInnerDiv '
      style={{background:'conic-gradient(from 90deg, transparent 80% , orange 100%)'}}
      />
      <div className='w-[99.5%] z-[80] relative h-[60%] rounded-[40px] mt-[2px] mb-[2px] mx-auto bg-background'>
      <div className="landing-wrap-nav">
        <div className="flex h-[4.25rem] items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-bold text-xl transition-opacity hover:opacity-80">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
              <img
                src="/coatOfArm.png"
                alt="Nigerian Coat of Arms"
                className="relative object-cover"
              />
            </div>
            <span className="tracking-wide">Igbo-Etiti</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button className="rounded-lg border-b-2 border-transparent bg-transparent text-foreground hover:border-[var(--gold)] hover:bg-transparent hover:text-[var(--gold)]">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/auth/login">
              <Button className="bg-transparent text-foreground hover:bg-muted">
                Login
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button className="rounded-lg border border-[var(--gold)] bg-[var(--gold)] text-[var(--ink)] hover:bg-transparent hover:text-[var(--gold)]">
                Staff
              </Button>
            </Link>
          </div>

          <button
            className="rounded-md p-2 hover:bg-muted md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-border pb-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-4 py-2 transition hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-1 px-4 py-2">
              <Link href="/auth/login">
                <Button className="w-full bg-muted text-foreground hover:bg-muted/80">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="w-full border border-border bg-transparent text-foreground hover:border-[var(--gold)] hover:text-[var(--gold)]">
                  Sign Up
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button className="w-full bg-[var(--gold)] text-white md:text-[var(--ink)] hover:bg-[var(--gold)]/90">
                  Staff Portal
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
  )
}
