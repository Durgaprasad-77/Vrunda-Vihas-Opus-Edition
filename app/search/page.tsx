"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"
import { Search } from "lucide-react"

function SearchResults() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""

    const filteredProducts = products.filter((product) => {
        const searchTerm = query.toLowerCase()
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.subcategory.toLowerCase().includes(searchTerm) ||
            product.fabric.toLowerCase().includes(searchTerm) ||
            product.occasion.toLowerCase().includes(searchTerm) ||
            product.color.toLowerCase().includes(searchTerm)
        )
    })

    return (
        <>
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 border-b border-border">
                <nav className="text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground">Search Results</span>
                </nav>
            </div>

            {/* Search Results */}
            <section className="container mx-auto px-4 py-8 pb-20">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Search Results for "{query}"
                    </h1>
                    <p className="text-muted-foreground">
                        {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                    </p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <Search className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No products found</h2>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            We couldn't find any products matching "{query}". Try a different search term or browse our collections.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                href="/sarees"
                                className="px-6 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                            >
                                Browse Sarees
                            </Link>
                            <Link
                                href="/kurtas"
                                className="px-6 py-2 border border-border rounded-sm hover:bg-muted transition-colors"
                            >
                                Browse Kurtas
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                <Suspense fallback={
                    <div className="container mx-auto px-4 py-20 text-center">
                        <p className="text-muted-foreground">Loading search results...</p>
                    </div>
                }>
                    <SearchResults />
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}
