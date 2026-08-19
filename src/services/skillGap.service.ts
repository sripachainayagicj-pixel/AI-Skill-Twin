import type { SkillGapItem } from '../types'
import { delay } from '../utils/formatters'

export const skillGapService = {
  async analyze(userId: string): Promise<SkillGapItem[]> {
    await delay(1500)
    const goalStored = localStorage.getItem(`skill_twin_career_goal_${userId}`)
    const skillsStored = localStorage.getItem(`skill_twin_skills_${userId}`)
    if (!goalStored || !skillsStored) return []
    const goal = JSON.parse(goalStored)
    const userSkills: { name: string; proficiency: string }[] = JSON.parse(skillsStored)
    const targetRole = goal.targetRole?.toLowerCase() || ''

    const required: { skill: string; level: string; priority: 'High' | 'Medium' | 'Low' }[] = []

    if (targetRole.includes('frontend') || targetRole.includes('react')) {
      required.push(
        { skill: 'React', level: 'Advanced', priority: 'High' },
        { skill: 'TypeScript', level: 'Advanced', priority: 'High' },
        { skill: 'CSS/Tailwind', level: 'Intermediate', priority: 'Medium' },
        { skill: 'Testing (Jest)', level: 'Intermediate', priority: 'Medium' },
        { skill: 'Performance Optimization', level: 'Intermediate', priority: 'Low' },
        { skill: 'Accessibility (a11y)', level: 'Beginner', priority: 'Low' },
      )
    } else if (targetRole.includes('backend') || targetRole.includes('node')) {
      required.push(
        { skill: 'Node.js', level: 'Advanced', priority: 'High' },
        { skill: 'SQL/PostgreSQL', level: 'Advanced', priority: 'High' },
        { skill: 'REST APIs', level: 'Advanced', priority: 'High' },
        { skill: 'Docker', level: 'Intermediate', priority: 'Medium' },
        { skill: 'System Design', level: 'Intermediate', priority: 'Medium' },
      )
    } else {
      required.push(
        { skill: 'Problem Solving', level: 'Advanced', priority: 'High' },
        { skill: 'Data Structures & Algorithms', level: 'Advanced', priority: 'High' },
        { skill: 'System Design', level: 'Intermediate', priority: 'High' },
        { skill: 'Version Control (Git)', level: 'Advanced', priority: 'Medium' },
        { skill: 'Communication', level: 'Advanced', priority: 'Medium' },
        { skill: 'Agile/Scrum', level: 'Intermediate', priority: 'Low' },
      )
    }

    const proficiencyRank = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 }

    return required.map(req => {
      const userSkill = userSkills.find(s => s.name.toLowerCase() === req.skill.toLowerCase())
      if (!userSkill) {
        return { skill: req.skill, currentLevel: 'None', requiredLevel: req.level, status: 'Missing', priority: req.priority }
      }
      const userRank = proficiencyRank[userSkill.proficiency as keyof typeof proficiencyRank] || 0
      const reqRank = proficiencyRank[req.level as keyof typeof proficiencyRank] || 0
      const status = userRank >= reqRank ? 'Strong' : 'Improve'
      return { skill: req.skill, currentLevel: userSkill.proficiency, requiredLevel: req.level, status, priority: req.priority }
    }) as SkillGapItem[]
  },
}
