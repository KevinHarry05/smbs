'use client'

import { useEffect } from 'react'

export function Chatbot() {
  useEffect(() => {
    // Initialize chatbase if not already initialized
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = []
        }
        window.chatbase.q.push(args)
      }
      
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q
          }
          return (...args: any[]) => target(prop, ...args)
        }
      })
    }

    const onLoad = function() {
      const script = document.createElement("script")
      script.src = "https://www.chatbase.co/embed.min.js"
      script.id = "Cu22BbNEJ0O25MuRhDCUr"
      script.setAttribute("data-domain", "www.chatbase.co")
      document.body.appendChild(script)
    }

    if (document.readyState === "complete") {
      onLoad()
    } else {
      window.addEventListener("load", onLoad)
    }
  }, [])

  return null
}

// Add TypeScript declarations for the chatbase global
declare global {
  interface Window {
    chatbase: any
  }
} 