"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { ResizeObserverErrorHandler } from "@/components/resize-observer-error-handler"
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Home,
    BookOpen,
    PenTool,
    CreditCard,
    BarChart3,
    Settings,
    Users,
    Shield,
    MessageCircle,
    Bell,
    Search,
    ChevronDown,
    User,
    LogOut,
} from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { FloatingChatbotTrigger } from "@/components/floating-chatbot-trigger"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardLayout({
    children,
    userType,
    onUserTypeChange,
    currentView,
    onViewChange,
}) {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false)
    const [notifications, setNotifications] = useState(3)
    const [isLoading, setIsLoading] = useState(false)

    const getUserMenuItems = () => {
        const baseItems = [
            // { title: "Dashboard", icon: Home, href: "#" },
            { title: "Discover", icon: Search, href: "#", isPlaceholder: true },
            { title: "My Library", icon: BookOpen, href: "#" },
            { title: "Subscriptions", icon: CreditCard, href: "#", isPlaceholder: true },
        ]

        const creatorItems = [
            { title: "Write", icon: PenTool, href: "#", isPlaceholder: true },
            { title: "My Posts", icon: BookOpen, href: "#" },
            { title: "Analytics", icon: BarChart3, href: "#" },
            { title: "Earnings", icon: CreditCard, href: "#", isPlaceholder: true },
        ]

        const adminItems = [
            { title: "Overview", icon: Home, href: "#" },
            { title: "Users", icon: Users, href: "#" },
            { title: "Content", icon: BookOpen, href: "#" },
            { title: "Moderation", icon: Shield, href: "#" },
            { title: "Analytics", icon: BarChart3, href: "#" },
            { title: "Revenue", icon: CreditCard, href: "#", isPlaceholder: true },
        ]

        switch (userType) {
            case "creator":
                return [...baseItems, ...creatorItems]
            case "admin":
                return adminItems
            default:
                return baseItems
        }
    }

    const getNavigationItems = () => {
        const landingItems = [
            { title: "Home", icon: Home, href: "#", onClick: () => onViewChange?.("landing") },
            { title: "Dashboard", icon: BarChart3, href: "#", onClick: () => onViewChange?.("dashboard") },
        ]

        return [...landingItems, ...getUserMenuItems()]
    }

    const getUserTypeLabel = () => {
        switch (userType) {
            case "creator":
                return "Content Creator"
            case "admin":
                return "Admin"
            default:
                return "Reader"
        }
    }

    const getUserTypeBadgeColor = () => {
        switch (userType) {
            case "creator":
                return "bg-purple-100 text-purple-800"
            case "admin":
                return "bg-red-100 text-red-800"
            default:
                return "bg-blue-100 text-blue-800"
        }
    }

    return (
        <SidebarProvider>
            {/* Prevent ResizeObserver console errors */}
            <ResizeObserverErrorHandler />

            <Sidebar collapsible="icon" className="border-r">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="w-full">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm">
                                                CB
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="font-semibold">UiTBlog</span>
                                                <Badge className={`text-xs ${getUserTypeBadgeColor()}`}>{getUserTypeLabel()}</Badge>
                                            </div>
                                        </div>
                                        <ChevronDown className="ml-auto h-4 w-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                    <DropdownMenuItem onClick={() => onUserTypeChange("user")}>Switch to Reader</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onUserTypeChange("creator")}>Switch to Creator</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onUserTypeChange("admin")}>Switch to Admin</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {getNavigationItems().map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            onClick={
                                                item.onClick ||
                                                (item.isPlaceholder
                                                    ? () => {
                                                        setIsLoading(true)
                                                        setTimeout(() => setIsLoading(false), 1000)
                                                    }
                                                    : undefined)
                                            }
                                            className={item.isPlaceholder ? "cursor-pointer" : ""}
                                        >
                                            {item.isPlaceholder ? (
                                                <div className="flex items-center gap-2 w-full">
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                    <Badge variant="secondary" className="ml-auto text-xs">
                                                        Soon
                                                    </Badge>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </div>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel>Support</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={() => setIsChatbotOpen(true)}>
                                        <MessageCircle className="h-4 w-4" />
                                        <span>Help & Support</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#" className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="w-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start">
                                            <span className="text-sm font-medium">John Doe</span>
                                            <span className="text-xs text-muted-foreground">john@example.com</span>
                                        </div>
                                        <ChevronDown className="ml-auto h-4 w-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset className="flex flex-col">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-semibold">Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                                onClick={() => {
                                    setNotifications(0)
                                    // Placeholder for notifications functionality
                                }}
                            >
                                <Bell className="h-4 w-4" />
                                {notifications > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsChatbotOpen(true)}
                                className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Help
                            </Button>
                            <ThemeToggle />
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-4 min-h-0">{children}</main>
            </SidebarInset>

            <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

            {/* Floating Chatbot Trigger */}
            <FloatingChatbotTrigger onClick={() => setIsChatbotOpen(true)} />
        </SidebarProvider>
    )
}
