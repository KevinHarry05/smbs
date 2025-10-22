"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { WorkerLayout } from "@/components/layouts/worker-layout"
import { CheckCircle, Clock, AlertTriangle, MapPin, User, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockTickets = [
  {
    id: "ISS001",
    description: "Broken AC in Room 301",
    status: "assigned",
    category: "Moderate",
    location: "Academic Block A",
    studentName: "Alice Johnson",
    date: "2024-01-15",
    escalated: false,
    image: "/placeholder.svg?height=200&width=300",
    eta: null,
  },
  {
    id: "ISS002",
    description: "Leaking pipe in washroom",
    status: "in-progress",
    category: "Severe",
    location: "Hostel Block B",
    studentName: "Bob Smith",
    date: "2024-01-14",
    escalated: true,
    image: "/placeholder.svg?height=200&width=300",
    eta: "2 hours",
  },
  {
    id: "ISS003",
    description: "Flickering lights in corridor",
    status: "assigned",
    category: "Low",
    location: "Library",
    studentName: "Carol Davis",
    date: "2024-01-13",
    escalated: false,
    image: "/placeholder.svg?height=200&width=300",
    eta: null,
  },
]

export default function WorkerIssuesPage() {
  const { toast } = useToast()
  const [tickets, setTickets] = useState(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [etaInput, setEtaInput] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
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

  const handleAcceptTicket = (ticketId: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: "in-progress" } : ticket)),
    )
    toast({
      title: "Ticket Accepted",
      description: "You have accepted this ticket and it's now in progress.",
    })
  }

  const handleSetETA = (ticketId: string, eta: string) => {
    if (!eta.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid ETA.",
        variant: "destructive",
      })
      return
    }

    setTickets((prevTickets) => prevTickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, eta } : ticket)))
    toast({
      title: "ETA Set",
      description: `ETA has been set to ${eta}.`,
    })
    setEtaInput("")
  }

  const handleCompleteTicket = (ticketId: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: "completed" } : ticket)),
    )
    toast({
      title: "Ticket Completed",
      description: "The ticket has been marked as completed.",
    })
  }

  return (
    <WorkerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Issues Raised</h1>
            <p className="text-gray-600 mt-2">Manage your assigned tickets and track progress</p>
          </div>

          {/* Tickets List */}
          <div className="space-y-6">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Ticket Image */}
                      <div className="lg:w-64 flex-shrink-0">
                        <img
                          src={ticket.image || "/placeholder.svg"}
                          alt="Issue"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Ticket Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(ticket.status)}
                              <h3 className="font-semibold text-xl">{ticket.description}</h3>
                              {ticket.escalated && (
                                <Badge variant="destructive" className="animate-pulse">
                                  ESCALATED
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2 mb-3">
                              <Badge className={getCategoryColor(ticket.category)}>{ticket.category}</Badge>
                              <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("-", " ")}</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Ticket ID:</span>
                            <span>{ticket.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{ticket.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Reported by {ticket.studentName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{ticket.date}</span>
                          </div>
                          {ticket.eta && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>ETA: {ticket.eta}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          {ticket.status === "assigned" && (
                            <Button
                              onClick={() => handleAcceptTicket(ticket.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              Accept Ticket
                            </Button>
                          )}

                          {ticket.status === "in-progress" && (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">Set ETA</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Set Estimated Time</DialogTitle>
                                    <DialogDescription>
                                      Provide an estimated completion time for this ticket.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="eta">ETA</Label>
                                      <Input
                                        id="eta"
                                        placeholder="e.g., 2 hours, 1 day, etc."
                                        value={etaInput}
                                        onChange={(e) => setEtaInput(e.target.value)}
                                      />
                                    </div>
                                    <Button onClick={() => handleSetETA(ticket.id, etaInput)} className="w-full">
                                      Set ETA
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Button
                                onClick={() => handleCompleteTicket(ticket.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                Submit as Completed
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {tickets.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No tickets assigned to you at the moment.</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </WorkerLayout>
  )
}
