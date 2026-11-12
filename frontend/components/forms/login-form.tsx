'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

const BACKEND_URL = 'https://igbo-etiti.onrender.com'

interface LoginFormData {
  username: string
  password: string
}

interface LoginErrors {
  username?: string
  password?: string
  general?: string
}

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  })

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Call backend Express server directly with axios
      const response = await axios.post(`${BACKEND_URL}/api2/auth/login`, {
        username: formData.username,
        password: formData.password,
      });

   console.log(response.data)

      const { accessToken, user, refreshToken } = response.data

      // Store token and user in localStorage
      localStorage.setItem('accessToken', accessToken)
      console.log('Access token saved:',accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      console.log('User saved:',user)
      localStorage.setItem('refreshToken',refreshToken)
      console.log('Refresh token saved',refreshToken)

      toast.success('Login successful! Redirecting...')
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed'
      setErrors({ general: message })
      toast.error(message)
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && <div className="auth-error">{errors.general}</div>}

      <div className="auth-field">
        <Label htmlFor="username">Username or email</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username or email"
          value={formData.username}
          onChange={handleInputChange}
          className={errors.username ? 'border-destructive' : ''}
          disabled={isLoading}
          autoComplete="username"
        />
        {errors.username && <p className="text-xs font-medium text-destructive">{errors.username}</p>}
      </div>

      <div className="auth-field">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="password">Password</Label>
          <Link href="/auth/forgot-password" className="text-xs font-semibold text-[var(--gold)] hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
            disabled={isLoading}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-[var(--gold)]"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs font-medium text-destructive">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-11 w-full rounded-sm bg-[var(--gold)] font-semibold text-[#111] hover:bg-[var(--gold)]/90"
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to the portal?{' '}
        <Link href="/auth/register" className="font-semibold text-[var(--gold)] hover:underline">
          Create an account
        </Link>
      </p>
      <p className="text-center text-xs text-muted-foreground">
        Staff member?{' '}
        <Link href="/admin/login" className="font-semibold text-foreground hover:text-[var(--gold)]">
          Use staff login
        </Link>
      </p>
    </form>
  )
}
