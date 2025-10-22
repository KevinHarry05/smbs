import { STATUS_CONFIG } from '@/lib/constants'
import type { Issue } from '@/lib/types'

export const getStatusIcon = (status: Issue['status']) => {
  const config = STATUS_CONFIG[status]
  return config?.icon || 'AlertCircle'
}

export const getStatusColor = (status: Issue['status']) => {
  const config = STATUS_CONFIG[status]
  return config?.color || 'text-gray-500'
}

export const getStatusBgColor = (status: Issue['status']) => {
  const config = STATUS_CONFIG[status]
  return config?.bgColor || 'bg-gray-100 text-gray-800'
}

export const getStatusLabel = (status: Issue['status']) => {
  const config = STATUS_CONFIG[status]
  return config?.label || status.replace('-', ' ')
}

export const getCategoryColor = (category: Issue['category']) => {
  switch (category) {
    case 'Severe':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    case 'Moderate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getPriorityColor = (priority: Issue['priority']) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10'
    case 'medium':
      return 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10'
    case 'low':
      return 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10'
    default:
      return 'border-l-gray-500 bg-gray-50/50'
  }
}

export const getSeverityColor = (severity: 'Minor' | 'Major') => {
  switch (severity) {
    case 'Major':
      return 'bg-red-100 text-red-800'
    case 'Minor':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
