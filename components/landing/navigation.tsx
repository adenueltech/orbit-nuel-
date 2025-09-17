"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Orbit } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center animate-pulse-glow">
              <Orbit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">OrbitNuel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-muted hover:text-foreground transition-colors">
              Testimonials
            </a>
            <Link href="/auth/login">
              <Button variant="outline" className="mr-2 bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/trial">
              <Button className="bg-secondary hover:bg-secondary/90">Start Free Trial</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-muted hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-muted hover:text-foreground transition-colors">
                Testimonials
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/trial">
                  <Button className="bg-secondary hover:bg-secondary/90 w-full">Start Free Trial</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
