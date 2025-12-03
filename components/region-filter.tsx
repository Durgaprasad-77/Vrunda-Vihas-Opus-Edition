import Link from "next/link"
import { regions } from "@/lib/data"

export function RegionFilter() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light mb-3">Shop by Region</h2>
          <p className="font-sans text-muted-foreground">Explore sarees from India's finest weaving traditions</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {regions.map((region) => (
            <Link
              key={region.id}
              href={`/sarees?type=${region.id}`}
              className="group text-center p-6 bg-card rounded-sm border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{region.name}</h3>
              <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">{region.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
