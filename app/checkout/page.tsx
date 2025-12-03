"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronLeft, CreditCard, Truck, Shield, Phone, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
]

const steps = [
  { id: 1, name: "Delivery Address", description: "Where should we deliver?" },
  { id: 2, name: "Order Summary", description: "Review your items" },
  { id: 3, name: "Payment", description: "Complete your purchase" },
]

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    landmark: "",
  })

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const freeShippingThreshold = 2999
  const shipping = subtotal >= freeShippingThreshold ? 0 : 199
  const codCharge = paymentMethod === "cod" ? 49 : 0
  const total = subtotal + shipping + codCharge

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.length < 3 ? "Name must be at least 3 characters" : ""
      case "mobile":
        return !/^[6-9]\d{9}$/.test(value) ? "Enter a valid 10-digit mobile number" : ""
      case "pinCode":
        return !/^\d{6}$/.test(value) ? "Enter a valid 6-digit PIN code" : ""
      case "address":
        return value.length < 10 ? "Please enter complete address" : ""
      case "city":
        return value.length < 2 ? "Please enter city name" : ""
      case "state":
        return !value ? "Please select a state" : ""
      default:
        return ""
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name as keyof typeof formData]) }))
  }

  const validateAddressForm = () => {
    const requiredFields = ["name", "mobile", "pinCode", "address", "city", "state"]
    const newErrors: Record<string, string> = {}
    const newTouched: Record<string, boolean> = {}

    requiredFields.forEach((field) => {
      newTouched[field] = true
      const error = validateField(field, formData[field as keyof typeof formData])
      if (error) newErrors[field] = error
    })

    setTouched(newTouched)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateAddressForm()) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-light mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart before checkout.</p>
          <Button asChild>
            <Link href="/sarees">Shop Now</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        {/* Step Progress */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center">
              {steps.map((step, stepIdx) => (
                <li
                  key={step.name}
                  className={cn("relative", stepIdx !== steps.length - 1 && "pr-8 sm:pr-20 md:pr-32")}
                >
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-full border-2 transition-colors",
                        currentStep > step.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : currentStep === step.id
                            ? "border-primary text-primary"
                            : "border-muted-foreground/30 text-muted-foreground",
                      )}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className={cn(
                          "absolute top-5 left-10 -ml-px h-0.5 w-8 sm:w-20 md:w-32",
                          currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30",
                        )}
                      />
                    )}
                  </div>
                  <div className="mt-2 hidden sm:block">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {step.name}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Address */}
            {currentStep === 1 && (
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={cn("mt-1", errors.name && touched.name && "border-destructive")}
                      placeholder="Enter your full name"
                    />
                    {errors.name && touched.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <div className="flex gap-2 mt-1">
                      <div className="w-16">
                        <Input value="+91" readOnly className="text-center bg-muted" />
                      </div>
                      <div className="flex-1">
                        <Input
                          id="mobile"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                          onBlur={() => handleBlur("mobile")}
                          className={cn(errors.mobile && touched.mobile && "border-destructive")}
                          placeholder="98765 43210"
                        />
                      </div>
                    </div>
                    {errors.mobile && touched.mobile && (
                      <p className="text-sm text-destructive mt-1">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pinCode">PIN Code *</Label>
                      <Input
                        id="pinCode"
                        value={formData.pinCode}
                        onChange={(e) => handleInputChange("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                        onBlur={() => handleBlur("pinCode")}
                        className={cn("mt-1", errors.pinCode && touched.pinCode && "border-destructive")}
                        placeholder="400001"
                      />
                      {errors.pinCode && touched.pinCode && (
                        <p className="text-sm text-destructive mt-1">{errors.pinCode}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        onBlur={() => handleBlur("city")}
                        className={cn("mt-1", errors.city && touched.city && "border-destructive")}
                        placeholder="Mumbai"
                      />
                      {errors.city && touched.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address (House No, Building, Street) *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      onBlur={() => handleBlur("address")}
                      className={cn("mt-1", errors.address && touched.address && "border-destructive")}
                      placeholder="Flat 101, Sunshine Apartments, MG Road"
                    />
                    {errors.address && touched.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="locality">Locality / Area</Label>
                    <Input
                      id="locality"
                      value={formData.locality}
                      onChange={(e) => handleInputChange("locality", e.target.value)}
                      className="mt-1"
                      placeholder="Andheri West"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className={cn("mt-1", errors.state && touched.state && "border-destructive")}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && touched.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <Label htmlFor="landmark">Landmark (Optional)</Label>
                    <Input
                      id="landmark"
                      value={formData.landmark}
                      onChange={(e) => handleInputChange("landmark", e.target.value)}
                      className="mt-1"
                      placeholder="Near Metro Station"
                    />
                  </div>

                  <Button size="lg" className="w-full mt-4" onClick={handleNextStep}>
                    Continue to Order Summary
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Order Summary */}
            {currentStep === 2 && (
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                {/* Delivery Address Summary */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{formData.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.address}, {formData.locality && `${formData.locality}, `}
                        {formData.city}, {formData.state} - {formData.pinCode}
                      </p>
                      <p className="text-sm text-muted-foreground">Mobile: +91 {formData.mobile}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                      Change
                    </Button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="relative w-20 h-24 rounded overflow-hidden bg-muted flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        {item.blouseOption && item.blouseOption.name !== "Unstitched" && (
                          <p className="text-sm text-muted-foreground">{item.blouseOption.name}</p>
                        )}
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-medium mt-1">
                          {formatPrice((item.price + (item.blouseOption?.price || 0)) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <label
                      className={cn(
                        "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <RadioGroupItem value="card" />
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <span className="font-medium">Credit/Debit Card</span>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                      </div>
                    </label>

                    <label
                      className={cn(
                        "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                        paymentMethod === "upi"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <RadioGroupItem value="upi" />
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <span className="font-medium">UPI</span>
                        <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </label>

                    <label
                      className={cn(
                        "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                        paymentMethod === "cod"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <RadioGroupItem value="cod" />
                      <Banknote className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-sm text-muted-foreground">Pay when you receive (+₹49)</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" type="password" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="Enter name as on card" className="mt-1" />
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {paymentMethod === "upi" && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@upi" className="mt-1" />
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button className="flex-1">
                    {paymentMethod === "cod" ? "Place Order" : `Pay ${formatPrice(total)}`}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing this order, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-primary">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-6 sticky top-28">
              <h3 className="font-semibold mb-4">Price Details</h3>

              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">COD Charge</span>
                    <span>{formatPrice(codCharge)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center py-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-xl">{formatPrice(total)}</span>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Delivery within 5-7 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
