"use client"

import type React from "react"

import { WorkerNavbar } from "@/components/worker-navbar"
import { motion } from "framer-motion"

interface WorkerLayoutProps {
  children: React.ReactNode
}

export function WorkerLayout({ children }: WorkerLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <WorkerNavbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {children}
      </motion.main>
    </div>
  )
}
