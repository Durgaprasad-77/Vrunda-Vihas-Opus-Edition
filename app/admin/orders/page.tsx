"use client"

import { useState } from "react"
import { Search, Eye, Truck, Download, MoreHorizontal, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const orders = [
  {
    id: "VV-1234",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    items: 2,
    total: 21498,
    status: "Processing",
    payment: "Paid",
    paymentMethod: "UPI",
    date: "2024-01-15",
    address: "123, MG Road, Koramangala, Bangalore, Karnataka - 560034",
  },
  {
    id: "VV-1233",
    customer: "Anjali Patel",
    email: "anjali@example.com",
    phone: "+91 87654 32109",
    items: 1,
    total: 18999,
    status: "Shipped",
    payment: "Paid",
    paymentMethod: "Card",
    date: "2024-01-15",
    address: "456, SG Highway, Ahmedabad, Gujarat - 380015",
  },
  {
    id: "VV-1232",
    customer: "Meera Reddy",
    email: "meera@example.com",
    phone: "+91 76543 21098",
    items: 3,
    total: 12897,
    status: "Delivered",
    payment: "Paid",
    paymentMethod: "UPI",
    date: "2024-01-14",
    address: "789, Jubilee Hills, Hyderabad, Telangana - 500033",
  },
  {
    id: "VV-1231",
    customer: "Kavitha Nair",
    email: "kavitha@example.com",
    phone: "+91 65432 10987",
    items: 1,
    total: 8750,
    status: "Processing",
    payment: "COD",
    paymentMethod: "COD",
    date: "2024-01-14",
    address: "321, Marine Drive, Kochi, Kerala - 682001",
  },
  {
    id: "VV-1230",
    customer: "Sunita Joshi",
    email: "sunita@example.com",
    phone: "+91 54321 09876",
    items: 2,
    total: 14848,
    status: "Cancelled",
    payment: "Refunded",
    paymentMethod: "Card",
    date: "2024-01-13",
    address: "654, Civil Lines, Jaipur, Rajasthan - 302006",
  },
  {
    id: "VV-1229",
    customer: "Rekha Menon",
    email: "rekha@example.com",
    phone: "+91 43210 98765",
    items: 1,
    total: 12499,
    status: "Delivered",
    payment: "Paid",
    paymentMethod: "UPI",
    date: "2024-01-12",
    address: "987, Anna Nagar, Chennai, Tamil Nadu - 600040",
  },
]

const orderStats = [
  { label: "Total Orders", value: "1,234", change: "+12%" },
  { label: "Processing", value: "45", change: "+8%" },
  { label: "Shipped", value: "23", change: "-5%" },
  { label: "Delivered", value: "1,156", change: "+15%" },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewOrder = (order: (typeof orders)[0]) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>View and manage all customer orders</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-9 w-full sm:w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell className="text-right">₹{order.total.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.payment === "Paid" ? "default" : order.payment === "COD" ? "secondary" : "destructive"
                      }
                    >
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Shipped"
                            ? "secondary"
                            : order.status === "Cancelled"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Order placed on {selectedOrder?.date}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Order Status</p>
                    <Badge>{selectedOrder.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Payment</p>
                    <Badge variant="outline">{selectedOrder.paymentMethod}</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="font-medium mb-2">Order Items</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Banarasi Silk Saree x 1</span>
                      <span>₹12,499</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chanderi Cotton Kurta x 1</span>
                      <span>₹4,299</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="customer" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedOrder.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{selectedOrder.address}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="timeline" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div className="w-px h-full bg-border" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Order Placed</p>
                      <p className="text-xs text-muted-foreground">{selectedOrder.date} at 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div className="w-px h-full bg-border" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Payment Confirmed</p>
                      <p className="text-xs text-muted-foreground">{selectedOrder.date} at 10:32 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Processing</p>
                      <p className="text-xs text-muted-foreground">In progress</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
