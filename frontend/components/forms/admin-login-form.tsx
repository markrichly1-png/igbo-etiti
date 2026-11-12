'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  adminApi,
  ADMIN_REFRESH_KEY,
  ADMIN_TOKEN_KEY,
  ADMIN_USER_KEY,
} from '@/lib/api/adminApi'

export function AdminLoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>(
    {}
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: typeof errors = {}
    if (!formData.email.trim()) nextErrors.email = 'Email is required'
    if (!formData.password) nextErrors.password = 'Password is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsLoading(true)
    try {
      const result = await adminApi.login(formData.email.trim(), formData.password)
      localStorage.setItem(ADMIN_TOKEN_KEY, result.accessToken)
      localStorage.setItem(ADMIN_REFRESH_KEY, result.refreshToken)
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(result.admin))
      toast.success('Admin login successful')
      router.replace('/admin')
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Login failed'
      setErrors({ general: message })
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && <div className="auth-error">{errors.general}</div>}

      <div className="auth-field">
        <Label htmlFor="admin-email">Official email</Label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="username"
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          placeholder="name@igboetiti.gov.ng"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
      </div>

      <div className="auth-field">
        <Label htmlFor="admin-password">Password</Label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && <p className="text-xs font-medium text-destructive">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        className="h-11 w-full rounded-sm bg-[var(--gold)] font-semibold text-[#111] hover:bg-[var(--gold)]/90"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Need access?{' '}
        <a href="https://wa.me/2349036202766" className="font-semibold text-[var(--gold)] hover:underline">
          Contact IT
        </a>
      </p>
      <p className="text-center text-xs text-muted-foreground">
        Citizen?{' '}
        <Link href="/auth/login" className="font-semibold text-foreground hover:text-[var(--gold)]">
          Use the public login
        </Link>
      </p>
    </form>
  )
}
