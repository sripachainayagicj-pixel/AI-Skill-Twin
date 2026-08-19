import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { useSidebar } from '../../context/SidebarContext'
import { useAuth } from '../../context/AuthContext'
import { useNotif } from '../../context/NotifContext'
import { ROUTES } from '../../utils/constants'

interface TopBarProps {
  title: string
  subtitle?: string
}

const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
  const { openMobile } = useSidebar()
  const { user } = useAuth()
  const { unreadCount } = useNotif()
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-border bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-30 flex items-center px-6 gap-4">
      {/* Mobile hamburger */}
      <button
        onClick={openMobile}
        className="md:hidden text-text-muted hover:text-text-primary p-1.5 rounded-md hover:bg-bg-elevated transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-text-primary font-semibold text-base truncate">{title}</h1>
        {subtitle && <p className="text-text-muted text-xs">{subtitle}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notifications bell */}
        <button
          id="topbar-notifications-btn"
          onClick={() => navigate(ROUTES.NOTIFICATIONS)}
          className="relative text-text-muted hover:text-text-primary p-2 rounded-lg hover:bg-bg-elevated transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          )}
        </button>

        {/* User avatar */}
        <button
          id="topbar-user-avatar"
          onClick={() => navigate(ROUTES.PROFILE)}
          className="w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-accent-blue font-bold text-sm hover:bg-accent-blue/30 transition-colors"
          aria-label="Profile"
        >
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </button>
      </div>
    </header>
  )
}

export default TopBar
