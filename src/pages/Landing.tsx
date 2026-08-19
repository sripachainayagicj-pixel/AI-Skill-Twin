import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Zap, Target, TrendingUp, Mic, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react'
import { ROUTES } from '../utils/constants'

const features = [
  { icon: Brain, title: 'AI Skill Twin', desc: 'Your complete digital career profile — skills, projects, certs, and goals in one place.' },
  { icon: Zap, title: 'Resume Analyzer', desc: 'Get ATS score, strengths, weaknesses, and actionable improvement suggestions.' },
  { icon: Target, title: 'Skill Gap Analysis', desc: 'See exactly what skills you need for your target role and how to get them.' },
  { icon: TrendingUp, title: 'Career Roadmap', desc: 'AI-generated week-by-week plan to reach your dream job.' },
  { icon: Mic, title: 'Mock Interviews', desc: 'Practice with AI-powered technical, behavioral, and HR questions.' },
  { icon: MessageSquare, title: 'AI Career Assistant', desc: 'Ask anything — resume tips, salary advice, interview prep, and more.' },
]

const Landing: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Nav */}
      <nav className="border-b border-border bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <span className="text-text-primary font-bold text-base">AI Skill Twin</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(ROUTES.LOGIN)} className="btn-ghost text-sm">Login</button>
            <button onClick={() => navigate(ROUTES.REGISTER)} className="btn-primary text-sm">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 py-28 text-center relative">
          <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-pulse" />
            AI-Powered Career Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Everything your career needs,<br />
            <span className="text-accent-blue">in one twin.</span>
          </h1>
          <p className="text-text-secondary text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Build your AI Skill Twin — a living career intelligence profile that analyzes your skills, generates roadmaps, matches jobs, and preps you for interviews.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-get-started-btn"
              onClick={() => navigate(ROUTES.REGISTER)}
              className="btn-primary text-base px-8 py-3 w-full sm:w-auto"
            >
              Get Started Free <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="btn-secondary text-base px-8 py-3 w-full sm:w-auto"
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-text-muted text-sm">
            {['No credit card required', 'Free to start', 'Cancel anytime'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle size={14} className="text-success" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-text-primary mb-3">Everything you need to land your dream job</h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">Six powerful modules working together as your personal career intelligence platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card hover:border-accent-blue/30 hover:shadow-elevated transition-all duration-200 cursor-default group">
              <div className="w-11 h-11 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-4 group-hover:bg-accent-blue/20 transition-colors">
                <Icon size={20} className="text-accent-blue" />
              </div>
              <h3 className="text-text-primary font-semibold text-base mb-2">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-bg-surface">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to build your Skill Twin?</h2>
          <p className="text-text-secondary text-lg mb-8">Join thousands of developers accelerating their career growth with AI.</p>
          <button
            id="cta-get-started-btn"
            onClick={() => navigate(ROUTES.REGISTER)}
            className="btn-primary text-base px-10 py-3"
          >
            Get Started Free <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer className="border-t border-border py-6 text-center text-text-muted text-sm">
        © 2024 AI Skill Twin. All rights reserved.
      </footer>
    </div>
  )
}

export default Landing
