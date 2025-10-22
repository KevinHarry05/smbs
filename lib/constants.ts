// Application constants
export const APP_CONFIG = {
  name: "Campus Issue Tracker",
  description: "Comprehensive campus issue management system",
  version: "1.0.0",
} as const

// Role configurations
export const ROLE_CONFIG = {
  student: {
    title: "Student Portal",
    subtitle: "Access your campus issue dashboard",
    icon: "GraduationCap",
    color: "from-blue-500 to-blue-600",
    departments: ["CSE", "IT", "EEE", "ECE", "ADS", "AML", "MECH"],
  },
  worker: {
    title: "Worker Dashboard", 
    subtitle: "Manage and resolve campus issues",
    icon: "Wrench",
    color: "from-green-500 to-green-600",
    departments: ["Plumber", "Electrical", "Carpenter", "General"],
  },
  admin: {
    title: "Admin Control Panel",
    subtitle: "Oversee campus operations", 
    icon: "Shield",
    color: "from-purple-500 to-purple-600",
    departments: [],
  },
} as const

// Issue categories
export const ISSUE_CATEGORIES = {
  Severe: {
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
    description: "🚨 Urgent attention required - Safety hazard or critical infrastructure failure",
    icon: "🚨",
    examples: ["Water leaks", "Electrical hazards", "Structural damage", "Safety equipment failure"],
  },
  Moderate: {
    color: "text-yellow-600", 
    bgColor: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
    description: "⚠️ Should be addressed soon - Affects daily operations",
    icon: "⚠️",
    examples: ["AC/Heating issues", "Broken furniture", "Plumbing problems", "Equipment malfunction"],
  },
  Low: {
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800", 
    description: "ℹ️ Can be addressed when convenient - Minor inconvenience",
    icon: "ℹ️",
    examples: ["Light bulb replacement", "Paint touch-ups", "Minor repairs", "Cosmetic issues"],
  },
} as const

// Status configurations
export const STATUS_CONFIG = {
  resolved: {
    icon: "CheckCircle",
    color: "text-green-500",
    bgColor: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    label: "Resolved",
  },
  "in-progress": {
    icon: "Clock", 
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    label: "In Progress",
  },
  pending: {
    icon: "AlertCircle",
    color: "text-red-500", 
    bgColor: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    label: "Pending",
  },
  "not-committed": {
    icon: "AlertTriangle",
    color: "text-orange-500",
    bgColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400", 
    label: "Not Committed",
  },
} as const

// Location suggestions
export const LOCATION_SUGGESTIONS = [
  "Academic Block A",
  "Academic Block B", 
  "Academic Block C",
  "Library - Main Floor",
  "Library - 2nd Floor",
  "Hostel Block A",
  "Hostel Block B",
  "Cafeteria",
  "Sports Complex",
  "Auditorium",
  "Computer Lab",
  "Chemistry Lab",
  "Physics Lab",
  "Parking Area",
] as const

// Demo credentials
export const DEMO_CREDENTIALS = {
  student: {
    name: "John Doe",
    email: "john.doe@campus.edu", 
    password: "student123",
    department: "CSE",
  },
  worker: {
    name: "Mike Johnson",
    email: "mike.johnson@campus.edu",
    password: "worker123", 
    department: "Plumber",
  },
  admin: {
    name: "Admin User",
    password: "admin123",
  },
} as const
