"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Construction, Zap, Clock, ArrowRight } from "lucide-react"

export function FeaturePlaceholder({
    title,
    description,
    comingSoon = false,
    inDevelopment = false,
    onClick,
}) {
    return (
        <Card className="border-dashed border-2 bg-muted/20">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    {inDevelopment ? (
                        <Construction className="h-6 w-6 text-muted-foreground" />
                    ) : (
                        <Zap className="h-6 w-6 text-muted-foreground" />
                    )}
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                    {title}
                    {comingSoon && (
                        <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" />
                            Soon
                        </Badge>
                    )}
                    {inDevelopment && (
                        <Badge variant="outline" className="gap-1">
                            <Construction className="h-3 w-3" />
                            In Progress
                        </Badge>
                    )}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <Button variant="outline" onClick={onClick || (() => alert("This feature is coming soon!"))} className="gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    )
}
