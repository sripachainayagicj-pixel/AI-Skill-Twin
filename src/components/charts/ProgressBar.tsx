import React from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'blue' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  showLabel?: boolean
  label?: string
}

const colorMap = {
  blue: 'bg-accent-blue',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value, max = 100, color = 'blue', size = 'md', showLabel = false, label,
}) => {
  const pct = Math.min((value / max) * 100, 100)
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5'

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-text-secondary text-xs">{label}</span>}
          {showLabel && <span className="text-text-secondary text-xs font-mono">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`w-full bg-bg-elevated rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${colorMap[color]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
