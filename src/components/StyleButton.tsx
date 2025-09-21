import React from 'react'

// StyleButton component - allows users to select different writing styles
interface StyleOption {
  id: string
  name: string
  description: string
  icon?: string
}

interface StyleButtonProps {
  selectedStyle?: string
  onStyleChange?: (styleId: string) => void
  styles?: StyleOption[]
}

const StyleButton: React.FC<StyleButtonProps> = ({ 
  selectedStyle, 
  onStyleChange,
  styles = [
    { id: 'Malay', name: 'Malay', description: 'malay language' },
    { id: 'Chinese', name: 'Chinese', description: 'chinese language' },
    { id: 'Mix', name: 'Mix', description: 'mix of malay and chinese language' },
  ]
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Writing Style
      </label>
      <div className="grid grid-cols-2 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange?.(style.id)}
            className={`
              p-4 rounded-lg border-2 text-left transition-all
              ${selectedStyle === style.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }
            `}
          >
            <div className="font-medium text-sm">{style.name}</div>
            <div className="text-xs mt-1 opacity-75">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StyleButton