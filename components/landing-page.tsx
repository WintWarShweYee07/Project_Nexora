"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Search,
  Filter,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Crown,
  Zap,
  Target,
  Award,
} from "lucide-react"
import { useMembership } from "@/components/membership-provider"

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { isPaidMember, upgradeToMember } = useMembership()

  const categories = [
    { id: "all", name: "All", count: 1247 },
    { id: "technology", name: "Technology", count: 342 },
    { id: "design", name: "Design", count: 189 },
    { id: "business", name: "Business", count: 156 },
    { id: "lifestyle", name: "Lifestyle", count: 234 },
    { id: "programming", name: "Programming", count: 198 },
  ]

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing the way we create and consume content in the digital age.",
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      readTime: "8 min read",
      publishedAt: "2 days ago",
      category: "Technology",
      likes: 234,
      comments: 45,
      isPremium: true,
      coverImage: "/placeholder.svg?height=200&width=400&text=AI+Content+Creation",
    },
    {
      id: 2,
      title: "Building Sustainable Design Systems",
      excerpt:
        "A comprehensive guide to creating design systems that scale with your organization and stand the test of time.",
      author: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      readTime: "12 min read",
      publishedAt: "1 week ago",
      category: "Design",
      likes: 189,
      comments: 32,
      isPremium: false,
      coverImage: "/placeholder.svg?height=200&width=400&text=Design+Systems",
    },
    {
      id: 3,
      title: "Advanced React Patterns for 2024",
      excerpt:
        "Deep dive into the latest React patterns and best practices that will make your applications more maintainable.",
      author: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      readTime: "15 min read",
      publishedAt: "3 days ago",
      category: "Programming",
      likes: 312,
      comments: 67,
      isPremium: true,
      coverImage: "/placeholder.svg?height=200&width=400&text=React+Patterns",
    },
  ]

  const trendingTopics = [
    { name: "Artificial Intelligence", posts: 156, growth: "+23%" },
    { name: "Web Development", posts: 234, growth: "+18%" },
    { name: "UI/UX Design", posts: 189, growth: "+15%" },
    { name: "Startup Stories", posts: 98, growth: "+31%" },
    { name: "Remote Work", posts: 145, growth: "+12%" },
  ]

  const topCreators = [
    {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=48&width=48",
      followers: "12.5K",
      posts: 89,
      specialty: "AI & Technology",
      verified: true,
    },
    {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=48&width=48",
      followers: "8.9K",
      posts: 67,
      specialty: "Design Systems",
      verified: true,
    },
    {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=48&width=48",
      followers: "15.2K",
      posts: 124,
      specialty: "React Development",
      verified: true,
    },
  ]

  const stats = [
    { label: "Active Creators", value: "2,847", icon: Users, color: "text-blue-600" },
    { label: "Published Articles", value: "12,456", icon: BookOpen, color: "text-green-600" },
    { label: "Monthly Readers", value: "89.2K", icon: TrendingUp, color: "text-purple-600" },
    { label: "Premium Content", value: "3,421", icon: Crown, color: "text-yellow-600" },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 p-8 md:p-12">
        <div className="relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <Zap className="h-3 w-3" />
              Welcome to Nexora
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-100 dark:to-blue-100 bg-clip-text text-transparent">
              Discover Amazing Content from Top Creators
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of readers exploring premium articles, tutorials, and insights from industry experts. Start
              your journey of continuous learning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={!isPaidMember ? upgradeToMember : undefined}
              >
                <Target className="h-5 w-5" />
                {isPaidMember ? "Start Reading" : "Upgrade & Start Reading"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Award className="h-5 w-5" />
                Become a Creator
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl transform rotate-12 scale-150" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Content */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Articles</h2>
            <p className="text-muted-foreground">Hand-picked content from our top creators</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.isPremium && (
                  <Badge className="absolute top-3 right-3 gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                    <Crown className="h-3 w-3" />
                    Premium
                  </Badge>
                )}
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                        <span>•</span>
                        {post.publishedAt}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" asChild>
                      <a href={`/read/${post.id}?premium=${post.isPremium ? "1" : "0"}`}>Read</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
              <CardDescription>Popular topics this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{topic.name}</p>
                      <p className="text-sm text-muted-foreground">{topic.posts} articles</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {topic.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Top Creators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Creators
              </CardTitle>
              <CardDescription>Most followed creators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium truncate">{creator.name}</p>
                        {creator.verified && (
                          <Badge variant="secondary" className="h-4 w-4 p-0 rounded-full">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{creator.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{creator.followers} followers</span>
                        <span>•</span>
                        <span>{creator.posts} posts</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-3">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest articles and updates delivered to your inbox.
                </p>
              </div>
              <div className="space-y-3">
                <Input placeholder="Enter your email" />
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
