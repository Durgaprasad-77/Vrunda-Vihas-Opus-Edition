"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Eye, EyeOff, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const banners = [
  {
    id: 1,
    title: "Wedding Season Sale",
    position: "Homepage Hero",
    image: "/placeholder.svg?key=cj8ub",
    link: "/collections/wedding",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-02-28",
  },
  {
    id: 2,
    title: "New Arrivals - Spring",
    position: "Homepage Hero",
    image: "/placeholder.svg?key=91p2h",
    link: "/new-arrivals",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-03-31",
  },
  {
    id: 3,
    title: "Flat 30% Off",
    position: "Category Banner",
    image: "/placeholder.svg?key=h4bkl",
    link: "/sale",
    status: "Scheduled",
    startDate: "2024-02-01",
    endDate: "2024-02-15",
  },
  {
    id: 4,
    title: "Handloom Festival",
    position: "Homepage Secondary",
    image: "/placeholder.svg?key=olvn9",
    link: "/collections/handloom",
    status: "Draft",
    startDate: null,
    endDate: null,
  },
]

export default function BannersPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banners</h1>
          <p className="text-muted-foreground">Manage promotional banners across your store</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
              <DialogDescription>Create a promotional banner for your store</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Banner Title</Label>
                <Input placeholder="e.g., Summer Sale" />
              </div>
              <div className="grid gap-2">
                <Label>Position</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Homepage Hero</SelectItem>
                    <SelectItem value="secondary">Homepage Secondary</SelectItem>
                    <SelectItem value="category">Category Banner</SelectItem>
                    <SelectItem value="popup">Popup Banner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Link URL</Label>
                <Input placeholder="/collections/sale" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Banner Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground text-sm">Upload banner image (1920x600 recommended)</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Banner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Banners Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {banners.map((banner) => (
          <Card key={banner.id}>
            <CardContent className="p-0">
              <div className="relative aspect-[16/6] bg-muted">
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      banner.status === "Active" ? "default" : banner.status === "Scheduled" ? "secondary" : "outline"
                    }
                  >
                    {banner.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground">{banner.position}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {banner.status === "Active" ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {banner.startDate && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {banner.startDate} - {banner.endDate}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
