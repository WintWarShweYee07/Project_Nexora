"use client"

import { useState, useEffect } from "react"
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
import { dashboardApi, postApi, User, Post, Subscription } from "@/lib/api"

export function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [moderationActions, setModerationActions] = useState<{ [key: string]: string }>({})
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch admin dashboard data on component mount
  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch dashboard data, posts, and subscriptions in parallel
      const [dashboard, postsData, subscriptionsData] = await Promise.all([
        dashboardApi.getDashboardData(),
        postApi.getAllPosts(),
        dashboardApi.getSubscriptions()
      ])

      setDashboardData(dashboard)
      setPosts(postsData)
      setSubscriptions(subscriptionsData)

      // For demo purposes, create some mock users since we don't have a users API yet
      setUsers([
        {
          _id: "1",
          username: "Alice Johnson",
          email: "alice@example.com",
          role: "creator",
          profilePic: "/placeholder.svg?height=32&width=32",
        },
        {
          _id: "2",
          username: "Bob Smith",
          email: "bob@example.com",
          role: "user",
          profilePic: "/placeholder.svg?height=32&width=32",
        },
        {
          _id: "3",
          username: "Carol Davis",
          email: "carol@example.com",
          role: "creator",
          profilePic: "/placeholder.svg?height=32&width=32",
        },
      ])
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load admin data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    alert(`${action} functionality coming soon! This will integrate with your user management system.`)
  }

  const handleModerationAction = (itemId: string, action: string) => {
    setModerationActions((prev) => ({ ...prev, [itemId]: action }))
    alert(`Content ${action} functionality coming soon! This will integrate with your moderation system.`)
  }

  // Calculate platform statistics from real data
  const calculatePlatformStats = () => {
    const totalUsers = users.length
    const totalPosts = posts.length
    const totalSubscriptions = subscriptions.length
    const platformRevenue = subscriptions.reduce((sum, sub) => {
      if (sub.status === 'active') {
        return sum + (sub.price * 0.2) // 20% platform fee
      }
      return sum
    }, 0)

    return {
      totalUsers,
      totalPosts,
      totalSubscriptions,
      platformRevenue: platformRevenue.toFixed(2)
    }
  }

  const platformStats = calculatePlatformStats()

  // Mock content moderation data (since we don't have a moderation API yet)
  const contentModeration = [
    {
      id: "1",
      title: "Controversial Political Opinion",
      author: "John Writer",
      reportedBy: "User123",
      reason: "Inappropriate content",
      status: "pending",
      reportedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Spam Marketing Post",
      author: "Spammer99",
      reportedBy: "Multiple users",
      reason: "Spam",
      status: "pending",
      reportedAt: "2024-01-14",
    },
    {
      id: "3",
      title: "Misleading Health Claims",
      author: "HealthGuru",
      reportedBy: "Dr. Smith",
      reason: "Misinformation",
      status: "resolved",
      reportedAt: "2024-01-13",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Admin Dashboard</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={fetchAdminData} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">Published content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformStats.platformRevenue}</div>
            <p className="text-xs text-muted-foreground">20% platform share</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Active memberships</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="revenue">Membership Revenue</TabsTrigger>
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
                    <p className="text-sm">New creator joined: {users.find(u => u.role === 'creator')?.username || 'Unknown'}</p>
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
            {users.map((user) => (
              <Card key={user._id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profilePic || "/placeholder.svg"} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.username}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === "creator" ? "default" : "secondary"}>{user.role}</Badge>
                      <Badge variant="default">active</Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">User ID: {user._id}</p>
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
                <div className="text-2xl font-bold">${platformStats.platformRevenue}</div>
                <p className="text-xs text-muted-foreground">From active subscriptions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Creator Earnings</CardTitle>
                <CardDescription>80% revenue share</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(parseFloat(platformStats.platformRevenue) * 4).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Paid to creators</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Platform Fee</CardTitle>
                <CardDescription>20% platform share</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${platformStats.platformRevenue}</div>
                <p className="text-xs text-muted-foreground">Platform revenue</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Subscription Breakdown</CardTitle>
              <CardDescription>Active subscriptions by plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No active subscriptions yet.
                  </p>
                ) : (
                  subscriptions.map((subscription) => (
                    <div key={subscription._id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{subscription.plan} Plan</p>
                        <p className="text-sm text-muted-foreground">
                          Subscriber: {subscription.subscriber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${subscription.price}/month</p>
                        <p className="text-xs text-muted-foreground">
                          Status: {subscription.status}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
