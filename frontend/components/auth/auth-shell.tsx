import Image from 'next/image'
import Link from 'next/link'
import { FileText, FileUser, ShieldCheck } from 'lucide-react'

const services = [
  { href: '/services/identification', title: 'Local Government ID', icon: FileUser },
  { href: '/services/birth-certificate', title: 'Birth Certificate', icon: FileText },
  { href: '/verify', title: 'Verify a document', icon: ShieldCheck },
]

interface AuthShellProps {
  eyebrow: string
  title: string
  description: string
  variant?: 'citizen' | 'staff'
  children: React.ReactNode
}

export function AuthShell({
  eyebrow,
  title,
  description,
  variant = 'citizen',
  children,
}: AuthShellProps) {
  const isStaff = variant === 'staff'

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Link href="/" className="inline-flex items-center gap-3 text-white">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image src="/coatOfArm.png" alt="Nigerian Coat of Arms" width={40} height={40} />
          </span>
          <span className="text-lg font-semibold tracking-wide">Igbo-Etiti</span>
        </Link>

        <div className="mt-auto hidden min-[960px]:block">
          <p className="eyebrow text-[var(--gold)]">Enugu State, Nigeria</p>
          <h2 className="mt-4 max-w-sm font-display text-4xl leading-[0.95] text-white lg:text-5xl">
            Official
            <span className="mt-2 block text-[var(--gold)]">
              {isStaff ? 'staff access' : 'citizen portal'}
            </span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
            {isStaff
              ? 'Restricted to authorized Igbo-Etiti Local Government officers. Citizen accounts cannot sign in here.'
              : 'Sign in to apply for records, follow applications, and use services from the Igbo-Etiti Local Government secretariat in Ogbede.'}
          </p>

          {!isStaff && (
            <ul className="mt-8 space-y-3">
              {services.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link href={item.href} className="auth-aside__link">
                      <Icon className="h-4 w-4 text-[var(--gold)]" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-3xl text-foreground md:text-4xl">{title}</h1>
          <p className="mt-3 mb-8 text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
          {children}
        </div>
      </main>
    </div>
  )
}
