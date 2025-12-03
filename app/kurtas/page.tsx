import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"

export const metadata = {
  title: "Kurtas | Vrunda Vihas - Premium Indian Ethnic Wear",
  description:
    "Shop elegant kurtas for men and women. Discover embroidered, chikankari, and designer kurtas for festivals, weddings, and everyday elegance.",
}

export default async function KurtasPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4 border-b border-border">
          <nav className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="text-foreground">Kurtas</span>
            {params.type && (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground capitalize">{params.type}</span>
              </>
            )}
          </nav>
        </div>

        {/* Products */}
        <section className="container mx-auto px-4 py-8 pb-20">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductGrid category="kurtas" initialType={params.type} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
