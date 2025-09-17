import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Africa",
    company: "Lagos, Nigeria",
    content:
      "OrbitNuel transformed how our distributed team collaborates. The multi-tenant architecture is perfect for our growing startup ecosystem.",
    rating: 5,
    avatar: "/professional-woman-ceo.png",
  },
  {
    name: "Michael Chen",
    role: "Project Manager, InnovateCorp",
    company: "Cape Town, South Africa",
    content:
      "The Kanban boards and real-time updates keep our remote team perfectly synchronized. Best project management tool we've used.",
    rating: 5,
    avatar: "/professional-project-manager.png",
  },
  {
    name: "Amara Okafor",
    role: "CTO, FinTech Solutions",
    company: "Accra, Ghana",
    content:
      "Security and scalability were our top concerns. OrbitNuel delivers enterprise-grade features at a fraction of the cost.",
    rating: 5,
    avatar: "/professional-woman-cto.png",
  },
  {
    name: "David Rodriguez",
    role: "Operations Director, GlobalTech",
    company: "Nairobi, Kenya",
    content:
      "The analytics dashboard gives us insights we never had before. Our productivity increased by 40% in just 3 months.",
    rating: 5,
    avatar: "/professional-man-operations-director.jpg",
  },
  {
    name: "Fatima Al-Rashid",
    role: "Founder, Creative Agency",
    company: "Dubai, UAE",
    content:
      "File sharing and collaboration features are seamless. Our creative team can work together effortlessly across time zones.",
    rating: 5,
    avatar: "/professional-woman-founder.png",
  },
  {
    name: "James Mitchell",
    role: "VP Engineering, ScaleUp",
    company: "London, UK",
    content:
      "The API integration capabilities are outstanding. We connected all our tools and created a unified workflow.",
    rating: 5,
    avatar: "/professional-man-vp-engineering.jpg",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by Teams
            <span className="text-secondary"> Worldwide</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto text-pretty">
            Join thousands of teams who have transformed their project management with OrbitNuel's powerful platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-muted mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted">{testimonial.role}</div>
                    <div className="text-xs text-muted">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
