import type { RoadmapPhase } from '../types'
import { delay, generateId } from '../utils/formatters'

const getKey = (userId: string) => `skill_twin_roadmap_${userId}`

export const roadmapService = {
  async get(userId: string): Promise<RoadmapPhase[] | null> {
    await delay(300)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : null
  },

  async generate(userId: string): Promise<RoadmapPhase[]> {
    await delay(2000)
    const goalStored = localStorage.getItem(`skill_twin_career_goal_${userId}`)
    const goal = goalStored ? JSON.parse(goalStored) : { targetRole: 'Software Engineer' }
    const phases: RoadmapPhase[] = [
      {
        id: generateId(),
        title: 'Foundation Building',
        description: 'Strengthen core technical fundamentals and fill critical skill gaps',
        weeks: 'Weeks 1-4',
        progress: 0,
        tasks: [
          { id: generateId(), skill: 'Data Structures', goal: 'Complete arrays, linked lists, trees', estimatedTime: '8 hrs', status: 'Not Started', week: 1 },
          { id: generateId(), skill: 'Algorithms', goal: 'Master sorting and searching', estimatedTime: '6 hrs', status: 'Not Started', week: 2 },
          { id: generateId(), skill: `${goal.targetRole || 'Core'} Basics`, goal: 'Review fundamentals for target role', estimatedTime: '10 hrs', status: 'Not Started', week: 3 },
          { id: generateId(), skill: 'Git & Workflow', goal: 'Practice branching strategies', estimatedTime: '3 hrs', status: 'Not Started', week: 4 },
        ],
      },
      {
        id: generateId(),
        title: 'Project Development',
        description: 'Build portfolio projects showcasing your skills',
        weeks: 'Weeks 5-8',
        progress: 0,
        tasks: [
          { id: generateId(), skill: 'Portfolio Project 1', goal: 'Design and build a full-stack project', estimatedTime: '20 hrs', status: 'Not Started', week: 5 },
          { id: generateId(), skill: 'API Integration', goal: 'Integrate external APIs into project', estimatedTime: '8 hrs', status: 'Not Started', week: 6 },
          { id: generateId(), skill: 'Testing', goal: 'Write unit and integration tests', estimatedTime: '6 hrs', status: 'Not Started', week: 7 },
          { id: generateId(), skill: 'Deployment', goal: 'Deploy to cloud platform', estimatedTime: '4 hrs', status: 'Not Started', week: 8 },
        ],
      },
      {
        id: generateId(),
        title: 'Interview Preparation',
        description: 'Practice technical interviews and behavioral questions',
        weeks: 'Weeks 9-12',
        progress: 0,
        tasks: [
          { id: generateId(), skill: 'System Design', goal: 'Study 10 system design patterns', estimatedTime: '12 hrs', status: 'Not Started', week: 9 },
          { id: generateId(), skill: 'LeetCode Practice', goal: 'Solve 50 medium problems', estimatedTime: '15 hrs', status: 'Not Started', week: 10 },
          { id: generateId(), skill: 'Mock Interviews', goal: 'Complete 5 mock interview sessions', estimatedTime: '10 hrs', status: 'Not Started', week: 11 },
          { id: generateId(), skill: 'Behavioral Prep', goal: 'Prepare STAR method answers', estimatedTime: '4 hrs', status: 'Not Started', week: 12 },
        ],
      },
    ]
    localStorage.setItem(getKey(userId), JSON.stringify(phases))
    return phases
  },

  async updateTask(userId: string, phaseId: string, taskId: string, status: string): Promise<RoadmapPhase[]> {
    await delay(400)
    const phases = await this.get(userId)
    if (!phases) throw new Error('No roadmap found')
    const phaseIdx = phases.findIndex(p => p.id === phaseId)
    if (phaseIdx === -1) throw new Error('Phase not found')
    const taskIdx = phases[phaseIdx].tasks.findIndex(t => t.id === taskId)
    if (taskIdx === -1) throw new Error('Task not found')
    phases[phaseIdx].tasks[taskIdx].status = status as any
    const completed = phases[phaseIdx].tasks.filter(t => t.status === 'Completed').length
    phases[phaseIdx].progress = Math.round((completed / phases[phaseIdx].tasks.length) * 100)
    localStorage.setItem(getKey(userId), JSON.stringify(phases))
    return phases
  },

  async reset(userId: string): Promise<void> {
    await delay(300)
    localStorage.removeItem(getKey(userId))
  },
}
