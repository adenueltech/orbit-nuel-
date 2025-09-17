"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Crown,
  User,
} from "lucide-react"

// Mock data
const teamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@techstart.africa",
    role: "Admin",
    department: "Leadership",
    avatar: "/professional-woman-ceo.png",
    status: "Active",
    joinDate: "Jan 15, 2024",
    location: "Lagos, Nigeria",
    phone: "+234 801 234 5678",
    projects: 8,
    tasksCompleted: 142,
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@techstart.africa",
    role: "Project Manager",
    department: "Operations",
    avatar: "/professional-project-manager.png",
    status: "Active",
    joinDate: "Feb 20, 2024",
    location: "Cape Town, South Africa",
    phone: "+27 21 123 4567",
    projects: 5,
    tasksCompleted: 89,
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "Amara Okafor",
    email: "amara@techstart.africa",
    role: "Developer",
    department: "Engineering",
    avatar: "/professional-woman-cto.png",
    status: "Active",
    joinDate: "Mar 10, 2024",
    location: "Accra, Ghana",
    phone: "+233 24 567 8901",
    projects: 6,
    tasksCompleted: 156,
    lastActive: "30 minutes ago",
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david@techstart.africa",
    role: "Developer",
    department: "Engineering",
    avatar: "/professional-man-operations-director.jpg",
    status: "Active",
    joinDate: "Apr 5, 2024",
    location: "Nairobi, Kenya",
    phone: "+254 70 123 4567",
    projects: 4,
    tasksCompleted: 78,
    lastActive: "5 minutes ago",
  },
  {
    id: "5",
    name: "Fatima Al-Rashid",
    email: "fatima@techstart.africa",
    role: "Designer",
    department: "Design",
    avatar: "/professional-woman-founder.png",
    status: "Away",
    joinDate: "May 12, 2024",
    location: "Cairo, Egypt",
    phone: "+20 10 123 4567",
    projects: 3,
    tasksCompleted: 45,
    lastActive: "2 days ago",
  },
  {
    id: "6",
    name: "James Mitchell",
    email: "james@techstart.africa",
    role: "Marketing Lead",
    department: "Marketing",
    avatar: "/professional-man-vp-engineering.jpg",
    status: "Active",
    joinDate: "Jun 8, 2024",
    location: "Johannesburg, South Africa",
    phone: "+27 11 234 5678",
    projects: 2,
    tasksCompleted: 34,
    lastActive: "1 day ago",
  },
]

export function TeamView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter
    return matchesSearch && matchesRole && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Away":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Offline":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="w-4 h-4" />
      case "Project Manager":
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted mt-1">Manage your team members and their roles</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90 btn-press hover-glow">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 animate-slide-up stagger-1">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{teamMembers.length}</div>
            <p className="text-xs text-muted mt-1">+2 this month</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted">Active Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {teamMembers.filter((m) => m.status === "Active").length}
            </div>
            <p className="text-xs text-muted mt-1">Online members</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted mt-1">Active departments</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted">Avg Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.7</div>
            <p className="text-xs text-muted mt-1">Per team member</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between animate-slide-up stagger-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Project Manager">Project Manager</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="Marketing Lead">Marketing Lead</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <Card
            key={member.id}
            className="group hover-lift card-interactive animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                      {member.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {getRoleIcon(member.role)}
                      <span className="text-sm text-muted">{member.role}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover-scale">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Member
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Status and Department */}
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(member.status)} hover-scale`}>{member.status}</Badge>
                <Badge variant="outline" className="hover-scale">
                  {member.department}
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-muted">
                  <Phone className="w-4 h-4 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-muted">
                  <MapPin className="w-4 h-4 mr-2" />
                  {member.location}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{member.projects}</div>
                  <div className="text-xs text-muted">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{member.tasksCompleted}</div>
                  <div className="text-xs text-muted">Tasks Done</div>
                </div>
              </div>

              {/* Last Active */}
              <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Joined {member.joinDate}
                </div>
                <div>Last active {member.lastActive}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted text-lg">No team members found</div>
          <p className="text-muted text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
