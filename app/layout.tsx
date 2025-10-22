import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Chatbot } from "@/components/chatbot"
import { PageTransition } from "@/components/page-transition"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Campus Issue Tracker",
  description: "Comprehensive campus issue management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster position="bottom-right" richColors closeButton duration={4000} />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
