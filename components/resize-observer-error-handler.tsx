"use client"

import { useEffect } from "react"

/**
 * Silences the Chromium “ResizeObserver loop completed with undelivered notifications.”
 * console error that can surface when many ResizeObservers update in the same frame.
 * We attach a one-line listener at the application root and stop the event’s propagation.
 */
export function ResizeObserverErrorHandler() {
  useEffect(() => {
    // Newer spec-driven event—supported in all modern Chromium browsers
    const loopError = (event: Event) => event.stopPropagation()
    window.addEventListener("resizeobserverlooperror", loopError)

    // Fallback for older Chrome versions that still throw a generic ErrorEvent
    const genericError = (event: ErrorEvent) => {
      if (event.message === "ResizeObserver loop completed with undelivered notifications.") {
        event.stopImmediatePropagation()
      }
    }
    window.addEventListener("error", genericError)

    return () => {
      window.removeEventListener("resizeobserverlooperror", loopError)
      window.removeEventListener("error", genericError)
    }
  }, [])

  return null
}
