"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Check your email</h1>
          <p className="text-muted">We've sent a password reset link to your email address</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardContent className="pt-6 space-y-4">
            <div className="text-center space-y-4">
              <p className="text-muted">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted">
                Didn't receive the email? Check your spam folder or{" "}
                <button onClick={() => setIsSubmitted(false)} className="text-secondary hover:underline font-medium">
                  try again
                </button>
              </p>
            </div>

            <div className="pt-4">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Forgot your password?</h1>
        <p className="text-muted">Enter your email address and we'll send you a reset link</p>
      </div>

      <Card className="border-border/50 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">We'll send you instructions to reset your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="pt-4">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-muted">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-secondary hover:underline font-medium">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}
