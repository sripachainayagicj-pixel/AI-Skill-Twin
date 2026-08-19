import React from 'react'
import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'
import Button from './Button'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  loading?: boolean
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen, onClose, onConfirm, title, message,
  confirmLabel = 'Confirm', loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
          <AlertTriangle className="text-danger" size={24} />
        </div>
        <div>
          <h3 className="text-text-primary font-semibold text-base mb-1">{title}</h3>
          <p className="text-text-secondary text-sm">{message}</p>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="secondary" onClick={onClose} className="flex-1" disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} className="flex-1" loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
