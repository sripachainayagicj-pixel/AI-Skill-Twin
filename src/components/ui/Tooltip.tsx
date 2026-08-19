import React, { useState, useRef } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'top' }) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={`absolute z-50 ${sideClasses[side]} pointer-events-none`}>
          <div className="bg-bg-elevated border border-border text-text-primary text-xs px-2.5 py-1.5 rounded-md shadow-elevated whitespace-nowrap animate-fade-in">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
