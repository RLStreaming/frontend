import React from 'react'
import NewContentButton from './NewContentButton'
import HistoryList from './HistoryList'

// SideNavBar component - displays the left sidebar with navigation and history
interface SideNavBarProps {
  onNewContent?: () => void
}

const SideNavBar: React.FC<SideNavBarProps> = ({ onNewContent }) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Content Localizer</h1>
        <NewContentButton onClick={onNewContent} />
      </div>
      
      {/* History Section */}
      <div className="flex-1 overflow-hidden">
        <HistoryList />
      </div>
    </div>
  )
}

export default SideNavBar