import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { collections } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

const allCollections = [
  ...collections,
  {
    id: "silk",
    name: "Silk Treasures",
    description:
      "Luxurious silk sarees from across India featuring the finest weaves from Varanasi, Kanchipuram, and beyond.",
    image: "/placeholder.svg?key=udhpu",
    count: 58,
  },
  {
    id: "sustainable",
    name: "Sustainable Weaves",
    description: "Eco-friendly handspun collections supporting traditional artisans and sustainable practices.",
    image: "/placeholder.svg?key=z6w6j",
    count: 24,
  },
  {
    id: "bridal",
    name: "Bridal Trousseau",
    description:
      "Complete bridal collection featuring exquisite sarees, lehengas, and accessories for your special day.",
    image: "/placeholder.svg?key=a1j8c",
    count: 36,
  },
]

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const collection = allCollections.find((c) => c.id === id)

  if (!collection) {
    return { title: "Collection Not Found | Vrunda Vihas" }
  }

  return {
    title: `${collection.name} | Vrunda Vihas`,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const collection = allCollections.find((c) => c.id === id)

  if (!collection) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[50vh] overflow-hidden">
          <Image
            src={collection.image || "/placeholder.svg"}
            alt={collection.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-background max-w-2xl px-4">
              <p className="font-sans text-sm uppercase tracking-[0.3em] mb-4 text-accent">Collection</p>
              <h1 className="text-4xl md:text-6xl font-light mb-4">{collection.name}</h1>
              <p className="font-sans text-lg text-background/90">{collection.description}</p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="font-sans text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-primary transition-colors">
              Collections
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{collection.name}</span>
          </nav>
        </div>

        {/* Products */}
        <section className="container mx-auto px-4 py-8 pb-20">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductGrid />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
