import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Sparkles, Heart, Leaf, Award } from "lucide-react"

export const metadata = {
    title: "About Us | Vrunda Vihas - Our Heritage & Story",
    description:
        "Discover the story behind Vrunda Vihas. We are dedicated to preserving and promoting the rich heritage of Indian ethnic wear through exquisite handcrafted sarees and kurtas.",
}

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10" />
                    <div className="absolute inset-0 bg-[url('/indian-handloom-saree-weaver-traditional-loom-arti.jpg')] bg-cover bg-center opacity-10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm font-medium">Est. 2024</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">
                                Weaving Stories of Elegance
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                At Vrunda Vihas, we believe that every thread tells a story, every weave carries a legacy, and every
                                saree holds within it the dreams of artisans who have dedicated their lives to this timeless craft.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Mission Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                                <Image
                                    src="/indian-handloom-saree-weaving-traditional-artisan.jpg"
                                    alt="Traditional Indian handloom weaving"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-white/90 text-sm italic">
                                        &ldquo;Each handwoven piece takes weeks of dedicated craftsmanship.&rdquo;
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We are on a mission to bridge the gap between India&apos;s rich textile heritage and the modern
                                    world. By working directly with master weavers across India—from the sacred ghats of Varanasi to the
                                    silk-weaving centers of Kanchipuram—we ensure that authentic craftsmanship reaches discerning
                                    customers worldwide.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our curated collection represents the pinnacle of Indian ethnic wear: pure Banarasi silks with real
                                    zari, Kanjivaram sarees with temple borders, delicate Chanderi weaves, and the intricate Chikankari
                                    embroidery of Lucknow.
                                </p>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                        <p className="text-3xl font-bold text-primary">500+</p>
                                        <p className="text-sm text-muted-foreground">Artisan Partners</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                        <p className="text-3xl font-bold text-amber-600">15+</p>
                                        <p className="text-sm text-muted-foreground">Weaving Regions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Every decision we make is guided by our commitment to authenticity, sustainability, and the
                                preservation of India&apos;s textile heritage.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Award,
                                    title: "Authenticity",
                                    description:
                                        "We source directly from verified artisans and weaving clusters, ensuring every piece is genuine and carries the mark of traditional craftsmanship.",
                                    color: "text-primary",
                                    bg: "bg-primary/10",
                                },
                                {
                                    icon: Heart,
                                    title: "Artisan Welfare",
                                    description:
                                        "We pay fair prices directly to artisans, supporting their families and ensuring the next generation inherits these precious skills.",
                                    color: "text-rose-500",
                                    bg: "bg-rose-500/10",
                                },
                                {
                                    icon: Leaf,
                                    title: "Sustainability",
                                    description:
                                        "Handloom weaving is inherently eco-friendly. We champion sustainable practices and natural dyes wherever possible.",
                                    color: "text-emerald-500",
                                    bg: "bg-emerald-500/10",
                                },
                            ].map((value) => (
                                <div
                                    key={value.title}
                                    className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className={`inline-flex p-3 rounded-xl ${value.bg} mb-4`}>
                                        <value.icon className={`h-6 w-6 ${value.color}`} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/10 via-amber-500/10 to-primary/10 border border-primary/20">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience the Legacy</h2>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Explore our collection and discover the magic of authentic Indian ethnic wear. Each piece is a
                                celebration of centuries-old traditions brought to life for the modern woman.
                            </p>
                            <a
                                href="/collections"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                                Explore Collections
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
