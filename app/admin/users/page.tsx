"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MoreHorizontal, Shield, Mail, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@vrundavihas.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-01-15 10:30 AM",
  },
  {
    id: 2,
    name: "Priya Manager",
    email: "priya@vrundavihas.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-01-15 09:15 AM",
  },
  {
    id: 3,
    name: "Rahul Support",
    email: "rahul@vrundavihas.com",
    role: "Support",
    status: "Active",
    lastLogin: "2024-01-14 04:45 PM",
  },
  {
    id: 4,
    name: "Neha Editor",
    email: "neha@vrundavihas.com",
    role: "Content Editor",
    status: "Inactive",
    lastLogin: "2024-01-10 11:20 AM",
  },
]

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all features",
    users: 1,
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage products, orders, and customers",
    users: 2,
    permissions: ["products", "orders", "customers", "reports"],
  },
  {
    id: 3,
    name: "Support",
    description: "Handle customer inquiries and orders",
    users: 3,
    permissions: ["orders", "customers"],
  },
  {
    id: 4,
    name: "Content Editor",
    description: "Manage content, banners, and blog",
    users: 1,
    permissions: ["content", "banners", "blog"],
  },
]

const permissionGroups = [
  {
    name: "Products",
    permissions: [
      { id: "products.view", label: "View products" },
      { id: "products.create", label: "Create products" },
      { id: "products.edit", label: "Edit products" },
      { id: "products.delete", label: "Delete products" },
    ],
  },
  {
    name: "Orders",
    permissions: [
      { id: "orders.view", label: "View orders" },
      { id: "orders.edit", label: "Edit orders" },
      { id: "orders.cancel", label: "Cancel orders" },
    ],
  },
  {
    name: "Customers",
    permissions: [
      { id: "customers.view", label: "View customers" },
      { id: "customers.edit", label: "Edit customers" },
    ],
  },
  {
    name: "Content",
    permissions: [
      { id: "content.view", label: "View content" },
      { id: "content.edit", label: "Edit content" },
      { id: "content.publish", label: "Publish content" },
    ],
  },
  {
    name: "Settings",
    permissions: [
      { id: "settings.view", label: "View settings" },
      { id: "settings.edit", label: "Edit settings" },
    ],
  },
]

export default function UsersPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Roles & Users</h1>
        <p className="text-muted-foreground">Manage admin users and their permissions</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6 mt-6">
          <div className="flex justify-end">
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new admin user account</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@vrundavihas.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Super Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="editor">Content Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="Create password" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddUserOpen(false)}>Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage users who have access to the admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{user.lastLogin}</TableCell>
                      <TableCell>
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
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Invite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
        </TabsContent>

        <TabsContent value="roles" className="space-y-6 mt-6">
          <div className="flex justify-end">
            <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Role</DialogTitle>
                  <DialogDescription>Define a new role with specific permissions</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Role Name</Label>
                    <Input placeholder="e.g., Warehouse Manager" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Input placeholder="Brief description of this role" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    <div className="border rounded-lg p-4 space-y-6">
                      {permissionGroups.map((group) => (
                        <div key={group.name}>
                          <h4 className="font-medium mb-3">{group.name}</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {group.permissions.map((perm) => (
                              <div key={perm.id} className="flex items-center gap-2">
                                <Checkbox id={perm.id} />
                                <Label htmlFor={perm.id} className="font-normal text-sm">
                                  {perm.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddRoleOpen(false)}>Create Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{role.name}</CardTitle>
                        <CardDescription className="text-xs">{role.users} users</CardDescription>
                      </div>
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
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((perm) => (
                      <Badge key={perm} variant="secondary" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
