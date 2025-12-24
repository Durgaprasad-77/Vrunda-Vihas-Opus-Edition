import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Vrunda Vihas | Premium Indian Ethnic Wear - Sarees & Kurtas",
    template: "%s | Vrunda Vihas",
  },
  description:
    "Discover exquisite handcrafted Banarasi silk sarees, Kanjivaram sarees, and traditional kurtas at Vrunda Vihas. Shop authentic Indian ethnic wear with free shipping across India.",
  keywords: [
    "Indian sarees",
    "Banarasi silk saree",
    "Kanjivaram saree",
    "ethnic wear",
    "kurtas",
    "traditional Indian clothing",
    "handloom sarees",
    "wedding sarees",
    "designer sarees",
  ],
  authors: [{ name: "Vrunda Vihas" }],
  creator: "Vrunda Vihas",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vrunda Vihas",
    title: "Vrunda Vihas | Premium Indian Ethnic Wear",
    description:
      "Discover exquisite handcrafted sarees and kurtas. Traditional elegance meets modern sophistication.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrunda Vihas | Premium Indian Ethnic Wear",
    description:
      "Discover exquisite handcrafted sarees and kurtas. Traditional elegance meets modern sophistication.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
