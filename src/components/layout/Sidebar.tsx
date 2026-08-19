import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Brain, FileText, GitPullRequest, User, Zap,
  FolderOpen, Award, Target, TrendingUp, Map, BookOpen,
  Briefcase, ClipboardList, Mic, MessageSquare, BarChart2,
  Bell, Settings, LogOut, ChevronLeft, ChevronRight, X,
} from 'lucide-react'
import { useSidebar } from '../../context/SidebarContext'
import { useAuth } from '../../context/AuthContext'
import { useNotif } from '../../context/NotifContext'
import Tooltip from '../ui/Tooltip'
import { ROUTES } from '../../utils/constants'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: ROUTES.DASHBOARD },
  { icon: Brain, label: 'My Skill Twin', to: ROUTES.SKILL_TWIN },
  { icon: FileText, label: 'Resume Analyzer', to: ROUTES.RESUME },
  { icon: GitPullRequest, label: 'GitHub', to: ROUTES.GITHUB },
  { icon: User, label: 'Profile', to: ROUTES.PROFILE },
  { icon: Zap, label: 'Skills', to: ROUTES.SKILLS },
  { icon: FolderOpen, label: 'Projects', to: ROUTES.PROJECTS },
  { icon: Award, label: 'Certifications', to: ROUTES.CERTIFICATIONS },
  { icon: Target, label: 'Career Goals', to: ROUTES.CAREER_GOALS },
  { icon: TrendingUp, label: 'Skill Gap', to: ROUTES.SKILL_GAP },
  { icon: Map, label: 'Career Roadmap', to: ROUTES.ROADMAP },
  { icon: BookOpen, label: 'Courses', to: ROUTES.COURSES },
  { icon: Briefcase, label: 'Job Matching', to: ROUTES.JOBS },
  { icon: ClipboardList, label: 'Applications', to: ROUTES.APPLICATIONS },
  { icon: Mic, label: 'Mock Interview', to: ROUTES.INTERVIEW },
  { icon: MessageSquare, label: 'AI Assistant', to: ROUTES.ASSISTANT },
  { icon: BarChart2, label: 'Progress', to: ROUTES.PROGRESS },
  { icon: Bell, label: 'Notifications', to: ROUTES.NOTIFICATIONS },
  { icon: Settings, label: 'Settings', to: ROUTES.SETTINGS },
]

const Sidebar: React.FC = () => {
  const { isCollapsed, isMobileOpen, toggle, closeMobile } = useSidebar()
  const { user, logout } = useAuth()
  const { unreadCount } = useNotif()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className={`flex items-center h-16 px-4 border-b border-border shrink-0 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center shrink-0">
              <Brain size={16} className="text-white" />
            </div>
            <div>
              <p className="text-text-primary font-bold text-sm leading-none">Skill Twin</p>
              <p className="text-text-muted text-xs">AI Career Platform</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
        )}
        <button
          onClick={toggle}
          className={`text-text-muted hover:text-text-primary hover:bg-bg-elevated p-1.5 rounded-md transition-colors ${isCollapsed ? 'hidden' : ''}`}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Collapsed expand button */}
      {isCollapsed && (
        <button
          onClick={toggle}
          className="mx-auto mt-3 text-text-muted hover:text-text-primary hover:bg-bg-elevated p-1.5 rounded-md transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map(({ icon: Icon, label, to }) => {
          const isNotif = to === ROUTES.NOTIFICATIONS
          return isCollapsed ? (
            <Tooltip key={to} content={label} side="right">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-all duration-150 relative
                  ${isActive ? 'bg-bg-elevated text-accent-blue' : 'text-text-muted hover:bg-bg-elevated hover:text-text-primary'}`
                }
                onClick={closeMobile}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-accent-blue rounded-full" />}
                    <Icon size={18} />
                    {isNotif && unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            </Tooltip>
          ) : (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMobile}
            >
              {() => (
                <>
                  <Icon size={17} className="shrink-0" />
                  <span className="truncate">{label}</span>
                  {isNotif && unreadCount > 0 && (
                    <span className="ml-auto bg-danger text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* User footer */}
      <div className={`border-t border-border p-3 shrink-0 ${isCollapsed ? 'flex justify-center' : ''}`}>
        {isCollapsed ? (
          <Tooltip content={user?.name || 'Profile'} side="right">
            <div className="w-9 h-9 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-accent-blue font-bold text-sm cursor-pointer">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-accent-blue font-bold text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-medium truncate">{user?.name}</p>
              <p className="text-text-muted text-xs truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-text-muted hover:text-danger transition-colors p-1 rounded-md hover:bg-bg-elevated"
              aria-label="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-bg-surface border-r border-border h-screen sticky top-0 transition-all duration-200 shrink-0 ${isCollapsed ? 'w-16' : 'w-60'}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobile}
          />
          <aside className="fixed left-0 top-0 h-full w-64 bg-bg-surface border-r border-border z-50 md:hidden animate-slide-in flex flex-col">
            <div className="absolute right-3 top-3">
              <button onClick={closeMobile} className="text-text-muted hover:text-text-primary p-1.5 rounded-md hover:bg-bg-elevated">
                <X size={18} />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}

export default Sidebar
