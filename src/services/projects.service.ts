import type { Project } from '../types'
import { delay, generateId } from '../utils/formatters'

const getKey = (userId: string) => `skill_twin_projects_${userId}`

export const projectsService = {
  async getAll(userId: string): Promise<Project[]> {
    await delay(400)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : []
  },

  async create(userId: string, data: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    await delay(500)
    const projects = await this.getAll(userId)
    const project: Project = { ...data, id: generateId(), createdAt: new Date().toISOString() }
    localStorage.setItem(getKey(userId), JSON.stringify([...projects, project]))
    return project
  },

  async update(userId: string, id: string, data: Partial<Project>): Promise<Project> {
    await delay(400)
    const projects = await this.getAll(userId)
    const idx = projects.findIndex(p => p.id === id)
    if (idx === -1) throw new Error('Project not found')
    projects[idx] = { ...projects[idx], ...data }
    localStorage.setItem(getKey(userId), JSON.stringify(projects))
    return projects[idx]
  },

  async delete(userId: string, id: string): Promise<void> {
    await delay(400)
    const projects = await this.getAll(userId)
    localStorage.setItem(getKey(userId), JSON.stringify(projects.filter(p => p.id !== id)))
  },
}
