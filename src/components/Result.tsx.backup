import React from 'react'

// Result component - displays the localized content output
interface LocalizedContent {
  language: string
  content: string
  confidence?: number
}

interface ResultProps {
  results?: LocalizedContent[]
  isLoading?: boolean
  onCopy?: (content: string, language: string) => void
  onDownload?: (content: string, language: string) => void
}

const Result: React.FC<ResultProps> = ({ 
  results = [], 
  isLoading = false,
  onCopy,
  onDownload 
}) => {
  const handleCopy = async (content: string, language: string) => {
    try {
      await navigator.clipboard.writeText(content)
      onCopy?.(content, language)
    } catch (err) {
      console.error('Failed to copy content:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing your content...</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-500">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p>Your localized content will appear here</p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Localized Results</h2>
      
      {results.map((result, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="font-medium text-gray-800">{result.language}</h3>
              {result.confidence && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {Math.round(result.confidence * 100)}% confidence
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopy(result.content, result.language)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                title="Copy to clipboard"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => onDownload?.(result.content, result.language)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                title="Download"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {result.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Result