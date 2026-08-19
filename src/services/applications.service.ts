import type { Application } from '../types'
import { delay, generateId } from '../utils/formatters'

const getKey = (userId: string) => `skill_twin_applications_${userId}`

export const applicationsService = {
  async getAll(userId: string): Promise<Application[]> {
    await delay(400)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : []
  },

  async create(userId: string, data: Omit<Application, 'id' | 'createdAt'>): Promise<Application> {
    await delay(500)
    const apps = await this.getAll(userId)
    const app: Application = { ...data, id: generateId(), createdAt: new Date().toISOString() }
    localStorage.setItem(getKey(userId), JSON.stringify([...apps, app]))
    return app
  },

  async update(userId: string, id: string, data: Partial<Application>): Promise<Application> {
    await delay(400)
    const apps = await this.getAll(userId)
    const idx = apps.findIndex(a => a.id === id)
    if (idx === -1) throw new Error('Application not found')
    apps[idx] = { ...apps[idx], ...data }
    localStorage.setItem(getKey(userId), JSON.stringify(apps))
    return apps[idx]
  },

  async delete(userId: string, id: string): Promise<void> {
    await delay(400)
    const apps = await this.getAll(userId)
    localStorage.setItem(getKey(userId), JSON.stringify(apps.filter(a => a.id !== id)))
  },
}
