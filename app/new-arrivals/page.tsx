import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "New Arrivals | Vrunda Vihas - Premium Indian Ethnic Wear",
  description:
    "Discover our latest collection of sarees and kurtas. Fresh arrivals featuring the newest designs in Indian ethnic wear.",
}

export default function NewArrivalsPage() {
  const newProducts = products.filter((p) => p.isNew)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image src="/placeholder.svg?key=9mvh3" alt="New Arrivals" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-background">
              <p className="font-sans text-sm uppercase tracking-[0.3em] mb-4 text-accent">Fresh & Trending</p>
              <h1 className="text-4xl md:text-6xl font-light mb-4">New Arrivals</h1>
              <p className="font-sans text-lg text-background/90 max-w-xl mx-auto">
                Be the first to explore our latest designs
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="font-sans text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">New Arrivals</span>
          </nav>
        </div>

        {/* Products */}
        <section className="container mx-auto px-4 py-8 pb-20">
          <div className="mb-6 pb-6 border-b border-border">
            <p className="font-sans text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{newProducts.length}</span> new arrivals
            </p>
          </div>

          {newProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-light mb-2">No new arrivals yet</p>
              <p className="font-sans text-sm text-muted-foreground">Check back soon for our latest collections.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
