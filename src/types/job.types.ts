export type KanbanStatus = 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead'
  matchPercent: number
  skills: string[]
  postedAt: string
  url: string
  salary: string
  description: string
}

export interface Application {
  id: string
  company: string
  role: string
  appliedDate: string
  url: string
  notes: string
  status: KanbanStatus
  createdAt: string
}
