import React from 'react'

// LoadingState component - displays loading indicators and progress
interface LoadingStateProps {
  message?: string
  progress?: number
  showProgress?: boolean
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Processing your content...",
  progress = 0,
  showProgress = false 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      {/* Animated Spinner */}
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
      </div>
      
      {/* Loading Message */}
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-700">{message}</p>
        <p className="text-sm text-gray-500">This may take a few moments</p>
      </div>
      
      {/* Progress Bar */}
      {showProgress && (
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Processing Steps */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <span>Analyzing content structure</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span>Applying localization rules</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span>Generating final output</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingState