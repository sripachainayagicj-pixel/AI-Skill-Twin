import { delay } from '../utils/formatters'

interface ProgressData {
  profile: number
  skills: number
  projects: number
  certifications: number
  roadmap: number
  interviews: number
  applications: number
  courses: number
}

export const progressService = {
  async get(userId: string): Promise<ProgressData> {
    await delay(400)
    const profileStored = localStorage.getItem(`skill_twin_profile_${userId}`)
    const profile = profileStored ? JSON.parse(profileStored) : null

    const profileChecks = profile ? [
      !!profile.name, !!profile.phone, !!profile.location, !!profile.bio,
      profile.education?.length > 0, profile.experience?.length > 0,
      !!profile.photo, !!profile.linkedin,
    ] : []
    const profilePct = profileChecks.length
      ? Math.round(profileChecks.filter(Boolean).length / profileChecks.length * 100)
      : 0

    const skills = JSON.parse(localStorage.getItem(`skill_twin_skills_${userId}`) || '[]')
    const projects = JSON.parse(localStorage.getItem(`skill_twin_projects_${userId}`) || '[]')
    const certs = JSON.parse(localStorage.getItem(`skill_twin_certs_${userId}`) || '[]')
    const roadmap = JSON.parse(localStorage.getItem(`skill_twin_roadmap_${userId}`) || 'null')
    const courses = JSON.parse(localStorage.getItem(`skill_twin_courses_${userId}`) || '[]')
    const apps = JSON.parse(localStorage.getItem(`skill_twin_applications_${userId}`) || '[]')

    const skillsPct = Math.min(skills.length * 10, 100)
    const projectsPct = Math.min(projects.length * 33, 100)
    const certsPct = Math.min(certs.length * 33, 100)

    let roadmapPct = 0
    if (roadmap) {
      const allTasks = roadmap.flatMap((p: any) => p.tasks)
      const completedTasks = allTasks.filter((t: any) => t.status === 'Completed')
      roadmapPct = allTasks.length ? Math.round(completedTasks.length / allTasks.length * 100) : 0
    }

    const coursesPct = courses.length
      ? Math.round(courses.filter((c: any) => c.completed).length / courses.length * 100)
      : 0

    const appsPct = Math.min(apps.length * 20, 100)

    return {
      profile: profilePct,
      skills: skillsPct,
      projects: projectsPct,
      certifications: certsPct,
      roadmap: roadmapPct,
      interviews: 0,
      applications: appsPct,
      courses: coursesPct,
    }
  },
}
