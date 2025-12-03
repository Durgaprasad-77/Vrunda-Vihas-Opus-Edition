import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { RegionFilter } from "@/components/region-filter"
import { FeaturedCollections } from "@/components/featured-collections"
import { BestsellersSection } from "@/components/bestsellers-section"
import { FabricFilter } from "@/components/fabric-filter"
import { TestimonialsSection } from "@/components/testimonials-section"
import { UspSection } from "@/components/usp-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <UspSection />
        <RegionFilter />
        <FeaturedCollections />
        <BestsellersSection />
        <FabricFilter />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
