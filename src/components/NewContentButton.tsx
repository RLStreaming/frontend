import React from 'react'

// NewContentButton component - displays a styled button for creating new content
interface NewContentButtonProps {
  onClick?: () => void
}

const NewContentButton: React.FC<NewContentButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-full border border-gray-300 transition-colors duration-200"
    >
      New content
    </button>
  )
}

export default NewContentButton