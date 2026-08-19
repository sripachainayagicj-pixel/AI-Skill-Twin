import React, { createContext, useContext, useState, useEffect } from 'react'

interface SidebarContextValue {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggle: () => void
  openMobile: () => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

const STORAGE_KEY = 'skill_twin_sidebar_collapsed'

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
  })
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isCollapsed))
  }, [isCollapsed])

  const toggle = () => setIsCollapsed(prev => !prev)
  const openMobile = () => setIsMobileOpen(true)
  const closeMobile = () => setIsMobileOpen(false)

  return (
    <SidebarContext.Provider value={{ isCollapsed, isMobileOpen, toggle, openMobile, closeMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
