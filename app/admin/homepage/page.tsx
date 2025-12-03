"use client"

import type React from "react"

import { useState } from "react"
import {
  Save,
  Plus,
  GripVertical,
  Eye,
  X,
  Trash2,
  ChevronUp,
  ChevronDown,
  Megaphone,
  ImageIcon,
  Grid3X3,
  Sparkles,
  Award,
  MessageSquareQuote,
  Instagram,
  LayoutTemplate,
  Calendar,
  LinkIcon,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Block types and their configurations
type BlockType =
  | "announcement-bar"
  | "hero-slider"
  | "featured-collections"
  | "festive-edit"
  | "usp-cards"
  | "testimonials"
  | "instagram-grid"
  | "footer-content"

interface Block {
  id: string
  type: BlockType
  name: string
  enabled: boolean
  data: Record<string, unknown>
}

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  buttonLabel: string
  buttonUrl: string
  desktopImage: string
  mobileImage: string
  priority: number
  active: boolean
}

interface USPItem {
  id: string
  icon: string
  title: string
  description: string
}

interface Testimonial {
  id: string
  name: string
  city: string
  rating: number
  quote: string
  displayOrder: number
}

const blockIcons: Record<BlockType, typeof Megaphone> = {
  "announcement-bar": Megaphone,
  "hero-slider": ImageIcon,
  "featured-collections": Grid3X3,
  "festive-edit": Sparkles,
  "usp-cards": Award,
  testimonials: MessageSquareQuote,
  "instagram-grid": Instagram,
  "footer-content": LayoutTemplate,
}

const blockDescriptions: Record<BlockType, string> = {
  "announcement-bar": "Top banner with promotional message",
  "hero-slider": "Main carousel with hero images",
  "featured-collections": "Curated product collections grid",
  "festive-edit": "Hand-picked festive/wedding products",
  "usp-cards": "Unique selling proposition highlights",
  testimonials: "Customer reviews and testimonials",
  "instagram-grid": "Instagram feed integration",
  "footer-content": "Footer links and information",
}

