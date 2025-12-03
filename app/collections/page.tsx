import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { collections } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Collections | Vrunda Vihas - Premium Indian Ethnic Wear",
  description:
    "Explore our curated collections - Wedding, Festive, Handloom Heritage, and more. Discover timeless Indian ethnic wear for every occasion.",
}

const additionalCollections = [
  {
    id: "silk",
    name: "Silk Treasures",
    description: "Luxurious silk sarees from across India",
    image: "/placeholder.svg?key=kye7q",
    count: 58,
  },
  {
    id: "sustainable",
    name: "Sustainable Weaves",
    description: "Eco-friendly handspun collections",
    image: "/placeholder.svg?key=pqbuy",
    count: 24,
  },
  {
    id: "bridal",
    name: "Bridal Trousseau",
    description: "Complete bridal collection",
    image: "/placeholder.svg?key=7bngv",
    count: 36,
  },
]

export default function CollectionsPage() {
  const allCollections = [...collections, ...additionalCollections]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[40vh] overflow-hidden">
          <Image src="/placeholder.svg?key=l2uul" alt="Collections" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-background">
              <p className="font-sans text-sm uppercase tracking-[0.3em] mb-4 text-accent">Curated with Love</p>
              <h1 className="text-4xl md:text-6xl font-light mb-4">Our Collections</h1>
              <p className="font-sans text-lg text-background/90 max-w-xl mx-auto">
                Explore handpicked selections for every occasion
              </p>
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
            <span className="text-foreground">Collections</span>
          </nav>
        </div>

        {/* Collections Grid */}
        <section className="container mx-auto px-4 py-12 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCollections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                    <p className="font-sans text-xs uppercase tracking-wider text-background/70 mb-2">
                      {collection.count} Products
                    </p>
                    <h3 className="text-2xl font-semibold">{collection.name}</h3>
                  </div>
                </div>
                <p className="font-sans text-muted-foreground mb-2">{collection.description}</p>
                <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  Shop Collection <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
