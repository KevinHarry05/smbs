"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

interface DemoCredentialsProps {
  role: string
}

export function DemoCredentials({ role }: DemoCredentialsProps) {
  const credentials = {
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
  }

  const creds = credentials[role as keyof typeof credentials]

  if (!creds) return null

  return (
    <Card className="mt-6 border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          Demo Credentials
        </CardTitle>
        <CardDescription className="text-xs">Use these credentials for testing purposes</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs">
          {Object.entries(creds).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="capitalize text-muted-foreground">{key}:</span>
              <Badge variant="secondary" className="font-mono text-xs">
                {value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