// Initial blocks data
const initialBlocks: Block[] = [
  {
    id: "1",
    type: "announcement-bar",
    name: "Announcement Bar",
    enabled: true,
    data: {
      text: "Free Shipping on orders above ₹2,999 | Use code ETHNIC20 for 20% off",
      backgroundColor: "#7c2d3e",
      linkUrl: "/collections/sale",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
    },
  },
  {
    id: "2",
    type: "hero-slider",
    name: "Hero Slider",
    enabled: true,
    data: {
      slides: [
        {
          id: "slide-1",
          title: "Wedding Collection 2025",
          subtitle: "Discover our exquisite bridal sarees",
          buttonLabel: "Shop Wedding",
          buttonUrl: "/collections/wedding",
          desktopImage: "/hero-wedding-desktop.jpg",
          mobileImage: "/hero-wedding-mobile.jpg",
          priority: 1,
          active: true,
        },
        {
          id: "slide-2",
          title: "Festive Season Sale",
          subtitle: "Up to 40% off on selected items",
          buttonLabel: "Shop Now",
          buttonUrl: "/collections/sale",
          desktopImage: "/hero-festive-desktop.jpg",
          mobileImage: "/hero-festive-mobile.jpg",
          priority: 2,
          active: true,
        },
      ],
    },
  },
  {
    id: "3",
    type: "featured-collections",
    name: "Featured Collections",
    enabled: true,
    data: {
      name: "Shop by Category",
      description: "Explore our curated collections",
      collectionFilter: "featured",
      productsToShow: 8,
      layout: "4x2",
    },
  },
  {
    id: "4",
    type: "festive-edit",
    name: "Festive Edit",
    enabled: true,
    data: {
      title: "The Wedding Edit",
      description: "Handpicked pieces for your special day",
      selectedProducts: ["prod-1", "prod-2", "prod-3", "prod-4", "prod-5", "prod-6"],
    },
  },
  {
    id: "5",
    type: "usp-cards",
    name: "USP Cards",
    enabled: true,
    data: {
      items: [
        { id: "usp-1", icon: "truck", title: "Free Shipping", description: "On orders above ₹2,999" },
        { id: "usp-2", icon: "shield", title: "Authentic Products", description: "100% genuine handloom" },
        { id: "usp-3", icon: "rotate-ccw", title: "Easy Returns", description: "7-day return policy" },
        { id: "usp-4", icon: "headphones", title: "24/7 Support", description: "Dedicated customer care" },
      ],
    },
  },
  {
    id: "6",
    type: "testimonials",
    name: "Testimonials",
    enabled: true,
    data: {
      testimonials: [
        {
          id: "test-1",
          name: "Priya Sharma",
          city: "Mumbai",
          rating: 5,
          quote: "Absolutely stunning sarees! The quality exceeded my expectations.",
          displayOrder: 1,
        },
        {
          id: "test-2",
          name: "Anita Reddy",
          city: "Hyderabad",
          rating: 5,
          quote: "Perfect for my daughter's wedding. Highly recommend!",
          displayOrder: 2,
        },
        {
          id: "test-3",
          name: "Meera Patel",
          city: "Ahmedabad",
          rating: 4,
          quote: "Great collection and excellent customer service.",
          displayOrder: 3,
        },
      ],
    },
  },
  {
    id: "7",
    type: "instagram-grid",
    name: "Instagram Grid",
    enabled: true,
    data: {
      profileUrl: "https://instagram.com/vrundavihas",
      images: [
        "/instagram/img1.jpg",
        "/instagram/img2.jpg",
        "/instagram/img3.jpg",
        "/instagram/img4.jpg",
        "/instagram/img5.jpg",
        "/instagram/img6.jpg",
      ],
    },
  },
  {
    id: "8",
    type: "footer-content",
    name: "Footer Content",
    enabled: true,
    data: {
      companyDescription:
        "Vrunda Vihas brings you the finest collection of Indian ethnic wear, handcrafted with love and tradition.",
      address: "123 Ethnic Street, Mumbai, Maharashtra 400001",
      phone: "+91 98765 43210",
      email: "support@vrundavihas.com",
      socialLinks: {
        facebook: "https://facebook.com/vrundavihas",
        instagram: "https://instagram.com/vrundavihas",
        twitter: "https://twitter.com/vrundavihas",
        pinterest: "https://pinterest.com/vrundavihas",
      },
    },
  },
]

// Mock products for multi-select
const mockProducts = [
  { id: "prod-1", name: "Royal Banarasi Silk Saree", sku: "SAR-001" },
  { id: "prod-2", name: "Kanjivaram Gold Zari Saree", sku: "SAR-002" },
  { id: "prod-3", name: "Mysore Silk Designer Saree", sku: "SAR-003" },
  { id: "prod-4", name: "Chanderi Cotton Saree", sku: "SAR-004" },
  { id: "prod-5", name: "Lucknowi Chikankari Kurta", sku: "KUR-001" },
  { id: "prod-6", name: "Embroidered Anarkali Set", sku: "KUR-002" },
  { id: "prod-7", name: "Cotton Printed Kurta Set", sku: "KUR-003" },
  { id: "prod-8", name: "Designer Lehenga Set", sku: "LEH-001" },
]

const iconOptions = [
  { value: "truck", label: "Truck (Shipping)" },
  { value: "shield", label: "Shield (Security)" },
  { value: "rotate-ccw", label: "Rotate (Returns)" },
  { value: "headphones", label: "Headphones (Support)" },
  { value: "heart", label: "Heart (Love)" },
  { value: "star", label: "Star (Quality)" },
  { value: "gift", label: "Gift (Offers)" },
  { value: "clock", label: "Clock (Time)" },
]

