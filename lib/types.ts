// User types
export interface User {
  id: string
  name: string
  email?: string
  department?: string
  role: 'student' | 'worker' | 'admin'
}

// Issue types
export interface Issue {
  id: string
  description: string
  status: 'resolved' | 'in-progress' | 'pending' | 'not-committed'
  category: 'Severe' | 'Moderate' | 'Low'
  location: string
  date: string
  priority: 'high' | 'medium' | 'low'
  eta?: string
  workerName?: string
  studentName?: string
  image?: string
  escalated?: boolean
}

// Worker types
export interface Worker {
  id: string
  name: string
  department: string
  avgResolutionTime: string
  escalations: number
  successRate: number
  ticketsResolved: number
  penalties: Penalty[]
  totalPenalties: number
  lastPenalty: string
}

// Penalty types
export interface Penalty {
  id: string
  reason: string
  date: string
  severity: 'Minor' | 'Major'
  description?: string
}

// Form types
export interface LoginForm {
  name: string
  email?: string
  password: string
  department?: string
}

export interface ReportIssueForm {
  description: string
  location: string
  category: 'Severe' | 'Moderate' | 'Low'
  image?: File | null
}

export interface PenaltyForm {
  reason: string
  severity: 'Minor' | 'Major'
  description?: string
}

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon: string
  description: string
}

// Stats types
export interface Stats {
  totalIssues?: number
  resolved?: number
  inProgress?: number
  pending?: number
  avgResolutionTime?: string
  satisfactionRate?: number
  assigned?: number
  escalated?: number
  notCommitted?: number
}

// Chart data types
export interface ChartData {
  month?: string
  week?: string
  issues?: number
  resolved?: number
  pending?: number
  reported?: number
}

export interface PieData {
  name: string
  value: number
  color: string
}
