import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export const metadata = {
    title: "Contact Us | Vrunda Vihas - Get in Touch",
    description:
        "Have questions about our sarees or kurtas? Contact Vrunda Vihas for personalized assistance. We're here to help you find the perfect ethnic wear.",
}

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-2xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">
                                Get in Touch
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Have questions about our collection or need assistance with your order? We&apos;d love to hear from
                                you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="Your first name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Your last name" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="How can we help you?" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </Button>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                                    <p className="text-muted-foreground">
                                        Our team is here to assist you with any questions about our products, orders, or styling advice.
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: MapPin,
                                            title: "Visit Our Store",
                                            lines: ["123, Silk Market Road", "Varanasi, Uttar Pradesh 221001", "India"],
                                        },
                                        {
                                            icon: Phone,
                                            title: "Call Us",
                                            lines: ["+91 98765 43210", "+91 11 2345 6789"],
                                        },
                                        {
                                            icon: Mail,
                                            title: "Email Us",
                                            lines: ["hello@vrundavihas.com", "support@vrundavihas.com"],
                                        },
                                        {
                                            icon: Clock,
                                            title: "Business Hours",
                                            lines: ["Monday - Saturday: 10:00 AM - 8:00 PM", "Sunday: 11:00 AM - 6:00 PM"],
                                        },
                                    ].map((item) => (
                                        <div key={item.title} className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <item.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                                {item.lines.map((line) => (
                                                    <p key={line} className="text-muted-foreground text-sm">
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Map Placeholder */}
                                <div className="aspect-video rounded-xl bg-secondary/50 border border-border overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ CTA */}
                <section className="py-16 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Looking for Quick Answers?</h2>
                        <p className="text-muted-foreground mb-6">
                            Check out our frequently asked questions for instant help with common queries.
                        </p>
                        <Button variant="outline">View FAQs</Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
