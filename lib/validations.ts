import { z } from "zod"

export const studentLoginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  department: z.string().min(1, "Please select a department"),
})

export const workerLoginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  department: z.string().min(1, "Please select a department"),
})

export const adminLoginSchema = z.object({
  name: z.string().min(1, "Admin name is required"),
  password: z.string().min(1, "Password is required"),
})

export const reportIssueSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  category: z.enum(["Severe", "Moderate", "Low"], {
    required_error: "Please select a category",
  }),
  image: z.any().optional(),
})

export const penaltySchema = z.object({
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  severity: z.enum(["Minor", "Major"]),
  description: z.string().optional(),
})

export type StudentLoginForm = z.infer<typeof studentLoginSchema>
export type WorkerLoginForm = z.infer<typeof workerLoginSchema>
export type AdminLoginForm = z.infer<typeof adminLoginSchema>
export type ReportIssueForm = z.infer<typeof reportIssueSchema>
export type PenaltyForm = z.infer<typeof penaltySchema>
