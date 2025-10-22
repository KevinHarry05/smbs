"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  // optional props commonly passed by theme libraries / layout
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  [key: string]: any
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Start with the default theme to avoid accessing `window` / `localStorage` during SSR.
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  // On mount, read persisted theme from localStorage (client-only).
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = window.localStorage.getItem(storageKey) as Theme | null
      if (stored) setThemeState(stored)
    } catch (e) {
      // ignore localStorage access errors (e.g., in some browser privacy modes)
    }
  }, [storageKey])

  // Apply the theme to the document root whenever it changes (client-only).
  useEffect(() => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (t: Theme) => {
      try {
        if (typeof window !== "undefined") window.localStorage.setItem(storageKey, t)
      } catch (e) {
        /* ignore */
      }

      setThemeState(t)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
