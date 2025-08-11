"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Code,
    ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Palette,
    Type,
    Upload,
    Eye,
    Save,
    Send,
    X,
    Plus,
} from "lucide-react"

const fontFamilies = [
    { name: "Default", value: "inherit" },
    { name: "Inter", value: "Inter, sans-serif" },
    { name: "Roboto", value: "Roboto, sans-serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif" },
    { name: "Lora", value: "Lora, serif" },
    { name: "Playfair Display", value: "Playfair Display, serif" },
    { name: "Fira Code", value: "Fira Code, monospace" },
]

const fontSizes = [
    { name: "Small", value: "14px" },
    { name: "Normal", value: "16px" },
    { name: "Large", value: "18px" },
    { name: "Extra Large", value: "20px" },
]

const colors = [
    { name: "Default", value: "" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Yellow", value: "#eab308" },
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
]

export function ContentEditor() {
    const [blogPost, setBlogPost] = useState({
        title: "",
        subtitle: "",
        content: [
            {
                id: "1",
                type: "paragraph",
                content: "",
                styles: {},
            },
        ],
        tags: [],
        isPremium: false,
        status: "draft",
    })

    const [activeBlockId, setActiveBlockId] = useState(null)
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
    const [newTag, setNewTag] = useState("")
    const [isUploading, setIsUploading] = useState(false)

    const fileInputRef = useRef(null)
    const imageInputRef = useRef(null)

    const addBlock = useCallback((type, afterId) => {
        const newBlock = {
            id: Date.now().toString(),
            type,
            content: "",
            styles: {},
        }

        setBlogPost((prev) => {
            const newContent = [...prev.content]
            if (afterId) {
                const index = newContent.findIndex((block) => block.id === afterId)
                newContent.splice(index + 1, 0, newBlock)
            } else {
                newContent.push(newBlock)
            }
            return { ...prev, content: newContent }
        })

        setActiveBlockId(newBlock.id)
    }, [])

    const updateBlock = useCallback((id, updates) => {
        setBlogPost((prev) => ({
            ...prev,
            content: prev.content.map((block) => (block.id === id ? { ...block, ...updates } : block)),
        }))
    }, [])

    const deleteBlock = useCallback((id) => {
        setBlogPost((prev) => ({
            ...prev,
            content: prev.content.filter((block) => block.id !== id),
        }))
    }, [])

    const applyStyle = useCallback(
        (style, value) => {
            if (!activeBlockId) return

            updateBlock(activeBlockId, {
                styles: {
                    ...blogPost.content.find((b) => b.id === activeBlockId)?.styles,
                    [style]: value,
                },
            })
        },
        [activeBlockId, blogPost.content, updateBlock],
    )

    const handleImageUpload = useCallback(
        (file) => {
            setIsUploading(true)
            // Simulate upload
            setTimeout(() => {
                const imageUrl = URL.createObjectURL(file)
                addBlock("image")
                const newBlockId = Date.now().toString()
                updateBlock(newBlockId, {
                    content: imageUrl,
                    metadata: { alt: file.name, caption: "" },
                })
                setIsUploading(false)
            }, 1000)
        },
        [addBlock, updateBlock],
    )

    const handleFileUpload = useCallback((file) => {
        // Simulate file upload
        alert(`File upload functionality: ${file.name} would be uploaded to your storage service.`)
    }, [])

    const addTag = useCallback(() => {
        if (newTag.trim() && !blogPost.tags.includes(newTag.trim())) {
            setBlogPost((prev) => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()],
            }))
            setNewTag("")
        }
    }, [newTag, blogPost.tags])

    const removeTag = useCallback((tagToRemove) => {
        setBlogPost((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }))
    }, [])

    const publishPost = useCallback(() => {
        setBlogPost((prev) => ({
            ...prev,
            status: "published",
            publishedAt: new Date(),
        }))
        setIsPublishDialogOpen(false)
        alert("Post published successfully!")
    }, [])

    const getBlockStyle = (block) => {
        const baseStyle = {
            fontFamily: block.styles?.fontFamily || "inherit",
            fontSize: block.styles?.fontSize || "16px",
            color: block.styles?.color || "inherit",
            backgroundColor: block.styles?.backgroundColor || "transparent",
            textAlign: block.styles?.textAlign || "left",
        }

        if (block.styles?.bold) baseStyle.fontWeight = "bold"
        if (block.styles?.italic) baseStyle.fontStyle = "italic"
        if (block.styles?.underline) baseStyle.textDecoration = "underline"
        if (block.styles?.strikethrough) baseStyle.textDecoration = "line-through"
        if (block.styles?.code) {
            baseStyle.fontFamily = "monospace"
            baseStyle.backgroundColor = "#f1f5f9"
            baseStyle.padding = "2px 4px"
            baseStyle.borderRadius = "4px"
        }

        return baseStyle
    }

    const renderBlock = (block, index) => {
        const isActive = activeBlockId === block.id
        const blockStyle = getBlockStyle(block)

        switch (block.type) {
            case "heading1":
                return (
                    <h1
                        key={block.id}
                        className={`text-3xl font-bold mb-4 ${isActive ? "ring-2 ring-blue-500" : ""}`}
                        style={blockStyle}
                        contentEditable={isActive}
                        onBlur={(e) => updateBlock(block.id, { content: e.target.textContent || "" })}
                        onFocus={() => setActiveBlockId(block.id)}
                        suppressContentEditableWarning
                    >
                        {block.content || "Heading 1"}
                    </h1>
                )
            case "heading2":
                return (
                    <h2
                        key={block.id}
                        className={`text-2xl font-semibold mb-3 ${isActive ? "ring-2 ring-blue-500" : ""}`}
                        style={blockStyle}
                        contentEditable={isActive}
                        onBlur={(e) => updateBlock(block.id, { content: e.target.textContent || "" })}
                        onFocus={() => setActiveBlockId(block.id)}
                        suppressContentEditableWarning
                    >
                        {block.content || "Heading 2"}
                    </h2>
                )
            case "heading3":
                return (
                    <h3
                        key={block.id}
                        className={`text-xl font-medium mb-2 ${isActive ? "ring-2 ring-blue-500" : ""}`}
                        style={blockStyle}
                        contentEditable={isActive}
                        onBlur={(e) => updateBlock(block.id, { content: e.target.textContent || "" })}
                        onFocus={() => setActiveBlockId(block.id)}
                        suppressContentEditableWarning
                    >
                        {block.content || "Heading 3"}
                    </h3>
                )
            case "quote":
                return (
                    <blockquote
                        key={block.id}
                        className={`border-l-4 border-gray-300 pl-4 italic my-4 ${isActive ? "ring-2 ring-blue-500" : ""}`}
                        style={blockStyle}
                        contentEditable={isActive}
                        onBlur={(e) => updateBlock(block.id, { content: e.target.textContent || "" })}
                        onFocus={() => setActiveBlockId(block.id)}
                        suppressContentEditableWarning
                    >
                        {block.content || "Quote"}
                    </blockquote>
                )
            case "list":
                return (
                    <ul
                        key={block.id}
                        className={`list-disc list-inside my-4 ${isActive ? "ring-2 ring-blue-500" : ""}`}
                        style={blockStyle}
                    >
                        <li
                            contentEditable={isActive}
                            onBlur={(e) => updateBlock(block.id, { content: e.target.textContent || "" })}
                            onFocus={() => setActiveBlockId(block.id)}
                            suppressContentEditableWarning
                        >
                            {block.content || "List item"}
                        </li>
                    </ul>
                )
            case "ordered-list":
                return (
                    <ol
                        key={block.id}
                        className={`list-decimal list-inside my-4 ${isActive ? "ring-2 ring-blue-500" : ""}`}
                        style={blockStyle}
                    >
                        <li
                            contentEditable={isActive}
                            onBlur={(e) => updateBlock(block.id, { content: e.target.textContent || "" })}
                            onFocus={() => setActiveBlockId(block.id)}
                            suppressContentEditableWarning
                        >
                            {block.content || "Ordered list item"}
                        </li>
                    </ol>
                )
            case "image":
                return (
                    <div key={block.id} className={`my-4 ${isActive ? "ring-2 ring-blue-500" : ""}`}>
                        <img
                            src={block.content || "/placeholder.svg"}
                            alt={block.metadata?.alt || "Image"}
                            className="max-w-full h-auto rounded-lg"
                        />
                        {block.metadata?.caption && (
                            <p className="text-sm text-gray-600 mt-2 text-center">{block.metadata.caption}</p>
                        )}
                    </div>
                )
            case "divider":
                return <Separator key={block.id} className="my-4" />
            default:
                return (
                    <p
                        key={block.id}
                        className={`mb-4 ${isActive ? "ring-2 ring-blue-500" : ""}`}
                        style={blockStyle}
                        contentEditable={isActive}
                        onBlur={(e) => updateBlock(block.id, { content: e.target.textContent || "" })}
                        onFocus={() => setActiveBlockId(block.id)}
                        suppressContentEditableWarning
                    >
                        {block.content || "Start writing..."}
                    </p>
                )
        }
    }

    if (isPreviewMode) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Preview Mode</h1>
                    <Button onClick={() => setIsPreviewMode(false)} variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Exit Preview
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <h1 className="text-4xl font-bold mb-4">{blogPost.title || "Untitled Post"}</h1>
                        {blogPost.subtitle && <p className="text-xl text-muted-foreground mb-6">{blogPost.subtitle}</p>}
                        {blogPost.coverImage && (
                            <img src={blogPost.coverImage} alt="Cover" className="w-full h-64 object-cover rounded-lg mb-6" />
                        )}
                        {blogPost.tags.length > 0 && (
                            <div className="flex gap-2 mb-6">
                                {blogPost.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                        <div className="prose max-w-none">
                            {blogPost.content.map((block, index) => renderBlock(block, index))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Content Editor</h1>
                <div className="flex gap-2">
                    <Button onClick={() => setIsPreviewMode(true)} variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                    <Button onClick={() => setIsPublishDialogOpen(true)}>
                        <Send className="mr-2 h-4 w-4" />
                        Publish
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Post Settings</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={blogPost.title}
                                    onChange={(e) => setBlogPost((prev) => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter post title"
                                />
                            </div>
                            <div>
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    value={blogPost.subtitle}
                                    onChange={(e) => setBlogPost((prev) => ({ ...prev, subtitle: e.target.value }))}
                                    placeholder="Enter post subtitle"
                                />
                            </div>
                            <div>
                                <Label htmlFor="coverImage">Cover Image URL</Label>
                                <Input
                                    id="coverImage"
                                    value={blogPost.coverImage || ""}
                                    onChange={(e) => setBlogPost((prev) => ({ ...prev, coverImage: e.target.value }))}
                                    placeholder="Enter cover image URL"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="isPremium"
                                    checked={blogPost.isPremium}
                                    onCheckedChange={(checked) => setBlogPost((prev) => ({ ...prev, isPremium: checked }))}
                                />
                                <Label htmlFor="isPremium">Premium Content</Label>
                            </div>
                            {blogPost.isPremium && (
                                <div>
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={blogPost.price || ""}
                                        onChange={(e) => setBlogPost((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Tags</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add tag"
                                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                                />
                                <Button onClick={addTag} size="sm">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {blogPost.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="gap-1">
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-red-500"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Add Blocks</h3>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => addBlock("heading1")}
                            >
                                <Type className="mr-2 h-4 w-4" />
                                Heading 1
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => addBlock("heading2")}
                            >
                                <Type className="mr-2 h-4 w-4" />
                                Heading 2
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => addBlock("heading3")}
                            >
                                <Type className="mr-2 h-4 w-4" />
                                Heading 3
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => addBlock("quote")}
                            >
                                <Type className="mr-2 h-4 w-4" />
                                Quote
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => addBlock("list")}
                            >
                                <Type className="mr-2 h-4 w-4" />
                                Unordered List
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => addBlock("ordered-list")}
                            >
                                <Type className="mr-2 h-4 w-4" />
                                Ordered List
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => imageInputRef.current?.click()}
                            >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Image
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => addBlock("divider")}
                            >
                                <Type className="mr-2 h-4 w-4" />
                                Divider
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Editor */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardContent className="p-6">
                            {activeBlockId && (
                                <div className="mb-4 p-4 border rounded-lg bg-muted/50">
                                    <h4 className="font-semibold mb-2">Text Formatting</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.bold ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => applyStyle("bold", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.bold)}
                                        >
                                            <Bold className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.italic ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => applyStyle("italic", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.italic)}
                                        >
                                            <Italic className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.underline ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => applyStyle("underline", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.underline)}
                                        >
                                            <Underline className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.strikethrough ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => applyStyle("strikethrough", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.strikethrough)}
                                        >
                                            <Strikethrough className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.code ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => applyStyle("code", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.code)}
                                        >
                                            <Code className="h-4 w-4" />
                                        </Button>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <AlignLeft className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => applyStyle("textAlign", "left")}>
                                                    <AlignLeft className="mr-2 h-4 w-4" />
                                                    Left
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => applyStyle("textAlign", "center")}>
                                                    <AlignCenter className="mr-2 h-4 w-4" />
                                                    Center
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => applyStyle("textAlign", "right")}>
                                                    <AlignRight className="mr-2 h-4 w-4" />
                                                    Right
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Type className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {fontFamilies.map((font) => (
                                                    <DropdownMenuItem key={font.value} onClick={() => applyStyle("fontFamily", font.value)}>
                                                        {font.name}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Type className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {fontSizes.map((size) => (
                                                    <DropdownMenuItem key={size.value} onClick={() => applyStyle("fontSize", size.value)}>
                                                        {size.name}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Palette className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {colors.map((color) => (
                                                    <DropdownMenuItem key={color.value} onClick={() => applyStyle("color", color.value)}>
                                                        <div className="flex items-center gap-2">
                                                            {color.value && (
                                                                <div
                                                                    className="w-4 h-4 rounded border"
                                                                    style={{ backgroundColor: color.value }}
                                                                />
                                                            )}
                                                            {color.name}
                                                        </div>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            )}

                            <div className="min-h-[600px] space-y-4">
                                {blogPost.content.map((block, index) => (
                                    <div key={block.id} className="relative group">
                                        {renderBlock(block, index)}
                                        <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteBlock(block.id)}
                                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <Button onClick={() => addBlock("paragraph")} variant="outline" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Paragraph
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Hidden file inputs */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            />
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            />

            {/* Publish Dialog */}
            <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Publish Post</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to publish this post? It will be visible to all readers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={publishPost}>
                            <Send className="mr-2 h-4 w-4" />
                            Publish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
