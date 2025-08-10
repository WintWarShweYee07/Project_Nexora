"use client"

import { useMembership } from "@/components/membership-provider"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"

type GatedContentProps = {
    title: string
    author?: string
    content: string
}

export function GatedContent({ title, author, content }: GatedContentProps) {
    const { isPaidMember, upgradeToMember } = useMembership()

    const midpoint = Math.max(80, Math.floor(content.length * 0.5))
    const preview = content.slice(0, midpoint)

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {author && <p className="text-muted-foreground">By {author}</p>}
            {isPaidMember ? (
                <p className="leading-7 whitespace-pre-wrap">{content}</p>
            ) : (
                <div className="relative">
                    <p className="leading-7 whitespace-pre-wrap">{preview}</p>
                    <div className="mt-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
                        <div className="relative z-10 flex flex-col items-center justify-center gap-3 rounded-lg border p-6 text-center">
                            <p className="text-sm text-muted-foreground">You're reading a premium story.</p>
                            <Button className="gap-2" onClick={upgradeToMember}>
                                <Crown className="h-4 w-4" /> Upgrade to premium for full access
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


