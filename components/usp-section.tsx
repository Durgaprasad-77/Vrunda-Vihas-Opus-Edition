import { Truck, RotateCcw, Shield, Headphones } from "lucide-react"

const usps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹2,999",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns",
  },
  {
    icon: Shield,
    title: "Authentic Products",
    description: "100% genuine handloom",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "WhatsApp & phone support",
  },
]

export function UspSection() {
  return (
    <section className="py-12 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp) => (
            <div key={usp.title} className="flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <usp.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{usp.title}</h3>
                <p className="font-sans text-sm text-muted-foreground">{usp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
