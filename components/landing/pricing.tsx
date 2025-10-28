import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "per user/month",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 10 team members",
      "5 projects",
      "Basic Kanban boards",
      "5GB file storage",
      "Email support",
      "Basic analytics",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$19",
    period: "per user/month",
    description: "Best for growing businesses",
    features: [
      "Up to 50 team members",
      "Unlimited projects",
      "Advanced Kanban boards",
      "100GB file storage",
      "Priority support",
      "Advanced analytics",
      "Custom workflows",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Enterprise Kanban boards",
      "Unlimited file storage",
      "24/7 dedicated support",
      "Custom analytics",
      "Advanced security",
      "SSO integration",
      "Custom integrations",
      "On-premise deployment",
    ],
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Simple, Transparent
            <span className="text-secondary"> Pricing</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto text-pretty">
            Choose the perfect plan for your team. All plans include our core features with no hidden fees or surprise
            charges.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative group hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? "border-secondary shadow-lg scale-105 bg-gradient-to-br from-card to-secondary/5"
                  : "hover:-translate-y-1 border-border/50"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted">/{plan.period}</span>}
                </div>
                <CardDescription className="mt-2 text-muted">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-secondary hover:bg-secondary/90 text-white"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                  size="lg"
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  )
}
