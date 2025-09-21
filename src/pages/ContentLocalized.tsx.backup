"use client"
import React, { useState } from 'react'
import SideNavBar from '../components/SideNavBar'
import DropZone from '../components/DropZone'
import StyleButton from '../components/StyleButton'
import ChatBox from '../components/ChatBox'
import LoadingState from '../components/LoadingState'

// ContentLocalized page - main interface for content localization (first wireframe)
const ContentLocalized: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedStyle, setSelectedStyle] = useState<string>('professional')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleNewContent = () => {
    setSelectedFiles([])
    setSelectedStyle('professional')
    setIsProcessing(false)
  }

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files)
  }

  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId)
  }

  const handleSendMessage = (message: string) => {
    console.log('Processing message:', message)
    setIsProcessing(true)
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      // Navigate to output page or show results
    }, 3000)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <SideNavBar onNewContent={handleNewContent} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Localization</h1>
              <p className="text-gray-600 mt-1">Upload your content and customize the localization settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {isProcessing ? (
            <LoadingState 
              message="Localizing your content..."
              showProgress={true}
              progress={65}
            />
          ) : (
            <div className="max-w-4xl mx-auto p-8 space-y-8">
              {/* File Upload Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Content</h2>
                <DropZone 
                  onFileSelect={handleFileSelect}
                  maxFiles={10}
                />
              </section>

              {/* Style Selection Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Customize Style</h2>
                <StyleButton 
                  selectedStyle={selectedStyle}
                  onStyleChange={handleStyleChange}
                />
              </section>

              {/* Instructions Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Instructions</h2>
                <ChatBox 
                  onSendMessage={handleSendMessage}
                  placeholder="Describe any specific requirements for your localization (target audience, tone, specific terminology, etc.)"
                  disabled={selectedFiles.length === 0}
                />
              </section>

              {/* Action Buttons */}
              <section className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-end space-x-4">
                  <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Save Draft
                  </button>
                  <button 
                    onClick={() => handleSendMessage("Process with current settings")}
                    disabled={selectedFiles.length === 0}
                    className={`
                      px-8 py-2 rounded-lg font-medium transition-colors
                      ${selectedFiles.length === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }
                    `}
                  >
                    Start Localization
                  </button>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ContentLocalized