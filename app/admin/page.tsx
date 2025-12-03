import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, ShoppingCart, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "₹12,45,890",
    change: "+12.5%",
    trend: "up",
    icon: IndianRupee,
    description: "vs last month",
  },
  {
    title: "Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "vs last month",
  },
  {
    title: "Customers",
    value: "5,678",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    description: "vs last month",
  },
  {
    title: "Products",
    value: "342",
    change: "-2.1%",
    trend: "down",
    icon: Package,
    description: "active listings",
  },
]

const recentOrders = [
  {
    id: "VV-1234",
    customer: "Priya Sharma",
    product: "Banarasi Silk Saree",
    amount: "₹12,499",
    status: "Processing",
    date: "2 min ago",
  },
  {
    id: "VV-1233",
    customer: "Anjali Patel",
    product: "Kanjivaram Silk Saree",
    amount: "₹18,999",
    status: "Shipped",
    date: "1 hour ago",
  },
  {
    id: "VV-1232",
    customer: "Meera Reddy",
    product: "Chanderi Cotton Kurta",
    amount: "₹4,299",
    status: "Delivered",
    date: "3 hours ago",
  },
  {
    id: "VV-1231",
    customer: "Kavitha Nair",
    product: "Georgette Designer Saree",
    amount: "₹8,750",
    status: "Processing",
    date: "5 hours ago",
  },
  {
    id: "VV-1230",
    customer: "Sunita Joshi",
    product: "Lucknowi Chikankari Set",
    amount: "₹6,999",
    status: "Delivered",
    date: "1 day ago",
  },
]

const topProducts = [
  { name: "Banarasi Silk Saree - Red", sales: 156, revenue: "₹19,50,000" },
  { name: "Kanjivaram Silk - Gold", sales: 132, revenue: "₹25,08,000" },
  { name: "Chanderi Cotton Kurta", sales: 98, revenue: "₹4,21,000" },
  { name: "Mysore Silk Saree", sales: 87, revenue: "₹8,70,000" },
  { name: "Lucknowi Chikankari", sales: 76, revenue: "₹5,32,000" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <span className="flex items-center text-green-600">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <ArrowDownRight className="h-3 w-3" />
                    {stat.change}
                  </span>
                )}
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{order.id}</span>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Shipped"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{order.customer}</p>
                    <p className="text-xs text-muted-foreground truncate">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/admin/products"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Add Product</p>
                <p className="text-xs text-muted-foreground">Create new listing</p>
              </div>
            </a>
            <a
              href="/admin/orders"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <ShoppingCart className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">View Orders</p>
                <p className="text-xs text-muted-foreground">Manage orders</p>
              </div>
            </a>
            <a
              href="/admin/banners"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Update Banners</p>
                <p className="text-xs text-muted-foreground">Edit promotions</p>
              </div>
            </a>
            <a
              href="/admin/promotions"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Create Coupon</p>
                <p className="text-xs text-muted-foreground">Add discounts</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
