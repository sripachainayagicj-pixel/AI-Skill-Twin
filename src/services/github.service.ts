import { delay } from '../utils/formatters'

interface GitHubData {
  username: string
  connectedAt: string
  repoCount: number
  topLanguages: { name: string; percent: number; color: string }[]
  commitActivity: { month: string; commits: number }[]
  techStack: string[]
  stars: number
  followers: number
}

const getKey = (userId: string) => `skill_twin_github_${userId}`

export const githubService = {
  async get(userId: string): Promise<GitHubData | null> {
    await delay(300)
    const stored = localStorage.getItem(getKey(userId))
    return stored ? JSON.parse(stored) : null
  },

  async connect(userId: string, username: string): Promise<GitHubData> {
    await delay(2000)
    if (!username.trim()) throw new Error('GitHub username is required')
    const data: GitHubData = {
      username,
      connectedAt: new Date().toISOString(),
      repoCount: 24,
      topLanguages: [
        { name: 'TypeScript', percent: 42, color: '#3178c6' },
        { name: 'Python', percent: 28, color: '#3572A5' },
        { name: 'JavaScript', percent: 18, color: '#f1e05a' },
        { name: 'CSS', percent: 8, color: '#563d7c' },
        { name: 'Other', percent: 4, color: '#8B949E' },
      ],
      commitActivity: [
        { month: 'Mar', commits: 45 },
        { month: 'Apr', commits: 62 },
        { month: 'May', commits: 38 },
        { month: 'Jun', commits: 71 },
        { month: 'Jul', commits: 55 },
        { month: 'Aug', commits: 83 },
      ],
      techStack: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript', 'FastAPI'],
      stars: 127,
      followers: 43,
    }
    localStorage.setItem(getKey(userId), JSON.stringify(data))
    return data
  },

  async disconnect(userId: string): Promise<void> {
    await delay(300)
    localStorage.removeItem(getKey(userId))
  },
}
