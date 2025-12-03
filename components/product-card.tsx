"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestseller?: boolean
  artisan?: string
}

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getImageSrc = () => {
    if (product.image.startsWith("/placeholder")) {
      return product.image
    }
    return product.image
  }

  // Generate artisan name based on product category
  const getArtisanName = () => {
    if (product.artisan) return product.artisan
    const artisans: Record<string, string> = {
      banarasi: "Varanasi Heritage",
      kanjivaram: "Kanchipuram Weavers",
      chanderi: "Artisan Craft",
      paithani: "Maharashtra Looms",
      designer: "Modern Weaves",
      men: "Royal Attire",
      women: "Ethereal Designs",
    }
    return artisans[(product as any).subcategory] || "Vrunda Vihas"
  }

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <Image
            src={getImageSrc() || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Wishlist heart - always visible */}
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsWishlisted(!isWishlisted)
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isWishlisted ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"
          }`}
        />
      </button>

      {/* Quick actions */}
      <div
        className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm">
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      {/* Add to cart overlay */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Button
          className="w-full bg-card/90 backdrop-blur-sm text-foreground hover:bg-card font-sans text-sm uppercase tracking-wider"
          onClick={(e) => {
            e.preventDefault()
            // Add to cart logic
          }}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Product info */}
      <div className="mt-3 space-y-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">by {getArtisanName()}</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Badges */}
          <div className="flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground font-sans text-xs uppercase">New</Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-accent text-accent-foreground font-sans text-xs uppercase">Bestseller</Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="font-sans text-xs">
                -{discount}%
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
