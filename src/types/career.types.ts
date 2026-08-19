export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed'

export interface CareerGoal {
  id: string
  targetRole: string
  dreamCompany: string
  industry: string
  location: string
  experienceLevel: string
  timeline: string
  updatedAt: string
}

export interface RoadmapTask {
  id: string
  skill: string
  goal: string
  estimatedTime: string
  status: TaskStatus
  week: number
}

export interface RoadmapPhase {
  id: string
  title: string
  description: string
  weeks: string
  tasks: RoadmapTask[]
  progress: number
}

export interface SkillGapItem {
  skill: string
  currentLevel: string
  requiredLevel: string
  status: 'Strong' | 'Improve' | 'Missing'
  priority: 'High' | 'Medium' | 'Low'
}

export interface Course {
  id: string
  name: string
  provider: string
  skill: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  url: string
  saved: boolean
  completed: boolean
}
