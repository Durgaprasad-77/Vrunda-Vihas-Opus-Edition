import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-2">Join the Vrunda Vihas Family</h3>
            <p className="text-background/70 font-sans text-sm mb-6">
              Subscribe for exclusive offers, new arrivals, and styling tips
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/10 border border-background/20 rounded-sm font-sans text-sm placeholder:text-background/50 focus:outline-none focus:border-accent"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-sans uppercase tracking-wider px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              <span className="text-accent">Vrunda</span> Vihas
            </h2>
            <p className="text-background/70 font-sans text-sm mb-6 leading-relaxed">
              Celebrating the rich heritage of Indian textiles with exquisite handcrafted sarees and kurtas that blend
              tradition with contemporary elegance.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-background/70 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/70 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/70 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/70 hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm font-sans">Quick Links</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/sarees" className="text-background/70 hover:text-accent transition-colors">
                  Sarees
                </Link>
              </li>
              <li>
                <Link href="/kurtas" className="text-background/70 hover:text-accent transition-colors">
                  Kurtas
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-background/70 hover:text-accent transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-background/70 hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-background/70 hover:text-accent transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm font-sans">Customer Service</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/track-order" className="text-background/70 hover:text-accent transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-background/70 hover:text-accent transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-background/70 hover:text-accent transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-background/70 hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-background/70 hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm font-sans">Contact Us</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-background/70">
                  123 Heritage Lane, Textile District
                  <br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <Link href="tel:+919876543210" className="text-background/70 hover:text-accent transition-colors">
                  +91 98765 43210
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <Link
                  href="mailto:care@vrundavihas.com"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  care@vrundavihas.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-background/50">
            <p>© 2025 Vrunda Vihas. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-accent transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
