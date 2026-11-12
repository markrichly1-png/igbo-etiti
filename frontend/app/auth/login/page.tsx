import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/forms/login-form'

export const metadata = {
  title: 'Sign In | Igbo-Etiti Portal',
  description: 'Sign in to your Igbo-Etiti Local Government account',
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Citizen access"
      title="Sign in"
      description="Use your portal account to continue applications, download records, and message the administration."
    >
      <LoginForm />
    </AuthShell>
  )
}
