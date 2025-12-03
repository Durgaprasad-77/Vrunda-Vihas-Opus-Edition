import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

interface SimilarProductsProps {
  currentProductId: string
  category: string
}

export function SimilarProducts({ currentProductId, category }: SimilarProductsProps) {
  const similarProducts = products.filter((p) => p.category === category && p.id !== currentProductId).slice(0, 4)

  if (similarProducts.length === 0) return null

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
