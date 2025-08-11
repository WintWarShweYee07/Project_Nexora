"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenTool, Eye, DollarSign, Users, TrendingUp, Calendar, Heart, MessageCircle, Edit, Trash2 } from "lucide-react"
import { ContentSkeleton } from "@/components/loading-skeleton"
import { useMembership } from "@/components/membership-provider"
import { dashboardApi, postApi, Post, User, Subscription } from "@/lib/api"

export function CreatorDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [subscribers, setSubscribers] = useState<User[]>([])
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { isPaidMember } = useMembership()

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch dashboard data, posts, and subscribers in parallel
      const [dashboard, postsData, subscribersData] = await Promise.all([
        dashboardApi.getDashboardData(),
        postApi.getAllPosts(),
        dashboardApi.getSubscribers()
      ])

      setDashboardData(dashboard)
      setPosts(postsData)
      setSubscribers(subscribersData)
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (postId: string) => {
    setSelectedPost(postId)
    alert("Content editor coming soon! Rich text editing with media support.")
  }

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        setIsActionLoading(true)
        await postApi.deletePost(postId)
        // Remove the deleted post from state
        setPosts(prev => prev.filter(post => post._id !== postId))
        alert("Post deleted successfully!")
      } catch (err) {
        console.error('Failed to delete post:', err)
        alert(err instanceof Error ? err.message : 'Failed to delete post')
      } finally {
        setIsActionLoading(false)
      }
    }
  }

  const handleNewPost = () => {
    // Navigate to content editor
    window.location.href = "/editor"
  }

  const handleLike = async (postId: string) => {
    try {
      await postApi.likePost(postId)
      // Update the post's like count in state
      setPosts(prev => prev.map(post =>
        post._id === postId
          ? { ...post, likes: (post.likes || 0) + 1 }
          : post
      ))
    } catch (err) {
      console.error('Failed to like post:', err)
    }
  }

  // Calculate analytics from real data
  const calculateAnalytics = () => {
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0)
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0)
    const totalComments = posts.reduce((sum, post) => sum + (post.comments || 0), 0)
    const totalEarnings = posts.reduce((sum, post) => {
      if (post.isPremium && post.price) {
        return sum + (post.price * 0.8) // Assuming 80% creator revenue
      }
      return sum
    }, 0)

    return { totalViews, totalLikes, totalComments, totalEarnings }
  }

  const analytics = calculateAnalytics()

  if (isLoading) {
    return <ContentSkeleton />
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Dashboard</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={fetchDashboardData} className="mt-4">
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
          <h2 className="text-3xl font-bold tracking-tight">Creator Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {dashboardData?.username || 'Creator'}!
          </p>
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
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time views</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.totalViews > 0
                ? ((analytics.totalLikes + analytics.totalComments) / analytics.totalViews * 100).toFixed(1)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Likes + Comments / Views</p>
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
            <h3 className="text-xl font-semibold">My Posts ({posts.length})</h3>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </div>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No posts yet. Create your first post to get started!</p>
                  <Button onClick={handleNewPost} className="mt-4">
                    <PenTool className="mr-2 h-4 w-4" />
                    Write Your First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post._id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{post.title}</h4>
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>
                            {post.status}
                          </Badge>
                          {post.isPremium && (
                            <Badge variant="outline">
                              Premium ${post.price}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {post.status === "published"
                            ? `Published on ${new Date(post.createdAt).toLocaleDateString()}`
                            : `Last updated: ${new Date(post.updatedAt).toLocaleDateString()}`
                          }
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(post._id)}
                          disabled={isActionLoading}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post._id)}
                          disabled={isActionLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.views?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.comments || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          ${post.isPremium && post.price ? (post.price * 0.8).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-xl font-semibold">Performance Analytics</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
                <CardDescription>Your content performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Posts</span>
                    <span className="text-sm font-medium">{posts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Published Posts</span>
                    <span className="text-sm font-medium">
                      {posts.filter(p => p.status === 'published').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Premium Posts</span>
                    <span className="text-sm font-medium">
                      {posts.filter(p => p.isPremium).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Draft Posts</span>
                    <span className="text-sm font-medium">
                      {posts.filter(p => p.status === 'draft').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>How your audience interacts with content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Views</span>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min((analytics.totalViews / 10000) * 100, 100)} className="w-20" />
                      <span className="text-sm font-medium">{analytics.totalViews}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Likes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min((analytics.totalLikes / 1000) * 100, 100)} className="w-20" />
                      <span className="text-sm font-medium">{analytics.totalLikes}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Comments</span>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min((analytics.totalComments / 500) * 100, 100)} className="w-20" />
                      <span className="text-sm font-medium">{analytics.totalComments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Your Subscribers ({subscribers.length})</h3>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {subscribers.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No subscribers yet. Keep creating great content to attract readers!</p>
                </CardContent>
              </Card>
            ) : (
              subscribers.map((subscriber, index) => (
                <Card key={subscriber._id || index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={subscriber.profilePic || "/placeholder.svg"} />
                          <AvatarFallback>{subscriber.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{subscriber.username}</h4>
                          <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
                <div className="text-2xl font-bold">${analytics.totalEarnings.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">From premium content</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Premium Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.filter(p => p.isPremium).length}</div>
                <p className="text-xs text-muted-foreground">Monetized content</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.totalEarnings.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">All time earnings</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Earnings from your premium content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {posts.filter(p => p.isPremium && p.price).map((post) => (
                <div key={post._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Published {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(post.price! * 0.8).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">80% of ${post.price}</p>
                  </div>
                </div>
              ))}
              {posts.filter(p => p.isPremium && p.price).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No premium content yet. Create premium posts to start earning!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
