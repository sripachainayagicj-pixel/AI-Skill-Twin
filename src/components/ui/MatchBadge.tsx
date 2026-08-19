import React from 'react'

interface MatchBadgeProps {
  percent: number
  size?: 'sm' | 'md' | 'lg'
}

const MatchBadge: React.FC<MatchBadgeProps> = ({ percent, size = 'md' }) => {
  const color = percent >= 80 ? '#3FB950' : percent >= 60 ? '#D29922' : '#F85149'
  const sizes = { sm: 40, md: 52, lg: 64 }
  const r = sizes[size] / 2 - 4
  const circumference = 2 * Math.PI * r
  const offset = circumference - (percent / 100) * circumference
  const dim = sizes[size]

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="#30363D" strokeWidth="3" />
        <circle
          cx={dim / 2} cy={dim / 2} r={r} fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <span
        className="absolute font-mono font-medium text-text-primary"
        style={{ fontSize: size === 'sm' ? 9 : size === 'md' ? 11 : 13, color }}
      >
        {percent}%
      </span>
    </div>
  )
}

export default MatchBadge
