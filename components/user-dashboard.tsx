"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Star, TrendingUp, Heart, Bookmark, Share2, Lock, Crown, Settings } from "lucide-react"
import { DashboardSkeleton } from "@/components/loading-skeleton"
import { useMembership } from "@/components/membership-provider"
import { ProfileSettings } from "@/components/profile-settings"
import { CreatorUpgradeDialog } from "@/components/creator-upgrade-dialog"
import { dashboardApi, postApi, Post, User, Subscription } from "@/lib/api"

export function UserDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([])
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { tier, isPaidMember, startMembershipCheckout, openBillingPortal } = useMembership()
  const [isCreatorDialogOpen, setIsCreatorDialogOpen] = useState(false)

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
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
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookmark = async (postId: string) => {
    try {
      setIsActionLoading(true)
      // TODO: Implement bookmark API call when backend is ready
      setBookmarkedPosts((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      )
    } catch (err) {
      console.error('Failed to bookmark post:', err)
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    try {
      setIsActionLoading(true)
      await postApi.likePost(postId)
      setLikedPosts((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      )
      // Update the post's like count in state
      setPosts(prev => prev.map(post =>
        post._id === postId
          ? { ...post, likes: (post.likes || 0) + 1 }
          : post
      ))
    } catch (err) {
      console.error('Failed to like post:', err)
    } finally {
      setIsActionLoading(false)
    }
  }

  const handlePurchase = (postId: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Payment integration coming soon! This will redirect to Stripe checkout.")
    }, 1000)
  }

  if (isLoading) {
    return <DashboardSkeleton />
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

  // Calculate reading statistics from real data
  const calculateReadingStats = () => {
    const totalPosts = posts.length
    const totalReadingTime = posts.reduce((sum, post) => {
      // Estimate reading time: 200 words per minute
      const wordCount = post.content.split(' ').length
      return sum + Math.ceil(wordCount / 200)
    }, 0)

    return { totalPosts, totalReadingTime }
  }

  const readingStats = calculateReadingStats()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {dashboardData?.username || 'User'}!
          </h2>
          <p className="text-muted-foreground">Discover amazing content from your favorite creators</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsProfileOpen(true)}>
            <Settings className="h-4 w-4" />
            Profile
          </Button>
          {!isPaidMember ? (
            <Button className="gap-2" onClick={startMembershipCheckout}>
              <Crown className="h-4 w-4" />
              Upgrade to Premium
            </Button>
          ) : (
            <Button className="gap-2" variant="secondary" disabled>
              <Crown className="h-4 w-4" />
              Premium Active
            </Button>
          )}
          <Button className="gap-2" variant="outline" onClick={() => setIsCreatorDialogOpen(true)}>
            Become a Creator
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Read</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingStats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">Total posts viewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingStats.totalReadingTime}h</div>
            <p className="text-xs text-muted-foreground">Estimated time spent reading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookmarkedPosts.length}</div>
            <p className="text-xs text-muted-foreground">Saved articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.length}</div>
            <p className="text-xs text-muted-foreground">Active subscriptions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="discover" className="space-y-4">
        <TabsList>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="subscriptions">Membership</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Featured Articles</h3>
            <Button variant="outline" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Trending
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No posts available yet. Check back later!</p>
              </div>
            ) : (
              posts.slice(0, 6).map((post) => (
                <Card key={post._id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Content</Badge>
                      {post.isPremium && (
                        <Badge className="gap-1">
                          <Lock className="h-3 w-3" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.content.substring(0, 150)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.ceil(post.content.split(' ').length / 200)} min read
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                          onClick={() => handleLike(post._id)}
                          disabled={isActionLoading}
                        >
                          <Heart
                            className={`h-4 w-4 ${likedPosts.includes(post._id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          <span className="text-sm">{post.likes || 0}</span>
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(post._id)}
                          disabled={isActionLoading}
                          className={bookmarkedPosts.includes(post._id) ? "text-blue-500" : ""}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarkedPosts.includes(post._id) ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.share?.({
                              title: post.title,
                              url: window.location.href,
                            }) || alert("Share functionality coming soon!")
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button size="sm" asChild>
                        <a href={`/read/${post._id}?premium=${post.isPremium ? "1" : "0"}`}>Read</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-4">
          <h3 className="text-xl font-semibold">Your Bookmarks</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarkedPosts.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No bookmarks yet. Save articles to see them here.</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              posts
                .filter((p) => bookmarkedPosts.includes(p._id))
                .map((post) => (
                  <Card key={post._id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Content</Badge>
                        {post.isPremium && (
                          <Badge className="gap-1">
                            <Lock className="h-3 w-3" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.content.substring(0, 150)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{post.author}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.ceil(post.content.split(' ').length / 200)} min read
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            className="flex items-center gap-1 hover:text-red-500 transition-colors"
                            onClick={() => handleLike(post._id)}
                            disabled={isActionLoading}
                          >
                            <Heart className={`h-4 w-4 ${likedPosts.includes(post._id) ? "fill-red-500 text-red-500" : ""}`} />
                            <span className="text-sm">{post.likes || 0}</span>
                          </button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(post._id)}
                            disabled={isActionLoading}
                            className={bookmarkedPosts.includes(post._id) ? "text-blue-500" : ""}
                          >
                            <Bookmark className={`h-4 w-4 ${bookmarkedPosts.includes(post._id) ? "fill-current" : ""}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              navigator.share?.({ title: post.title, url: window.location.href }) || alert("Share functionality coming soon!")
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button size="sm" asChild>
                          <a href={`/read/${post._id}?premium=${post.isPremium ? "1" : "0"}`}>Read</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <h3 className="text-xl font-semibold">Your Membership</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Plan</h4>
                  <p className="text-sm text-muted-foreground capitalize">{tier}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${isPaidMember ? "9.99" : "0.00"}/month</p>
                  <p className="text-xs text-muted-foreground">Billed monthly</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {!isPaidMember ? (
                  <Button onClick={startMembershipCheckout}>Upgrade to Premium</Button>
                ) : (
                  <Button variant="outline" onClick={openBillingPortal}>Manage Billing</Button>
                )}
              </div>
            </CardContent>
          </Card>

          {subscriptions.length > 0 && (
            <>
              <h3 className="text-xl font-semibold">Active Subscriptions</h3>
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <Card key={subscription._id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Creator Subscription</h4>
                          <p className="text-sm text-muted-foreground">
                            {subscription.plan} Plan - ${subscription.price}/month
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                            {subscription.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      <ProfileSettings open={isProfileOpen} onOpenChange={setIsProfileOpen} />
      <CreatorUpgradeDialog open={isCreatorDialogOpen} onOpenChange={setIsCreatorDialogOpen} />
    </div>
  )
}
