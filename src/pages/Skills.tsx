import { useState } from 'react'
import { Edit2, Plus, Trash2, Zap } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ConfirmModal from '../components/ui/ConfirmModal'
import EmptyState from '../components/ui/EmptyState'
import { useSkills } from '../context/CareerDataContexts'
import { useNotif } from '../context/NotifContext'
import type { Proficiency, SkillCategory, Skill } from '../types'

const categories: SkillCategory[] = ['Technical', 'Soft', 'Tools', 'Languages', 'Frameworks', 'Other']
const levels: Proficiency[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
const levelClass: Record<Proficiency, string> = { Beginner: 'badge-muted', Intermediate: 'badge-blue', Advanced: 'badge-success', Expert: 'bg-purple-500/10 text-purple-300 border border-purple-400/20 text-xs font-medium px-2.5 py-0.5 rounded-full' }
const emptyForm = { name: '', category: 'Technical' as SkillCategory, proficiency: 'Beginner' as Proficiency }

export default function Skills() {
	const { skills, addSkill, updateSkill, deleteSkill } = useSkills()
	const { addNotif } = useNotif()
	const [open, setOpen] = useState(false)
	const [editing, setEditing] = useState<Skill | null>(null)
	const [form, setForm] = useState(emptyForm)
	const [error, setError] = useState('')
	const [deleting, setDeleting] = useState<Skill | null>(null)
	const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setOpen(true) }
	const openEdit = (skill: Skill) => { setEditing(skill); setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency }); setError(''); setOpen(true) }
	const save = async () => { if (!form.name.trim()) { setError('Skill name is required'); return }; if (editing) { await updateSkill(editing.id, form); addNotif({ type: 'success', title: `Skill '${form.name}' updated`, message: 'Your skill twin was updated.' }); } else { await addSkill({ ...form, name: form.name.trim() }); addNotif({ type: 'success', title: `New skill '${form.name.trim()}' added`, message: 'Your skill twin was updated.' }) }; setOpen(false) }
	const remove = async () => { if (!deleting) return; await deleteSkill(deleting.id); addNotif({ type: 'success', title: `Skill '${deleting.name}' deleted`, message: 'The skill was removed.' }); setDeleting(null) }
	return <PageWrapper title="Skills" subtitle="Your capability inventory"><div className="space-y-6 animate-fade-in"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-text-primary">Skills</h2><p className="mt-1 text-sm text-text-secondary">{skills.length} skill{skills.length === 1 ? '' : 's'} mapped to your profile.</p></div><Button onClick={openCreate}><Plus size={16} />Add Skill</Button></div>{skills.length === 0 ? <Card><EmptyState icon={<Zap size={24} />} title="No skills added yet." description="Add your first skill to unlock better career insights." action={{ label: 'Add Skill', onClick: openCreate }} /></Card> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{skills.map(skill => <Card key={skill.id} hover><div className="flex items-start justify-between"><div><h3 className="font-semibold text-text-primary">{skill.name}</h3><span className="badge-muted mt-2 inline-block">{skill.category}</span></div><div className="flex gap-1"><button className="rounded-md p-2 text-text-muted hover:bg-bg-elevated hover:text-text-primary" onClick={() => openEdit(skill)} aria-label={`Edit ${skill.name}`}><Edit2 size={15} /></button><button className="rounded-md p-2 text-text-muted hover:bg-bg-elevated hover:text-danger" onClick={() => setDeleting(skill)} aria-label={`Delete ${skill.name}`}><Trash2 size={15} /></button></div></div><div className="mt-5"><span className={levelClass[skill.proficiency]}>{skill.proficiency}</span></div></Card>)}</div>}<Modal isOpen={open} onClose={() => setOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'} footer={<div className="flex justify-end gap-3"><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => void save()}>{editing ? 'Save Changes' : 'Add Skill'}</Button></div>}><div className="space-y-4"><div><label className="label" htmlFor="skill-name">Skill Name</label><input id="skill-name" className={`input-field ${error ? 'border-danger' : ''}`} value={form.name} onChange={event => { setForm({ ...form, name: event.target.value }); setError('') }} />{error && <p className="mt-1 text-xs text-danger">{error}</p>}</div><div><label className="label" htmlFor="skill-category">Category</label><select id="skill-category" className="input-field" value={form.category} onChange={event => setForm({ ...form, category: event.target.value as SkillCategory })}>{categories.map(category => <option key={category}>{category}</option>)}</select></div><div><label className="label" htmlFor="skill-level">Proficiency</label><select id="skill-level" className="input-field" value={form.proficiency} onChange={event => setForm({ ...form, proficiency: event.target.value as Proficiency })}>{levels.map(level => <option key={level}>{level}</option>)}</select></div></div></Modal><ConfirmModal isOpen={Boolean(deleting)} onClose={() => setDeleting(null)} onConfirm={() => void remove()} title="Delete skill?" message={`Remove ${deleting?.name || 'this skill'} from your profile?`} confirmLabel="Delete" /></div></PageWrapper>
}
