"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { AlertTriangle, Calendar, FileText, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockWorkers = [
  {
    id: "W001",
    name: "John Smith",
    department: "Plumber",
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
    penalties: [],
    totalPenalties: 0,
    lastPenalty: "None",
  },
]

export default function PenaltiesPage() {
  const { toast } = useToast()
  const [workers, setWorkers] = useState(mockWorkers)
  const [selectedWorker, setSelectedWorker] = useState<any>(null)
  const [penaltyForm, setPenaltyForm] = useState({
    reason: "",
    severity: "Minor",
    description: "",
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Major":
        return "bg-red-100 text-red-800"
      case "Minor":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleIssuePenalty = (workerId: string) => {
    if (!penaltyForm.reason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for the penalty.",
        variant: "destructive",
      })
      return
    }

    const newPenalty = {
      id: `P${Date.now()}`,
      reason: penaltyForm.reason,
      date: new Date().toISOString().split("T")[0],
      severity: penaltyForm.severity,
      description: penaltyForm.description,
    }

    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) => {
        if (worker.id === workerId) {
          return {
            ...worker,
            penalties: [...worker.penalties, newPenalty],
            totalPenalties: worker.totalPenalties + 1,
            lastPenalty: newPenalty.date,
          }
        }
        return worker
      }),
    )

    toast({
      title: "Penalty Issued",
      description: `Penalty has been issued to ${selectedWorker?.name}.`,
    })

    setPenaltyForm({
      reason: "",
      severity: "Minor",
      description: "",
    })
    setSelectedWorker(null)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Penalty Management</h1>
            <p className="text-gray-600 mt-2">Manage worker penalties and performance issues</p>
          </div>

          {/* Workers List */}
          <div className="space-y-6">
            {workers.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{worker.name}</CardTitle>
                        <CardDescription>{worker.department} Department</CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Penalties</p>
                          <p className="text-2xl font-bold text-red-600">{worker.totalPenalties}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedWorker(worker)} variant="destructive" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Issue Penalty
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Issue Penalty to {worker.name}</DialogTitle>
                              <DialogDescription>Provide details for the penalty being issued.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="reason">Reason *</Label>
                                <Input
                                  id="reason"
                                  placeholder="Brief reason for penalty"
                                  value={penaltyForm.reason}
                                  onChange={(e) => setPenaltyForm({ ...penaltyForm, reason: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="severity">Severity</Label>
                                <select
                                  id="severity"
                                  className="w-full p-2 border rounded-md"
                                  value={penaltyForm.severity}
                                  onChange={(e) => setPenaltyForm({ ...penaltyForm, severity: e.target.value })}
                                >
                                  <option value="Minor">Minor</option>
                                  <option value="Major">Major</option>
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="description">Additional Details</Label>
                                <Textarea
                                  id="description"
                                  placeholder="Additional details about the penalty..."
                                  value={penaltyForm.description}
                                  onChange={(e) => setPenaltyForm({ ...penaltyForm, description: e.target.value })}
                                />
                              </div>
                              <Button
                                onClick={() => handleIssuePenalty(worker.id)}
                                className="w-full"
                                variant="destructive"
                              >
                                Issue Penalty
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Last Penalty: {worker.lastPenalty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>Worker ID: {worker.id}</span>
                      </div>
                    </div>

                    {/* Penalty History */}
                    {worker.penalties.length > 0 ? (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Penalty History
                        </h4>
                        <div className="space-y-3">
                          {worker.penalties.map((penalty, penaltyIndex) => (
                            <motion.div
                              key={penalty.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + penaltyIndex * 0.1, duration: 0.3 }}
                              className="p-3 border rounded-lg bg-gray-50"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-medium text-sm">{penalty.reason}</p>
                                <Badge className={getSeverityColor(penalty.severity)}>{penalty.severity}</Badge>
                              </div>
                              <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>Penalty ID: {penalty.id}</span>
                                <span>{penalty.date}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No penalties issued to this worker</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
