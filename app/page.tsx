"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UserDashboard } from "@/components/user-dashboard"
import { CreatorDashboard } from "@/components/creator-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { LandingPage } from "@/components/landing-page"

export default function Dashboard() {
  const [userType, setUserType] = useState<"user" | "creator" | "admin">("user")
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing")

  const renderContent = () => {
    if (currentView === "landing") {
      return <LandingPage />
    }

    switch (userType) {
      case "user":
        return <UserDashboard />
      case "creator":
        return <CreatorDashboard />
      case "admin":
        return <AdminDashboard />
      default:
        return <LandingPage />
    }
  }

  return (
    <DashboardLayout
      userType={userType}
      onUserTypeChange={setUserType}
      currentView={currentView}
      onViewChange={setCurrentView}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
