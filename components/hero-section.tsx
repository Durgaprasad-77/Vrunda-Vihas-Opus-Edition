"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle: "Wedding Collection 2025",
    description: "Discover exquisite Banarasi and Kanjivaram sarees handcrafted for your special moments",
    image: "/elegant-indian-bride-red-banarasi-saree-gold-jewel.jpg",
    cta: "Shop Wedding",
    href: "/collections/wedding",
  },
  {
    id: 2,
    title: "Festive Splendor",
    subtitle: "Celebrate in Style",
    description: "Vibrant kurtas and designer sarees for Diwali, Navratri, and every celebration",
    image: "/indian-woman-festive-kurta-orange-gold-diwali-cele.jpg",
    cta: "Shop Festive",
    href: "/collections/festive",
  },
  {
    id: 3,
    title: "Handloom Heritage",
    subtitle: "Artisan Crafted",
    description: "Supporting traditional weavers with authentic handloom sarees from across India",
    image: "/indian-handloom-saree-weaver-traditional-loom-arti.jpg",
    cta: "Explore Handloom",
    href: "/collections/handloom",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-background">
                <p className="font-sans text-sm uppercase tracking-[0.3em] mb-4 text-accent">{slide.subtitle}</p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-balance">
                  {slide.title}
                </h2>
                <p className="font-sans text-lg md:text-xl text-background/90 mb-8 max-w-lg leading-relaxed">
                  {slide.description}
                </p>
                <Link href={slide.href}>
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-sans uppercase tracking-wider px-8 py-6 text-sm"
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-background/80 hover:text-background transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-background/80 hover:text-background transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-accent" : "w-2 bg-background/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
