"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function ProfileSettings({ open, onOpenChange }) {
    const [name, setName] = useState("John Doe")
    const [email, setEmail] = useState("john@example.com")
    const [bio, setBio] = useState("Curious reader and lifelong learner.")
    const [newsletter, setNewsletter] = useState(true)

    const handleSave = () => {
        // TODO: Save to backend
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Profile Settings</DialogTitle>
                    <DialogDescription>Manage your reader profile and preferences.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                            <Label>Newsletter</Label>
                            <p className="text-xs text-muted-foreground">Get weekly highlights and recommendations.</p>
                        </div>
                        <Switch checked={newsletter} onCheckedChange={setNewsletter} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
