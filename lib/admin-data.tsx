// Mock Data Layer for Admin Panel
// This file provides sample data and mock API functions
// Replace these with real API calls when connecting to Supabase or CMS

import type {
  Promotion,
  Campaign,
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BrandSettings,
  StoreSettings,
  SEOSettings,
} from "./admin-types"

// ============================================
// PROMOTIONS DATA
// ============================================

export const mockPromotions: Promotion[] = [
  {
    id: "promo_1",
    code: "WEDDING25",
    name: "Wedding Season Sale",
    description: "25% off on all wedding collection items",
    discountType: "percentage",
    discountValue: 25,
    minOrderAmount: 5000,
    maxDiscountAmount: 5000,
    usageLimit: 500,
    usageCount: 156,
    perCustomerLimit: 1,
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    status: "active",
    applicableCategories: ["wedding-sarees", "bridal-collection"],
    firstOrderOnly: false,
    createdAt: "2023-12-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "promo_2",
    code: "FLAT500",
    name: "Flat ₹500 Off",
    description: "Flat ₹500 discount on orders above ₹3000",
    discountType: "fixed",
    discountValue: 500,
    minOrderAmount: 3000,
    usageLimit: 200,
    usageCount: 89,
    startDate: "2024-01-15",
    endDate: "2024-01-31",
    status: "active",
    firstOrderOnly: false,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "promo_3",
    code: "NEWYEAR20",
    name: "New Year Celebration",
    description: "New Year special discount",
    discountType: "percentage",
    discountValue: 20,
    minOrderAmount: 2000,
    usageLimit: 500,
    usageCount: 342,
    startDate: "2023-12-25",
    endDate: "2024-01-05",
    status: "expired",
    firstOrderOnly: false,
    createdAt: "2023-12-20",
    updatedAt: "2024-01-05",
  },
  {
    id: "promo_4",
    code: "FIRSTORDER",
    name: "Welcome Discount",
    description: "Special discount for first-time customers",
    discountType: "percentage",
    discountValue: 15,
    minOrderAmount: 1500,
    usageCount: 1250,
    perCustomerLimit: 1,
    startDate: "2023-01-01",
    status: "active",
    firstOrderOnly: true,
    createdAt: "2023-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "promo_5",
    code: "FREESHIP",
    name: "Free Shipping",
    description: "Free shipping on all orders",
    discountType: "free_shipping",
    discountValue: 0,
    minOrderAmount: 999,
    usageCount: 890,
    startDate: "2024-01-01",
    status: "active",
    firstOrderOnly: false,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "promo_6",
    code: "DIWALI30",
    name: "Diwali Festival Sale",
    description: "Celebrate Diwali with 30% off",
    discountType: "percentage",
    discountValue: 30,
    minOrderAmount: 3000,
    maxDiscountAmount: 3000,
    usageLimit: 1000,
    usageCount: 0,
    startDate: "2024-10-15",
    endDate: "2024-11-15",
    status: "scheduled",
    applicableCategories: ["festive-collection"],
    firstOrderOnly: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
]

export const mockCampaigns: Campaign[] = [
  {
    id: "camp_1",
    name: "Wedding Season 2024",
    description: "Complete wedding collection sale for the 2024 season",
    type: "seasonal",
    discountPercentage: 25,
    bannerImage: "/indian-wedding-saree-banner.jpg",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    status: "active",
    linkedPromotions: ["promo_1"],
    targetAudience: "all",
    createdAt: "2023-12-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "camp_2",
    name: "Summer Cotton Collection",
    description: "Light and breezy cotton sarees and kurtas",
    type: "seasonal",
    discountPercentage: 20,
    bannerImage: "/cotton-saree-summer-collection.jpg",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    status: "scheduled",
    linkedPromotions: [],
    targetAudience: "all",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "camp_3",
    name: "Flash Sale Weekend",
    description: "48-hour flash sale on selected items",
    type: "flash_sale",
    discountPercentage: 40,
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    status: "scheduled",
    linkedPromotions: [],
    targetAudience: "all",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
]

// ============================================
// BLOG DATA
// ============================================

export const mockBlogAuthors: BlogAuthor[] = [
  {
    id: "author_1",
    name: "Priya Sharma",
    email: "priya@vrundavihas.com",
    avatar: "/indian-woman-professional.png",
    bio: "Fashion editor with 10+ years in ethnic wear industry",
  },
  {
    id: "author_2",
    name: "Meera Reddy",
    email: "meera@vrundavihas.com",
    avatar: "/placeholder-kdm94.png",
    bio: "Sustainability advocate and textile enthusiast",
  },
  {
    id: "author_3",
    name: "Admin",
    email: "admin@vrundavihas.com",
  },
]

export const mockBlogCategories: BlogCategory[] = [
  { id: "cat_1", name: "Style Guide", slug: "style-guide", description: "Tips on styling ethnic wear", postCount: 12 },
  { id: "cat_2", name: "Heritage", slug: "heritage", description: "Stories behind traditional textiles", postCount: 8 },
  {
    id: "cat_3",
    name: "Sustainability",
    slug: "sustainability",
    description: "Eco-friendly fashion choices",
    postCount: 5,
  },
  { id: "cat_4", name: "Trends", slug: "trends", description: "Latest in ethnic fashion", postCount: 15 },
  { id: "cat_5", name: "Occasions", slug: "occasions", description: "Outfit ideas for events", postCount: 10 },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: "post_1",
    title: "How to Style a Banarasi Saree for Weddings",
    slug: "style-banarasi-saree-weddings",
    excerpt:
      "Discover the art of draping and accessorizing a Banarasi saree for the perfect wedding look. Learn about blouse pairings, jewelry, and more.",
    body: `<h2>The Timeless Elegance of Banarasi</h2>
<p>A Banarasi saree is the epitome of Indian wedding fashion. Woven with gold and silver threads, these sarees have adorned brides for centuries.</p>
<h3>Choosing the Right Drape</h3>
<p>The traditional Nivi drape works beautifully with Banarasi sarees, allowing the intricate pallu to be displayed prominently...</p>
<h3>Blouse Styling Tips</h3>
<p>For a Banarasi saree, consider a contrast blouse in velvet or raw silk. Deep jewel tones like emerald green or royal blue create stunning combinations...</p>
<h3>Jewelry Pairing</h3>
<p>Temple jewelry or kundan sets complement Banarasi sarees perfectly. Keep the neckpiece statement and balance with subtle earrings...</p>`,
    coverImage: "/banarasi-saree-wedding-styling.jpg",
    author: mockBlogAuthors[0],
    category: "Style Guide",
    tags: ["banarasi", "wedding", "styling", "bridal"],
    status: "published",
    publishedAt: "2024-01-15",
    seo: {
      metaTitle: "How to Style Banarasi Saree for Weddings | Vrunda Vihas",
      metaDescription:
        "Complete guide to styling Banarasi sarees for weddings. Tips on draping, blouse pairing, and jewelry selection.",
      metaKeywords: ["banarasi saree", "wedding saree styling", "indian wedding fashion"],
    },
    readingTime: 8,
    viewCount: 2450,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "post_2",
    title: "The Art of Kanjivaram Weaving",
    slug: "art-kanjivaram-weaving",
    excerpt:
      "Explore the centuries-old tradition of Kanjivaram silk weaving from Tamil Nadu. Learn about the techniques, motifs, and cultural significance.",
    body: `<h2>A Legacy Woven in Silk</h2>
<p>Kanjivaram sarees, also known as Kanchipuram sarees, originate from the temple town of Kanchipuram in Tamil Nadu...</p>`,
    coverImage: "/kanjivaram-weaving-artisan-loom.jpg",
    author: mockBlogAuthors[2],
    category: "Heritage",
    tags: ["kanjivaram", "weaving", "silk", "artisan", "tradition"],
    status: "published",
    publishedAt: "2024-01-12",
    seo: {
      metaTitle: "The Art of Kanjivaram Weaving | Heritage | Vrunda Vihas",
      metaDescription:
        "Discover the ancient art of Kanjivaram silk weaving from Tamil Nadu. Learn about techniques and cultural significance.",
    },
    readingTime: 12,
    viewCount: 1890,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
  },
  {
    id: "post_3",
    title: "Sustainable Fashion: Handloom vs Machine-Made",
    slug: "sustainable-fashion-handloom-vs-machine",
    excerpt:
      "Understanding the environmental impact and cultural significance of handloom textiles versus machine-made alternatives.",
    body: `<h2>The True Cost of Fast Fashion</h2>
<p>In an era of mass production, handloom textiles represent a sustainable alternative that supports artisan communities...</p>`,
    coverImage: "/handloom-weaving-sustainable-fashion.jpg",
    author: mockBlogAuthors[1],
    category: "Sustainability",
    tags: ["handloom", "sustainable", "eco-friendly", "artisan"],
    status: "draft",
    seo: {
      metaTitle: "Handloom vs Machine-Made: Sustainable Fashion Guide",
      metaDescription:
        "Compare handloom and machine-made textiles. Learn about environmental impact and support artisan communities.",
    },
    readingTime: 10,
    viewCount: 0,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "post_4",
    title: "10 Must-Have Kurta Styles for 2024",
    slug: "must-have-kurta-styles-2024",
    excerpt: "From classic Chikankari to modern fusion designs, discover the kurta styles trending this year.",
    body: `<h2>Kurtas That Define 2024</h2>
<p>The kurta continues to evolve while staying true to its roots. Here are the styles making waves this year...</p>`,
    coverImage: "/kurta-styles-2024-fashion.jpg",
    author: mockBlogAuthors[0],
    category: "Trends",
    tags: ["kurta", "trends", "2024", "fashion"],
    status: "scheduled",
    scheduledAt: "2024-02-01",
    seo: {
      metaTitle: "10 Must-Have Kurta Styles for 2024 | Trends | Vrunda Vihas",
      metaDescription: "Discover the top kurta styles trending in 2024. From Chikankari to fusion designs.",
    },
    readingTime: 6,
    viewCount: 0,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
]

// ============================================
// SETTINGS DATA
// ============================================

export const mockBrandSettings: BrandSettings = {
  storeName: "Vrunda Vihas",
  tagline: "Celebrate the Art of Indian Ethnic Wear",
  logoUrl: "/vrunda-vihas-logo-elegant.jpg",
  faviconUrl: "/favicon.ico",
  primaryColor: "#9f1239",
  secondaryColor: "#fef3c7",
  accentColor: "#d4af37",
  fontPrimary: "Inter",
  fontSecondary: "Cormorant Garamond",
}

export const mockStoreSettings: StoreSettings = {
  currency: "INR",
  currencySymbol: "₹",
  defaultCountry: "India",
  timezone: "Asia/Kolkata",
  weightUnit: "g",
  dimensionUnit: "cm",
  businessEmail: "contact@vrundavihas.com",
  supportEmail: "support@vrundavihas.com",
  phone: "+91 98765 43210",
  whatsappNumber: "+91 98765 43210",
  address: {
    street: "123, Commercial Street",
    city: "Bangalore",
    state: "Karnataka",
    pinCode: "560001",
    country: "India",
  },
  socialLinks: {
    instagram: "https://instagram.com/vrundavihas",
    facebook: "https://facebook.com/vrundavihas",
    pinterest: "https://pinterest.com/vrundavihas",
  },
}

export const mockSEOSettings: SEOSettings = {
  siteTitleSuffix: " | Vrunda Vihas - Indian Ethnic Wear",
  defaultMetaDescription:
    "Shop premium Indian ethnic wear at Vrunda Vihas. Discover exquisite sarees, kurtas, and traditional clothing with authentic craftsmanship.",
  defaultMetaKeywords: ["indian ethnic wear", "sarees online", "kurtas", "traditional clothing", "handloom"],
  ogImage: "/placeholder-0j7tn.png",
  googleAnalyticsId: "",
  facebookPixelId: "",
  googleTagManagerId: "",
  sitemapEnabled: true,
}

// ============================================
// MOCK API FUNCTIONS
// These can be replaced with real API calls
// ============================================

export const adminApi = {
  // Promotions
  getPromotions: async (): Promise<Promotion[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockPromotions
  },

  getPromotion: async (id: string): Promise<Promotion | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockPromotions.find((p) => p.id === id)
  },

  createPromotion: async (data: Partial<Promotion>): Promise<Promotion> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newPromotion: Promotion = {
      id: `promo_${Date.now()}`,
      code: data.code || "",
      name: data.name || "",
      discountType: data.discountType || "percentage",
      discountValue: data.discountValue || 0,
      usageCount: 0,
      startDate: data.startDate || new Date().toISOString(),
      status: data.status || "draft",
      firstOrderOnly: data.firstOrderOnly || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    }
    return newPromotion
  },

  updatePromotion: async (id: string, data: Partial<Promotion>): Promise<Promotion> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const existing = mockPromotions.find((p) => p.id === id)
    if (!existing) throw new Error("Promotion not found")
    return { ...existing, ...data, updatedAt: new Date().toISOString() }
  },

  deletePromotion: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
  },

  // Campaigns
  getCampaigns: async (): Promise<Campaign[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockCampaigns
  },

  // Blog
  getBlogPosts: async (): Promise<BlogPost[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockBlogPosts
  },

  getBlogPost: async (id: string): Promise<BlogPost | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockBlogPosts.find((p) => p.id === id)
  },

  createBlogPost: async (data: Partial<BlogPost>): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newPost: BlogPost = {
      id: `post_${Date.now()}`,
      title: data.title || "",
      slug: data.slug || "",
      excerpt: data.excerpt || "",
      body: data.body || "",
      author: data.author || mockBlogAuthors[2],
      category: data.category || "Trends",
      tags: data.tags || [],
      status: data.status || "draft",
      seo: data.seo || {},
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return newPost
  },

  updateBlogPost: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const existing = mockBlogPosts.find((p) => p.id === id)
    if (!existing) throw new Error("Post not found")
    return { ...existing, ...data, updatedAt: new Date().toISOString() }
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
  },

  getBlogCategories: async (): Promise<BlogCategory[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockBlogCategories
  },

  getBlogAuthors: async (): Promise<BlogAuthor[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockBlogAuthors
  },

  // Settings
  getBrandSettings: async (): Promise<BrandSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockBrandSettings
  },

  updateBrandSettings: async (data: Partial<BrandSettings>): Promise<BrandSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...mockBrandSettings, ...data }
  },

  getStoreSettings: async (): Promise<StoreSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockStoreSettings
  },

  updateStoreSettings: async (data: Partial<StoreSettings>): Promise<StoreSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...mockStoreSettings, ...data }
  },

  getSEOSettings: async (): Promise<SEOSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockSEOSettings
  },

  updateSEOSettings: async (data: Partial<SEOSettings>): Promise<SEOSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...mockSEOSettings, ...data }
  },
}
