import React, { useState, useCallback } from 'react'

interface DropZoneProps {
  onFileSelect?: (files: File[]) => void
  acceptedTypes?: string[]
  maxFiles?: number
}

const DropZone: React.FC<DropZoneProps> = ({ 
  onFileSelect, 
  acceptedTypes = ['.txt', '.doc', '.docx', '.pdf', '.jpg', '.jpeg', '.png'], 
  maxFiles = 5 
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  // Your API Gateway endpoint
  const API_URL = "https://mkce4n5.execute-api.us-east-1.amazonaws.com/upload"

  const uploadFile = async (file: File) => {
    try {
      setUploadStatus(`Uploading ${file.name}...`)

      const response = await fetch(API_URL, {
        method: "POST",
        body: file,
        headers: {
          "Content-Type": file.type, // let API Gateway/Lambda handle type
        },
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const result = await response.text()
      setUploadStatus(`✅ Uploaded: ${file.name}`)
      console.log("Upload result:", result)
    } catch (err: any) {
      console.error("Upload failed:", err)
      setUploadStatus(`❌ Failed: ${file.name}`)
    }
  }

  const handleFiles = useCallback((files: File[]) => {
    const limitedFiles = files.slice(0, maxFiles)
    setSelectedFiles(limitedFiles)
    onFileSelect?.(limitedFiles)

    // Upload each file
    limitedFiles.forEach(file => uploadFile(file))
  }, [maxFiles, onFileSelect])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [handleFiles])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }, [handleFiles])

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <div className="space-y-4">
          <div className="text-gray-400">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Drop your files here, or{' '}
              <label className="text-blue-600 hover:text-blue-500 cursor-pointer underline">
                browse
                <input
                  type="file"
                  multiple
                  accept={acceptedTypes.join(',')}
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports: {acceptedTypes.join(', ')} (max {maxFiles} files)
            </p>
          </div>
        </div>
      </div>

      {/* Selected Files Display */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-600 truncate">{file.name}</span>
              <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
            </div>
          ))}
        </div>
      )}

      {/* Upload Status */}
      {uploadStatus && (
        <div className="mt-4 text-sm text-gray-600">{uploadStatus}</div>
      )}
    </div>
  )
}

export default DropZone