import type { CareerGoal } from '../types'
import { delay, generateId } from '../utils/formatters'

const getKey = (userId: string) => `skill_twin_career_goal_${userId}`

export const careerGoalsService = {
  async get(userId: string): Promise<CareerGoal | null> {
    await delay(300)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : null
  },

  async save(userId: string, data: Omit<CareerGoal, 'id' | 'updatedAt'>): Promise<CareerGoal> {
    await delay(500)
    const existing = await this.get(userId)
    const goal: CareerGoal = {
      id: existing?.id || generateId(),
      ...data,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(getKey(userId), JSON.stringify(goal))
    return goal
  },
}
