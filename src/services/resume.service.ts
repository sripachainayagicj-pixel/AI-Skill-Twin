import { delay } from '../utils/formatters'

interface ResumeData {
  filename: string
  size: number
  uploadedAt: string
  analyzed: boolean
  score: number
  atsScore: number
  strengths: string[]
  weaknesses: string[]
  missingSkills: string[]
  suggestions: string[]
}

const getKey = (userId: string) => `skill_twin_resume_${userId}`

export const resumeService = {
  async get(userId: string): Promise<ResumeData | null> {
    await delay(300)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : null
  },

  async upload(userId: string, file: File): Promise<ResumeData> {
    await delay(1200)
    const data: ResumeData = {
      filename: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      analyzed: false,
      score: 0,
      atsScore: 0,
      strengths: [],
      weaknesses: [],
      missingSkills: [],
      suggestions: [],
    }
    localStorage.setItem(getKey(userId), JSON.stringify(data))
    return data
  },

  async analyze(userId: string): Promise<ResumeData> {
    await delay(2500)
    const data = await this.get(userId)
    if (!data) throw new Error('No resume uploaded')
    const analyzed: ResumeData = {
      ...data,
      analyzed: true,
      score: 74,
      atsScore: 82,
      strengths: [
        'Clear structure',
        'Good keywords',
      ],
      weaknesses: [
        'Missing summary',
        'No measurable results',
      ],
      missingSkills: ['Docker', 'System Design'],
      suggestions: [
        'Add a professional summary',
        'Quantify achievements with numbers',
        'Add more technical keywords',
      ],
    }
    localStorage.setItem(getKey(userId), JSON.stringify(analyzed))
    return analyzed
  },

  async remove(userId: string): Promise<void> {
    await delay(300)
    localStorage.removeItem(getKey(userId))
  },
}
