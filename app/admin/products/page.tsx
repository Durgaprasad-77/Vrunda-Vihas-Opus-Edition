"use client"

import { SheetTrigger } from "@/components/ui/sheet"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Copy,
  Filter,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  X,
  ImageIcon,
  GripVertical,
} from "lucide-react"
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Sample products data
const products = [
  {
    id: 1,
    name: "Banarasi Silk Saree - Royal Red",
    sku: "SAR-BAN-001",
    category: "Sarees",
    type: "Saree",
    price: 12499,
    stock: 24,
    status: "Active",
    image: "/red-silk-saree.jpg",
  },
  {
    id: 2,
    name: "Kanjivaram Silk Saree - Gold",
    sku: "SAR-KAN-002",
    category: "Sarees",
    type: "Saree",
    price: 18999,
    stock: 12,
    status: "Active",
    image: "/gold-kanjivaram-saree.jpg",
  },
  {
    id: 3,
    name: "Chanderi Cotton Kurta Set",
    sku: "KUR-CHA-001",
    category: "Kurtas",
    type: "Kurta",
    price: 4299,
    stock: 45,
    status: "Active",
    image: "/cotton-kurta-set.jpg",
  },
  {
    id: 4,
    name: "Lucknowi Chikankari Kurta",
    sku: "KUR-LUC-002",
    category: "Kurtas",
    type: "Kurta",
    price: 6999,
    stock: 0,
    status: "Out of Stock",
    image: "/chikankari-kurta-white.jpg",
  },
  {
    id: 5,
    name: "Mysore Silk Saree - Green",
    sku: "SAR-MYS-001",
    category: "Sarees",
    type: "Saree",
    price: 9999,
    stock: 8,
    status: "Low Stock",
    image: "/green-mysore-silk-saree.png",
  },
  {
    id: 6,
    name: "Georgette Designer Saree",
    sku: "SAR-GEO-001",
    category: "Sarees",
    type: "Saree",
    price: 7850,
    stock: 32,
    status: "Active",
    image: "/georgette-designer-saree.jpg",
  },
]

// Available sizes for variants
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]
const colorOptions = [
  { name: "Red", value: "#DC2626" },
  { name: "Blue", value: "#2563EB" },
  { name: "Green", value: "#16A34A" },
  { name: "Gold", value: "#CA8A04" },
  { name: "Pink", value: "#DB2777" },
  { name: "Purple", value: "#9333EA" },
  { name: "Orange", value: "#EA580C" },
  { name: "Black", value: "#171717" },
  { name: "White", value: "#FAFAFA" },
  { name: "Maroon", value: "#7F1D1D" },
]

interface Variant {
  id: string
  size: string
  color: string
  sku: string
  price: number
  stock: number
  isActive: boolean
}

