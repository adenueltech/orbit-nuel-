import { TrialSignupForm } from "@/components/auth/trial-signup-form"

export default function TrialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Start Your Free Trial</h1>
            <p className="text-muted">Get full access to OrbitNuel for 14 days, no credit card required.</p>
          </div>
          <TrialSignupForm />
        </div>
      </div>
    </div>
  )
}
