import React from 'react'
import type { Proficiency } from '../../types'

interface SkillTagProps {
  name: string
  proficiency?: Proficiency
  onRemove?: () => void
}

const proficiencyColors: Record<Proficiency, string> = {
  Beginner: 'bg-bg-elevated text-text-muted border-border',
  Intermediate: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
  Advanced: 'bg-warning/10 text-warning border-warning/20',
  Expert: 'bg-success/10 text-success border-success/20',
}

const SkillTag: React.FC<SkillTagProps> = ({ name, proficiency, onRemove }) => {
  const colorClass = proficiency ? proficiencyColors[proficiency] : 'bg-bg-elevated text-text-secondary border-border'
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      {name}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:text-danger transition-colors ml-0.5"
          type="button"
          aria-label={`Remove ${name}`}
        >
          ×
        </button>
      )}
    </span>
  )
}

export default SkillTag
