// User & Auth types
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  onboardingCompleted: boolean
}

export interface Profile {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  location: string
  photo: string | null
  bio: string
  linkedin: string
  github: string
  website: string
  resumeUploaded?: boolean
  resumeAnalyzed?: boolean
  education: Education[]
  experience: Experience[]
  preferences: Preferences
  updatedAt: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: string
  endYear: string
  current: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Preferences {
  jobType: string
  workMode: string
  salaryMin: string
  salaryMax: string
  currency: string
  openToRelocation: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
