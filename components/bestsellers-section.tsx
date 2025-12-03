import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BestsellersSection() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4)

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-primary mb-3">Most Loved</p>
            <h2 className="text-3xl md:text-5xl font-light">Bestsellers</h2>
          </div>
          <Link
            href="/bestsellers"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:gap-3 transition-all"
          >
            View All Bestsellers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
