'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

const BACKEND_URL = 'https://igbo-etiti.onrender.com'

interface RegisterFormData {
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms acceptance
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors above')
      return
    }

    setIsLoading(true)

    try {
      // Call backend Express server directly with axios
      const response = await axios.post(`${BACKEND_URL}/api2/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      console.log('Registration successful:',response.data);
      localStorage.setItem('user',JSON.stringify(response.data.user));
      localStorage.setItem('token',response.data.token);
      console.log('Token set as:',response.data.token)

      toast.success('Registration successful! Redirecting to login...')
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="auth-field">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? 'border-destructive' : ''}
            disabled={isLoading}
            autoComplete="username"
          />
          {errors.username && <p className="text-xs font-medium text-destructive">{errors.username}</p>}
        </div>

        <div className="auth-field">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'border-destructive' : ''}
            disabled={isLoading}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="auth-field">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+234 800 000 0000"
          value={formData.phone}
          onChange={handleInputChange}
          className={errors.phone ? 'border-destructive' : ''}
          disabled={isLoading}
          autoComplete="tel"
        />
        {errors.phone && <p className="text-xs font-medium text-destructive">{errors.phone}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="auth-field">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleInputChange}
              className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
              disabled={isLoading}
              autoComplete="new-password"
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

        <div className="auth-field">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
              disabled={isLoading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-[var(--gold)]"
              tabIndex={-1}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs font-medium text-destructive">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 pt-1">
        <Checkbox
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onCheckedChange={(checked) =>
            handleInputChange({
              target: { name: 'agreeTerms', checked, type: 'checkbox' },
            } as any)
          }
          disabled={isLoading}
          className="mt-0.5"
        />
        <Label htmlFor="agreeTerms" className="cursor-pointer text-xs leading-relaxed font-normal">
          I agree to the{' '}
          <Link href="/terms" className="font-semibold text-[var(--gold)] hover:underline">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-semibold text-[var(--gold)] hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>
      {errors.agreeTerms && <p className="text-xs font-medium text-destructive">{errors.agreeTerms}</p>}

      <Button
        type="submit"
        disabled={isLoading}
        className="h-11 w-full rounded-sm bg-[var(--gold)] font-semibold text-[#111] hover:bg-[var(--gold)]/90"
      >
        {isLoading ? 'Creating account…' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already registered?{' '}
        <Link href="/auth/login" className="font-semibold text-[var(--gold)] hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
