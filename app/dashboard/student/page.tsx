"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  TrendingUp,
  Activity,
  BarChart3,
  Camera,
  MapPin,
} from "lucide-react"
import { StudentLayout } from "@/components/layouts/student-layout"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Enhanced mock data
const mockStats = {
  totalIssues: 15,
  resolved: 10,
  inProgress: 4,
  pending: 1,
  avgResolutionTime: "2.3 days",
  satisfactionRate: 94,
}

const mockChartData = [
  { month: "Jan", issues: 4, resolved: 3, pending: 1 },
  { month: "Feb", issues: 3, resolved: 2, pending: 1 },
  { month: "Mar", issues: 5, resolved: 4, pending: 1 },
  { month: "Apr", issues: 3, resolved: 1, pending: 2 },
]

const mockTrendData = [
  { week: "Week 1", resolved: 2, reported: 3 },
  { week: "Week 2", resolved: 4, reported: 2 },
  { week: "Week 3", resolved: 3, reported: 4 },
  { week: "Week 4", resolved: 5, reported: 3 },
]

const mockPieData = [
  { name: "Resolved", value: 10, color: "#10b981" },
  { name: "In Progress", value: 4, color: "#f59e0b" },
  { name: "Pending", value: 1, color: "#ef4444" },
]

const mockRecentIssues = [
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
    image: "/placeholder.svg?height=100&width=100&text=Light+Issue",
  },
]

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/")
    }
  }, [router])

  if (!user) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Severe":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50 dark:bg-red-900/10"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10"
      default:
        return "border-l-green-500 bg-green-50/50 dark:bg-green-900/10"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}! 👋</h1>
                <p className="text-muted-foreground">
                  Here's an overview of your campus issue reports and their current status
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>System Online</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Real-time Updates</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <Button
                  onClick={() => router.push("/dashboard/student/report-issue")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Report New Issue
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Issues</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{mockStats.totalIssues}</div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">{mockStats.resolved}</div>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    {Math.round((mockStats.resolved / mockStats.totalIssues) * 100)}% resolution rate
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                    In Progress
                  </CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{mockStats.inProgress}</div>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center mt-1">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Avg. {mockStats.avgResolutionTime} ETA
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Satisfaction
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {mockStats.satisfactionRate}%
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    User satisfaction rate
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Issue Trends
                  </CardTitle>
                  <CardDescription>Monthly issue reports and resolutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="issues" fill="#3b82f6" name="Reported" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Weekly Performance
                  </CardTitle>
                  <CardDescription>Resolution trends over the past month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="resolved"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="reported"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/5 to-primary/10 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Frequently used actions for managing your issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button
                    onClick={() => router.push("/dashboard/student/report-issue")}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                    size="lg"
                  >
                    <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Report New Issue
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard/student/issue-status")}
                    className="border-2 hover:bg-muted/50 transition-all duration-300 group"
                    size="lg"
                  >
                    <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    View All Issues
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 hover:bg-muted/50 transition-all duration-300 group bg-transparent"
                    size="lg"
                  >
                    <Camera className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Upload Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Recent Issues */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Recent Issues
                </CardTitle>
                <CardDescription>Your latest reported issues and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentIssues.map((issue, index) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                      className={`flex items-start gap-4 p-4 border-l-4 ${getPriorityColor(issue.priority)} rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group`}
                      onClick={() => router.push("/dashboard/student/issue-status")}
                    >
                      {/* Issue Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={issue.image || "/placeholder.svg"}
                          alt="Issue"
                          className="w-16 h-16 object-cover rounded-lg border-2 border-muted group-hover:border-primary/50 transition-colors duration-200"
                        />
                      </div>

                      {/* Issue Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(issue.status)}
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                              {issue.description}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{issue.location}</span>
                          </div>
                          <div>
                            <span className="font-medium">ID:</span> {issue.id}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {issue.date}
                          </div>
                          <div>
                            <span className="font-medium">ETA:</span> {issue.eta}
                          </div>
                          {issue.workerName && (
                            <div className="sm:col-span-2">
                              <span className="font-medium">Worker:</span> {issue.workerName}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(issue.category)} variant="secondary">
                            {issue.category}
                          </Badge>
                          <Badge className={getStatusColor(issue.status)} variant="secondary">
                            {issue.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard/student/issue-status")}
                    className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    View All Issues
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </StudentLayout>
  )
}
