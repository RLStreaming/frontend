import React, { useState } from 'react'

// ChatBox component - handles user input and instructions for content localization
interface ChatBoxProps {
  onSendMessage?: (message: string) => void
  placeholder?: string
  disabled?: boolean
}

const ChatBox: React.FC<ChatBoxProps> = ({ 
  onSendMessage, 
  placeholder = "Enter your localization instructions...",
  disabled = false 
}) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Localization Instructions
      </label>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-lg resize-none
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${disabled ? 'text-gray-500' : 'text-gray-900'}
            `}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {message.length}/500
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </div>
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`
              px-6 py-2 rounded-lg font-medium transition-colors
              ${!message.trim() || disabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox