"use client"

import type React from "react"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  Copy,
  Tag,
  Search,
  Filter,
  Calendar,
  Percent,
  IndianRupee,
  Truck,
  Pause,
  Play,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import type { Promotion, Campaign, DiscountType, PromotionStatus } from "@/lib/admin-types"
import { mockPromotions, mockCampaigns } from "@/lib/admin-data"

const discountTypeIcons: Record<DiscountType, React.ReactNode> = {
  percentage: <Percent className="h-4 w-4" />,
  fixed: <IndianRupee className="h-4 w-4" />,
  free_shipping: <Truck className="h-4 w-4" />,
  buy_x_get_y: <Tag className="h-4 w-4" />,
}

const statusColors: Record<PromotionStatus, string> = {
  active: "bg-green-100 text-green-800",
  scheduled: "bg-blue-100 text-blue-800",
  expired: "bg-gray-100 text-gray-800",
  paused: "bg-yellow-100 text-yellow-800",
  draft: "bg-orange-100 text-orange-800",
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions)
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isCampaignSheetOpen, setIsCampaignSheetOpen] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("coupons")

  // Form state for promotion
  const [formData, setFormData] = useState<Partial<Promotion>>({
    code: "",
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderAmount: undefined,
    maxDiscountAmount: undefined,
    usageLimit: undefined,
    perCustomerLimit: undefined,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    status: "draft",
    firstOrderOnly: false,
    applicableCategories: [],
    applicableProducts: [],
  })

  // Form state for campaign
  const [campaignFormData, setCampaignFormData] = useState<Partial<Campaign>>({
    name: "",
    description: "",
    type: "sale",
    discountPercentage: undefined,
    bannerImage: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    status: "draft",
    targetAudience: "all",
    linkedPromotions: [],
  })

  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch =
      promo.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || promo.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenSheet = (promotion?: Promotion) => {
    if (promotion) {
      setEditingPromotion(promotion)
      setFormData({
        ...promotion,
        startDate: promotion.startDate,
        endDate: promotion.endDate || "",
      })
    } else {
      setEditingPromotion(null)
      setFormData({
        code: "",
        name: "",
        description: "",
        discountType: "percentage",
        discountValue: 0,
        minOrderAmount: undefined,
        maxDiscountAmount: undefined,
        usageLimit: undefined,
        perCustomerLimit: undefined,
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        status: "draft",
        firstOrderOnly: false,
        applicableCategories: [],
        applicableProducts: [],
      })
    }
    setIsSheetOpen(true)
  }

  const handleOpenCampaignSheet = (campaign?: Campaign) => {
    if (campaign) {
      setEditingCampaign(campaign)
      setCampaignFormData({ ...campaign })
    } else {
      setEditingCampaign(null)
      setCampaignFormData({
        name: "",
        description: "",
        type: "sale",
        discountPercentage: undefined,
        bannerImage: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        status: "draft",
        targetAudience: "all",
        linkedPromotions: [],
      })
    }
    setIsCampaignSheetOpen(true)
  }

  const handleSavePromotion = () => {
    if (editingPromotion) {
      setPromotions(
        promotions.map((p) =>
          p.id === editingPromotion.id ? ({ ...p, ...formData, updatedAt: new Date().toISOString() } as Promotion) : p,
        ),
      )
    } else {
      const newPromotion: Promotion = {
        id: `promo_${Date.now()}`,
        code: formData.code || "",
        name: formData.name || "",
        description: formData.description,
        discountType: formData.discountType || "percentage",
        discountValue: formData.discountValue || 0,
        minOrderAmount: formData.minOrderAmount,
        maxDiscountAmount: formData.maxDiscountAmount,
        usageLimit: formData.usageLimit,
        usageCount: 0,
        perCustomerLimit: formData.perCustomerLimit,
        startDate: formData.startDate || new Date().toISOString(),
        endDate: formData.endDate || undefined,
        status: formData.status || "draft",
        firstOrderOnly: formData.firstOrderOnly || false,
        applicableCategories: formData.applicableCategories,
        applicableProducts: formData.applicableProducts,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setPromotions([newPromotion, ...promotions])
    }
    setIsSheetOpen(false)
  }

  const handleSaveCampaign = () => {
    if (editingCampaign) {
      setCampaigns(
        campaigns.map((c) =>
          c.id === editingCampaign.id
            ? ({ ...c, ...campaignFormData, updatedAt: new Date().toISOString() } as Campaign)
            : c,
        ),
      )
    } else {
      const newCampaign: Campaign = {
        id: `camp_${Date.now()}`,
        name: campaignFormData.name || "",
        description: campaignFormData.description,
        type: campaignFormData.type || "sale",
        discountPercentage: campaignFormData.discountPercentage,
        bannerImage: campaignFormData.bannerImage,
        startDate: campaignFormData.startDate || new Date().toISOString(),
        endDate: campaignFormData.endDate || new Date().toISOString(),
        status: campaignFormData.status || "draft",
        linkedPromotions: campaignFormData.linkedPromotions || [],
        targetAudience: campaignFormData.targetAudience,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setCampaigns([newCampaign, ...campaigns])
    }
    setIsCampaignSheetOpen(false)
  }

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter((p) => p.id !== id))
  }

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id))
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const togglePromotionStatus = (id: string) => {
    setPromotions(
      promotions.map((p) => {
        if (p.id === id) {
          const newStatus = p.status === "active" ? "paused" : "active"
          return { ...p, status: newStatus, updatedAt: new Date().toISOString() }
        }
        return p
      }),
    )
  }

  // Stats calculations
  const activePromotions = promotions.filter((p) => p.status === "active").length
  const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0)
  const avgDiscount =
    promotions.filter((p) => p.discountType === "percentage").reduce((sum, p) => sum + p.discountValue, 0) /
      promotions.filter((p) => p.discountType === "percentage").length || 0

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Promotions</h1>
          <p className="text-muted-foreground">Manage discount codes and campaigns</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePromotions}</div>
            <p className="text-xs text-muted-foreground mt-1">of {promotions.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground mt-1">across all coupons</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDiscount.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">percentage discounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter((c) => c.status === "active").length}</div>
            <p className="text-xs text-muted-foreground mt-1">running now</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Coupons and Campaigns */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="coupons">Coupon Codes</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            {activeTab === "coupons" ? (
              <Button onClick={() => handleOpenSheet()}>
                <Plus className="mr-2 h-4 w-4" />
                Create Coupon
              </Button>
            ) : (
              <Button onClick={() => handleOpenCampaignSheet()}>
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="coupons" className="mt-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by code or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Promotions Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Min Order</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valid Period</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="font-mono font-medium bg-muted px-2 py-1 rounded text-sm">{promo.code}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopyCode(promo.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{promo.name}</p>
                          {promo.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{promo.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {discountTypeIcons[promo.discountType]}
                          <span className="capitalize">{promo.discountType.replace("_", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {promo.discountType === "percentage"
                          ? `${promo.discountValue}%`
                          : promo.discountType === "fixed"
                            ? `₹${promo.discountValue}`
                            : promo.discountType === "free_shipping"
                              ? "Free"
                              : promo.discountValue}
                      </TableCell>
                      <TableCell>
                        {promo.minOrderAmount ? `₹${promo.minOrderAmount.toLocaleString("en-IN")}` : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span>
                            {promo.usageCount}
                            {promo.usageLimit ? `/${promo.usageLimit}` : ""}
                          </span>
                          {promo.usageLimit && (
                            <Progress value={(promo.usageCount / promo.usageLimit) * 100} className="h-1.5 w-16" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[promo.status]} variant="secondary">
                          {promo.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {promo.startDate} {promo.endDate ? `→ ${promo.endDate}` : "(No end)"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenSheet(promo)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyCode(promo.code)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Code
                            </DropdownMenuItem>
                            {(promo.status === "active" || promo.status === "paused") && (
                              <DropdownMenuItem onClick={() => togglePromotionStatus(promo.id)}>
                                {promo.status === "active" ? (
                                  <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Pause
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeletePromotion(promo.id)}
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
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          {/* Campaigns Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                {campaign.bannerImage && (
                  <div className="aspect-[3/1] bg-muted relative">
                    <img
                      src={campaign.bannerImage || "/placeholder.svg"}
                      alt={campaign.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={statusColors[campaign.status]} variant="secondary">
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {campaign.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  {campaign.description && (
                    <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {campaign.startDate} → {campaign.endDate}
                  </div>
                  {campaign.discountPercentage && (
                    <div className="flex items-center gap-2 text-sm">
                      <Percent className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{campaign.discountPercentage}% off</span>
                    </div>
                  )}
                  {campaign.linkedPromotions.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      {campaign.linkedPromotions.length} linked coupon(s)
                    </div>
                  )}
                  <Separator />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleOpenCampaignSheet(campaign)}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteCampaign(campaign.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Coupon Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingPromotion ? "Edit Coupon" : "Create Coupon"}</SheetTitle>
            <SheetDescription>
              {editingPromotion ? "Update the coupon details below" : "Create a new discount coupon"}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium">Basic Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Coupon Code *</Label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., SUMMER20"
                    className="uppercase"
                  />
                  <p className="text-xs text-muted-foreground">Customers will enter this code at checkout</p>
                </div>
                <div className="grid gap-2">
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Summer Sale Discount"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Internal description for this coupon..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Discount Settings */}
            <div className="space-y-4">
              <h3 className="font-medium">Discount Settings</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Discount Type *</Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value: DiscountType) => setFormData({ ...formData, discountType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Discount</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="free_shipping">Free Shipping</SelectItem>
                      <SelectItem value="buy_x_get_y">Buy X Get Y</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.discountType !== "free_shipping" && (
                  <div className="grid gap-2">
                    <Label>Discount Value * {formData.discountType === "percentage" ? "(%)" : "(₹)"}</Label>
                    <Input
                      type="number"
                      value={formData.discountValue || ""}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      placeholder={formData.discountType === "percentage" ? "e.g., 20" : "e.g., 500"}
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Minimum Order (₹)</Label>
                    <Input
                      type="number"
                      value={formData.minOrderAmount || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minOrderAmount: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      placeholder="e.g., 2000"
                    />
                  </div>
                  {formData.discountType === "percentage" && (
                    <div className="grid gap-2">
                      <Label>Max Discount (₹)</Label>
                      <Input
                        type="number"
                        value={formData.maxDiscountAmount || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            maxDiscountAmount: e.target.value ? Number(e.target.value) : undefined,
                          })
                        }
                        placeholder="e.g., 1000"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Usage Limits */}
            <div className="space-y-4">
              <h3 className="font-medium">Usage Limits</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Total Usage Limit</Label>
                    <Input
                      type="number"
                      value={formData.usageLimit || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, usageLimit: e.target.value ? Number(e.target.value) : undefined })
                      }
                      placeholder="Unlimited"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Per Customer Limit</Label>
                    <Input
                      type="number"
                      value={formData.perCustomerLimit || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          perCustomerLimit: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      placeholder="Unlimited"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Label>First Order Only</Label>
                    <p className="text-xs text-muted-foreground">Only applicable for first-time customers</p>
                  </div>
                  <Switch
                    checked={formData.firstOrderOnly}
                    onCheckedChange={(checked) => setFormData({ ...formData, firstOrderOnly: checked })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Validity Period */}
            <div className="space-y-4">
              <h3 className="font-medium">Validity Period</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Leave empty for no expiry</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: PromotionStatus) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSavePromotion}>
                {editingPromotion ? "Update Coupon" : "Create Coupon"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Campaign Sheet */}
      <Sheet open={isCampaignSheetOpen} onOpenChange={setIsCampaignSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingCampaign ? "Edit Campaign" : "Create Campaign"}</SheetTitle>
            <SheetDescription>
              {editingCampaign ? "Update the campaign details" : "Create a new promotional campaign"}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Campaign Name *</Label>
                <Input
                  value={campaignFormData.name}
                  onChange={(e) => setCampaignFormData({ ...campaignFormData, name: e.target.value })}
                  placeholder="e.g., Wedding Season Sale"
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={campaignFormData.description}
                  onChange={(e) => setCampaignFormData({ ...campaignFormData, description: e.target.value })}
                  placeholder="Describe this campaign..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Campaign Type</Label>
                  <Select
                    value={campaignFormData.type}
                    onValueChange={(value: Campaign["type"]) =>
                      setCampaignFormData({ ...campaignFormData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="clearance">Clearance</SelectItem>
                      <SelectItem value="flash_sale">Flash Sale</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Discount %</Label>
                  <Input
                    type="number"
                    value={campaignFormData.discountPercentage || ""}
                    onChange={(e) =>
                      setCampaignFormData({
                        ...campaignFormData,
                        discountPercentage: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="e.g., 25"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Banner Image URL</Label>
                <Input
                  value={campaignFormData.bannerImage}
                  onChange={(e) => setCampaignFormData({ ...campaignFormData, bannerImage: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    value={campaignFormData.startDate}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>End Date *</Label>
                  <Input
                    type="date"
                    value={campaignFormData.endDate}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Target Audience</Label>
                  <Select
                    value={campaignFormData.targetAudience}
                    onValueChange={(value: Campaign["targetAudience"]) =>
                      setCampaignFormData({ ...campaignFormData, targetAudience: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new_customers">New Customers</SelectItem>
                      <SelectItem value="returning_customers">Returning Customers</SelectItem>
                      <SelectItem value="vip">VIP Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={campaignFormData.status}
                    onValueChange={(value: PromotionStatus) =>
                      setCampaignFormData({ ...campaignFormData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsCampaignSheetOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSaveCampaign}>
                {editingCampaign ? "Update Campaign" : "Create Campaign"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
