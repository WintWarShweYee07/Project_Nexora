"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenTool, Eye, DollarSign, Users, TrendingUp, Calendar, Heart, MessageCircle, Edit, Trash2 } from "lucide-react"
import { ContentSkeleton } from "@/components/loading-skeleton"

export function CreatorDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)

  const handleEdit = (postId: number) => {
    setSelectedPost(postId)
    alert("Content editor coming soon! Rich text editing with media support.")
  }

  const handleDelete = (postId: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      alert("Delete functionality will be connected to your content management system.")
    }
  }

  const handleNewPost = () => {
    // Navigate to content editor
    window.location.href = "/editor"
  }

  const recentPosts = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      status: "published",
      views: 1234,
      likes: 89,
      comments: 23,
      earnings: 45.67,
      publishedAt: "2024-01-15",
      isPremium: true,
    },
    {
      id: 2,
      title: "Building Better User Experiences",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      earnings: 0,
      publishedAt: null,
      isPremium: false,
    },
    {
      id: 3,
      title: "Advanced React Patterns Explained",
      status: "published",
      views: 892,
      likes: 67,
      comments: 15,
      earnings: 32.45,
      publishedAt: "2024-01-12",
      isPremium: true,
    },
  ]

  const analytics = [
    { month: "Jan", views: 1200, earnings: 89.5 },
    { month: "Feb", views: 1800, earnings: 134.2 },
    { month: "Mar", views: 2100, earnings: 156.8 },
    { month: "Apr", views: 1900, earnings: 142.3 },
  ]

  const subscribers = [
    {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      plan: "Premium",
      joinedAt: "2024-01-10",
    },
    {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      plan: "Basic",
      joinedAt: "2024-01-08",
    },
    {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      plan: "Premium",
      joinedAt: "2024-01-05",
    },
  ]

  if (isLoading) {
    return <ContentSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Creator Dashboard</h2>
          <p className="text-muted-foreground">Manage your content and track your success</p>
        </div>
        <Button className="gap-2" onClick={handleNewPost}>
          <PenTool className="h-4 w-4" />
          Write New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2%</div>
            <p className="text-xs text-muted-foreground">+0.8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Posts</h3>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{post.title}</h4>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                        {post.isPremium && <Badge variant="outline">Premium</Badge>}
                      </div>
                      {post.publishedAt && (
                        <p className="text-sm text-muted-foreground">Published on {post.publishedAt}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(post.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">${post.earnings.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-xl font-semibold">Performance Analytics</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Views</CardTitle>
                <CardDescription>Your content views over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(data.views / 2500) * 100} className="w-20" />
                        <span className="text-sm font-medium">{data.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
                <CardDescription>Your revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(data.earnings / 200) * 100} className="w-20" />
                        <span className="text-sm font-medium">${data.earnings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Subscribers</h3>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {subscribers.map((subscriber, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={subscriber.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{subscriber.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{subscriber.name}</h4>
                        <p className="text-sm text-muted-foreground">Joined {subscriber.joinedAt}</p>
                      </div>
                    </div>
                    <Badge variant={subscriber.plan === "Premium" ? "default" : "secondary"}>{subscriber.plan}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <h3 className="text-xl font-semibold">Earnings Overview</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$156.80</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$89.45</div>
                <p className="text-xs text-muted-foreground">Available in 3 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,247.30</div>
                <p className="text-xs text-muted-foreground">All time earnings</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>Manage your payment preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Minimum Payout</p>
                  <p className="text-sm text-muted-foreground">$50.00</p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
