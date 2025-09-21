import React, { useState } from 'react'
import SideNavBar from '../components/SideNavBar'
import Result from '../components/Result'
import LoadingState from '../components/LoadingState'

// OutputContent page - displays localization results (second wireframe)
const OutputContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [results] = useState([
    {
      language: 'Spanish (ES)',
      content: 'Bienvenido a nuestro servicio de localización de contenido. Esta herramienta te ayuda a adaptar tu contenido para diferentes mercados y audiencias de manera efectiva.',
      confidence: 0.95
    },
    {
      language: 'French (FR)', 
      content: 'Bienvenue dans notre service de localisation de contenu. Cet outil vous aide à adapter votre contenu pour différents marchés et audiences de manière efficace.',
      confidence: 0.92
    },
    {
      language: 'German (DE)',
      content: 'Willkommen bei unserem Content-Lokalisierungsservice. Dieses Tool hilft Ihnen dabei, Ihre Inhalte effektiv für verschiedene Märkte und Zielgruppen anzupassen.',
      confidence: 0.89
    }
  ])

  const handleNewContent = () => {
    // Navigate back to content input page
    window.location.href = '/content-localized'
  }

  const handleCopy = (content: string, language: string) => {
    console.log(`Copied ${language} content to clipboard`)
    // Show success toast or notification
  }

  const handleDownload = (content: string, language: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `localized-content-${language.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleRegenerateAll = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
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
              <h1 className="text-2xl font-bold text-gray-900">Localization Results</h1>
              <p className="text-gray-600 mt-1">Review and download your localized content</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleRegenerateAll}
                disabled={isLoading}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                Regenerate All
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export All
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {isLoading ? (
            <LoadingState 
              message="Regenerating localized content..."
              showProgress={true}
              progress={45}
            />
          ) : (
            <div className="max-w-6xl mx-auto p-8">
              {/* Results Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{results.length}</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(results.reduce((acc, r) => acc + (r.confidence || 0), 0) / results.length * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Avg. Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {Math.round(results.reduce((acc, r) => acc + r.content.length, 0) / 1000)}k
                    </div>
                    <div className="text-sm text-gray-600">Total Characters</div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <Result 
                  results={results}
                  isLoading={false}
                  onCopy={handleCopy}
                  onDownload={handleDownload}
                />
              </div>

              {/* Additional Actions */}
              <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="font-medium text-gray-800">Add More Languages</div>
                    <div className="text-sm text-gray-600 mt-1">Localize to additional target markets</div>
                  </button>
                  <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="font-medium text-gray-800">Refine Results</div>
                    <div className="text-sm text-gray-600 mt-1">Adjust tone and style preferences</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default OutputContent