"use client"

import { useState, useMemo } from "react"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGridProps {
  category?: "sarees" | "kurtas"
  initialType?: string
}

const ITEMS_PER_PAGE = 12

export function ProductGrid({ category, initialType }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("popularity")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFilters, setSelectedFilters] = useState({
    types: initialType ? [initialType] : [],
    fabrics: [] as string[],
    occasions: [] as string[],
    priceRange: [1500, 100000] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
  })

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (category) {
      filtered = filtered.filter((p) => p.category === category)
    }

    // Filter by type
    if (selectedFilters.types.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.types.includes(p.subcategory))
    }

    // Filter by fabric
    if (selectedFilters.fabrics.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.fabrics.includes(p.fabric))
    }

    // Filter by occasion
    if (selectedFilters.occasions.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.occasions.includes(p.occasion))
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= selectedFilters.priceRange[0] && p.price <= selectedFilters.priceRange[1],
    )

    // Filter by color
    if (selectedFilters.colors.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.colors.includes(p.color))
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        filtered = [...filtered].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
    }

    return filtered
  }, [category, selectedFilters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Get category title
  const getCategoryTitle = () => {
    if (selectedFilters.types.length === 1) {
      const typeLabels: Record<string, string> = {
        banarasi: "Banarasi",
        kanjivaram: "Kanjivaram",
        chanderi: "Chanderi",
        paithani: "Paithani",
        bandhani: "Bandhani",
        patola: "Patola",
        designer: "Designer",
      }
      return `${typeLabels[selectedFilters.types[0]] || selectedFilters.types[0]} ${category === "kurtas" ? "Kurtas" : "Sarees"}`
    }
    return category === "kurtas" ? "Kurtas" : "Sarees"
  }

  return (
    <div className="flex gap-8">
      <ProductFilters selectedFilters={selectedFilters} onFilterChange={setSelectedFilters} />

      <div className="flex-1">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">{getCategoryTitle()}</h1>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} items
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] text-sm bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid - 4 columns like reference */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-light mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 rounded-full ${currentPage === page ? "bg-primary text-primary-foreground" : ""}`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
