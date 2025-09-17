"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Eye, EyeOff, Mail, User, Building, ArrowRight, Orbit } from "lucide-react"

export function TrialSignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    agreeToTerms: false,
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard after successful trial signup
    router.push("/dashboard")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
          <Orbit className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">Start Free Trial</CardTitle>
        <CardDescription>14-day free trial • No credit card required</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input
                id="company"
                type="text"
                placeholder="Your Company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-muted" /> : <Eye className="h-4 w-4 text-muted" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-muted">
              I agree to the{" "}
              <a href="#" className="text-secondary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-secondary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-white"
            disabled={isLoading || !formData.agreeToTerms}
          >
            {isLoading ? <LoadingSpinner className="mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
            {isLoading ? "Creating Account..." : "Start Free Trial"}
          </Button>

          <div className="text-center text-sm text-muted">
            Already have an account?{" "}
            <a href="/auth/login" className="text-secondary hover:underline font-medium">
              Sign in
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
