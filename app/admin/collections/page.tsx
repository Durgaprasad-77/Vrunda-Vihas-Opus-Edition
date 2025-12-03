"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MoreHorizontal, Eye, Layers, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

const collections = [
  { id: 1, name: "Wedding Collection", slug: "wedding", products: 45, status: "Active", featured: true },
  { id: 2, name: "Festive Favorites", slug: "festive", products: 38, status: "Active", featured: true },
  { id: 3, name: "Handloom Heritage", slug: "handloom", products: 28, status: "Active", featured: true },
  { id: 4, name: "Summer Specials", slug: "summer", products: 32, status: "Draft", featured: false },
  { id: 5, name: "Office Wear", slug: "office", products: 24, status: "Active", featured: false },
  { id: 6, name: "Designer Exclusives", slug: "designer", products: 18, status: "Active", featured: true },
]

export default function CollectionsPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Collections</h1>
          <p className="text-muted-foreground">Curate and manage product collections</p>
        </div>
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Collection
          </Button>
          <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create Collection</SheetTitle>
              <SheetDescription>Curate a collection of products for your customers</SheetDescription>
            </SheetHeader>
            <Tabs defaultValue="general" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Collection Name *</Label>
                  <Input placeholder="e.g., Wedding Collection" />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input placeholder="wedding-collection" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe this collection..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Collection Type</Label>
                  <Select defaultValue="manual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual (hand-picked products)</SelectItem>
                      <SelectItem value="auto">Automatic (by rules)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Collection Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm mt-2">Upload collection banner (1920x600px)</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Upload Image
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="featured-collection" />
                  <Label htmlFor="featured-collection" className="font-normal">
                    Show in featured collections
                  </Label>
                </div>
              </TabsContent>

              <TabsContent value="products" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <Label>Selected Products (0)</Label>
                  <Button variant="outline" size="sm">
                    Browse Products
                  </Button>
                </div>
                <div className="relative">
                  <Input placeholder="Search products to add..." className="pr-10" />
                </div>
                <ScrollArea className="h-[300px] border rounded-lg">
                  <div className="p-4 space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                        <Checkbox id={`product-${i}`} />
                        <div className="h-12 w-12 rounded bg-muted flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">Banarasi Silk Saree - Royal Red</p>
                          <p className="text-xs text-muted-foreground">₹12,499 • In Stock</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-xs text-muted-foreground">
                  Tip: Drag products to reorder them within the collection
                </p>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input placeholder="e.g., Wedding Sarees Collection | Vrunda Vihas" />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea placeholder="Collection description for search engines..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
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
                Create Collection
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Collections Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Collections</CardTitle>
          <CardDescription>Manage your product collections</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collection</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <Layers className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{collection.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">/{collection.slug}</TableCell>
                  <TableCell className="text-right">{collection.products}</TableCell>
                  <TableCell>{collection.featured && <Badge variant="outline">Featured</Badge>}</TableCell>
                  <TableCell>
                    <Badge variant={collection.status === "Active" ? "default" : "secondary"}>
                      {collection.status}
                    </Badge>
                  </TableCell>
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
    </div>
  )
}
