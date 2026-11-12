import Link from 'next/link'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted text-foreground">
      <div className="h-1 w-full bg-[var(--gold)]" />
      <div className="landing-wrap py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">Igbo-Etiti</h3>
            <p className="text-sm text-muted-foreground">
              Serving our community with integrity, transparency, and commitment to development.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[var(--gold)]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition hover:text-[var(--gold)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-[var(--gold)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition hover:text-[var(--gold)]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-[var(--gold)]">
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[var(--gold)]">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-[var(--gold)]" />
                <span>+234 903 620 2766</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-[var(--gold)]" />
                <span>info@igboetiti.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[var(--gold)]" />
                <span>Igbo-Etiti Secretariat, Ogbede</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[var(--gold)]">Office Hours</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-[var(--gold)]" />
                <div>
                  <div>Monday - Friday</div>
                  <div>8:00 AM - 5:00 PM</div>
                </div>
              </li>
              <li className="font-semibold text-foreground">
                Closed on weekends and public holidays
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between text-sm font-semibold md:flex-row">
            <p className="text-muted-foreground">&copy; 2026 Igbo-Etiti - Enugu State. All rights reserved.</p>
            <div className="mt-4 flex gap-6 md:mt-0">
              <Link href="#" className="text-muted-foreground transition hover:text-[var(--gold)]">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground transition hover:text-[var(--gold)]">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground transition hover:text-[var(--gold)]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
