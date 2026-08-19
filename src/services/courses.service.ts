import type { Course } from '../types'
import { delay, generateId } from '../utils/formatters'

const MOCK_COURSES: Omit<Course, 'id' | 'saved' | 'completed'>[] = [
  { name: 'The Complete JavaScript Course 2024', provider: 'Udemy', skill: 'JavaScript', difficulty: 'Beginner', duration: '69 hrs', url: 'https://udemy.com' },
  { name: 'React - The Complete Guide', provider: 'Udemy', skill: 'React', difficulty: 'Intermediate', duration: '48 hrs', url: 'https://udemy.com' },
  { name: 'TypeScript Masterclass', provider: 'Coursera', skill: 'TypeScript', difficulty: 'Intermediate', duration: '24 hrs', url: 'https://coursera.org' },
  { name: 'Docker & Kubernetes: The Complete Guide', provider: 'Udemy', skill: 'Docker', difficulty: 'Intermediate', duration: '21 hrs', url: 'https://udemy.com' },
  { name: 'System Design Interview Prep', provider: 'Educative', skill: 'System Design', difficulty: 'Advanced', duration: '30 hrs', url: 'https://educative.io' },
  { name: 'Python for Data Science', provider: 'Coursera', skill: 'Python', difficulty: 'Beginner', duration: '36 hrs', url: 'https://coursera.org' },
  { name: 'AWS Certified Solutions Architect', provider: 'A Cloud Guru', skill: 'AWS', difficulty: 'Advanced', duration: '55 hrs', url: 'https://acloudguru.com' },
  { name: 'Node.js: Zero to Mastery', provider: 'Zero To Mastery', skill: 'Node.js', difficulty: 'Intermediate', duration: '38 hrs', url: 'https://zerotomastery.io' },
]

const getKey = (userId: string) => `skill_twin_courses_${userId}`

export const coursesService = {
  async getAll(userId: string): Promise<Course[]> {
    await delay(500)
    const stored = localStorage.getItem(getKey(userId))
    if (stored) return JSON.parse(stored)
    const courses = MOCK_COURSES.map(c => ({ ...c, id: generateId(), saved: false, completed: false }))
    localStorage.setItem(getKey(userId), JSON.stringify(courses))
    return courses
  },

  async toggleSave(userId: string, courseId: string): Promise<Course[]> {
    await delay(300)
    const courses = await this.getAll(userId)
    const idx = courses.findIndex(c => c.id === courseId)
    if (idx !== -1) courses[idx].saved = !courses[idx].saved
    localStorage.setItem(getKey(userId), JSON.stringify(courses))
    return courses
  },

  async markComplete(userId: string, courseId: string): Promise<Course[]> {
    await delay(300)
    const courses = await this.getAll(userId)
    const idx = courses.findIndex(c => c.id === courseId)
    if (idx !== -1) courses[idx].completed = true
    localStorage.setItem(getKey(userId), JSON.stringify(courses))
    return courses
  },
}
