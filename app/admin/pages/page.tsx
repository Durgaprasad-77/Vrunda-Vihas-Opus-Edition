"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MoreHorizontal, Eye, FileText, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const pages = [
  { id: 1, title: "About Us", slug: "about", status: "Published", lastUpdated: "2024-01-10" },
  { id: 2, title: "Contact", slug: "contact", status: "Published", lastUpdated: "2024-01-08" },
  { id: 3, title: "Shipping & Delivery", slug: "shipping", status: "Published", lastUpdated: "2024-01-05" },
  { id: 4, title: "Return Policy", slug: "returns", status: "Published", lastUpdated: "2024-01-05" },
  { id: 5, title: "Privacy Policy", slug: "privacy", status: "Published", lastUpdated: "2023-12-20" },
  { id: 6, title: "Terms & Conditions", slug: "terms", status: "Draft", lastUpdated: "2024-01-12" },
]

export default function PagesPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage static pages on your store</p>
        </div>
        <Button onClick={() => setIsAddSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </div>

      {/* Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>Manage your store&apos;s static pages</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{page.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Globe className="h-3 w-3" />/{page.slug}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={page.status === "Published" ? "default" : "secondary"}>{page.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{page.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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

      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Page</SheetTitle>
            <SheetDescription>Create a new static page for your store</SheetDescription>
          </SheetHeader>
          <Tabs defaultValue="content" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Page Title *</Label>
                <Input placeholder="e.g., About Us" />
              </div>
              <div className="space-y-2">
                <Label>URL Slug *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">vrundavihas.com/pages/</span>
                  <Input placeholder="about-us" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Page Content (Rich Text Editor)</Label>
                <div className="border rounded-lg overflow-hidden">
                  {/* Rich Text Editor Toolbar */}
                  <div className="border-b bg-muted/30 p-2 flex items-center gap-1 flex-wrap">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="font-bold">B</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="italic">I</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="underline">U</span>
                    </Button>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Select defaultValue="p">
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p">Paragraph</SelectItem>
                        <SelectItem value="h1">Heading 1</SelectItem>
                        <SelectItem value="h2">Heading 2</SelectItem>
                        <SelectItem value="h3">Heading 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      Link
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      Image
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      List
                    </Button>
                  </div>
                  {/* Editor Area */}
                  <Textarea
                    className="min-h-[400px] border-0 rounded-none focus-visible:ring-0"
                    placeholder="Start writing your page content here...&#10;&#10;You can format text, add images, create lists, and more."
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Tip: Use the toolbar to format your content with headings, bold, images, etc.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Page Template</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="full-width">Full Width</SelectItem>
                    <SelectItem value="sidebar">With Sidebar</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>SEO Title</Label>
                <Input placeholder="e.g., About Vrunda Vihas - Authentic Indian Ethnic Wear" />
                <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea placeholder="Page description for search engines..." rows={4} />
                <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Keywords (comma separated)</Label>
                <Input placeholder="e.g., about us, indian ethnic wear, traditional clothing" />
              </div>
              <div className="space-y-2">
                <Label>Featured Image (for social sharing)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground text-sm">Upload OG image (1200x630px recommended)</p>
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    Upload Image
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (visible to everyone)</SelectItem>
                    <SelectItem value="hidden">Hidden (accessible via direct link)</SelectItem>
                    <SelectItem value="draft">Draft (not published)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Page Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex gap-2 mt-6 pt-6 border-t">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddSheetOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Save as Draft
            </Button>
            <Button className="flex-1" onClick={() => setIsAddSheetOpen(false)}>
              Publish Page
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
