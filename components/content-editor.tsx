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

interface EditorBlock {
  id: string
  type: "paragraph" | "heading1" | "heading2" | "heading3" | "quote" | "list" | "ordered-list" | "image" | "divider"
  content: string
  styles?: {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    code?: boolean
    color?: string
    backgroundColor?: string
    fontSize?: string
    fontFamily?: string
    textAlign?: "left" | "center" | "right"
  }
  metadata?: {
    url?: string
    alt?: string
    caption?: string
  }
}

interface BlogPost {
  title: string
  subtitle: string
  content: EditorBlock[]
  tags: string[]
  isPremium: boolean
  price?: number
  coverImage?: string
  publishedAt?: Date
  status: "draft" | "published"
}

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
  const [blogPost, setBlogPost] = useState<BlogPost>({
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

  const [activeBlockId, setActiveBlockId] = useState<string | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const addBlock = useCallback((type: EditorBlock["type"], afterId?: string) => {
    const newBlock: EditorBlock = {
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

  const updateBlock = useCallback((id: string, updates: Partial<EditorBlock>) => {
    setBlogPost((prev) => ({
      ...prev,
      content: prev.content.map((block) => (block.id === id ? { ...block, ...updates } : block)),
    }))
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setBlogPost((prev) => ({
      ...prev,
      content: prev.content.filter((block) => block.id !== id),
    }))
  }, [])

  const applyStyle = useCallback(
    (style: keyof EditorBlock["styles"], value: any) => {
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
    (file: File) => {
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

  const handleFileUpload = useCallback((file: File) => {
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

  const removeTag = useCallback((tagToRemove: string) => {
    setBlogPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }, [])

  const handlePublish = useCallback(() => {
    const publishedPost = {
      ...blogPost,
      status: "published" as const,
      publishedAt: new Date(),
    }

    // Here you would send to MongoDB
    console.log("Publishing to MongoDB:", publishedPost)
    alert("Blog post published! (MongoDB integration pending)")
    setIsPublishDialogOpen(false)
  }, [blogPost])

  const saveDraft = useCallback(() => {
    // Here you would save to MongoDB as draft
    console.log("Saving draft to MongoDB:", blogPost)
    alert("Draft saved! (MongoDB integration pending)")
  }, [blogPost])

  const getBlockStyle = (block: EditorBlock) => {
    const styles = block.styles || {}
    return {
      fontWeight: styles.bold ? "bold" : "normal",
      fontStyle: styles.italic ? "italic" : "normal",
      textDecoration: [styles.underline ? "underline" : "", styles.strikethrough ? "line-through" : ""]
        .filter(Boolean)
        .join(" "),
      color: styles.color || "inherit",
      backgroundColor: styles.backgroundColor || "transparent",
      fontSize: styles.fontSize || "inherit",
      fontFamily: styles.fontFamily || "inherit",
      textAlign: styles.textAlign || "left",
      fontFamily: styles.code ? "Fira Code, monospace" : styles.fontFamily || "inherit",
      padding: styles.code ? "2px 4px" : "0",
      borderRadius: styles.code ? "4px" : "0",
      backgroundColor: styles.code ? "var(--muted)" : styles.backgroundColor || "transparent",
    }
  }

  const renderBlock = (block: EditorBlock, index: number) => {
    const isActive = activeBlockId === block.id
    const style = getBlockStyle(block)

    const blockContent = (
      <div
        className={`group relative ${isActive ? "ring-2 ring-primary ring-offset-2" : ""}`}
        onClick={() => setActiveBlockId(block.id)}
      >
        {block.type === "paragraph" && (
          <div
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning
            style={style}
            className="min-h-[1.5rem] outline-none focus:outline-none p-2 rounded"
            onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {block.type === "heading1" && (
          <h1
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning
            style={style}
            className="text-3xl font-bold min-h-[2rem] outline-none focus:outline-none p-2 rounded"
            onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {block.type === "heading2" && (
          <h2
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning
            style={style}
            className="text-2xl font-semibold min-h-[1.75rem] outline-none focus:outline-none p-2 rounded"
            onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {block.type === "heading3" && (
          <h3
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning
            style={style}
            className="text-xl font-medium min-h-[1.5rem] outline-none focus:outline-none p-2 rounded"
            onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {block.type === "quote" && (
          <blockquote
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning
            style={style}
            className="border-l-4 border-primary pl-4 italic min-h-[1.5rem] outline-none focus:outline-none p-2 rounded"
            onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {block.type === "list" && (
          <ul className="list-disc list-inside">
            <li
              contentEditable={!isPreviewMode}
              suppressContentEditableWarning
              style={style}
              className="min-h-[1.5rem] outline-none focus:outline-none p-2 rounded"
              onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </ul>
        )}

        {block.type === "ordered-list" && (
          <ol className="list-decimal list-inside">
            <li
              contentEditable={!isPreviewMode}
              suppressContentEditableWarning
              style={style}
              className="min-h-[1.5rem] outline-none focus:outline-none p-2 rounded"
              onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </ol>
        )}

        {block.type === "image" && (
          <div className="my-4">
            <img
              src={block.content || "/placeholder.svg"}
              alt={block.metadata?.alt || ""}
              className="max-w-full h-auto rounded-lg"
            />
            {!isPreviewMode && (
              <Input
                placeholder="Add a caption..."
                value={block.metadata?.caption || ""}
                onChange={(e) =>
                  updateBlock(block.id, {
                    metadata: { ...block.metadata, caption: e.target.value },
                  })
                }
                className="mt-2 text-sm text-muted-foreground"
              />
            )}
            {block.metadata?.caption && isPreviewMode && (
              <p className="text-sm text-muted-foreground mt-2 text-center">{block.metadata.caption}</p>
            )}
          </div>
        )}

        {block.type === "divider" && <Separator className="my-4" />}

        {/* Block controls */}
        {!isPreviewMode && isActive && (
          <div className="absolute -left-12 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => addBlock("paragraph", block.id)}>Paragraph</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("heading1", block.id)}>Heading 1</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("heading2", block.id)}>Heading 2</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("heading3", block.id)}>Heading 3</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("quote", block.id)}>Quote</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("list", block.id)}>Bullet List</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("ordered-list", block.id)}>Numbered List</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("divider", block.id)}>Divider</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {blogPost.content.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                onClick={() => deleteBlock(block.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    )

    return (
      <div key={block.id} className="mb-2">
        {blockContent}
      </div>
    )
  }

  return (
    <div className="w-full max-w-none mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content Editor</h1>
          <p className="text-muted-foreground">Create and publish your blog posts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)} className="gap-2">
            <Eye className="h-4 w-4" />
            {isPreviewMode ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline" onClick={saveDraft} className="gap-2 bg-transparent">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Send className="h-4 w-4" />
                Publish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Publish Blog Post</DialogTitle>
                <DialogDescription>Configure your post settings before publishing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="premium"
                    checked={blogPost.isPremium}
                    onCheckedChange={(checked) => setBlogPost((prev) => ({ ...prev, isPremium: checked }))}
                  />
                  <Label htmlFor="premium">Premium Content</Label>
                </div>
                {blogPost.isPremium && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={blogPost.price || ""}
                      onChange={(e) => setBlogPost((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
                      className="col-span-3"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handlePublish}>Publish Now</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Toolbar */}
      {!isPreviewMode && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-sm">
              {/* Text Formatting */}
              <div className="flex items-center gap-1 border-r pr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    applyStyle("bold", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.bold)
                  }
                  className={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.bold ? "bg-muted" : ""}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    applyStyle("italic", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.italic)
                  }
                  className={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.italic ? "bg-muted" : ""}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    applyStyle("underline", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.underline)
                  }
                  className={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.underline ? "bg-muted" : ""}
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    applyStyle(
                      "strikethrough",
                      !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.strikethrough,
                    )
                  }
                  className={
                    blogPost.content.find((b) => b.id === activeBlockId)?.styles?.strikethrough ? "bg-muted" : ""
                  }
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    applyStyle("code", !blogPost.content.find((b) => b.id === activeBlockId)?.styles?.code)
                  }
                  className={blogPost.content.find((b) => b.id === activeBlockId)?.styles?.code ? "bg-muted" : ""}
                >
                  <Code className="h-4 w-4" />
                </Button>
              </div>

              {/* Text Alignment */}
              <div className="flex items-center gap-1 border-r pr-2">
                <Button variant="ghost" size="sm" onClick={() => applyStyle("textAlign", "left")}>
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => applyStyle("textAlign", "center")}>
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => applyStyle("textAlign", "right")}>
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Font Family */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Type className="h-4 w-4" />
                    Font
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {fontFamilies.map((font) => (
                    <DropdownMenuItem key={font.value} onClick={() => applyStyle("fontFamily", font.value)}>
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Font Size */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Size
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

              {/* Colors */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Palette className="h-4 w-4" />
                    Color
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Text Color</p>
                    <div className="grid grid-cols-4 gap-1 mb-3">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          className="w-6 h-6 rounded border-2 border-border hover:border-primary"
                          style={{ backgroundColor: color.value || "currentColor" }}
                          onClick={() => applyStyle("color", color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-medium mb-2">Background Color</p>
                    <div className="grid grid-cols-4 gap-1">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          className="w-6 h-6 rounded border-2 border-border hover:border-primary"
                          style={{ backgroundColor: color.value || "transparent" }}
                          onClick={() => applyStyle("backgroundColor", color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Media Upload */}
              <div className="flex items-center gap-1 border-l pl-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isUploading}
                  className="gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Image
                </Button>
                <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                  <Upload className="h-4 w-4" />
                  File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Editor Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Card>
            <CardHeader>
              <Input
                placeholder="Enter your blog title..."
                value={blogPost.title}
                onChange={(e) => setBlogPost((prev) => ({ ...prev, title: e.target.value }))}
                className="text-2xl font-bold border-none p-0 focus-visible:ring-0"
                disabled={isPreviewMode}
              />
              <Input
                placeholder="Enter a subtitle (optional)..."
                value={blogPost.subtitle}
                onChange={(e) => setBlogPost((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="text-lg text-muted-foreground border-none p-0 focus-visible:ring-0"
                disabled={isPreviewMode}
              />
            </CardHeader>
            <CardContent className="space-y-4">
              {blogPost.content.map((block, index) => renderBlock(block, index))}

              {!isPreviewMode && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => addBlock("paragraph")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add a new block
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Post Settings</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant={blogPost.status === "published" ? "default" : "secondary"} className="ml-2">
                  {blogPost.status}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium">Tags</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={addTag}>
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="premium-sidebar"
                  checked={blogPost.isPremium}
                  onCheckedChange={(checked) => setBlogPost((prev) => ({ ...prev, isPremium: checked }))}
                />
                <Label htmlFor="premium-sidebar" className="text-sm">
                  Premium Content
                </Label>
              </div>

              {blogPost.isPremium && (
                <div>
                  <Label htmlFor="price-sidebar" className="text-sm font-medium">
                    Price ($)
                  </Label>
                  <Input
                    id="price-sidebar"
                    type="number"
                    step="0.01"
                    value={blogPost.price || ""}
                    onChange={(e) => setBlogPost((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Word Count</h3>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {blogPost.content.reduce((count, block) => count + (block.content?.length || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">characters</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageUpload(file)
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(file)
        }}
      />
    </div>
  )
}
