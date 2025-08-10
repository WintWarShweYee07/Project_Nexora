"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Flag,
} from "lucide-react"
import { useState } from "react"

export function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [moderationActions, setModerationActions] = useState<{ [key: number]: string }>({})

  const handleUserAction = (userId: number, action: string) => {
    alert(`${action} functionality coming soon! This will integrate with your user management system.`)
  }

  const handleModerationAction = (itemId: number, action: string) => {
    setModerationActions((prev) => ({ ...prev, [itemId]: action }))
    alert(`Content ${action} functionality coming soon! This will integrate with your moderation system.`)
  }

  const platformStats = [
    { label: "Total Users", value: "12,847", change: "+18%", icon: Users },
    { label: "Total Posts", value: "3,456", change: "+12%", icon: BookOpen },
    { label: "Platform Revenue", value: "$45,678", change: "+25%", icon: DollarSign },
    { label: "Growth Rate", value: "8.2%", change: "+2.1%", icon: TrendingUp },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      type: "Creator",
      joinedAt: "2024-01-15",
      status: "active",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      type: "Reader",
      joinedAt: "2024-01-14",
      status: "active",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      type: "Creator",
      joinedAt: "2024-01-13",
      status: "suspended",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const contentModeration = [
    {
      id: 1,
      title: "Controversial Political Opinion",
      author: "John Writer",
      reportedBy: "User123",
      reason: "Inappropriate content",
      status: "pending",
      reportedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Spam Marketing Post",
      author: "Spammer99",
      reportedBy: "Multiple users",
      reason: "Spam",
      status: "pending",
      reportedAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Misleading Health Claims",
      author: "HealthGuru",
      reportedBy: "Dr. Smith",
      reason: "Misinformation",
      status: "resolved",
      reportedAt: "2024-01-13",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 35000, creators: 2800, platform: 7000 },
    { month: "Feb", revenue: 42000, creators: 3360, platform: 8400 },
    { month: "Mar", revenue: 38000, creators: 3040, platform: 7600 },
    { month: "Apr", revenue: 45000, creators: 3600, platform: 9000 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Monitor and manage your platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <AlertTriangle className="h-4 w-4" />
            Alerts (3)
          </Button>
          <Button className="gap-2">
            <Shield className="h-4 w-4" />
            Security Center
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Key metrics overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users (24h)</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-20" />
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Content Quality Score</span>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="w-20" />
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">User Satisfaction</span>
                  <div className="flex items-center gap-2">
                    <Progress value={88} className="w-20" />
                    <span className="text-sm font-medium">88%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Uptime</span>
                  <div className="flex items-center gap-2">
                    <Progress value={99.9} className="w-20" />
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="text-sm">New creator joined: Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm">Premium subscription purchased</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm">Content reported for review</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm">New article published</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">User Management</h3>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Export Users
            </Button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.type === "Creator" ? "default" : "secondary"}>{user.type}</Badge>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Joined {user.joinedAt}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Content Moderation</h3>
            <Button variant="outline" size="sm">
              <Flag className="mr-2 h-4 w-4" />
              View All Reports
            </Button>
          </div>
          <div className="space-y-4">
            {contentModeration.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {item.author}</span>
                        <span>Reported by {item.reportedBy}</span>
                        <span>Reason: {item.reason}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Reported on {item.reportedAt}</p>
                    </div>
                    <Badge
                      variant={
                        item.status === "pending" ? "secondary" : item.status === "resolved" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  {item.status === "pending" && (
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="gap-2" onClick={() => handleModerationAction(item.id, "approved")}>
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleModerationAction(item.id, "removed")}
                      >
                        <XCircle className="h-4 w-4" />
                        Remove
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleModerationAction(item.id, "under review")}
                      >
                        Review
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <h3 className="text-xl font-semibold">Revenue Analytics</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,678</div>
                <p className="text-xs text-muted-foreground">+25% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Creator Earnings</CardTitle>
                <CardDescription>80% revenue share</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$36,542</div>
                <p className="text-xs text-muted-foreground">Paid to creators</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Platform Fee</CardTitle>
                <CardDescription>20% platform share</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$9,136</div>
                <p className="text-xs text-muted-foreground">Platform revenue</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Breakdown</CardTitle>
              <CardDescription>Revenue distribution over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <span className="text-sm font-bold">${data.revenue.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Creators (80%)</span>
                        <span>${data.creators.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Platform (20%)</span>
                        <span>${data.platform.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress value={(data.revenue / 50000) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
