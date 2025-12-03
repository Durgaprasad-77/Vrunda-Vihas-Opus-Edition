import Link from "next/link"
import Image from "next/image"
import { collections } from "@/lib/data"
import { ArrowRight } from "lucide-react"

export function FeaturedCollections() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-primary mb-3">Curated for You</p>
          <h2 className="text-3xl md:text-5xl font-light">Featured Collections</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm"
            >
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-background">
                <p className="font-sans text-xs uppercase tracking-wider text-background/70 mb-2">
                  {collection.count} Products
                </p>
                <h3 className="text-2xl font-semibold mb-2">{collection.name}</h3>
                <p className="font-sans text-sm text-background/80 mb-4">{collection.description}</p>
                <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent group-hover:gap-3 transition-all">
                  Shop Collection <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
