import { AuthShell } from '@/components/auth/auth-shell'
import { AdminLoginForm } from '@/components/forms/admin-login-form'

export const metadata = {
  title: 'Staff Sign In | Igbo-Etiti Portal',
  description: 'Authorized staff access for Igbo-Etiti Local Government.',
}

export default function AdminLoginPage() {
  return (
    <AuthShell
      variant="staff"
      eyebrow="Restricted"
      title="Staff sign in"
      description="This desk is for authorized officers only. Use the citizen login if you are applying for a service."
    >
      <AdminLoginForm />
    </AuthShell>
  )
}
