"use client"

import { useMemo } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { GatedContent } from "@/components/gated-content"

export default function ReadPage() {
    const params = useParams()
    const postId = params?.id || "1"
    const searchParams = useSearchParams()
    const isPremium = searchParams?.get("premium") === "1"

    // Demo content; replace with real fetch when backend is ready
    const { title, author, content } = useMemo(() => {
        return {
            title: `Sample Story #${postId}`,
            author: "Sarah Johnson",
            content:
                "Artificial intelligence is transforming the way we create and consume content. From personalized recommendations to automated editing, the landscape is shifting rapidly. In this article, we explore the latest trends, tools, and ethical considerations shaping the future of content creation.\n\nAs creators navigate new possibilities, balancing authenticity with efficiency becomes crucial. We break down practical strategies you can apply today...\n\nFull walkthroughs, code examples, and case studies follow in the remainder of the article.",
        }
    }, [postId])

    return (
        <div className="mx-auto max-w-3xl py-8 px-4">
            {isPremium ? (
                <GatedContent title={title} author={author} content={content} />
            ) : (
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">By {author}</p>
                    <p className="leading-7 whitespace-pre-wrap">{content}</p>
                </div>
            )}
        </div>
    )
}
