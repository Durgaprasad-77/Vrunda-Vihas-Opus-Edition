"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Package, LogOut, Settings, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/data"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Sarees",
    href: "/sarees",
    submenu: [
      { name: "Banarasi", href: "/sarees?type=banarasi" },
      { name: "Kanjivaram", href: "/sarees?type=kanjivaram" },
      { name: "Chanderi", href: "/sarees?type=chanderi" },
      { name: "Designer", href: "/sarees?type=designer" },
      { name: "View All", href: "/sarees" },
    ],
  },
  {
    name: "Kurtas",
    href: "/kurtas",
    submenu: [
      { name: "Women", href: "/kurtas?type=women" },
      { name: "Men", href: "/kurtas?type=men" },
      { name: "Ethnic Sets", href: "/kurtas?type=sets" },
      { name: "View All", href: "/kurtas" },
    ],
  },
  { name: "Collections", href: "/collections" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { itemCount, toggleCart } = useCart()

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query) ||
          product.fabric.toLowerCase().includes(query) ||
          product.occasion.toLowerCase().includes(query) ||
          product.color.toLowerCase().includes(query)
      )
      .slice(0, 5) // Show max 5 suggestions
  }, [searchQuery])

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowDropdown(false)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowDropdown(false)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowDropdown(e.target.value.trim().length > 0)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 text-center text-sm tracking-wide">
          Free Shipping on orders above ₹2,999 | COD Available
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link href={item.href} className="text-lg font-medium hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <Link href="/auth/signin" className="text-lg font-medium hover:text-primary transition-colors">
                    Sign In
                  </Link>
                </div>
                <Link href="/auth/signup" className="text-lg font-medium hover:text-primary transition-colors">
                  Create Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-semibold tracking-wider lg:text-3xl">
              <span className="text-primary">Vrunda</span> Vihas
            </h1>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.submenu.map((subitem) => (
                      <DropdownMenuItem key={subitem.name} asChild>
                        <Link href={subitem.href}>{subitem.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/auth/signin" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup" className="cursor-pointer">
                    Create Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="cursor-pointer">
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/settings" className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                placeholder="Search for sarees, kurtas, collections..."
                className="w-full pl-10 pr-12 py-3 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery("")
                  setShowDropdown(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Search Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-lg overflow-hidden z-50">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="p-2 border-b border-border">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide px-2">
                          Products
                        </span>
                      </div>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
                          onClick={() => {
                            setShowDropdown(false)
                            setIsSearchOpen(false)
                            setSearchQuery("")
                          }}
                        >
                          <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {product.subcategory} • ₹{product.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        className="block p-3 text-center text-sm text-primary hover:bg-muted border-t border-border transition-colors font-medium"
                        onClick={() => {
                          setShowDropdown(false)
                          setIsSearchOpen(false)
                          setSearchQuery("")
                        }}
                      >
                        View all results for "{searchQuery}"
                      </Link>
                    </>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
