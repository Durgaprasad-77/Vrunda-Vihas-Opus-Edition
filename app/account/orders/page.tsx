"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ChevronRight, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample orders data
const orders = [
  {
    id: "VV2024120301",
    date: "Dec 03, 2024",
    total: 18499,
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Crimson Red Silk Kanjivaram Saree",
        image: "/red-silk-saree.jpg",
        price: 12499,
        quantity: 1,
      },
      {
        id: "2",
        name: "Ivory Chikankari Kurta Set",
        image: "/ivory-kurta.jpg",
        price: 5999,
        quantity: 1,
      },
    ],
    deliveryDate: "Nov 28, 2024",
  },
  {
    id: "VV2024112815",
    date: "Nov 28, 2024",
    total: 9999,
    status: "shipped",
    items: [
      {
        id: "3",
        name: "Royal Blue Banarasi Silk Saree",
        image: "/blue-banarasi-saree.jpg",
        price: 9999,
        quantity: 1,
      },
    ],
    trackingId: "AWB1234567890",
    expectedDelivery: "Dec 05, 2024",
  },
  {
    id: "VV2024112510",
    date: "Nov 25, 2024",
    total: 7850,
    status: "processing",
    items: [
      {
        id: "4",
        name: "Emerald Green Chanderi Cotton Saree",
        image: "/green-chanderi-saree.jpg",
        price: 7850,
        quantity: 1,
      },
    ],
  },
  {
    id: "VV2024111205",
    date: "Nov 12, 2024",
    total: 4200,
    status: "cancelled",
    items: [
      {
        id: "5",
        name: "Pastel Pink Organza Saree",
        image: "/pink-organza-saree.jpg",
        price: 4200,
        quantity: 1,
      },
    ],
    cancelReason: "Customer requested cancellation",
  },
]

const statusConfig = {
  processing: {
    label: "Processing",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    color: "bg-blue-100 text-blue-800",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<string>("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const filteredOrders = filter === "all" ? orders : orders.filter((order) => order.status === filter)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/account" className="hover:text-primary">
              Account
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">My Orders</span>
          </nav>

          <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { value: "all", label: "All Orders" },
              { value: "processing", label: "Processing" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={filter === tab.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tab.value)}
                className={cn(filter !== tab.value && "bg-background")}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-background rounded-lg border">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">No orders found</h2>
              <p className="text-muted-foreground mb-6">
                {filter === "all" ? "You haven't placed any orders yet." : `You don't have any ${filter} orders.`}
              </p>
              <Button asChild>
                <Link href="/sarees">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                const StatusIcon = status.icon

                return (
                  <div key={order.id} className="bg-background rounded-lg border overflow-hidden">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 border-b">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Order ID: </span>
                          <span className="font-medium">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Placed on: </span>
                          <span>{order.date}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total: </span>
                          <span className="font-medium">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                      <Badge className={cn("w-fit", status.color)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>

                    {/* Order Items */}
                    <div className="p-4">
                      {order.items.map((item, index) => (
                        <div
                          key={item.id}
                          className={cn("flex gap-4", index !== order.items.length - 1 && "pb-4 mb-4 border-b")}
                        >
                          <div className="relative w-20 h-24 rounded overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-2">{item.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                            <p className="font-medium mt-1">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}

                      {/* Status-specific info */}
                      {order.status === "shipped" && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                          <p className="text-blue-800">
                            <span className="font-medium">Tracking ID:</span> {order.trackingId}
                          </p>
                          <p className="text-blue-700 mt-1">Expected delivery by {order.expectedDelivery}</p>
                        </div>
                      )}

                      {order.status === "delivered" && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm">
                          <p className="text-green-800">Delivered on {order.deliveryDate}</p>
                        </div>
                      )}

                      {order.status === "cancelled" && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg text-sm">
                          <p className="text-red-800">{order.cancelReason}</p>
                        </div>
                      )}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-2 p-4 border-t bg-muted/30">
                      <Button variant="outline" size="sm" asChild className="bg-background">
                        <Link href={`/account/orders/${order.id}`}>
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                      {order.status === "delivered" && (
                        <>
                          <Button variant="outline" size="sm" className="bg-background">
                            Write Review
                          </Button>
                          <Button variant="outline" size="sm" className="bg-background">
                            Return/Exchange
                          </Button>
                        </>
                      )}
                      {order.status === "shipped" && (
                        <Button variant="outline" size="sm" className="bg-background">
                          Track Order
                        </Button>
                      )}
                      {(order.status === "processing" || order.status === "shipped") && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive bg-background"
                        >
                          Cancel Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="bg-background">
                        Need Help?
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
