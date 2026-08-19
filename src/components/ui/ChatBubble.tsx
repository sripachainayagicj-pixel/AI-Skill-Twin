import React from 'react'
import type { ChatMessage } from '../../types'
import { formatRelativeTime } from '../../utils/formatters'
import { Bot, User } from 'lucide-react'

interface ChatBubbleProps {
  message: ChatMessage
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-accent-blue' : 'bg-bg-elevated border border-border'}`}>
        {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-accent-blue" />}
      </div>
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${isUser
          ? 'bg-accent-blue text-white rounded-tr-sm'
          : 'bg-bg-elevated border border-border text-text-primary rounded-tl-sm'
        }`}>
          {message.content}
        </div>
        <span className="text-text-muted text-xs">{formatRelativeTime(message.timestamp)}</span>
      </div>
    </div>
  )
}

export const TypingIndicator: React.FC = () => (
  <div className="flex gap-3 animate-fade-in">
    <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center shrink-0">
      <Bot size={16} className="text-accent-blue" />
    </div>
    <div className="bg-bg-elevated border border-border px-4 py-3 rounded-xl rounded-tl-sm">
      <div className="flex gap-1 items-center">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  </div>
)

export default ChatBubble
