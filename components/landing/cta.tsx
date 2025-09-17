import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/10 via-accent/5 to-secondary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Ready to Transform Your
            <span className="text-secondary"> Project Management?</span>
          </h2>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of teams who have already revolutionized their workflow with OrbitNuel. Start your free trial
            today and experience the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/trial">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white group">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted">14-day free trial</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted">No credit card required</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
