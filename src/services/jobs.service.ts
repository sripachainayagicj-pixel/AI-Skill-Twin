import type { Job } from '../types'
import { delay, generateId } from '../utils/formatters'

const MOCK_JOBS: Omit<Job, 'id'>[] = [
  { title: 'Senior Frontend Engineer', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time', experienceLevel: 'Senior', matchPercent: 87, skills: ['React', 'TypeScript', 'GraphQL'], postedAt: '2024-01-15', url: '#', salary: '$150k–$200k', description: 'Build the financial infrastructure of the internet.' },
  { title: 'Full Stack Developer', company: 'Vercel', location: 'Remote', type: 'Remote', experienceLevel: 'Mid', matchPercent: 74, skills: ['Next.js', 'TypeScript', 'PostgreSQL'], postedAt: '2024-01-14', url: '#', salary: '$120k–$160k', description: 'Help developers ship faster.' },
  { title: 'React Developer', company: 'Airbnb', location: 'New York, NY', type: 'Full-time', experienceLevel: 'Mid', matchPercent: 68, skills: ['React', 'JavaScript', 'CSS'], postedAt: '2024-01-13', url: '#', salary: '$130k–$170k', description: 'Create experiences that belong anywhere.' },
  { title: 'Software Engineer II', company: 'GitHub', location: 'Remote', type: 'Remote', experienceLevel: 'Mid', matchPercent: 62, skills: ['Ruby', 'TypeScript', 'React'], postedAt: '2024-01-12', url: '#', salary: '$140k–$180k', description: 'Build tools that empower developers.' },
  { title: 'Backend Engineer', company: 'Shopify', location: 'Toronto, Canada', type: 'Full-time', experienceLevel: 'Senior', matchPercent: 55, skills: ['Ruby on Rails', 'Go', 'PostgreSQL'], postedAt: '2024-01-11', url: '#', salary: '$140k–$185k', description: 'Power commerce at global scale.' },
]

const getKey = (userId: string) => `skill_twin_jobs_saved_${userId}`

export const jobsService = {
  async getAll(userId: string): Promise<Job[]> {
    void userId
    await delay(600)
    return MOCK_JOBS.map(j => ({ ...j, id: generateId() }))
  },

  async getSaved(userId: string): Promise<string[]> {
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : []
  },

  async toggleSave(userId: string, jobId: string): Promise<void> {
    const saved = await this.getSaved(userId)
    const updated = saved.includes(jobId) ? saved.filter(id => id !== jobId) : [...saved, jobId]
    localStorage.setItem(getKey(userId), JSON.stringify(updated))
  },
}
