"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap,
  Wrench,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  Star,
  Award,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useState } from "react"

const roles = [
  {
    id: "student",
    title: "Student Portal",
    description: "Report campus issues and track their resolution progress with real-time updates",
    icon: GraduationCap,
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
    features: ["Report Issues", "Track Progress", "View History", "Photo Upload"],
    stats: "1,200+ Active Students",
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
  },
  {
    id: "worker",
    title: "Worker Dashboard",
    description: "Manage assigned tickets, set ETAs, and update resolution status efficiently",
    icon: Wrench,
    color: "from-green-500 to-green-600",
    hoverColor: "from-green-600 to-green-700",
    features: ["Manage Tickets", "Set ETAs", "Update Status", "Performance Tracking"],
    stats: "50+ Active Workers",
    gradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
  },
  {
    id: "admin",
    title: "Admin Control",
    description: "Oversee operations, manage penalties, view analytics, and ensure system efficiency",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
    features: ["System Overview", "Penalty Management", "Analytics", "Worker Performance"],
    stats: "Complete System Control",
    gradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
  },
]

const features = [
  {
    icon: CheckCircle,
    title: "Real-time Tracking",
    description: "Monitor issue resolution progress in real-time with instant notifications and status updates",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Users,
    title: "Role-based Access",
    description: "Secure, role-specific dashboards with tailored interfaces for students, workers, and administrators",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Comprehensive analytics, performance metrics, and detailed reports for data-driven decisions",
    color: "from-purple-500 to-purple-600",
  },
]

const stats = [
  { label: "Issues Resolved", value: "2,500+", icon: CheckCircle },
  { label: "Active Users", value: "1,250+", icon: Users },
  { label: "Response Time", value: "< 2hrs", icon: Zap },
  { label: "Satisfaction Rate", value: "98%", icon: Star },
]

export default function LandingPage() {
  const router = useRouter()
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const roleCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl" />

      {/* Header */}
      <header className="absolute top-0 right-0 p-6 z-10">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <Award className="w-4 h-4 mr-2" />
                Trusted by 1000+ Campus Users
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Campus Issue
                <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                  {" "}
                  Management
                </span>
                <br />
                <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground">System</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Streamline campus maintenance with our comprehensive issue management platform. Report, track, and
                resolve campus issues with unprecedented efficiency and transparency.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Access Portal
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select your role to access your personalized dashboard with tailored features and comprehensive tools for
            efficient campus issue management
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                variants={roleCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setHoveredRole(role.id)}
                onHoverEnd={() => setHoveredRole(null)}
                className="group relative"
              >
                <Card className="relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 h-full shadow-lg hover:shadow-2xl">
                  <div
                    className={`absolute inset-0 ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <CardHeader className="text-center pb-4 relative z-10">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <role.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">{role.description}</CardDescription>
                    <div className="text-sm text-primary font-medium mt-3 bg-primary/10 px-3 py-1 rounded-full inline-block">
                      {role.stats}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 relative z-10">
                    <div className="space-y-3 mb-6">
                      {role.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.2 + featureIndex * 0.1 }}
                          className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      onClick={() => router.push(`/login/${role.id}`)}
                      className={`w-full bg-gradient-to-r ${role.color} hover:${role.hoverColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                      size="lg"
                    >
                      <span>Access {role.title.split(" ")[0]} Portal</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technology and user-centric design principles to deliver an exceptional campus
              management experience
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Campus Management?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have streamlined their campus operations with our comprehensive issue
              management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/login/student")}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started as Student
              </Button>
              <Button
                onClick={() => router.push("/login/worker")}
                variant="outline"
                size="lg"
                className="border-2 hover:bg-muted/50 transition-all duration-300"
              >
                Join as Worker
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center mr-3">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Campus Issue Tracker</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Empowering educational institutions with efficient issue management solutions.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Campus Issue Tracker. Built with modern web technologies for optimal performance and user experience.
          </p>
        </div>
      </footer>
    </div>
  )
}
