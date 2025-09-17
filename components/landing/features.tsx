import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Users,
  Kanban,
  Upload,
  Bell,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Clock,
  FileText,
  Settings,
} from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "Multi-Tenant Architecture",
    description:
      "Each organization gets its own isolated workspace with branded subdomains and secure data separation.",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Fine-grained permissions with Admin, Manager, and Member roles to control access across your organization.",
    color: "text-green-600",
  },
  {
    icon: Kanban,
    title: "Advanced Task Management",
    description: "Kanban-style boards with deadlines, assignments, progress tracking, and custom workflows.",
    color: "text-purple-600",
  },
  {
    icon: Upload,
    title: "Secure File Storage",
    description: "Enterprise-grade file uploads with AWS S3 integration, version control, and access permissions.",
    color: "text-orange-600",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "In-app and email notifications for task updates, deadlines, mentions, and team activities.",
    color: "text-red-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Comprehensive dashboards with project progress, user activity, and performance metrics.",
    color: "text-indigo-600",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "JWT authentication, refresh tokens, data encryption, and compliance-ready security measures.",
    color: "text-cyan-600",
  },
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    description: "Live updates, WebSocket connections, and instant synchronization across all team members.",
    color: "text-yellow-600",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Built for African and global markets with multi-language support and regional optimization.",
    color: "text-emerald-600",
  },
  {
    icon: Clock,
    title: "Background Processing",
    description: "Automated reminders, scheduled reports, and background jobs with Redis and BullMQ.",
    color: "text-pink-600",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Organize, share, and collaborate on documents with version history and access controls.",
    color: "text-teal-600",
  },
  {
    icon: Settings,
    title: "Custom Workflows",
    description: "Flexible project templates, custom fields, and automated workflows tailored to your business.",
    color: "text-violet-600",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to
            <span className="text-secondary"> Scale Your Business</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto text-pretty">
            OrbitNuel combines enterprise-grade features with intuitive design, giving your team the tools they need to
            collaborate effectively and deliver results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-secondary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-foreground group-hover:text-secondary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
