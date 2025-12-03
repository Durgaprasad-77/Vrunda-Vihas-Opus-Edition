"use client"

import { useState } from "react"
import { productReviews } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Star, Check } from "lucide-react"

interface ProductReviewsProps {
  productId: string
  rating: number
  totalReviews: number
}

export function ProductReviews({ productId, rating, totalReviews }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("helpful")
  const reviews = productReviews.filter((r) => r.productId === productId)

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage: (reviews.filter((r) => r.rating === stars).length / reviews.length) * 100,
  }))

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-5xl font-light">{rating}</span>
            <div className="flex flex-col">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) ? "text-accent fill-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="font-sans text-sm text-muted-foreground">{totalReviews} reviews</span>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="md:col-span-2">
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="font-sans text-sm w-12">{stars} star</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${percentage}%` }} />
                </div>
                <span className="font-sans text-sm text-muted-foreground w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="border-t border-border pt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Customer Reviews</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-sans text-sm border border-border rounded-sm px-3 py-2 bg-background"
          >
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.author}</span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 font-sans text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        <Check className="h-3 w-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="font-sans text-sm text-muted-foreground">{review.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-accent fill-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">{review.content}</p>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <Button variant="ghost" size="sm" className="font-sans text-xs gap-2">
                  <ThumbsUp className="h-3 w-3" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6 font-sans bg-transparent">
          Load More Reviews
        </Button>
      </div>
    </div>
  )
}
