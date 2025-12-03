// Admin TypeScript Interfaces for Backend Integration
// These types define the data structures used across the admin panel

// ============================================
// PROMOTIONS & CAMPAIGNS
// ============================================

export type DiscountType = "percentage" | "fixed" | "free_shipping" | "buy_x_get_y"
export type PromotionStatus = "active" | "scheduled" | "expired" | "paused" | "draft"

export interface Promotion {
  id: string
  code: string
  name: string
  description?: string
  discountType: DiscountType
  discountValue: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  usageLimit?: number
  usageCount: number
  perCustomerLimit?: number
  startDate: string
  endDate?: string
  status: PromotionStatus
  applicableCategories?: string[]
  applicableProducts?: string[]
  excludedProducts?: string[]
  firstOrderOnly: boolean
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  name: string
  description?: string
  type: "sale" | "festival" | "clearance" | "flash_sale" | "seasonal"
  discountPercentage?: number
  bannerImage?: string
  startDate: string
  endDate: string
  status: PromotionStatus
  linkedPromotions: string[]
  targetAudience?: "all" | "new_customers" | "returning_customers" | "vip"
  createdAt: string
  updatedAt: string
}

// ============================================
// BLOG
// ============================================

export type BlogPostStatus = "draft" | "published" | "scheduled" | "archived"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  coverImage?: string
  author: BlogAuthor
  category: string
  tags: string[]
  status: BlogPostStatus
  publishedAt?: string
  scheduledAt?: string
  seo: SEOFields
  readingTime?: number
  viewCount: number
  createdAt: string
  updatedAt: string
}

export interface BlogAuthor {
  id: string
  name: string
  email?: string
  avatar?: string
  bio?: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
}

// ============================================
// SETTINGS
// ============================================

export interface BrandSettings {
  storeName: string
  tagline?: string
  logoUrl?: string
  faviconUrl?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontPrimary: string
  fontSecondary?: string
}

export interface StoreSettings {
  currency: string
  currencySymbol: string
  defaultCountry: string
  timezone: string
  weightUnit: "kg" | "g" | "lb" | "oz"
  dimensionUnit: "cm" | "in" | "m"
  businessEmail: string
  supportEmail?: string
  phone: string
  whatsappNumber?: string
  address: Address
  socialLinks: SocialLinks
}

export interface Address {
  street: string
  city: string
  state: string
  pinCode: string
  country: string
}

export interface SocialLinks {
  instagram?: string
  facebook?: string
  twitter?: string
  youtube?: string
  pinterest?: string
}

export interface SEOSettings {
  siteTitleSuffix: string
  defaultMetaDescription: string
  defaultMetaKeywords: string[]
  ogImage?: string
  googleAnalyticsId?: string
  facebookPixelId?: string
  googleTagManagerId?: string
  robotsTxt?: string
  sitemapEnabled: boolean
}

export interface SEOFields {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
}

// ============================================
// COMMON TYPES
// ============================================

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ============================================
// FILTERS & QUERIES
// ============================================

export interface PromotionFilters {
  status?: PromotionStatus
  type?: DiscountType
  search?: string
  startDate?: string
  endDate?: string
}

export interface BlogFilters {
  status?: BlogPostStatus
  category?: string
  author?: string
  search?: string
  tag?: string
}
