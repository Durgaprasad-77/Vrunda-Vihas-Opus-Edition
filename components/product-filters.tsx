"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { regions } from "@/lib/data"

interface FilterProps {
  selectedFilters: {
    types: string[]
    fabrics: string[]
    occasions: string[]
    priceRange: [number, number]
    colors: string[]
    sizes: string[]
  }
  onFilterChange: (filters: FilterProps["selectedFilters"]) => void
}

const colors = [
  { name: "Red", value: "red", hex: "#991B1B" },
  { name: "Purple", value: "purple", hex: "#7C3AED" },
  { name: "Blue", value: "blue", hex: "#2563EB" },
  { name: "Green", value: "green", hex: "#059669" },
  { name: "Gold", value: "gold", hex: "#CA8A04" },
  { name: "Cream", value: "cream", hex: "#FEF3C7" },
  { name: "Maroon", value: "maroon", hex: "#7F1D1D" },
  { name: "White", value: "white", hex: "#FFFFFF" },
]

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-4 text-left">
        <span className="font-medium text-sm text-foreground">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  )
}

function FilterContent({ selectedFilters, onFilterChange, onApply }: FilterProps & { onApply?: () => void }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    color: false,
    size: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] })
  }

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    const current = selectedFilters[category] as string[]
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    onFilterChange({ ...selectedFilters, [category]: updated })
  }

  const formatPrice = (price: number) => {
    return `₹${(price / 1000).toFixed(0)},000`
  }

  const activeFilterCount =
    selectedFilters.types.length +
    selectedFilters.fabrics.length +
    selectedFilters.occasions.length +
    selectedFilters.colors.length +
    selectedFilters.sizes.length +
    (selectedFilters.priceRange[0] > 1500 || selectedFilters.priceRange[1] < 100000 ? 1 : 0)

  const clearAllFilters = () => {
    onFilterChange({
      types: [],
      fabrics: [],
      occasions: [],
      priceRange: [1500, 100000],
      colors: [],
      sizes: [],
    })
  }

  return (
    <div className="space-y-0">
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="font-semibold text-base">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="text-sm text-primary hover:text-primary/80 transition-colors">
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <FilterSection title="Category" isOpen={openSections.category} onToggle={() => toggleSection("category")}>
        <div className="space-y-3">
          {regions.map((region) => (
            <label key={region.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedFilters.types.includes(region.id)}
                onCheckedChange={() => toggleFilter("types", region.id)}
                className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {region.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price" isOpen={openSections.price} onToggle={() => toggleSection("price")}>
        <div className="px-1">
          <Slider
            value={selectedFilters.priceRange}
            min={1500}
            max={100000}
            step={500}
            onValueChange={(value) => onFilterChange({ ...selectedFilters, priceRange: value as [number, number] })}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-primary font-medium">
            <span>₹{selectedFilters.priceRange[0].toLocaleString("en-IN")}</span>
            <span>₹{selectedFilters.priceRange[1].toLocaleString("en-IN")}</span>
          </div>
        </div>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection title="Color" isOpen={openSections.color} onToggle={() => toggleSection("color")}>
        <div className="space-y-3">
          {colors.map((color) => (
            <label key={color.value} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedFilters.colors.includes(color.value)}
                onCheckedChange={() => toggleFilter("colors", color.value)}
                className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {color.name}
                </span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Size" isOpen={openSections.size} onToggle={() => toggleSection("size")}>
        <div className="space-y-3">
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedFilters.sizes.includes(size)}
                onCheckedChange={() => toggleFilter("sizes", size)}
                className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {size}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Apply Filters Button */}
      <div className="pt-6">
        <Button
          onClick={onApply}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

export function ProductFilters({ selectedFilters, onFilterChange }: FilterProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeFilterCount =
    selectedFilters.types.length +
    selectedFilters.fabrics.length +
    selectedFilters.occasions.length +
    selectedFilters.colors.length +
    (selectedFilters.sizes?.length || 0) +
    (selectedFilters.priceRange[0] > 1500 || selectedFilters.priceRange[1] < 100000 ? 1 : 0)

  return (
    <>
      {/* Desktop Filters - Always visible sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-28">
          <FilterContent selectedFilters={selectedFilters} onFilterChange={onFilterChange} />
        </div>
      </aside>

      {/* Mobile Filters */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" className="gap-2 bg-transparent rounded-full">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChange}
              onApply={() => setMobileOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