export default function HomepageContentPage() {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null)

  // Toggle block enabled state
  const toggleBlock = (id: string) => {
    setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, enabled: !block.enabled } : block)))
  }

  // Move block up/down
  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((b) => b.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === blocks.length - 1)) {
      return
    }
    const newBlocks = [...blocks]
    const newIndex = direction === "up" ? index - 1 : index + 1
    ;[newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]]
    setBlocks(newBlocks)
  }

  // Open block editor
  const openBlockEditor = (block: Block) => {
    setSelectedBlock({ ...block, data: JSON.parse(JSON.stringify(block.data)) })
    setIsDrawerOpen(true)
  }

  // Save block changes
  const saveBlockChanges = () => {
    if (!selectedBlock) return
    setBlocks((prev) => prev.map((block) => (block.id === selectedBlock.id ? selectedBlock : block)))
    setIsDrawerOpen(false)
    setSelectedBlock(null)
  }

  // Update block data
  const updateBlockData = (key: string, value: unknown) => {
    if (!selectedBlock) return
    setSelectedBlock({
      ...selectedBlock,
      data: { ...selectedBlock.data, [key]: value },
    })
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlockId(blockId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault()
    if (!draggedBlockId || draggedBlockId === targetBlockId) return

    const draggedIndex = blocks.findIndex((b) => b.id === draggedBlockId)
    const targetIndex = blocks.findIndex((b) => b.id === targetBlockId)

    const newBlocks = [...blocks]
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1)
    newBlocks.splice(targetIndex, 0, draggedBlock)

    setBlocks(newBlocks)
    setDraggedBlockId(null)
  }

  const handleDragEnd = () => {
    setDraggedBlockId(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Homepage Content</h1>
          <p className="text-muted-foreground">Manage and reorder your homepage sections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Blocks List */}
      <Card>
        <CardHeader>
          <CardTitle>Homepage Blocks</CardTitle>
          <CardDescription>Drag to reorder blocks. Click on a block to edit its content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {blocks.map((block, index) => {
              const Icon = blockIcons[block.type]
              return (
                <div
                  key={block.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, block.id)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "flex items-center gap-4 p-4 border rounded-lg bg-card transition-all cursor-pointer hover:border-primary/50 group",
                    draggedBlockId === block.id && "opacity-50 border-dashed",
                    !block.enabled && "opacity-60 bg-muted/50",
                  )}
                >
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>

                  {/* Block Icon */}
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      block.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Block Info */}
                  <div className="flex-1 min-w-0" onClick={() => openBlockEditor(block)}>
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{block.name}</p>
                      <Badge variant={block.enabled ? "default" : "secondary"} className="text-xs">
                        {block.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{blockDescriptions[block.type]}</p>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, "up")
                      }}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, "down")
                      }}
                      disabled={index === blocks.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Toggle Switch */}
                  <Switch
                    checked={block.enabled}
                    onCheckedChange={() => toggleBlock(block.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Block Editor Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-hidden flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {selectedBlock && (
                <>
                  {(() => {
                    const Icon = blockIcons[selectedBlock.type]
                    return <Icon className="h-5 w-5 text-primary" />
                  })()}
                  Edit {selectedBlock.name}
                </>
              )}
            </SheetTitle>
            <SheetDescription>{selectedBlock && blockDescriptions[selectedBlock.type]}</SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="py-4 space-y-6">
              {selectedBlock && (
                <>
                  {/* Announcement Bar Form */}
                  {selectedBlock.type === "announcement-bar" && (
                    <AnnouncementBarForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}

                  {/* Hero Slider Form */}
                  {selectedBlock.type === "hero-slider" && (
                    <HeroSliderForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}

                  {/* Featured Collections Form */}
                  {selectedBlock.type === "featured-collections" && (
                    <FeaturedCollectionsForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}

                  {/* Festive Edit Form */}
                  {selectedBlock.type === "festive-edit" && (
                    <FestiveEditForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}

                  {/* USP Cards Form */}
                  {selectedBlock.type === "usp-cards" && (
                    <USPCardsForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}

                  {/* Testimonials Form */}
                  {selectedBlock.type === "testimonials" && (
                    <TestimonialsForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}

                  {/* Instagram Grid Form */}
                  {selectedBlock.type === "instagram-grid" && (
                    <InstagramGridForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}

                  {/* Footer Content Form */}
                  {selectedBlock.type === "footer-content" && (
                    <FooterContentForm data={selectedBlock.data} onChange={updateBlockData} />
                  )}
                </>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2 pt-4 border-t mt-auto">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={saveBlockChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ============================================
// Block Form Components
// ============================================

// Announcement Bar Form
function AnnouncementBarForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="announcement-text">Announcement Text</Label>
        <Textarea
          id="announcement-text"
          value={(data.text as string) || ""}
          onChange={(e) => onChange("text", e.target.value)}
          placeholder="Enter your announcement message..."
          rows={2}
        />
        <p className="text-xs text-muted-foreground">
          Keep it short and impactful. Use | to separate multiple messages.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bg-color">Background Color</Label>
        <div className="flex gap-2">
          <Input
            id="bg-color"
            type="color"
            value={(data.backgroundColor as string) || "#7c2d3e"}
            onChange={(e) => onChange("backgroundColor", e.target.value)}
            className="w-16 h-10 p-1 cursor-pointer"
          />
          <Input
            value={(data.backgroundColor as string) || "#7c2d3e"}
            onChange={(e) => onChange("backgroundColor", e.target.value)}
            placeholder="#7c2d3e"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="link-url">Link URL (Optional)</Label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="link-url"
            value={(data.linkUrl as string) || ""}
            onChange={(e) => onChange("linkUrl", e.target.value)}
            placeholder="/collections/sale"
            className="pl-9"
          />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="start-date"
              type="date"
              value={(data.startDate as string) || ""}
              onChange={(e) => onChange("startDate", e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="end-date"
              type="date"
              value={(data.endDate as string) || ""}
              onChange={(e) => onChange("endDate", e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero Slider Form
function HeroSliderForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  const slides = (data.slides as HeroSlide[]) || []

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      title: "",
      subtitle: "",
      buttonLabel: "Shop Now",
      buttonUrl: "/",
      desktopImage: "",
      mobileImage: "",
      priority: slides.length + 1,
      active: true,
    }
    onChange("slides", [...slides, newSlide])
  }

  const updateSlide = (slideId: string, field: keyof HeroSlide, value: unknown) => {
    onChange(
      "slides",
      slides.map((slide) => (slide.id === slideId ? { ...slide, [field]: value } : slide)),
    )
  }

  const removeSlide = (slideId: string) => {
    onChange(
      "slides",
      slides.filter((slide) => slide.id !== slideId),
    )
  }

  return (
    <div className="space-y-4">
      {slides.map((slide, index) => (
        <Card key={slide.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Slide {index + 1}</CardTitle>
              <div className="flex items-center gap-2">
                <Switch
                  checked={slide.active}
                  onCheckedChange={(checked) => updateSlide(slide.id, "active", checked)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeSlide(slide.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={slide.title}
                  onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                  placeholder="Slide title..."
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Input
                  type="number"
                  value={slide.priority}
                  onChange={(e) => updateSlide(slide.id, "priority", Number.parseInt(e.target.value))}
                  min={1}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Textarea
                value={slide.subtitle}
                onChange={(e) => updateSlide(slide.id, "subtitle", e.target.value)}
                placeholder="Slide subtitle..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Button Label</Label>
                <Input
                  value={slide.buttonLabel}
                  onChange={(e) => updateSlide(slide.id, "buttonLabel", e.target.value)}
                  placeholder="Shop Now"
                />
              </div>
              <div className="space-y-2">
                <Label>Button URL</Label>
                <Input
                  value={slide.buttonUrl}
                  onChange={(e) => updateSlide(slide.id, "buttonUrl", e.target.value)}
                  placeholder="/collections/..."
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Desktop Image URL</Label>
                <Input
                  value={slide.desktopImage}
                  onChange={(e) => updateSlide(slide.id, "desktopImage", e.target.value)}
                  placeholder="/images/hero-desktop.jpg"
                />
                <p className="text-xs text-muted-foreground">Recommended: 1920x800px</p>
              </div>
              <div className="space-y-2">
                <Label>Mobile Image URL</Label>
                <Input
                  value={slide.mobileImage}
                  onChange={(e) => updateSlide(slide.id, "mobileImage", e.target.value)}
                  placeholder="/images/hero-mobile.jpg"
                />
                <p className="text-xs text-muted-foreground">Recommended: 750x900px</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full bg-transparent" onClick={addSlide}>
        <Plus className="mr-2 h-4 w-4" />
        Add Slide
      </Button>
    </div>
  )
}

// Featured Collections Form
function FeaturedCollectionsForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="collection-name">Section Name</Label>
        <Input
          id="collection-name"
          value={(data.name as string) || ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Shop by Category"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="collection-desc">Description</Label>
        <Textarea
          id="collection-desc"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Explore our curated collections..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Collection/Filter to Display</Label>
        <Select
          value={(data.collectionFilter as string) || "featured"}
          onValueChange={(value) => onChange("collectionFilter", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured Products</SelectItem>
            <SelectItem value="bestsellers">Bestsellers</SelectItem>
            <SelectItem value="new-arrivals">New Arrivals</SelectItem>
            <SelectItem value="sarees">All Sarees</SelectItem>
            <SelectItem value="kurtas">All Kurtas</SelectItem>
            <SelectItem value="wedding">Wedding Collection</SelectItem>
            <SelectItem value="festive">Festive Collection</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="products-count">Number of Products</Label>
          <Input
            id="products-count"
            type="number"
            value={(data.productsToShow as number) || 8}
            onChange={(e) => onChange("productsToShow", Number.parseInt(e.target.value))}
            min={4}
            max={24}
          />
        </div>

        <div className="space-y-2">
          <Label>Layout (Grid Size)</Label>
          <Select value={(data.layout as string) || "4x2"} onValueChange={(value) => onChange("layout", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3x2">3 columns x 2 rows</SelectItem>
              <SelectItem value="4x2">4 columns x 2 rows</SelectItem>
              <SelectItem value="4x3">4 columns x 3 rows</SelectItem>
              <SelectItem value="5x2">5 columns x 2 rows</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// Festive Edit Form
function FestiveEditForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  const selectedProducts = (data.selectedProducts as string[]) || []

  const toggleProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      onChange(
        "selectedProducts",
        selectedProducts.filter((id) => id !== productId),
      )
    } else {
      onChange("selectedProducts", [...selectedProducts, productId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="festive-title">Section Title</Label>
        <Input
          id="festive-title"
          value={(data.title as string) || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="The Wedding Edit"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="festive-desc">Description</Label>
        <Textarea
          id="festive-desc"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Handpicked pieces for your special day..."
          rows={2}
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Select Products (Multi-select)</Label>
        <p className="text-xs text-muted-foreground mb-3">
          Click to select/deselect products. {selectedProducts.length} selected.
        </p>

        <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
          {mockProducts.map((product) => {
            const isSelected = selectedProducts.includes(product.id)
            return (
              <div
                key={product.id}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer transition-colors",
                  isSelected ? "bg-primary/10" : "hover:bg-muted/50",
                )}
                onClick={() => toggleProduct(product.id)}
              >
                <div
                  className={cn(
                    "h-5 w-5 rounded border-2 flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground",
                  )}
                >
                  {isSelected && <span className="text-xs">✓</span>}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sku}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// USP Cards Form
function USPCardsForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  const items = (data.items as USPItem[]) || []

  const addItem = () => {
    const newItem: USPItem = {
      id: `usp-${Date.now()}`,
      icon: "star",
      title: "",
      description: "",
    }
    onChange("items", [...items, newItem])
  }

  const updateItem = (itemId: string, field: keyof USPItem, value: string) => {
    onChange(
      "items",
      items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    )
  }

  const removeItem = (itemId: string) => {
    onChange(
      "items",
      items.filter((item) => item.id !== itemId),
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={item.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">USP {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={item.icon} onValueChange={(value) => updateItem(item.id, "icon", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={item.title}
                onChange={(e) => updateItem(item.id, "title", e.target.value)}
                placeholder="Free Shipping"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={item.description}
                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                placeholder="On orders above ₹2,999"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full bg-transparent" onClick={addItem}>
        <Plus className="mr-2 h-4 w-4" />
        Add USP Card
      </Button>
    </div>
  )
}

// Testimonials Form
function TestimonialsForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  const testimonials = (data.testimonials as Testimonial[]) || []

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name: "",
      city: "",
      rating: 5,
      quote: "",
      displayOrder: testimonials.length + 1,
    }
    onChange("testimonials", [...testimonials, newTestimonial])
  }

  const updateTestimonial = (testId: string, field: keyof Testimonial, value: unknown) => {
    onChange(
      "testimonials",
      testimonials.map((test) => (test.id === testId ? { ...test, [field]: value } : test)),
    )
  }

  const removeTestimonial = (testId: string) => {
    onChange(
      "testimonials",
      testimonials.filter((test) => test.id !== testId),
    )
  }

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial, index) => (
        <Card key={testimonial.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Testimonial {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => removeTestimonial(testimonial.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                  placeholder="Priya Sharma"
                />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={testimonial.city}
                  onChange={(e) => updateTestimonial(testimonial.id, "city", e.target.value)}
                  placeholder="Mumbai"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <Select
                  value={testimonial.rating.toString()}
                  onValueChange={(value) => updateTestimonial(testimonial.id, "rating", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        <span className="flex items-center gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="ml-1">({rating})</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={testimonial.displayOrder}
                  onChange={(e) => updateTestimonial(testimonial.id, "displayOrder", Number.parseInt(e.target.value))}
                  min={1}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Quote</Label>
              <Textarea
                value={testimonial.quote}
                onChange={(e) => updateTestimonial(testimonial.id, "quote", e.target.value)}
                placeholder="Write the customer's testimonial..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full bg-transparent" onClick={addTestimonial}>
        <Plus className="mr-2 h-4 w-4" />
        Add Testimonial
      </Button>
    </div>
  )
}

// Instagram Grid Form
function InstagramGridForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  const images = (data.images as string[]) || []

  const addImage = () => {
    onChange("images", [...images, ""])
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    onChange("images", newImages)
  }

  const removeImage = (index: number) => {
    onChange(
      "images",
      images.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="instagram-profile">Instagram Profile URL</Label>
        <div className="relative">
          <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="instagram-profile"
            value={(data.profileUrl as string) || ""}
            onChange={(e) => onChange("profileUrl", e.target.value)}
            placeholder="https://instagram.com/vrundavihas"
            className="pl-9"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Image URLs</Label>
        <p className="text-xs text-muted-foreground mb-3">
          Add Instagram post images. Recommended: 6 images for a 3x2 grid.
        </p>

        <div className="space-y-2">
          {images.map((image, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                placeholder={`/instagram/img${index + 1}.jpg`}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-destructive shrink-0"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent" onClick={addImage}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image URL
        </Button>
      </div>
    </div>
  )
}

// Footer Content Form
function FooterContentForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  const socialLinks = (data.socialLinks as Record<string, string>) || {}

  const updateSocialLink = (platform: string, value: string) => {
    onChange("socialLinks", { ...socialLinks, [platform]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company-desc">Company Description</Label>
        <Textarea
          id="company-desc"
          value={(data.companyDescription as string) || ""}
          onChange={(e) => onChange("companyDescription", e.target.value)}
          placeholder="Brief description of your company..."
          rows={3}
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={(data.address as string) || ""}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="123 Street, City, State, PIN"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={(data.phone as string) || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={(data.email as string) || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="support@vrundavihas.com"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>Social Media Links</Label>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Facebook</Label>
            <Input
              value={socialLinks.facebook || ""}
              onChange={(e) => updateSocialLink("facebook", e.target.value)}
              placeholder="https://facebook.com/..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Instagram</Label>
            <Input
              value={socialLinks.instagram || ""}
              onChange={(e) => updateSocialLink("instagram", e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Twitter / X</Label>
            <Input
              value={socialLinks.twitter || ""}
              onChange={(e) => updateSocialLink("twitter", e.target.value)}
              placeholder="https://twitter.com/..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Pinterest</Label>
            <Input
              value={socialLinks.pinterest || ""}
              onChange={(e) => updateSocialLink("pinterest", e.target.value)}
              placeholder="https://pinterest.com/..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
