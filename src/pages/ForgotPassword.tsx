import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, ArrowLeft, CheckCircle } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import toast from 'react-hot-toast'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { toast.error('Email is required'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
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
          <h1 className="text-text-primary font-bold text-2xl mb-1">Reset your password</h1>
          <p className="text-text-secondary text-sm">We'll send a reset link to your email</p>
        </div>

        <div className="card">
          {sent ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle size={28} className="text-success" />
              </div>
              <div>
                <p className="text-text-primary font-semibold mb-1">Check your email</p>
                <p className="text-text-secondary text-sm">We sent a reset link to <strong className="text-text-primary">{email}</strong></p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="label" htmlFor="forgot-email">Email address</label>
                <input id="forgot-email" type="email" className="input-field" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button id="forgot-submit-btn" type="submit" className="btn-primary w-full justify-center py-2.5" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-6">
          <Link to={ROUTES.LOGIN} className="text-accent-blue hover:underline text-sm flex items-center justify-center gap-1">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
