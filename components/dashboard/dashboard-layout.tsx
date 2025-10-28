"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NewProjectModal } from "@/components/ui/new-project-modal"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { GlobalSearch } from "@/components/ui/global-search"
import { NotificationsDropdown } from "@/components/ui/notifications-dropdown"
import { useNotificationStore } from "@/lib/stores/notification-store"
import {
  Home,
  Kanban,
  Users,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  Orbit,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: Kanban },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Files", href: "/dashboard/files", icon: FileText },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]


interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { fetchNotifications, connectSocket, disconnectSocket } = useNotificationStore()

  useEffect(() => {
    // Fetch user data from API
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
            // Connect to notifications socket and fetch notifications
            connectSocket(userData.id)
            fetchNotifications()
          }
        } catch (error) {
          console.error('Failed to fetch user:', error)
        }
      }
    }
    fetchUser()

    // Cleanup socket connection on unmount
    return () => {
      disconnectSocket()
    }
  }, [connectSocket, disconnectSocket, fetchNotifications])

  // Temporary fallback user data
  const mockUser = {
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "TechCorp Inc.",
    avatar: "/professional-woman-ceo.png"
  }

  const currentUser = user || mockUser

  return (
    <SidebarProvider data-dashboard>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-sidebar-border">
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-sidebar-accent rounded-lg flex items-center justify-center">
                <Orbit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">OrbitNuel</h2>
                <p className="text-xs text-sidebar-foreground/60">{currentUser.company}</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = item.href === "/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <a href={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

            <div className="mt-8">
              <Button
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={() => setShowNewProjectModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-sidebar-foreground">{currentUser.name}</p>
                      <p className="text-xs text-sidebar-foreground/60">{currentUser.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <ThemeToggle />
                <GlobalSearch className="flex-1 max-w-md" />
              </div>

              <div className="flex items-center space-x-4">
                <NotificationsDropdown />

                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
      </div>

      {/* New Project Modal */}
      <NewProjectModal open={showNewProjectModal} onOpenChange={setShowNewProjectModal} />
    </SidebarProvider>
  )
}
