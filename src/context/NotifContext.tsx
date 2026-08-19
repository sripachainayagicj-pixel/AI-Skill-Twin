import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Notification } from '../types'
import { useAuth } from './AuthContext'
import { generateId } from '../utils/formatters'

interface NotifContextValue {
  notifications: Notification[]
  unreadCount: number
  markRead: (id: string) => void
  markAllRead: () => void
  deleteNotif: (id: string) => void
  addNotif: (notif: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
}

const NotifContext = createContext<NotifContextValue | null>(null)

const getKey = (userId: string) => `skill_twin_notifs_${userId}`

export const NotifProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (!user) { setNotifications([]); return }
    const stored = localStorage.getItem(getKey(user.id))
    setNotifications(stored ? JSON.parse(stored) : [])
  }, [user])

  const markRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n)
      if (user) localStorage.setItem(getKey(user.id), JSON.stringify(updated))
      return updated
    })
  }, [user])

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }))
      if (user) localStorage.setItem(getKey(user.id), JSON.stringify(updated))
      return updated
    })
  }, [user])

  const deleteNotif = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id)
      if (user) localStorage.setItem(getKey(user.id), JSON.stringify(updated))
      return updated
    })
  }, [user])

  const addNotif = useCallback((notif: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    setNotifications(prev => {
      const newNotif: Notification = {
        ...notif,
        id: generateId(),
        read: false,
        createdAt: new Date().toISOString(),
      }
      const updated = [newNotif, ...prev]
      if (user) localStorage.setItem(getKey(user.id), JSON.stringify(updated))
      return updated
    })
  }, [user])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotifContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, deleteNotif, addNotif }}>
      {children}
    </NotifContext.Provider>
  )
}

export const useNotif = () => {
  const ctx = useContext(NotifContext)
  if (!ctx) throw new Error('useNotif must be used within NotifProvider')
  return ctx
}
