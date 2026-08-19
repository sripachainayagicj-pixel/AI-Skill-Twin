import type { ChatMessage } from '../types'
import { delay, generateId } from '../utils/formatters'

const RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['resume', 'cv'],
    reply: "Great question about your resume! I'd recommend tailoring it for each role by matching keywords from the job description. Make sure your achievements are quantified — numbers like '40% improvement' stand out much more than generic statements. Would you like me to analyze specific sections?",
  },
  {
    keywords: ['interview', 'prepare', 'practice'],
    reply: "For interview prep, I suggest the STAR method (Situation, Task, Action, Result) for behavioral questions. For technical interviews, focus on data structures, algorithms, and system design. I can run a mock interview session with you — just head to the Mock Interview page!",
  },
  {
    keywords: ['skill', 'learn', 'course'],
    reply: "Based on your profile, I see some skill gaps worth addressing. I'd prioritize learning skills that are in high demand for your target role. Check out the Skill Gap page for a detailed breakdown, and the Courses page for personalized recommendations!",
  },
  {
    keywords: ['job', 'apply', 'salary', 'offer'],
    reply: "When applying for jobs, quality beats quantity. Tailor each application, follow up after a week, and track everything in your Job Applications tracker. For salary negotiation, research market rates on Glassdoor and Levels.fyi, and always negotiate — most offers have room to move.",
  },
  {
    keywords: ['roadmap', 'plan', 'goal'],
    reply: "A clear roadmap is key to career success! I recommend breaking your goal into 12-week sprints. Start with skill gaps, then build projects to demonstrate them, then practice interviews. Head to the Career Roadmap page and I can generate a personalized plan for you!",
  },
  {
    keywords: ['github', 'portfolio', 'project'],
    reply: "Your GitHub profile is often the first thing technical hiring managers look at. I recommend having 3-5 pinned projects that showcase breadth and depth. Make sure your READMEs are polished with screenshots, tech stack, and setup instructions.",
  },
]

const DEFAULT_REPLY = "That's a great question! As your AI Career Twin, I'm here to help with resume optimization, interview prep, skill development, job searching, and career planning. Could you be more specific about what aspect of your career you'd like to work on?"

export const assistantService = {
  async sendMessage(userId: string, message: string): Promise<ChatMessage> {
    void userId
    await delay(1500)
    const lower = message.toLowerCase()
    const matched = RESPONSES.find(r => r.keywords.some(kw => lower.includes(kw)))
    const reply = matched?.reply || DEFAULT_REPLY
    return {
      id: generateId(),
      role: 'assistant',
      content: reply,
      timestamp: new Date().toISOString(),
    }
  },

  getHistory(userId: string): ChatMessage[] {
    const stored = localStorage.getItem(`skill_twin_chat_${userId}`)
    return stored ? JSON.parse(stored) : []
  },

  saveHistory(userId: string, messages: ChatMessage[]): void {
    localStorage.setItem(`skill_twin_chat_${userId}`, JSON.stringify(messages))
  },

  clearHistory(userId: string): void {
    localStorage.removeItem(`skill_twin_chat_${userId}`)
  },
}
