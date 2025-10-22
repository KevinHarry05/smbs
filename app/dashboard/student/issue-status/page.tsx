"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StudentLayout } from "@/components/layouts/student-layout"
import { CheckCircle, Clock, AlertCircle, Search, X, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockIssues = [
  {
    id: "ISS001",
    description: "Broken AC in Room 301",
    status: "solved",
    category: "Moderate",
    location: "Academic Block A",
    date: "2024-01-15",
    eta: "2 days",
    workerName: "John Smith",
  },
  {
    id: "ISS002",
    description: "Leaking pipe in washroom",
    status: "in-progress",
    category: "Severe",
    location: "Hostel Block B",
    date: "2024-01-14",
    eta: "1 day",
    workerName: "Mike Johnson",
  },
  {
    id: "ISS003",
    description: "Flickering lights in corridor",
    status: "not-committed",
    category: "Low",
    location: "Library",
    date: "2024-01-13",
    eta: "Pending assignment",
    workerName: null,
  },
  {
    id: "ISS004",
    description: "Broken window in classroom",
    status: "solved",
    category: "Moderate",
    location: "Academic Block C",
    date: "2024-01-12",
    eta: "Completed",
    workerName: "David Wilson",
  },
]

export default function IssueStatusPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [issues, setIssues] = useState(mockIssues)

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "solved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Severe":
        return "bg-red-100 text-red-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const handleTicketAction = (issueId: string, action: "completed" | "not-completed") => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) => {
        if (issue.id === issueId) {
          if (action === "completed") {
            toast({
              title: "Success",
              description: "Thank you for confirming the issue is resolved!",
            })
            return { ...issue, status: "closed" as const }
          } else {
            toast({
              title: "Issue Escalated",
              description: "The issue has been escalated for further review.",
              variant: "destructive",
            })
            return { ...issue, status: "escalated" as const }
          }
        }
        return issue
      }),
    )
  }

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Issue Status</h1>
            <p className="text-gray-600 mt-2">Track the progress of your reported issues</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="not-committed">Not Committed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="solved">Solved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Issues List */}
          <div className="space-y-4">
            {filteredIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(issue.status)}
                          <h3 className="font-semibold text-lg">{issue.description}</h3>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Ticket ID:</span> {issue.id}
                          </p>
                          <p>
                            <span className="font-medium">Location:</span> {issue.location}
                          </p>
                          <p>
                            <span className="font-medium">Date Reported:</span> {issue.date}
                          </p>
                          <p>
                            <span className="font-medium">ETA:</span> {issue.eta}
                          </p>
                          {issue.workerName && (
                            <p>
                              <span className="font-medium">Assigned Worker:</span> {issue.workerName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex gap-2">
                          <Badge className={getCategoryColor(issue.category)}>{issue.category}</Badge>
                          <Badge className={getStatusColor(issue.status)}>{issue.status.replace("-", " ")}</Badge>
                        </div>

                        {issue.status === "solved" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleTicketAction(issue.id, "completed")}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Completed
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleTicketAction(issue.id, "not-completed")}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Not Completed
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredIssues.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No issues found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </StudentLayout>
  )
}
