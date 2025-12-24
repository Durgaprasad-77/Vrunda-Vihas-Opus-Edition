"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MoreHorizontal, FolderTree, ImageIcon, AlertTriangle } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Category {
  id: number
  name: string
  slug: string
  description: string
  parent: string | null
  products: number
  status: "Active" | "Draft" | "Hidden"
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  displayOrder?: number
  layout?: string
  productsPerPage?: number
}

const initialCategories: Category[] = [
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

const emptyCategory: Omit<Category, "id"> = {
  name: "",
  slug: "",
  description: "",
  parent: null,
  products: 0,
  status: "Active",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  displayOrder: 0,
  layout: "grid",
  productsPerPage: 24,
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [formData, setFormData] = useState<Omit<Category, "id">>(emptyCategory)

  // Get parent categories for dropdown
  const parentCategories = categories.filter((c) => !c.parent)

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  // Handle form input changes
  const handleInputChange = (field: keyof Omit<Category, "id">, value: string | number | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Auto-generate slug when name changes (only for new categories)
    if (field === "name" && !editingCategory) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value as string),
      }))
    }
  }

  // Open dialog for adding new category
  const handleAddCategory = () => {
    setEditingCategory(null)
    setFormData(emptyCategory)
    setIsDialogOpen(true)
  }

  // Open dialog for editing category
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent: category.parent,
      products: category.products,
      status: category.status,
      seoTitle: category.seoTitle || "",
      seoDescription: category.seoDescription || "",
      seoKeywords: category.seoKeywords || "",
      displayOrder: category.displayOrder || 0,
      layout: category.layout || "grid",
      productsPerPage: category.productsPerPage || 24,
    })
    setIsDialogOpen(true)
  }

  // Save category (add or update)
  const handleSaveCategory = () => {
    if (!formData.name.trim() || !formData.slug.trim()) {
      return // Basic validation
    }

    if (editingCategory) {
      // Update existing category
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, ...formData }
            : cat
        )
      )
    } else {
      // Add new category
      const newId = Math.max(...categories.map((c) => c.id), 0) + 1
      setCategories((prev) => [
        ...prev,
        { id: newId, ...formData },
      ])
    }

    setIsDialogOpen(false)
    setEditingCategory(null)
    setFormData(emptyCategory)
  }

  // Open delete confirmation dialog
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category)
    setIsDeleteDialogOpen(true)
  }

  // Confirm delete
  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      // Also delete subcategories
      setCategories((prev) =>
        prev.filter(
          (cat) => cat.id !== categoryToDelete.id && cat.parent !== categoryToDelete.name
        )
      )
    }
    setIsDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  // Get subcategories count for a category
  const getSubcategoriesCount = (categoryName: string) => {
    return categories.filter((c) => c.parent === categoryName).length
  }

  // Category Form Component
  const CategoryForm = () => (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="display">Display</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Category Name *</Label>
            <Input
              id="cat-name"
              placeholder="e.g., Banarasi Sarees"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-slug">Slug *</Label>
            <Input
              id="cat-slug"
              placeholder="e.g., banarasi-sarees"
              value={formData.slug}
              onChange={(e) => handleInputChange("slug", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">URL-friendly version of the name</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cat-parent">Parent Category</Label>
            <Select
              value={formData.parent || "none"}
              onValueChange={(value) => handleInputChange("parent", value === "none" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="None (Top Level)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Top Level)</SelectItem>
                {parentCategories
                  .filter((c) => c.name !== editingCategory?.name)
                  .map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Create nested subcategories</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value as Category["status"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cat-desc">Description</Label>
          <Textarea
            id="cat-desc"
            placeholder="Enter category description..."
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category Banner Image</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground text-xs mt-2">1920x400px recommended</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Choose File
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category Thumbnail</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground text-xs mt-2">400x400px recommended</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Choose File
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="seo" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="seo-title">SEO Title</Label>
          <Input
            id="seo-title"
            placeholder="e.g., Banarasi Sarees Collection | Vrunda Vihas"
            value={formData.seoTitle}
            onChange={(e) => handleInputChange("seoTitle", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo-desc">Meta Description</Label>
          <Textarea
            id="seo-desc"
            placeholder="Category description for search engines..."
            rows={3}
            value={formData.seoDescription}
            onChange={(e) => handleInputChange("seoDescription", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo-keywords">Keywords (comma separated)</Label>
          <Input
            id="seo-keywords"
            placeholder="e.g., banarasi saree, silk saree, traditional saree"
            value={formData.seoKeywords}
            onChange={(e) => handleInputChange("seoKeywords", e.target.value)}
          />
        </div>
      </TabsContent>

      <TabsContent value="display" className="space-y-4 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="display-order">Display Order</Label>
            <Input
              id="display-order"
              type="number"
              placeholder="e.g., 1"
              value={formData.displayOrder}
              onChange={(e) => handleInputChange("displayOrder", parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">Lower = first</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="layout">Category Layout</Label>
            <Select
              value={formData.layout}
              onValueChange={(value) => handleInputChange("layout", value)}
            >
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
            <Select
              value={String(formData.productsPerPage)}
              onValueChange={(value) => handleInputChange("productsPerPage", parseInt(value))}
            >
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
        </div>
      </TabsContent>
    </Tabs>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your products into categories</p>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
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
                    <Badge
                      variant={category.status === "Active" ? "default" : "secondary"}
                      className={category.status === "Active" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {category.status}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteClick(category)}
                        >
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

      {/* Add/Edit Category Dialog - Centered Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[90vw] !max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the category details below"
                : "Create a new category or subcategory with all details"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <CategoryForm />
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>
              {editingCategory ? "Update Category" : "Save Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Category
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{categoryToDelete?.name}"?
              {categoryToDelete && !categoryToDelete.parent && getSubcategoriesCount(categoryToDelete.name) > 0 && (
                <span className="block mt-2 text-destructive font-medium">
                  Warning: This will also delete {getSubcategoriesCount(categoryToDelete.name)} subcategories.
                </span>
              )}
              <span className="block mt-2">This action cannot be undone.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
