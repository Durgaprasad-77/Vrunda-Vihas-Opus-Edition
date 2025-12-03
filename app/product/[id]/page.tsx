import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { SizeChartModal } from "@/components/size-chart-modal"
import { ProductReviews } from "@/components/product-reviews"
import { SimilarProducts } from "@/components/similar-products"
import { productDetails, products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, Truck, RotateCcw, Shield, MessageCircle } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = productDetails[id as keyof typeof productDetails] || products.find((p) => p.id === id)

  if (!product) {
    return { title: "Product Not Found | Vrunda Vihas" }
  }

  return {
    title: `${product.name} | Vrunda Vihas`,
    description:
      productDetails[id as keyof typeof productDetails]?.description ||
      `Shop ${product.name} at Vrunda Vihas. Premium Indian ethnic wear.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const detailedProduct = productDetails[id as keyof typeof productDetails]
  const basicProduct = products.find((p) => p.id === id)

  if (!detailedProduct && !basicProduct) {
    notFound()
  }

  const product = detailedProduct || {
    ...basicProduct!,
    images: [basicProduct!.image],
    description: "Exquisite handcrafted piece from our premium collection.",
    features: ["Premium quality fabric", "Handcrafted with care", "Traditional design"],
    specifications: {
      Material: basicProduct!.fabric,
      Occasion: basicProduct!.occasion,
    },
    blouseOptions: [{ id: "unstitched", name: "Unstitched", price: 0 }],
    inStock: true,
    deliveryEstimate: "5-7 business days",
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="font-sans text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground font-sans text-xs uppercase">New Arrival</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-accent text-accent-foreground font-sans text-xs uppercase">Bestseller</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-light mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-sans text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="font-sans text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive" className="font-sans text-xs">
                      {discount}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="font-sans text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Blouse Options */}
              {product.blouseOptions && product.category === "sarees" && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-semibold">Blouse Stitching</label>
                    <SizeChartModal />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.blouseOptions.map((option: { id: string; name: string; price: number }) => (
                      <button
                        key={option.id}
                        className="p-3 border border-border rounded-sm text-left hover:border-primary transition-colors group"
                      >
                        <span className="font-sans text-sm block group-hover:text-primary transition-colors">
                          {option.name}
                        </span>
                        <span className="font-sans text-xs text-muted-foreground">
                          {option.price === 0 ? "Included" : `+${formatPrice(option.price)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-wider"
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 font-sans uppercase tracking-wider bg-transparent"
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-4 mb-8">
                <Button variant="ghost" className="font-sans text-sm gap-2">
                  <Heart className="h-4 w-4" />
                  Add to Wishlist
                </Button>
                <Button variant="ghost" className="font-sans text-sm gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" className="font-sans text-sm gap-2 text-green-600">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>

              {/* USPs */}
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center gap-3 font-sans text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>
                    <strong>Free Delivery</strong> - {product.deliveryEstimate}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-sans text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>
                    <strong>Easy Returns</strong> - 7-day hassle-free returns
                  </span>
                </div>
                <div className="flex items-center gap-3 font-sans text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>
                    <strong>Authenticity Guaranteed</strong> - 100% genuine handloom
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="details"
                className="font-sans uppercase tracking-wider text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="font-sans uppercase tracking-wider text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="font-sans uppercase tracking-wider text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-8">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 font-sans text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-8">
              <div className="max-w-xl">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="font-sans text-sm text-muted-foreground">{key}</span>
                      <span className="font-semibold">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-8">
              <ProductReviews productId={product.id} rating={product.rating} totalReviews={product.reviews} />
            </TabsContent>
          </Tabs>
        </section>

        {/* Similar Products */}
        <SimilarProducts currentProductId={product.id} category={product.category} />
      </main>
      <Footer />
    </div>
  )
}
