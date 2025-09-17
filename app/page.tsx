import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"
import { Navigation } from "@/components/landing/navigation"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
