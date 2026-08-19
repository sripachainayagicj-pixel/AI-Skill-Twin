import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { User, AuthState } from '../types'
import { delay, generateId } from '../utils/formatters'

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  completeOnboarding: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'skill_twin_auth'
const USERS_KEY = 'skill_twin_users'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : { user: null, token: null, isAuthenticated: false }
    } catch {
      return { user: null, token: null, isAuthenticated: false }
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const register = useCallback(async (name: string, email: string, password: string) => {
    await delay(800)
    const users: { email: string; password: string; user: User }[] =
      JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    if (users.find(u => u.email === email)) throw new Error('Email already registered')
    const user: User = {
      id: generateId(),
      email,
      name,
      createdAt: new Date().toISOString(),
      onboardingCompleted: false,
    }
    users.push({ email, password, user })
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const token = generateId()
    setState({ user, token, isAuthenticated: true })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await delay(800)
    const users: { email: string; password: string; user: User }[] =
      JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    let found = users.find(u => u.email === email && u.password === password)
    if (!found) {
      const user: User = {
        id: generateId(),
        email,
        name: email.split('@')[0] || 'Career Builder',
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
      }
      users.push({ email, password, user })
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      found = users[users.length - 1]
    }
    const token = generateId()
    setState({ user: found.user, token, isAuthenticated: true })
  }, [])

  const logout = useCallback(() => {
    setState({ user: null, token: null, isAuthenticated: false })
  }, [])

  const completeOnboarding = useCallback(() => {
    setState(prev => {
      if (!prev.user) return prev
      const updated = { ...prev.user, onboardingCompleted: true }
      // update in users storage too
      const users: { email: string; password: string; user: User }[] =
        JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
      const idx = users.findIndex(u => u.user.id === updated.id)
      if (idx !== -1) { users[idx].user = updated; localStorage.setItem(USERS_KEY, JSON.stringify(users)) }
      return { ...prev, user: updated }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
