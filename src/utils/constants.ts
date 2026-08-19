export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  SKILL_TWIN: '/skill-twin',
  RESUME: '/resume',
  GITHUB: '/github',
  PROFILE: '/profile',
  SKILLS: '/skills',
  PROJECTS: '/projects',
  CERTIFICATIONS: '/certifications',
  CAREER_GOALS: '/career-goals',
  SKILL_GAP: '/skill-gap',
  ROADMAP: '/roadmap',
  COURSES: '/courses',
  JOBS: '/jobs',
  APPLICATIONS: '/applications',
  INTERVIEW: '/interview',
  ASSISTANT: '/assistant',
  PROGRESS: '/progress',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
} as const

export const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const
export const SKILL_CATEGORIES = ['Technical', 'Soft', 'Tools', 'Languages', 'Frameworks', 'Other'] as const
export const KANBAN_STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'] as const
export const TASK_STATUSES = ['Not Started', 'In Progress', 'Completed'] as const

export const PROFICIENCY_COLORS: Record<string, string> = {
  Beginner: 'badge-muted',
  Intermediate: 'badge-blue',
  Advanced: 'badge-warning',
  Expert: 'badge-success',
}

export const STATUS_COLORS: Record<string, string> = {
  Saved: 'badge-muted',
  Applied: 'badge-blue',
  Interview: 'badge-warning',
  Offer: 'badge-success',
  Rejected: 'badge-danger',
}
