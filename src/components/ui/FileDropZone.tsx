import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File } from 'lucide-react'

interface FileDropZoneProps {
  onFileDrop: (file: File) => void
  accept?: Record<string, string[]>
  label?: string
  sublabel?: string
  disabled?: boolean
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFileDrop,
  accept = { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
  label = 'Drop your file here',
  sublabel = 'PDF or DOCX up to 10MB',
  disabled = false,
}) => {
  const onDrop = useCallback((files: File[]) => {
    if (files.length > 0) onFileDrop(files[0])
  }, [onFileDrop])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept, disabled, maxFiles: 1, maxSize: 10 * 1024 * 1024,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-all duration-150
        ${isDragActive ? 'border-accent-blue bg-accent-blue/5' : 'border-border hover:border-accent-blue/50 hover:bg-bg-elevated/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isDragActive ? 'bg-accent-blue/20' : 'bg-bg-elevated'}`}>
        {isDragActive ? <File className="text-accent-blue" size={28} /> : <Upload className="text-text-muted" size={28} />}
      </div>
      <div className="text-center">
        <p className="text-text-primary font-medium text-sm">
          {isDragActive ? 'Drop to upload' : label}
        </p>
        <p className="text-text-muted text-xs mt-1">{sublabel}</p>
      </div>
      <span className="text-accent-blue text-xs font-medium border border-accent-blue/30 px-3 py-1 rounded-full">
        Browse files
      </span>
    </div>
  )
}

export default FileDropZone
