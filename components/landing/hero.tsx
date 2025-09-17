"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ArrowRight, Play, Users, Kanban, Shield, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium animate-bounce-in">
                <Zap className="w-4 h-4 mr-2" />
                Multi-Tenant SaaS Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance animate-slide-in-left">
                Project Management
                <span className="text-secondary gradient-text"> Reimagined</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed text-pretty animate-slide-in-left stagger-1">
                Enterprise-grade project management for SMEs and startups. Multi-tenant architecture with Kanban boards,
                real-time collaboration, and secure file sharing. Built for African and global businesses.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left stagger-2">
              <Link href="/trial">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white group btn-press hover-glow">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="group bg-transparent hover-lift">
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border animate-slide-in-left stagger-3">
              <div className="text-center hover-scale">
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter value={10000} />+
                </div>
                <div className="text-sm text-muted">Active Users</div>
              </div>
              <div className="text-center hover-scale">
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter value={500} />+
                </div>
                <div className="text-sm text-muted">Companies</div>
              </div>
              <div className="text-center hover-scale">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-slide-in-right">
            <div className="relative z-10 animate-float">
              {/* Main Dashboard Mockup */}
              <div className="bg-card rounded-2xl shadow-2xl border border-border p-6 hover-lift glass">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted">OrbitNuel Dashboard</div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Project Overview</h3>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-muted">12 members</span>
                    </div>
                  </div>

                  {/* Kanban Columns */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-background rounded-lg p-3 border border-border hover-lift">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">To Do</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-card p-2 rounded border text-xs hover-scale">Design System</div>
                        <div className="bg-card p-2 rounded border text-xs hover-scale">API Integration</div>
                      </div>
                    </div>

                    <div className="bg-background rounded-lg p-3 border border-border hover-lift">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">In Progress</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-card p-2 rounded border text-xs hover-scale">Dashboard UI</div>
                      </div>
                    </div>

                    <div className="bg-background rounded-lg p-3 border border-border hover-lift">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">Done</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-card p-2 rounded border text-xs hover-scale">User Auth</div>
                        <div className="bg-card p-2 rounded border text-xs hover-scale">Database Setup</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center animate-pulse hover-rotate">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center animate-float hover-rotate"
              style={{ animationDelay: "2s" }}
            >
              <Kanban className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
