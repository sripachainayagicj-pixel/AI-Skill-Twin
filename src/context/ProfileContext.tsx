import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Profile } from '../types'
import { useAuth } from './AuthContext'
import { delay, generateId } from '../utils/formatters'

interface ProfileContextValue {
  profile: Profile | null
  loading: boolean
  updateProfile: (data: Partial<Profile>) => Promise<void>
  refreshProfile: () => Promise<void>
  getCompletionPercent: () => number
  resumeUploaded: boolean
  setResumeStatus: (analyzed?: boolean) => Promise<void>
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

const getStorageKey = (userId: string) => `skill_twin_profile_${userId}`

const defaultProfile = (userId: string, name: string, email: string): Profile => ({
  id: generateId(),
  userId,
  name,
  email,
  phone: '',
  location: '',
  photo: null,
  bio: '',
  linkedin: '',
  github: '',
  website: '',
  resumeUploaded: false,
  resumeAnalyzed: false,
  education: [],
  experience: [],
  preferences: {
    jobType: '',
    workMode: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    openToRelocation: false,
  },
  updatedAt: new Date().toISOString(),
})

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)

  const loadProfile = useCallback(async () => {
    if (!user) { setProfile(null); return }
    setLoading(true)
    await delay(300)
    const key = getStorageKey(user.id)
    const stored = localStorage.getItem(key)
    if (stored) {
      setProfile(JSON.parse(stored))
    } else {
      const fresh = defaultProfile(user.id, user.name, user.email)
      localStorage.setItem(key, JSON.stringify(fresh))
      setProfile(fresh)
    }
    setLoading(false)
  }, [user])

  useEffect(() => { loadProfile() }, [loadProfile])

  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    if (!user || !profile) return
    await delay(500)
    const updated = { ...profile, ...data, updatedAt: new Date().toISOString() }
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(updated))
    setProfile(updated)
  }, [user, profile])

  const getCompletionPercent = useCallback((): number => {
    if (!profile) return 0
    const checks = [
      !!profile.name,
      !!profile.phone,
      !!profile.location,
      !!profile.bio,
      profile.education.length > 0,
      profile.experience.length > 0,
      !!profile.photo,
      !!profile.linkedin,
    ]
    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [profile])

  const setResumeStatus = useCallback(async (analyzed = false) => {
    if (!user || !profile) return
    const updated = { ...profile, resumeUploaded: true, resumeAnalyzed: analyzed, updatedAt: new Date().toISOString() }
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(updated))
    setProfile(updated)
  }, [profile, user])

  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile, refreshProfile: loadProfile, getCompletionPercent, resumeUploaded: Boolean(profile?.resumeUploaded), setResumeStatus }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
