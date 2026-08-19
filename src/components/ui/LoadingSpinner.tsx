import React from 'react'

interface LoadingSpinnerProps {
  fullPage?: boolean
  size?: number
  label?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullPage = false, size = 24, label,
}) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <svg
        className="animate-spin text-accent-blue"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {label && <p className="text-text-secondary text-sm">{label}</p>}
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
