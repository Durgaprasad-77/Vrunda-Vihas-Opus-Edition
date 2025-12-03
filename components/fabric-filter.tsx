import Link from "next/link"
import { fabrics } from "@/lib/data"

export function FabricFilter() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light mb-3">Shop by Fabric</h2>
          <p className="font-sans text-muted-foreground">Find your perfect fabric for every occasion</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {fabrics.map((fabric) => (
            <Link
              key={fabric}
              href={`/sarees?fabric=${fabric.toLowerCase()}`}
              className="px-8 py-4 border border-border rounded-sm font-sans text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              {fabric}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
