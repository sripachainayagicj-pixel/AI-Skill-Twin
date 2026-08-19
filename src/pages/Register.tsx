import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../utils/constants'
import toast from 'react-hot-toast'

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { register } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Full name is required'
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email address'
    if (!password) e.password = 'Password is required'
    else if (password.length < 8) e.password = 'Password must be at least 8 characters'
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register(name, email, password)
      navigate(ROUTES.ONBOARDING)
    } catch (err: any) {
      toast.error(err.message || 'Registration failed')
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
          <h1 className="text-text-primary font-bold text-2xl mb-1">Create your account</h1>
          <p className="text-text-secondary text-sm">Start building your AI career twin today</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="label" htmlFor="register-name">Full name</label>
              <input id="register-name" type="text" className="input-field" placeholder="John Doe"
                value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
              {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="label" htmlFor="register-email">Email address</label>
              <input id="register-email" type="email" className="input-field" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label" htmlFor="register-password">Password</label>
              <div className="relative">
                <input id="register-password" type={showPass ? 'text' : 'password'}
                  className="input-field pr-10" placeholder="Min. 8 characters"
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="label" htmlFor="register-confirm">Confirm password</label>
              <input id="register-confirm" type={showPass ? 'text' : 'password'}
                className="input-field" placeholder="Repeat password"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <button id="register-submit-btn" type="submit"
              className="btn-primary w-full justify-center py-2.5 mt-2" disabled={loading}>
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Creating account...</>
              ) : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-text-secondary text-sm mt-6">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-accent-blue hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
