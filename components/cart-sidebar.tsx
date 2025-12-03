"use client"

import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, itemCount, subtotal } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const freeShippingThreshold = 2999
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-light mb-2">Your cart is empty</h3>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Add some beautiful ethnic wear to get started
            </p>
            <Button onClick={toggleCart} asChild>
              <Link href="/sarees" className="font-sans uppercase tracking-wider">
                Shop Sarees
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            {remainingForFreeShipping > 0 ? (
              <div className="py-4 border-b border-border">
                <p className="font-sans text-sm text-center mb-2">
                  Add {formatPrice(remainingForFreeShipping)} more for <strong>free shipping</strong>
                </p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="py-4 border-b border-border bg-accent/10 -mx-6 px-6">
                <p className="font-sans text-sm text-center text-accent-foreground">
                  You've unlocked <strong>free shipping!</strong>
                </p>
              </div>
            )}

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                    <Link href={`/product/${item.productId}`} onClick={toggleCart}>
                      <div className="relative w-20 h-24 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.productId}`}
                        onClick={toggleCart}
                        className="font-medium hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      {item.blouseOption && item.blouseOption.name !== "Unstitched" && (
                        <p className="font-sans text-xs text-muted-foreground mt-1">Blouse: {item.blouseOption.name}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 font-sans text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-semibold mt-2">
                        {formatPrice((item.price + (item.blouseOption?.price || 0)) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart footer */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-lg">{formatPrice(subtotal)}</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground text-center">
                Shipping & taxes calculated at checkout
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 font-sans uppercase tracking-wider bg-transparent"
                  onClick={toggleCart}
                  asChild
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-wider"
                  asChild
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
