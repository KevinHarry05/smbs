"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, GraduationCap, Wrench, Shield, Eye, EyeOff, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DemoCredentials } from "@/components/demo-credentials"
import {
  studentLoginSchema,
  workerLoginSchema,
  adminLoginSchema,
  type StudentLoginForm,
  type WorkerLoginForm,
  type AdminLoginForm,
} from "@/lib/validations"

const roleConfig = {
  student: {
    title: "Student Portal",
    subtitle: "Access your campus issue dashboard",
    icon: GraduationCap,
    color: "from-blue-500 to-blue-600",
    departments: ["CSE", "IT", "EEE", "ECE", "ADS", "AML", "MECH"],
    schema: studentLoginSchema,
  },
  worker: {
    title: "Worker Dashboard",
    subtitle: "Manage and resolve campus issues",
    icon: Wrench,
    color: "from-green-500 to-green-600",
    departments: ["Plumber", "Electrical", "Carpenter", "General"],
    schema: workerLoginSchema,
  },
  admin: {
    title: "Admin Control Panel",
    subtitle: "Oversee campus operations",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
    departments: [],
    schema: adminLoginSchema,
  },
}

export default function LoginPage() {
  const router = useRouter()
  const params = useParams()
  const role = params.role as string
  const config = roleConfig[role as keyof typeof roleConfig]

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<StudentLoginForm | WorkerLoginForm | AdminLoginForm>({
    resolver: zodResolver(config?.schema || studentLoginSchema),
    defaultValues:
      role === "admin" ? { name: "", password: "" } : { name: "", email: "", password: "", department: "" },
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)

    try {
      // Basic validation check
      if (role !== "admin" && (!data.name || !data.email || !data.password || !data.department)) {
        toast.error("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      if (role === "admin" && (!data.name || !data.password)) {
        toast.error("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data in localStorage for demo purposes
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          role,
          ...data,
        }),
      )

      toast.success(`Welcome ${data.name}!`, {
        description: "Login successful. Redirecting to your dashboard...",
      })

      setIsLoading(false)

      // Redirect to role-specific dashboard
      setTimeout(() => {
        router.push(`/dashboard/${role}`)
      }, 1000)
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      })
      setIsLoading(false)
    }
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Invalid role specified</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4"
      >
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Button>
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-20 h-20 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                <config.icon className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">{config.title}</CardTitle>
              <CardDescription className="text-base">{config.subtitle}</CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {role === "admin" ? (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter admin name"
                              className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {config.departments.length > 0 && (
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                <SelectValue placeholder="Select your department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {config.departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-12 bg-gradient-to-r ${config.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-base font-medium`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      `Sign In to ${config.title}`
                    )}
                  </Button>
                </form>
              </Form>

              <DemoCredentials role={role} />

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">Secure login powered by advanced encryption</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
