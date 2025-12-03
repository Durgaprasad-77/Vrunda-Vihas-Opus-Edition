"use client"

import { useCart } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const freeShippingThreshold = 2999
  const shipping = subtotal >= freeShippingThreshold ? 0 : 199
  const total = subtotal + shipping

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="font-sans text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Shopping Cart</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-light mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-light mb-3">Your cart is empty</h2>
            <p className="font-sans text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our beautiful collection of sarees and
              kurtas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-sans uppercase tracking-wider">
                <Link href="/sarees">Shop Sarees</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-sans uppercase tracking-wider bg-transparent">
                <Link href="/kurtas">Shop Kurtas</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border font-sans text-sm text-muted-foreground uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="py-6">
                    <div className="grid md:grid-cols-12 gap-4 items-center">
                      {/* Product */}
                      <div className="md:col-span-6 flex gap-4">
                        <Link href={`/product/${item.productId}`}>
                          <div className="relative w-24 h-32 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <div>
                          <Link
                            href={`/product/${item.productId}`}
                            className="font-medium text-lg hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                          {item.blouseOption && item.blouseOption.name !== "Unstitched" && (
                            <p className="font-sans text-sm text-muted-foreground mt-1">
                              Blouse: {item.blouseOption.name}
                              {item.blouseOption.price > 0 && <span> (+{formatPrice(item.blouseOption.price)})</span>}
                            </p>
                          )}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-3 font-sans text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center font-sans">
                        <span className="md:hidden font-semibold">Price: </span>
                        {formatPrice(item.price + (item.blouseOption?.price || 0))}
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-border rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-sans">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 text-right font-semibold text-lg">
                        <span className="md:hidden font-normal text-sm text-muted-foreground">Total: </span>
                        {formatPrice((item.price + (item.blouseOption?.price || 0)) * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="font-sans text-sm text-muted-foreground hover:text-destructive"
                >
                  Clear Cart
                </Button>
                <Button variant="outline" asChild className="font-sans bg-transparent">
                  <Link href="/sarees">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary rounded-sm p-6 sticky top-28">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-6">
                  <label className="font-sans text-sm text-muted-foreground mb-2 block">Have a coupon?</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="font-sans text-sm" />
                    <Button variant="outline" className="font-sans text-sm bg-transparent">
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pb-6 border-b border-border">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  {subtotal < freeShippingThreshold && (
                    <p className="font-sans text-xs text-muted-foreground">
                      Add {formatPrice(freeShippingThreshold - subtotal)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center py-6 border-b border-border">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold text-2xl">{formatPrice(total)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-wider"
                  asChild
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                {/* Trust badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 font-sans text-xs text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free shipping on orders above {formatPrice(freeShippingThreshold)}</span>
                  </div>
                  <div className="flex items-center gap-3 font-sans text-xs text-muted-foreground">
                    <RotateCcw className="h-4 w-4 text-primary" />
                    <span>7-day hassle-free returns</span>
                  </div>
                  <div className="flex items-center gap-3 font-sans text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>100% secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
