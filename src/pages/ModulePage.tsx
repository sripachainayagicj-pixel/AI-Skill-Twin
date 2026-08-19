import React, { useState } from 'react'
import { ArrowRight, Check, Plus, Search, Sparkles } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

type ModulePageProps = {
  title: string
  subtitle: string
  eyebrow: string
  description: string
  metrics: { label: string; value: string; detail: string }[]
  items: { title: string; detail: string; tag: string }[]
  action?: string
}

const ModulePage: React.FC<ModulePageProps> = ({ title, subtitle, eyebrow, description, metrics, items, action = 'Add new' }) => {
  const [query, setQuery] = useState('')
  const [activeItems, setActiveItems] = useState(items)
  const filteredItems = activeItems.filter(item => `${item.title} ${item.detail} ${item.tag}`.toLowerCase().includes(query.toLowerCase()))

  const addItem = () => {
    setActiveItems(current => [...current, { title: 'New focus area', detail: 'Ready to be shaped around your next career move.', tag: 'Draft' }])
  }

  return (
    <PageWrapper title={title} subtitle={subtitle}>
      <div className="space-y-6 animate-fade-in">
        <section className="relative overflow-hidden rounded-xl border border-accent-blue/20 bg-gradient-to-br from-accent-blue/10 via-bg-surface to-bg-surface p-6 md:p-8">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-blue"><Sparkles size={14} /> {eyebrow}</div>
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">{description}</h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary">A focused workspace that turns your career data into a clear next action.</p>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map(metric => <Card key={metric.label}><p className="text-xs uppercase tracking-wide text-text-muted">{metric.label}</p><p className="mt-2 text-2xl font-bold text-text-primary">{metric.value}</p><p className="mt-1 text-xs text-text-secondary">{metric.detail}</p></Card>)}
        </div>

        <Card header={<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold text-text-primary">Your workspace</h3><p className="mt-1 text-xs text-text-muted">Keep momentum visible and actionable.</p></div><div className="flex gap-2"><div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" /><input value={query} onChange={event => setQuery(event.target.value)} className="input-field w-full pl-9 sm:w-52" placeholder="Search" /></div><Button size="sm" onClick={addItem}><Plus size={15} />{action}</Button></div></div>}>
          <div className="space-y-3">
            {filteredItems.length ? filteredItems.map(item => <div key={`${item.title}-${item.tag}`} className="flex items-center gap-4 rounded-lg border border-border bg-bg-elevated/40 p-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue"><Check size={16} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-text-primary">{item.title}</p><p className="mt-1 truncate text-xs text-text-secondary">{item.detail}</p></div><span className="badge-blue shrink-0">{item.tag}</span><ArrowRight size={15} className="hidden text-text-muted sm:block" /></div>) : <p className="py-8 text-center text-sm text-text-muted">No matching items yet.</p>}
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}

export default ModulePage
