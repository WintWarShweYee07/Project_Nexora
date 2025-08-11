import React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MembershipProvider } from "@/components/membership-provider"
import { HydrationGate } from "@/components/hydration-gate"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Nexora Dashboard",
  description: "Modern creator blog platform with advanced content editor",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HydrationGate>
            <MembershipProvider>{children}</MembershipProvider>
          </HydrationGate>
        </ThemeProvider>
      </body>
    </html>
  )
}
