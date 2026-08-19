import React from 'react'
import Button from './Button'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center mb-4 text-text-muted">
        {icon}
      </div>
      <h3 className="text-text-primary font-semibold text-base mb-2">{title}</h3>
      {description && <p className="text-text-secondary text-sm max-w-sm mb-6">{description}</p>}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
