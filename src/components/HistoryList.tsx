import React from 'react'

// HistoryList component - displays a list of previous content localization sessions
interface HistoryItem {
  id: string
  title: string
  date: string
  status: 'completed' | 'draft' | 'processing'
}

interface HistoryListProps {
  items?: HistoryItem[]
  onSelectItem?: (id: string) => void
}

const HistoryList: React.FC<HistoryListProps> = ({ 
  items = [
    { id: '1', title: 'Marketing Blog Post', date: '2 hours ago', status: 'completed' },
    { id: '2', title: 'Product Description', date: '1 day ago', status: 'completed' },
    { id: '3', title: 'Social Media Content', date: '3 days ago', status: 'draft' },
    { id: '4', title: 'Email Newsletter', date: '1 week ago', status: 'completed' },
  ], 
  onSelectItem 
}) => {
  const getStatusColor = (status: HistoryItem['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      case 'draft': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium text-gray-700 mb-3 px-2">Recent History</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem?.(item.id)}
            className="p-3 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-800 truncate flex-1">
                {item.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryList