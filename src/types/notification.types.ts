export type NotifType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotifType
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  githubUrl: string
  liveUrl: string
  startDate: string
  endDate: string
  createdAt: string
}

export interface Certification {
  id: string
  name: string
  organization: string
  issueDate: string
  expiryDate: string
  credentialId: string
  credentialUrl: string
  createdAt: string
}

export interface InterviewQuestion {
  id: string
  question: string
  type: string
}

export interface InterviewResult {
  score: number
  strengths: string[]
  improvements: string[]
  answers: { question: string; answer: string; feedback: string }[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
