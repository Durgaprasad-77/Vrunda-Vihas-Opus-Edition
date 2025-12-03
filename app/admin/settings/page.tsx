"use client"

import { useState } from "react"
import { Save, Upload, Check, RefreshCw, Globe, Palette, Store, SearchIcon, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { BrandSettings, StoreSettings, SEOSettings } from "@/lib/admin-types"
import { mockBrandSettings, mockStoreSettings, mockSEOSettings } from "@/lib/admin-data"

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
]

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("brand")

  // Form states
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(mockBrandSettings)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(mockStoreSettings)
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(mockSEOSettings)

  // Notification settings
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    customerReviews: false,
    orderConfirmation: true,
    shippingUpdates: true,
    whatsapp: true,
  })

  // Payment settings
  const [payments, setPayments] = useState({
    upi: true,
    cards: true,
    netBanking: true,
    cod: true,
    codMinOrder: 500,
    codMaxOrder: 25000,
    codCharges: 49,
  })

  // Shipping settings
  const [shipping, setShipping] = useState({
    freeShipping: true,
    freeShippingThreshold: 999,
    standardRate: 79,
    expressRate: 149,
    metroDays: "3-5",
    otherDays: "5-7",
    remoteDays: "7-10",
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your store settings and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="brand" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Brand</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Store</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <SearchIcon className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
        </TabsList>

        {/* Brand Settings */}
        <TabsContent value="brand" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>Your store's visual identity and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Store Name *</Label>
                  <Input
                    value={brandSettings.storeName}
                    onChange={(e) => setBrandSettings({ ...brandSettings, storeName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Tagline</Label>
                  <Input
                    value={brandSettings.tagline}
                    onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
                    placeholder="Your brand tagline..."
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-32 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                      {brandSettings.logoUrl ? (
                        <img src={brandSettings.logoUrl || "/placeholder.svg"} alt="Logo" className="object-contain" />
                      ) : (
                        <span className="text-2xl font-bold text-primary">VV</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground">PNG, SVG. Max 2MB</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg border bg-muted flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">VV</span>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Favicon
                      </Button>
                      <p className="text-xs text-muted-foreground">32x32 or 64x64 PNG</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Define your brand's color palette</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded-lg border cursor-pointer"
                      style={{ backgroundColor: brandSettings.primaryColor }}
                    />
                    <Input
                      value={brandSettings.primaryColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                      placeholder="#9f1239"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Used for buttons, links, accents</p>
                </div>
                <div className="grid gap-2">
                  <Label>Secondary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded-lg border cursor-pointer"
                      style={{ backgroundColor: brandSettings.secondaryColor }}
                    />
                    <Input
                      value={brandSettings.secondaryColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                      placeholder="#fef3c7"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Used for backgrounds, cards</p>
                </div>
                <div className="grid gap-2">
                  <Label>Accent Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded-lg border cursor-pointer"
                      style={{ backgroundColor: brandSettings.accentColor }}
                    />
                    <Input
                      value={brandSettings.accentColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, accentColor: e.target.value })}
                      placeholder="#d4af37"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Gold accents, highlights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Font families for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Primary Font</Label>
                  <Select
                    value={brandSettings.fontPrimary}
                    onValueChange={(value) => setBrandSettings({ ...brandSettings, fontPrimary: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Used for body text and UI</p>
                </div>
                <div className="grid gap-2">
                  <Label>Heading Font</Label>
                  <Select
                    value={brandSettings.fontSecondary}
                    onValueChange={(value) => setBrandSettings({ ...brandSettings, fontSecondary: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cormorant Garamond">Cormorant Garamond</SelectItem>
                      <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                      <SelectItem value="Merriweather">Merriweather</SelectItem>
                      <SelectItem value="Libre Baskerville">Libre Baskerville</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Used for headings and titles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Store Settings */}
        <TabsContent value="store" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Basic details about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Business Email *</Label>
                  <Input
                    type="email"
                    value={storeSettings.businessEmail}
                    onChange={(e) => setStoreSettings({ ...storeSettings, businessEmail: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Support Email</Label>
                  <Input
                    type="email"
                    value={storeSettings.supportEmail}
                    onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Phone Number *</Label>
                  <Input
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>WhatsApp Number</Label>
                  <Input
                    value={storeSettings.whatsappNumber}
                    onChange={(e) => setStoreSettings({ ...storeSettings, whatsappNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Address</CardTitle>
              <CardDescription>Your registered business address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Street Address</Label>
                <Input
                  value={storeSettings.address.street}
                  onChange={(e) =>
                    setStoreSettings({
                      ...storeSettings,
                      address: { ...storeSettings.address, street: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>City</Label>
                  <Input
                    value={storeSettings.address.city}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        address: { ...storeSettings.address, city: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>State</Label>
                  <Select
                    value={storeSettings.address.state}
                    onValueChange={(value) =>
                      setStoreSettings({
                        ...storeSettings,
                        address: { ...storeSettings.address, state: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>PIN Code</Label>
                  <Input
                    value={storeSettings.address.pinCode}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        address: { ...storeSettings.address, pinCode: e.target.value },
                      })
                    }
                    maxLength={6}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Country</Label>
                  <Input value="India" disabled />
                  <Badge variant="outline" className="w-fit">
                    <Globe className="mr-1 h-3 w-3" />
                    Default Country
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Currency, timezone, and locale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label>Currency</Label>
                  <Select
                    value={storeSettings.currency}
                    onValueChange={(value) =>
                      setStoreSettings({
                        ...storeSettings,
                        currency: value,
                        currencySymbol: value === "INR" ? "₹" : "$",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Timezone</Label>
                  <Select
                    value={storeSettings.timezone}
                    onValueChange={(value) => setStoreSettings({ ...storeSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Weight Unit</Label>
                  <Select
                    value={storeSettings.weightUnit}
                    onValueChange={(value: "kg" | "g" | "lb" | "oz") =>
                      setStoreSettings({ ...storeSettings, weightUnit: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Instagram</Label>
                  <Input
                    value={storeSettings.socialLinks.instagram}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        socialLinks: { ...storeSettings.socialLinks, instagram: e.target.value },
                      })
                    }
                    placeholder="https://instagram.com/yourstore"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Facebook</Label>
                  <Input
                    value={storeSettings.socialLinks.facebook}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        socialLinks: { ...storeSettings.socialLinks, facebook: e.target.value },
                      })
                    }
                    placeholder="https://facebook.com/yourstore"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Pinterest</Label>
                  <Input
                    value={storeSettings.socialLinks.pinterest}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        socialLinks: { ...storeSettings.socialLinks, pinterest: e.target.value },
                      })
                    }
                    placeholder="https://pinterest.com/yourstore"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>YouTube</Label>
                  <Input
                    value={storeSettings.socialLinks.youtube}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        socialLinks: { ...storeSettings.socialLinks, youtube: e.target.value },
                      })
                    }
                    placeholder="https://youtube.com/@yourstore"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Defaults</CardTitle>
              <CardDescription>Default meta tags for your store pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Site Title Suffix</Label>
                <Input
                  value={seoSettings.siteTitleSuffix}
                  onChange={(e) => setSeoSettings({ ...seoSettings, siteTitleSuffix: e.target.value })}
                  placeholder=" | Your Store Name"
                />
                <p className="text-xs text-muted-foreground">
                  Appended to all page titles. Example: "Sarees{seoSettings.siteTitleSuffix}"
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Default Meta Description</Label>
                <Textarea
                  value={seoSettings.defaultMetaDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, defaultMetaDescription: e.target.value })}
                  placeholder="Describe your store for search engines..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {seoSettings.defaultMetaDescription.length}/160 characters
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Default Keywords</Label>
                <div className="flex flex-wrap gap-2">
                  {seoSettings.defaultMetaKeywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {keyword}
                      <button
                        onClick={() =>
                          setSeoSettings({
                            ...seoSettings,
                            defaultMetaKeywords: seoSettings.defaultMetaKeywords.filter((_, i) => i !== index),
                          })
                        }
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add keyword and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const val = e.currentTarget.value.trim()
                      if (val && !seoSettings.defaultMetaKeywords.includes(val)) {
                        setSeoSettings({
                          ...seoSettings,
                          defaultMetaKeywords: [...seoSettings.defaultMetaKeywords, val],
                        })
                        e.currentTarget.value = ""
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs placeholders */}
        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Manage payment methods and gateways</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payment settings configuration will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>Configure shipping zones and rates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Shipping settings configuration will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage email and SMS alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notification settings configuration will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
