import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'

export const metadata = {
  title: 'Reset Password | Igbo-Etiti Portal',
  description: 'Recover access to your Igbo-Etiti Local Government account.',
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset password"
      description="Password resets are handled by the secretariat so we can confirm you are the account holder."
    >
      <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          Call or email the ICT desk during office hours (Monday to Friday, 8:00 AM to 5:00 PM) with the username or email on the account.
        </p>
        <p>
          <span className="font-semibold text-foreground">Phone:</span> +234 903 620 2766
          <br />
          <span className="font-semibold text-foreground">Email:</span> info@igboetiti.com
        </p>
        <Link
          href="/auth/login"
          className="inline-flex h-11 items-center justify-center rounded-sm bg-[var(--gold)] px-5 font-semibold text-[#111] transition hover:brightness-110"
        >
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  )
}
