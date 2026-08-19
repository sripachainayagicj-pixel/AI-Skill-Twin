import React, { useEffect, useState } from 'react'

interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  sublabel?: string
  glow?: boolean
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  value, max = 100, size = 120, strokeWidth = 10,
  color = '#2F81F7', label, sublabel, glow = false,
}) => {
  const [displayed, setDisplayed] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min((displayed / max) * 100, 100)
  const offset = circumference - (pct / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {glow && (
        <div
          className="absolute twin-pulse-ring rounded-full"
          style={{ inset: -20, background: `radial-gradient(ellipse at center, rgba(47,129,247,0.18) 0%, transparent 70%)` }}
        />
      )}
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#30363D" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {label && <span className="font-mono font-bold text-text-primary" style={{ fontSize: size * 0.18 }}>{label}</span>}
        {sublabel && <span className="text-text-muted" style={{ fontSize: size * 0.09 }}>{sublabel}</span>}
      </div>
    </div>
  )
}

export default ProgressRing
