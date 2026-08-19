import React, { useState } from 'react'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../utils/constants'

const steps = ['Target role', 'Experience', 'Strengths', 'Goals', 'Preferences', 'Ready']
const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0)
  const { completeOnboarding } = useAuth()
  const navigate = useNavigate()
  const finish = () => { completeOnboarding(); navigate(ROUTES.DASHBOARD) }
  return <PageWrapper title="Build your Skill Twin" subtitle="A few focused steps to personalize your workspace"><div className="mx-auto max-w-3xl space-y-8 animate-fade-in"><div className="text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue"><Sparkles size={24} /></div><h2 className="text-2xl font-bold text-text-primary">Let's make your next move clearer.</h2><p className="mt-2 text-sm text-text-secondary">This takes about two minutes. You can refine everything later.</p></div><div className="grid grid-cols-6 gap-2">{steps.map((label, index) => <div key={label}><div className={`h-1.5 rounded-full ${index <= step ? 'bg-accent-blue' : 'bg-bg-elevated'}`} /><p className="mt-2 hidden text-center text-[11px] text-text-muted sm:block">{label}</p></div>)}</div><div className="card p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Step {step + 1} of {steps.length}</p><h3 className="mt-3 text-xl font-semibold text-text-primary">{steps[step]}</h3><p className="mt-2 text-sm text-text-secondary">Tell us enough to create a useful first version of your career intelligence profile.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Software Engineer', 'Product Designer', 'Data Analyst', 'Marketing Lead'].map(option => <button key={option} onClick={() => setStep(current => Math.min(current + 1, steps.length - 1))} className="flex items-center justify-between rounded-lg border border-border bg-bg-elevated/40 p-4 text-left text-sm text-text-primary transition hover:border-accent-blue/50"><span>{option}</span><ArrowRight size={15} className="text-text-muted" /></button>)}</div><div className="mt-8 flex justify-between"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(current => current - 1)}>Back</Button>{step === steps.length - 1 ? <Button onClick={finish}><Check size={16} />Open dashboard</Button> : <Button onClick={() => setStep(current => current + 1)}>Continue <ArrowRight size={16} /></Button>}</div></div></div></PageWrapper>
}
export default Onboarding
