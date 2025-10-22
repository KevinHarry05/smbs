import type { Issue, Worker, Stats, ChartData, PieData } from '@/lib/types'

// Mock stats data
export const mockStats: Record<string, Stats> = {
  student: {
    totalIssues: 15,
    resolved: 10,
    inProgress: 4,
    pending: 1,
    avgResolutionTime: "2.3 days",
    satisfactionRate: 94,
  },
  worker: {
    assigned: 8,
    resolved: 15,
    inProgress: 3,
  },
  admin: {
    totalResolved: 45,
    pending: 12,
    notCommitted: 8,
    escalated: 3,
  },
}

// Mock chart data
export const mockChartData: ChartData[] = [
  { month: "Jan", issues: 4, resolved: 3, pending: 1 },
  { month: "Feb", issues: 3, resolved: 2, pending: 1 },
  { month: "Mar", issues: 5, resolved: 4, pending: 1 },
  { month: "Apr", issues: 3, resolved: 1, pending: 2 },
]

export const mockTrendData: ChartData[] = [
  { week: "Week 1", resolved: 2, reported: 3 },
  { week: "Week 2", resolved: 4, reported: 2 },
  { week: "Week 3", resolved: 3, reported: 4 },
  { week: "Week 4", resolved: 5, reported: 3 },
]

export const mockPieData: PieData[] = [
  { name: "Resolved", value: 10, color: "#10b981" },
  { name: "In Progress", value: 4, color: "#f59e0b" },
  { name: "Pending", value: 1, color: "#ef4444" },
]

// Mock issues data
export const mockIssues: Issue[] = [
  {
    id: "ISS001",
    description: "Broken AC in Room 301 - Making loud noises and not cooling properly",
    status: "resolved",
    category: "Moderate",
    location: "Academic Block A, Room 301",
    date: "2024-01-15",
    priority: "medium",
    eta: "Completed",
    workerName: "John Smith",
    studentName: "Alice Johnson",
    image: "/placeholder.svg?height=100&width=100&text=AC+Issue",
  },
  {
    id: "ISS002", 
    description: "Leaking pipe in washroom causing water damage",
    status: "in-progress",
    category: "Severe",
    location: "Hostel Block B, 2nd Floor Washroom",
    date: "2024-01-14",
    priority: "high",
    eta: "2 hours",
    workerName: "Mike Johnson",
    studentName: "Bob Smith",
    image: "/placeholder.svg?height=100&width=100&text=Pipe+Leak",
  },
  {
    id: "ISS003",
    description: "Flickering lights in corridor affecting visibility", 
    status: "pending",
    category: "Low",
    location: "Library, Main Corridor",
    date: "2024-01-13",
    priority: "low",
    eta: "Pending assignment",
    workerName: null,
    studentName: "Carol Davis",
    image: "/placeholder.svg?height=100&width=100&text=Light+Issue",
  },
  {
    id: "ISS004",
    description: "Broken window in classroom",
    status: "resolved", 
    category: "Moderate",
    location: "Academic Block C",
    date: "2024-01-12",
    priority: "medium",
    eta: "Completed",
    workerName: "David Wilson",
    studentName: "Diana Prince",
    image: "/placeholder.svg?height=100&width=100&text=Window+Issue",
  },
]

// Mock workers data
export const mockWorkers: Worker[] = [
  {
    id: "W001",
    name: "John Smith",
    department: "Plumber",
    avgResolutionTime: "2.5 hours",
    escalations: 2,
    successRate: 95,
    ticketsResolved: 15,
    penalties: [
      {
        id: "P001",
        reason: "Delayed response to urgent ticket",
        date: "2024-01-10",
        severity: "Minor",
      },
      {
        id: "P002", 
        reason: "Incomplete work on ticket ISS045",
        date: "2024-01-05",
        severity: "Major",
      },
    ],
    totalPenalties: 2,
    lastPenalty: "2024-01-10",
  },
  {
    id: "W002",
    name: "Mike Johnson",
    department: "Electrical", 
    avgResolutionTime: "1.8 hours",
    escalations: 1,
    successRate: 98,
    ticketsResolved: 22,
    penalties: [
      {
        id: "P003",
        reason: "Failed to set ETA for assigned ticket",
        date: "2024-01-08",
        severity: "Minor",
      },
    ],
    totalPenalties: 1,
    lastPenalty: "2024-01-08",
  },
  {
    id: "W003",
    name: "David Wilson",
    department: "Carpenter",
    avgResolutionTime: "3.2 hours", 
    escalations: 4,
    successRate: 88,
    ticketsResolved: 18,
    penalties: [],
    totalPenalties: 0,
    lastPenalty: "None",
  },
]
