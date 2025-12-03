"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MoreHorizontal, FolderTree, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  {
    id: 1,
    name: "Sarees",
    slug: "sarees",
    description: "Traditional and designer sarees",
    parent: null,
    products: 156,
    status: "Active",
  },
  {
    id: 2,
    name: "Banarasi",
    slug: "banarasi",
    description: "Handwoven Banarasi silk sarees",
    parent: "Sarees",
    products: 42,
    status: "Active",
  },
  {
    id: 3,
    name: "Kanjivaram",
    slug: "kanjivaram",
    description: "Pure silk Kanjivaram sarees from Tamil Nadu",
    parent: "Sarees",
    products: 38,
    status: "Active",
  },
  {
    id: 4,
    name: "Chanderi",
    slug: "chanderi",
    description: "Lightweight Chanderi silk and cotton sarees",
    parent: "Sarees",
    products: 28,
    status: "Active",
  },
  {
    id: 5,
    name: "Kurtas",
    slug: "kurtas",
    description: "Ethnic kurtas for men and women",
    parent: null,
    products: 98,
    status: "Active",
  },
  {
    id: 6,
    name: "Women's Kurtas",
    slug: "womens-kurtas",
    description: "Designer kurtas for women",
    parent: "Kurtas",
    products: 64,
    status: "Active",
  },
  {
    id: 7,
    name: "Men's Kurtas",
    slug: "mens-kurtas",
    description: "Traditional kurtas for men",
    parent: "Kurtas",
    products: 34,
    status: "Active",
  },
  {
    id: 8,
    name: "Lehengas",
    slug: "lehengas",
    description: "Bridal and party wear lehengas",
    parent: null,
    products: 45,
    status: "Draft",
  },
]

export default function CategoriesPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your products into categories</p>
        </div>
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
          <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New Category</SheetTitle>
              <SheetDescription>Create a new category or subcategory with all details</SheetDescription>
            </SheetHeader>
            <Tabs defaultValue="general" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="display">Display</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="cat-name">Category Name *</Label>
                  <Input id="cat-name" placeholder="e.g., Banarasi Sarees" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-slug">Slug *</Label>
                  <Input id="cat-slug" placeholder="e.g., banarasi-sarees" />
                  <p className="text-xs text-muted-foreground">URL-friendly version of the name</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-parent">Parent Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="None (Top Level)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Top Level)</SelectItem>
                      <SelectItem value="sarees">Sarees</SelectItem>
                      <SelectItem value="kurtas">Kurtas</SelectItem>
                      <SelectItem value="lehengas">Lehengas</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Create nested subcategories</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-desc">Description</Label>
                  <Textarea id="cat-desc" placeholder="Enter category description..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Category Banner Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm mt-2">Upload banner image (1920x400px recommended)</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Choose File
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category Thumbnail</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm mt-2">Upload thumbnail (400x400px recommended)</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Choose File
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="seo-title">SEO Title</Label>
                  <Input id="seo-title" placeholder="e.g., Banarasi Sarees Collection | Vrunda Vihas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-desc">Meta Description</Label>
                  <Textarea id="seo-desc" placeholder="Category description for search engines..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-keywords">Keywords (comma separated)</Label>
                  <Input id="seo-keywords" placeholder="e.g., banarasi saree, silk saree, traditional saree" />
                </div>
              </TabsContent>

              <TabsContent value="display" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="display-order">Display Order</Label>
                  <Input id="display-order" type="number" placeholder="e.g., 1" defaultValue="0" />
                  <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="layout">Category Layout</Label>
                  <Select defaultValue="grid">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="masonry">Masonry View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="products-per-page">Products per Page</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                      <SelectItem value="96">96</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex gap-2 mt-6 pt-6 border-t">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddSheetOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setIsAddSheetOpen(false)}>
                Save Category
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Parent Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter((c) => !c.parent).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Subcategories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter((c) => c.parent).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>Manage your product categories and subcategories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <FolderTree className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{category.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                  <TableCell>
                    {category.parent ? (
                      <Badge variant="outline">{category.parent}</Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{category.products}</TableCell>
                  <TableCell>
                    <Badge variant={category.status === "Active" ? "default" : "secondary"}>{category.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
    </div>
  )
}
