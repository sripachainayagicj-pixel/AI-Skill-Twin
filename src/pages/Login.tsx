import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Brain, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../utils/constants'
import toast from 'react-hot-toast'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD

  const validate = () => {
    const e: Record<string, string> = {}
    if (!email) e.email = 'Email is required'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err: any) {
      toast.error(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <span className="text-text-primary font-bold text-xl">AI Skill Twin</span>
          </Link>
          <h1 className="text-text-primary font-bold text-2xl mb-1">Welcome back</h1>
          <p className="text-text-secondary text-sm">Sign in to continue to your career dashboard</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="label" htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label" htmlFor="login-password">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="flex justify-end">
              <Link to={ROUTES.FORGOT_PASSWORD} className="text-accent-blue text-xs hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              id="login-submit-btn"
              type="submit"
              className="btn-primary w-full justify-center py-2.5"
              disabled={loading}
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-text-secondary text-sm mt-6">
          Don't have an account?{' '}
          <Link to={ROUTES.REGISTER} className="text-accent-blue hover:underline font-medium">Create one free</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
