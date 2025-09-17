import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-accent via-secondary to-accent/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">OrbitNuel</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-balance">
              Start your journey with
              <span className="block">enterprise-grade tools</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed text-pretty">
              Join thousands of teams who trust OrbitNuel for their project management needs. Get started with your free
              account today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-sm text-white/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-sm text-white/70">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-white/70">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm text-white/70">Support</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-20 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 left-32 w-16 h-16 bg-white/5 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>
    </div>
  )
}
