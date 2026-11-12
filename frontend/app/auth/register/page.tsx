import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/forms/register-form'

export const metadata = {
  title: 'Create Account | Igbo-Etiti Portal',
  description: 'Sign up for an Igbo-Etiti Local Government account',
}

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="New account"
      title="Create an account"
      description="Register once to apply for identification, birth certificates, and other citizen services."
    >
      <RegisterForm />
    </AuthShell>
  )
}