export default function ProductsPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  // Product form state
  const [variants, setVariants] = useState<Variant[]>([
    { id: "1", size: "Free Size", color: "Red", sku: "", price: 0, stock: 0, isActive: true },
  ])

  const itemsPerPage = 10
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
    const matchesType = selectedType === "all" || product.type.toLowerCase() === selectedType
    const matchesStatus = selectedStatus === "all" || product.status.toLowerCase().replace(" ", "-") === selectedStatus
    return matchesSearch && matchesCategory && matchesType && matchesStatus
  })

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString(),
        size: "Free Size",
        color: "Red",
        sku: "",
        price: 0,
        stock: 0,
        isActive: true,
      },
    ])
  }

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    }
  }

  const toggleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  // Product form component
  const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="variants">Variants</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
      </TabsList>

      {/* General Info Tab */}
      <TabsContent value="general" className="space-y-4 mt-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Banarasi Silk Saree - Royal Red"
              defaultValue={isEdit ? "Banarasi Silk Saree - Royal Red" : ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Product Type *</Label>
              <Select defaultValue={isEdit ? "saree" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saree">Saree</SelectItem>
                  <SelectItem value="kurta">Kurta</SelectItem>
                  <SelectItem value="lehenga">Lehenga</SelectItem>
                  <SelectItem value="dupatta">Dupatta</SelectItem>
                  <SelectItem value="blouse">Blouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category *</Label>
              <Select defaultValue={isEdit ? "banarasi" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarees">Sarees</SelectItem>
                  <SelectItem value="banarasi">↳ Banarasi</SelectItem>
                  <SelectItem value="kanjivaram">↳ Kanjivaram</SelectItem>
                  <SelectItem value="chanderi">↳ Chanderi</SelectItem>
                  <SelectItem value="kurtas">Kurtas</SelectItem>
                  <SelectItem value="womens-kurtas">↳ Women&apos;s Kurtas</SelectItem>
                  <SelectItem value="mens-kurtas">↳ Men&apos;s Kurtas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fabric">Fabric</Label>
              <Select defaultValue={isEdit ? "silk" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fabric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silk">Silk</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="georgette">Georgette</SelectItem>
                  <SelectItem value="chiffon">Chiffon</SelectItem>
                  <SelectItem value="linen">Linen</SelectItem>
                  <SelectItem value="organza">Organza</SelectItem>
                  <SelectItem value="crepe">Crepe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="occasion">Occasion</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="festive">Festive</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter detailed product description..."
              rows={4}
              defaultValue={
                isEdit
                  ? "Exquisite Banarasi silk saree featuring intricate zari work and traditional motifs. Perfect for weddings and special occasions."
                  : ""
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-4 gap-3">
              {isEdit && (
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  <Image src="/red-silk-saree.jpg" alt="Product" fill className="object-cover" />
                  <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Add Image</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload up to 8 images. First image will be the main product image.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="wedding, silk, traditional, festive (comma separated)"
              defaultValue={isEdit ? "wedding, silk, banarasi, festive, zari" : ""}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="featured" defaultChecked={isEdit} />
              <Label htmlFor="featured" className="font-normal">
                Featured Product
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="new-arrival" />
              <Label htmlFor="new-arrival" className="font-normal">
                New Arrival
              </Label>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Pricing Tab */}
      <TabsContent value="pricing" className="space-y-4 mt-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Selling Price (₹) *</Label>
              <Input id="price" type="number" placeholder="e.g., 12499" defaultValue={isEdit ? "12499" : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="compare-price">Compare at Price (₹)</Label>
              <Input id="compare-price" type="number" placeholder="e.g., 15999" defaultValue={isEdit ? "15999" : ""} />
              <p className="text-xs text-muted-foreground">Original price shown as strikethrough</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cost">Cost per Item (₹)</Label>
              <Input id="cost" type="number" placeholder="e.g., 8000" />
              <p className="text-xs text-muted-foreground">For profit calculation only</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tax">Tax Rate (%)</Label>
              <Select defaultValue="18">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% (Exempt)</SelectItem>
                  <SelectItem value="5">5% GST</SelectItem>
                  <SelectItem value="12">12% GST</SelectItem>
                  <SelectItem value="18">18% GST</SelectItem>
                  <SelectItem value="28">28% GST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>Calculated Margins</Label>
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Profit</p>
                <p className="text-lg font-semibold text-green-600">₹4,499</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Margin</p>
                <p className="text-lg font-semibold">36%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Discount</p>
                <p className="text-lg font-semibold text-primary">22% off</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Inventory Tab */}
      <TabsContent value="inventory" className="space-y-4 mt-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" placeholder="e.g., SAR-BAN-001" defaultValue={isEdit ? "SAR-BAN-001" : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN)</Label>
              <Input id="barcode" placeholder="Enter barcode" />
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            <Switch id="track-quantity" defaultChecked />
            <Label htmlFor="track-quantity" className="font-normal">
              Track quantity
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input id="stock" type="number" placeholder="e.g., 24" defaultValue={isEdit ? "24" : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="low-stock">Low Stock Alert At</Label>
              <Input id="low-stock" type="number" placeholder="e.g., 5" defaultValue="5" />
            </div>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>Stock Status</Label>
            <Select defaultValue="in-stock">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="on-backorder">On Backorder</SelectItem>
                <SelectItem value="pre-order">Pre-order</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Switch id="continue-selling" />
            <Label htmlFor="continue-selling" className="font-normal">
              Continue selling when out of stock
            </Label>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>Physical Product Details</Label>
            <div className="grid grid-cols-4 gap-3">
              <div className="grid gap-1">
                <Label className="text-xs">Weight (g)</Label>
                <Input type="number" placeholder="500" />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Length (cm)</Label>
                <Input type="number" placeholder="600" />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Width (cm)</Label>
                <Input type="number" placeholder="120" />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Height (cm)</Label>
                <Input type="number" placeholder="5" />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Variants Tab */}
      <TabsContent value="variants" className="space-y-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Product Variants</h3>
            <p className="text-sm text-muted-foreground">Add size and color variants for this product</p>
          </div>
          <Button variant="outline" size="sm" onClick={addVariant}>
            <Plus className="mr-2 h-4 w-4" />
            Add Variant
          </Button>
        </div>

        <div className="space-y-3">
          {variants.map((variant, index) => (
            <Card key={variant.id} className="p-4">
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-move" />
                <div className="flex-1 grid grid-cols-5 gap-3">
                  <div className="grid gap-1">
                    <Label className="text-xs">Size</Label>
                    <Select defaultValue={variant.size}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizeOptions.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">Color</Label>
                    <Select defaultValue={variant.color}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color.name} value={color.name}>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: color.value }} />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">SKU</Label>
                    <Input
                      className="h-9"
                      placeholder="SKU"
                      defaultValue={isEdit && index === 0 ? "SAR-BAN-001-RD-FS" : ""}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">Price (₹)</Label>
                    <Input
                      className="h-9"
                      type="number"
                      placeholder="0"
                      defaultValue={isEdit && index === 0 ? "12499" : ""}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">Stock</Label>
                    <Input
                      className="h-9"
                      type="number"
                      placeholder="0"
                      defaultValue={isEdit && index === 0 ? "24" : ""}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <Switch defaultChecked={variant.isActive} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeVariant(variant.id)}
                    disabled={variants.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Leave price empty to use the base product price. Stock is tracked per variant when
            variants are added.
          </p>
        </div>
      </TabsContent>

      {/* SEO Tab */}
      <TabsContent value="seo" className="space-y-4 mt-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="seo-title">SEO Title</Label>
            <Input
              id="seo-title"
              placeholder="e.g., Buy Banarasi Silk Saree Online | Vrunda Vihas"
              defaultValue={isEdit ? "Banarasi Silk Saree Royal Red - Premium Handwoven | Vrunda Vihas" : ""}
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">0/60 characters</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea
              id="seo-description"
              placeholder="Enter SEO meta description..."
              rows={3}
              defaultValue={
                isEdit
                  ? "Shop this exquisite Banarasi silk saree in royal red with intricate zari work. Perfect for weddings and festive occasions. Free shipping across India."
                  : ""
              }
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">0/160 characters</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url-handle">URL Handle</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-secondary border border-r-0 border-input rounded-l-md text-sm text-muted-foreground">
                /product/
              </span>
              <Input
                id="url-handle"
                className="rounded-l-none"
                placeholder="banarasi-silk-saree-royal-red"
                defaultValue={isEdit ? "banarasi-silk-saree-royal-red" : ""}
              />
            </div>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>Search Engine Preview</Label>
            <div className="p-4 border rounded-lg bg-background">
              <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                {isEdit
                  ? "Banarasi Silk Saree Royal Red - Premium Handwoven | Vrunda Vihas"
                  : "Product Title | Vrunda Vihas"}
              </p>
              <p className="text-green-700 text-sm">
                www.vrundavihas.com/product/{isEdit ? "banarasi-silk-saree-royal-red" : "product-url"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isEdit
                  ? "Shop this exquisite Banarasi silk saree in royal red with intricate zari work. Perfect for weddings and festive occasions. Free shipping across India."
                  : "Enter meta description to see preview..."}
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="focus-keyword">Focus Keyword</Label>
            <Input
              id="focus-keyword"
              placeholder="e.g., banarasi silk saree"
              defaultValue={isEdit ? "banarasi silk saree" : ""}
            />
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
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add New Product</SheetTitle>
                <SheetDescription>Create a new product listing for your store</SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <ProductForm />
              </div>
              <SheetFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={() => setIsAddSheetOpen(false)}>Publish Product</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your product inventory</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground mt-1">In stock & ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {products.filter((p) => p.status === "Low Stock").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need restock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {products.filter((p) => p.status === "Out of Stock").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unavailable</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or SKU..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="sarees">Sarees</SelectItem>
                  <SelectItem value="kurtas">Kurtas</SelectItem>
                  <SelectItem value="lehengas">Lehengas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="saree">Saree</SelectItem>
                  <SelectItem value="kurta">Kurta</SelectItem>
                  <SelectItem value="lehenga">Lehenga</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-4 mt-4 p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm font-medium">{selectedProducts.length} selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters section updated */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products by name, SKU..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="saree">Saree</SelectItem>
                <SelectItem value="kurta">Kurta</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sarees">Sarees</SelectItem>
                <SelectItem value="kurtas">Kurtas</SelectItem>
                <SelectItem value="lehengas">Lehengas</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddSheetOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            Showing {filteredProducts.length} of {products.length} products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleSelectProduct(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <span className="font-medium line-clamp-1">{product.name}</span>
                        {product.comparePrice && (
                          <span className="text-xs text-green-600">
                            {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% off
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <span className="font-medium">₹{product.price.toLocaleString("en-IN")}</span>
                      {product.comparePrice && (
                        <span className="text-xs text-muted-foreground ml-2">
                          ₹{product.comparePrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Active"
                          ? "default"
                          : product.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {product.status}
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsEditSheetOpen(true)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table updated */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>A list of all products in your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{product.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Active"
                          ? "default"
                          : product.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {product.status}
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAddSheetOpen(true)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
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
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, products.length)}{" "}
              of {products.length} products
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage * itemsPerPage >= products.length}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>Update product details</SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <ProductForm isEdit />
          </div>
          <SheetFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline">Unpublish</Button>
            <Button onClick={() => setIsEditSheetOpen(false)}>Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>Create a new product with all details, variants, and SEO settings</SheetDescription>
          </SheetHeader>
          <Tabs defaultValue="general" className="mt-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" placeholder="e.g., Banarasi Silk Saree - Royal Red" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input id="sku" placeholder="e.g., SAR-BAN-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Product Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saree">Saree</SelectItem>
                      <SelectItem value="kurta">Kurta</SelectItem>
                      <SelectItem value="lehenga">Lehenga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarees">Sarees</SelectItem>
                      <SelectItem value="banarasi">Banarasi</SelectItem>
                      <SelectItem value="kanjivaram">Kanjivaram</SelectItem>
                      <SelectItem value="kurtas">Kurtas</SelectItem>
                      <SelectItem value="lehengas">Lehengas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fabric">Fabric</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fabric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="silk">Silk</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="georgette">Georgette</SelectItem>
                      <SelectItem value="chiffon">Chiffon</SelectItem>
                      <SelectItem value="linen">Linen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter detailed product description..." rows={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Key Features</Label>
                <Textarea id="features" placeholder="• Feature 1&#10;• Feature 2&#10;• Feature 3" rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground text-sm">Drag and drop images here, or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-1">Recommended: 1200x1500px, max 5MB</p>
                  <Button variant="outline" className="mt-3 bg-transparent">
                    Upload Images
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured" className="font-normal">
                    Mark as featured product
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="active" defaultChecked />
                  <Label htmlFor="active" className="font-normal">
                    Active (visible on storefront)
                  </Label>
                </div>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="price">Selling Price (₹) *</Label>
                <Input id="price" type="number" placeholder="e.g., 12499" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compare-price">Compare at Price (₹)</Label>
                <Input id="compare-price" type="number" placeholder="e.g., 15999" />
                <p className="text-xs text-muted-foreground">Original price before discount (optional)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost per Item (₹)</Label>
                <Input id="cost" type="number" placeholder="e.g., 8000" />
                <p className="text-xs text-muted-foreground">Your cost from supplier (for profit tracking)</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Select defaultValue="12">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% (Tax Exempt)</SelectItem>
                    <SelectItem value="5">5% GST</SelectItem>
                    <SelectItem value="12">12% GST</SelectItem>
                    <SelectItem value="18">18% GST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-muted rounded-lg space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span>₹12,499</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (12%):</span>
                  <span>₹1,500</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>₹13,999</span>
                </div>
              </div>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input id="stock" type="number" placeholder="e.g., 24" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="low-stock">Low Stock Threshold</Label>
                <Input id="low-stock" type="number" placeholder="e.g., 5" defaultValue="5" />
                <p className="text-xs text-muted-foreground">Get notified when stock falls below this number</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" step="0.01" placeholder="e.g., 0.5" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input id="length" type="number" placeholder="e.g., 30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input id="width" type="number" placeholder="e.g., 25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" placeholder="e.g., 5" />
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="track-inventory" defaultChecked />
                  <Label htmlFor="track-inventory" className="font-normal">
                    Track inventory for this product
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="continue-selling" />
                  <Label htmlFor="continue-selling" className="font-normal">
                    Continue selling when out of stock
                  </Label>
                </div>
              </div>
            </TabsContent>

            {/* Variants Tab */}
            <TabsContent value="variants" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Product Variants</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Variant
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Add size, color, or other variants for this product</p>
              </div>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="variant-type">Variant Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select variant type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="size">Size</SelectItem>
                        <SelectItem value="color">Color</SelectItem>
                        <SelectItem value="fabric">Fabric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variant-values">Variant Values (comma separated)</Label>
                    <Input id="variant-values" placeholder="e.g., Free Size, S, M, L, XL" />
                  </div>
                </CardContent>
              </Card>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Free Size</TableCell>
                      <TableCell>SAR-BAN-001-FS</TableCell>
                      <TableCell>24</TableCell>
                      <TableCell>₹12,499</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input id="seo-title" placeholder="e.g., Banarasi Silk Saree - Royal Red | Vrunda Vihas" />
                <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-desc">Meta Description</Label>
                <Textarea id="seo-desc" placeholder="Describe this product for search engines..." rows={4} />
                <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url-slug">URL Slug</Label>
                <Input id="url-slug" placeholder="e.g., banarasi-silk-saree-royal-red" />
                <p className="text-xs text-muted-foreground">
                  Preview: vrundavihas.com/products/banarasi-silk-saree-royal-red
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="tags">Product Tags (comma separated)</Label>
                <Input id="tags" placeholder="e.g., silk, banarasi, wedding, traditional" />
                <p className="text-xs text-muted-foreground">Used for search and filtering</p>
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
              Publish Product
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
