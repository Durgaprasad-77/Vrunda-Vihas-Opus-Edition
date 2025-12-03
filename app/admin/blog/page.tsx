"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  Eye,
  Search,
  Clock,
  Tag,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Quote,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X,
  BarChart3,
  Send,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { BlogPost, BlogPostStatus } from "@/lib/admin-types"
import { mockBlogPosts, mockBlogCategories, mockBlogAuthors } from "@/lib/admin-data"

const statusColors: Record<BlogPostStatus, string> = {
  draft: "bg-orange-100 text-orange-800",
  published: "bg-green-100 text-green-800",
  scheduled: "bg-blue-100 text-blue-800",
  archived: "bg-gray-100 text-gray-800",
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [activeTab, setActiveTab] = useState("content")

  // Form state
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    coverImage: "",
    author: mockBlogAuthors[0],
    category: "",
    tags: [],
    status: "draft",
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      noIndex: false,
    },
  })
  const [tagInput, setTagInput] = useState("")
  const [keywordInput, setKeywordInput] = useState("")

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleOpenSheet = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post)
      setFormData({ ...post })
    } else {
      setEditingPost(null)
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        body: "",
        coverImage: "",
        author: mockBlogAuthors[0],
        category: "",
        tags: [],
        status: "draft",
        seo: {
          metaTitle: "",
          metaDescription: "",
          metaKeywords: [],
          ogTitle: "",
          ogDescription: "",
          ogImage: "",
          noIndex: false,
        },
      })
    }
    setActiveTab("content")
    setIsSheetOpen(true)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
    })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter((t) => t !== tag) })
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.seo?.metaKeywords?.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          metaKeywords: [...(formData.seo?.metaKeywords || []), keywordInput.trim()],
        },
      })
      setKeywordInput("")
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        metaKeywords: formData.seo?.metaKeywords?.filter((k) => k !== keyword),
      },
    })
  }

  const handleSavePost = (status?: BlogPostStatus) => {
    const saveStatus = status || formData.status || "draft"
    if (editingPost) {
      setPosts(
        posts.map((p) =>
          p.id === editingPost.id
            ? ({
                ...p,
                ...formData,
                status: saveStatus,
                publishedAt:
                  saveStatus === "published" && p.status !== "published" ? new Date().toISOString() : p.publishedAt,
                updatedAt: new Date().toISOString(),
              } as BlogPost)
            : p,
        ),
      )
    } else {
      const newPost: BlogPost = {
        id: `post_${Date.now()}`,
        title: formData.title || "",
        slug: formData.slug || generateSlug(formData.title || ""),
        excerpt: formData.excerpt || "",
        body: formData.body || "",
        coverImage: formData.coverImage,
        author: formData.author || mockBlogAuthors[0],
        category: formData.category || "Trends",
        tags: formData.tags || [],
        status: saveStatus,
        publishedAt: saveStatus === "published" ? new Date().toISOString() : undefined,
        seo: formData.seo || {},
        viewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setPosts([newPost, ...posts])
    }
    setIsSheetOpen(false)
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  // Stats
  const publishedCount = posts.filter((p) => p.status === "published").length
  const draftCount = posts.filter((p) => p.status === "draft").length
  const totalViews = posts.reduce((sum, p) => sum + p.viewCount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles</p>
        </div>
        <Button onClick={() => handleOpenSheet()}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{draftCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString("en-IN")}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {mockBlogCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-r-none"
            onClick={() => setViewMode("grid")}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-l-none"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Posts */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden group">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={post.coverImage || "/placeholder.svg?height=300&width=600&query=blog post cover"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={statusColors[post.status]} variant="secondary">
                    {post.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  {post.readingTime && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{post.author.name}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenSheet(post)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="h-10 w-14 rounded bg-muted relative overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg?height=40&width=56&query=blog thumbnail"}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium line-clamp-1">{post.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{post.author.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[post.status]} variant="secondary">
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.viewCount.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {post.publishedAt || post.createdAt}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenSheet(post)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Blog Post Editor Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto p-0">
          <SheetHeader className="p-6 pb-0">
            <SheetTitle>{editingPost ? "Edit Post" : "Create New Post"}</SheetTitle>
          </SheetHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="media">Media & Tags</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="content" className="p-6 pt-4 space-y-4">
              <div className="grid gap-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div className="grid gap-2">
                <Label>URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/blog/</span>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBlogCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Author</Label>
                  <Select
                    value={formData.author?.id}
                    onValueChange={(value) => {
                      const author = mockBlogAuthors.find((a) => a.id === value)
                      if (author) setFormData({ ...formData, author })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBlogAuthors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {author.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Excerpt *</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Write a brief summary of the post..."
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">{formData.excerpt?.length || 0}/160 characters</p>
              </div>

              <div className="grid gap-2">
                <Label>Content *</Label>
                {/* Rich Text Editor Toolbar */}
                <div className="border rounded-t-lg p-2 flex flex-wrap gap-1 bg-muted/30">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8 mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8 mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8 mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8 mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Write your blog post content here... (supports HTML)"
                  rows={16}
                  className="rounded-t-none font-mono text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="media" className="p-6 pt-4 space-y-6">
              <div className="grid gap-2">
                <Label>Cover Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  {formData.coverImage ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={formData.coverImage || "/placeholder.svg"}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData({ ...formData, coverImage: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Drag and drop or click to upload</p>
                      <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid gap-2 mt-2">
                  <Label className="text-sm">Or enter image URL</Label>
                  <Input
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    placeholder="Add a tag..."
                  />
                  <Button variant="outline" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: BlogPostStatus) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === "scheduled" && (
                <div className="grid gap-2">
                  <Label>Schedule Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="seo" className="p-6 pt-4 space-y-4">
              <div className="grid gap-2">
                <Label>Meta Title</Label>
                <Input
                  value={formData.seo?.metaTitle}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                  placeholder="SEO title (defaults to post title)"
                />
                <p className="text-xs text-muted-foreground">{formData.seo?.metaTitle?.length || 0}/60 characters</p>
              </div>

              <div className="grid gap-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={formData.seo?.metaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })
                  }
                  placeholder="SEO description for search results..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.seo?.metaDescription?.length || 0}/160 characters
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Meta Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddKeyword())}
                    placeholder="Add a keyword..."
                  />
                  <Button variant="outline" onClick={handleAddKeyword}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.seo?.metaKeywords?.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="gap-1">
                      {keyword}
                      <button onClick={() => handleRemoveKeyword(keyword)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid gap-2">
                <Label>Open Graph Title</Label>
                <Input
                  value={formData.seo?.ogTitle}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, ogTitle: e.target.value } })}
                  placeholder="Title for social sharing"
                />
              </div>

              <div className="grid gap-2">
                <Label>Open Graph Description</Label>
                <Textarea
                  value={formData.seo?.ogDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, seo: { ...formData.seo, ogDescription: e.target.value } })
                  }
                  placeholder="Description for social sharing..."
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label>Open Graph Image URL</Label>
                <Input
                  value={formData.seo?.ogImage}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, ogImage: e.target.value } })}
                  placeholder="https://..."
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label>No Index</Label>
                  <p className="text-xs text-muted-foreground">Hide this page from search engines</p>
                </div>
                <Switch
                  checked={formData.seo?.noIndex}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, seo: { ...formData.seo, noIndex: checked } })
                  }
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="sticky bottom-0 p-6 pt-4 border-t bg-background flex gap-3">
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => handleSavePost("draft")}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button className="flex-1" onClick={() => handleSavePost("published")}>
              <Send className="mr-2 h-4 w-4" />
              {editingPost?.status === "published" ? "Update" : "Publish"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
