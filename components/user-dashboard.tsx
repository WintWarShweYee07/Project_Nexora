"use client"

import { useState } from "react"
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

export function UserDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([])
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { tier, isPaidMember, startMembershipCheckout, openBillingPortal } = useMembership()
  const [isCreatorDialogOpen, setIsCreatorDialogOpen] = useState(false)

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handlePurchase = (postId: number) => {
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

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      readTime: "8 min read",
      isPremium: true,
      likes: 234,
      category: "Technology",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we create and consume content...",
    },
    {
      id: 2,
      title: "Building Sustainable Habits",
      author: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      readTime: "5 min read",
      isPremium: false,
      likes: 156,
      category: "Lifestyle",
      excerpt: "Simple strategies to build habits that stick and transform your daily routine...",
    },
    {
      id: 3,
      title: "Advanced React Patterns",
      author: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      readTime: "12 min read",
      isPremium: true,
      likes: 189,
      category: "Programming",
      excerpt: "Deep dive into advanced React patterns that will make your code more maintainable...",
    },
  ]

  const subscriptions = [
    {
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      plan: "Premium",
      nextBilling: "2024-02-15",
      price: "$9.99/month",
    },
    {
      author: "Tech Weekly",
      avatar: "/placeholder.svg?height=32&width=32",
      plan: "Basic",
      nextBilling: "2024-02-20",
      price: "$4.99/month",
    },
  ]

  const readingProgress = [
    {
      title: "Machine Learning Fundamentals",
      author: "Dr. Alex Smith",
      progress: 75,
      timeLeft: "15 min left",
    },
    {
      title: "Design Systems at Scale",
      author: "Jessica Wong",
      progress: 45,
      timeLeft: "25 min left",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, John!</h2>
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
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">+3h from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
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
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.isPremium && (
                      <Badge className="gap-1">
                        <Lock className="h-3 w-3" />
                        {post.price}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                        <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmark(post.id)}
                        className={bookmarkedPosts.includes(post.id) ? "text-blue-500" : ""}
                      >
                        <Bookmark className={`h-4 w-4 ${bookmarkedPosts.includes(post.id) ? "fill-current" : ""}`} />
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
                      <a href={`/read/${post.id}?premium=${post.isPremium ? "1" : "0"}`}>Read</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-4">
          <h3 className="text-xl font-semibold">Your Bookmarks</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts
              .filter((p) => bookmarkedPosts.includes(p.id))
              .map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.isPremium && (
                        <Badge className="gap-1">
                          <Lock className="h-3 w-3" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                          <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(post.id)}
                          className={bookmarkedPosts.includes(post.id) ? "text-blue-500" : ""}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarkedPosts.includes(post.id) ? "fill-current" : ""}`} />
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
                        <a href={`/read/${post.id}?premium=${post.isPremium ? "1" : "0"}`}>Read</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            {bookmarkedPosts.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">No bookmarks yet. Save articles to see them here.</p>
                </CardContent>
              </Card>
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
        </TabsContent>
      </Tabs>

      <ProfileSettings open={isProfileOpen} onOpenChange={setIsProfileOpen} />
      <CreatorUpgradeDialog open={isCreatorDialogOpen} onOpenChange={setIsCreatorDialogOpen} />
    </div>
  )
}
