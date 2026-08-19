import type { Skill } from '../types'
import { delay, generateId } from '../utils/formatters'

const getKey = (userId: string) => `skill_twin_skills_${userId}`

export const skillsService = {
  async getAll(userId: string): Promise<Skill[]> {
    await delay(400)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : []
  },

  async create(userId: string, data: Omit<Skill, 'id' | 'createdAt'>): Promise<Skill> {
    await delay(500)
    const skills = await this.getAll(userId)
    const skill: Skill = { ...data, id: generateId(), createdAt: new Date().toISOString() }
    localStorage.setItem(getKey(userId), JSON.stringify([...skills, skill]))
    return skill
  },

  async update(userId: string, id: string, data: Partial<Skill>): Promise<Skill> {
    await delay(400)
    const skills = await this.getAll(userId)
    const idx = skills.findIndex(s => s.id === id)
    if (idx === -1) throw new Error('Skill not found')
    skills[idx] = { ...skills[idx], ...data }
    localStorage.setItem(getKey(userId), JSON.stringify(skills))
    return skills[idx]
  },

  async delete(userId: string, id: string): Promise<void> {
    await delay(400)
    const skills = await this.getAll(userId)
    localStorage.setItem(getKey(userId), JSON.stringify(skills.filter(s => s.id !== id)))
  },
}
