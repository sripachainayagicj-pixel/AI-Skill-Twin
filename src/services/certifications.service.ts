import type { Certification } from '../types'
import { delay, generateId } from '../utils/formatters'

const getKey = (userId: string) => `skill_twin_certs_${userId}`

export const certificationsService = {
  async getAll(userId: string): Promise<Certification[]> {
    await delay(400)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : []
  },

  async create(userId: string, data: Omit<Certification, 'id' | 'createdAt'>): Promise<Certification> {
    await delay(500)
    const certs = await this.getAll(userId)
    const cert: Certification = { ...data, id: generateId(), createdAt: new Date().toISOString() }
    localStorage.setItem(getKey(userId), JSON.stringify([...certs, cert]))
    return cert
  },

  async update(userId: string, id: string, data: Partial<Certification>): Promise<Certification> {
    await delay(400)
    const certs = await this.getAll(userId)
    const idx = certs.findIndex(c => c.id === id)
    if (idx === -1) throw new Error('Certification not found')
    certs[idx] = { ...certs[idx], ...data }
    localStorage.setItem(getKey(userId), JSON.stringify(certs))
    return certs[idx]
  },

  async delete(userId: string, id: string): Promise<void> {
    await delay(400)
    const certs = await this.getAll(userId)
    localStorage.setItem(getKey(userId), JSON.stringify(certs.filter(c => c.id !== id)))
  },
}
