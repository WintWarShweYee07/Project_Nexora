"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingChatbotTriggerProps {
  onClick: () => void
  className?: string
}

export function FloatingChatbotTrigger({ onClick, className }: FloatingChatbotTriggerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isPulsing, setIsPulsing] = useState(true)

  useEffect(() => {
    // Stop pulsing after 10 seconds
    const timer = setTimeout(() => setIsPulsing(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-200",
        "md:right-6", // Adjust for larger screens
        className,
      )}
    >
      <div className="relative">
        {/* Pulsing ring animation */}
        {isPulsing && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-75" />
        )}

        {/* Main button */}
        <Button
          onClick={onClick}
          size="lg"
          className="relative h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </Button>

        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            Need help? Chat with our AI assistant!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </div>
        </div>

        {/* New feature badge */}
        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 gap-1">
          <Sparkles className="h-3 w-3" />
          AI
        </Badge>

        {/* Dismiss button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-gray-100 hover:bg-gray-200 p-0"
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible(false)
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
