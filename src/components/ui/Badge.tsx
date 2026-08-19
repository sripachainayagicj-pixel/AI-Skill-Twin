import React from 'react'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'blue' | 'muted' | 'purple'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  danger: 'bg-danger/10 text-danger border border-danger/20',
  blue: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20',
  muted: 'bg-bg-elevated text-text-muted border border-border',
  purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
}

const Badge: React.FC<BadgeProps> = ({ variant = 'muted', children, className = '' }) => {
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
