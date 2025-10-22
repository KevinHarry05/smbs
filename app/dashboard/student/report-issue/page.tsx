"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StudentLayout } from "@/components/layouts/student-layout"
import { ImageUpload } from "@/components/image-upload"
import { AlertTriangle, CheckCircle, Loader2, Camera, MapPin, FileText, Info } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { reportIssueSchema, type ReportIssueForm } from "@/lib/validations"

const categoryConfig = {
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
}

const locationSuggestions = [
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
]

export default function ReportIssuePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<ReportIssueForm>({
    resolver: zodResolver(reportIssueSchema),
    defaultValues: {
      description: "",
      location: "",
      category: undefined,
      image: null,
    },
  })

  const selectedCategory = form.watch("category")

  const onSubmit = async (data: ReportIssueForm) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const ticketId =
        "ISS" +
        Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")

      toast.success("Issue Reported Successfully!", {
        description: `Your ticket ID is ${ticketId}. You can track its progress in the Issue Status page.`,
        duration: 5000,
      })

      // Reset form
      form.reset()
      setImagePreview(null)
      setIsSubmitting(false)

      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard/student")
      }, 2000)
    } catch (error) {
      toast.error("Failed to submit issue", {
        description: "Please try again or contact support if the problem persists.",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl font-bold text-foreground mb-2"
            >
              Report New Issue
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted-foreground"
            >
              Help us maintain our campus by reporting issues you encounter. Provide detailed information for faster
              resolution.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Issue Details
                </CardTitle>
                <CardDescription>
                  Please provide as much detail as possible to help us resolve the issue quickly and efficiently
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Issue Description *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the issue in detail... (e.g., 'The air conditioning unit in Room 301 is not working and making loud noises. The room temperature is uncomfortably high.')"
                              className="min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="flex items-start gap-2">
                            <Info className="w-4 h-4 mt-0.5 text-muted-foreground" />
                            <span>
                              Minimum 10 characters. Be specific about what you observed, when it happened, and how it
                              affects you.
                            </span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location *
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input
                                placeholder="e.g., Academic Block A, Room 301 or Library, 2nd Floor"
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                              <div className="flex flex-wrap gap-2">
                                {locationSuggestions.slice(0, 6).map((suggestion) => (
                                  <Button
                                    key={suggestion}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 bg-transparent"
                                    onClick={() => field.onChange(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Be as specific as possible to help workers locate the issue quickly. Include building,
                            floor, and room number if applicable.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Severity *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                <SelectValue placeholder="Select the severity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(categoryConfig).map(([key, config]) => (
                                <SelectItem key={key} value={key}>
                                  <div className="flex items-center gap-2">
                                    <span>{config.icon}</span>
                                    <span>{key}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedCategory && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className={`p-4 rounded-lg border ${categoryConfig[selectedCategory].bgColor} mt-2`}
                            >
                              <p className={`text-sm ${categoryConfig[selectedCategory].color} font-medium mb-2`}>
                                {categoryConfig[selectedCategory].description}
                              </p>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Examples:</span>{" "}
                                {categoryConfig[selectedCategory].examples.join(", ")}
                              </div>
                            </motion.div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Upload Image (Optional)
                          </FormLabel>
                          <FormControl>
                            <ImageUpload
                              onImageChange={(file) => {
                                field.onChange(file)
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (e) => setImagePreview(e.target?.result as string)
                                  reader.readAsDataURL(file)
                                } else {
                                  setImagePreview(null)
                                }
                              }}
                              currentImage={field.value}
                              maxSize={10}
                            />
                          </FormControl>
                          <FormDescription className="flex items-start gap-2">
                            <Info className="w-4 h-4 mt-0.5 text-muted-foreground" />
                            <span>
                              Adding a photo helps workers understand the issue better and resolve it faster. Supports
                              PNG, JPG, GIF, WebP up to 10MB.
                            </span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting Issue...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                            Submit Issue Report
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard/student")}
                        className="flex-1 h-12 hover:bg-muted/50 transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </StudentLayout>
  )
}
