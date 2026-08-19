export type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
export type SkillCategory = 'Technical' | 'Soft' | 'Tools' | 'Languages' | 'Frameworks' | 'Other'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  proficiency: Proficiency
  createdAt: string
}
