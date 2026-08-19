import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  hover?: boolean
}

const Card: React.FC<CardProps> = ({ children, className = '', header, footer, hover = false }) => {
  return (
    <div className={`bg-bg-surface border border-border rounded-xl shadow-card ${hover ? 'hover:border-accent-blue/30 transition-colors duration-150' : ''} ${className}`}>
      {header && (
        <div className="px-5 py-4 border-b border-border">{header}</div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-4 border-t border-border bg-bg-elevated/50 rounded-b-xl">{footer}</div>
      )}
    </div>
  )
}

export default Card
