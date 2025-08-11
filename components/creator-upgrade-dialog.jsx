"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMembership } from "@/components/membership-provider"
import { Crown } from "lucide-react"

export function CreatorUpgradeDialog({ open, onOpenChange }) {
    const { upgradeToCreator } = useMembership()
    const [isProcessing, setIsProcessing] = useState(false)

    const handleUpgrade = async () => {
        setIsProcessing(true)
        try {
            // TODO: integrate with backend one-time upgrade checkout
            await upgradeToCreator()
            onOpenChange(false)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Crown className="h-4 w-4" /> Upgrade to Creator
                    </DialogTitle>
                    <DialogDescription>
                        Publish posts, earn from readership, and access creator tools. One-time activation fee of $19, plus your
                        monthly membership.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Creator activation</p>
                            <p className="text-sm text-muted-foreground">One-time, non-refundable</p>
                        </div>
                        <p className="text-lg font-semibold">$19</p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpgrade} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Pay $19 & Upgrade"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
