"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Calendar, Users, Clock, Star, Archive, Edit, Trash2, Eye } from "lucide-react"
import { NewProjectModal } from "@/components/ui/new-project-modal"

// Mock data
const projects = [
  {
    id: "1",
    name: "Mobile App Redesign",
    description: "Complete redesign of the mobile application with new UI/UX patterns",
    status: "In Progress",
    priority: "High",
    progress: 75,
    dueDate: "Dec 15, 2024",
    createdAt: "Nov 1, 2024",
    team: [
      { name: "Sarah Johnson", avatar: "/professional-woman-ceo.png", role: "PM" },
      { name: "Michael Chen", avatar: "/professional-project-manager.png", role: "Designer" },
      { name: "Amara Okafor", avatar: "/professional-woman-cto.png", role: "Developer" },
    ],
    tasks: { total: 24, completed: 18 },
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "API Integration",
    description: "Integrate third-party APIs for payment processing and analytics",
    status: "In Progress",
    priority: "Medium",
    progress: 45,
    dueDate: "Dec 20, 2024",
    createdAt: "Nov 5, 2024",
    team: [
      { name: "David Rodriguez", avatar: "/professional-man-operations-director.jpg", role: "Lead Dev" },
      { name: "Fatima Al-Rashid", avatar: "/professional-woman-founder.png", role: "Backend Dev" },
    ],
    tasks: { total: 16, completed: 7 },
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q4 marketing campaign for product launch",
    status: "Review",
    priority: "High",
    progress: 90,
    dueDate: "Dec 10, 2024",
    createdAt: "Oct 15, 2024",
    team: [
      { name: "James Mitchell", avatar: "/professional-man-vp-engineering.jpg", role: "Marketing Lead" },
      { name: "Sarah Johnson", avatar: "/professional-woman-ceo.png", role: "Content" },
    ],
    tasks: { total: 12, completed: 11 },
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Database Migration",
    description: "Migrate from PostgreSQL to distributed database system",
    status: "Planning",
    priority: "Low",
    progress: 30,
    dueDate: "Jan 5, 2025",
    createdAt: "Nov 10, 2024",
    team: [
      { name: "Michael Chen", avatar: "/professional-project-manager.png", role: "DBA" },
      { name: "Amara Okafor", avatar: "/professional-woman-cto.png", role: "DevOps" },
    ],
    tasks: { total: 20, completed: 6 },
    color: "bg-orange-500",
  },
  {
    id: "5",
    name: "Security Audit",
    description: "Comprehensive security audit and penetration testing",
    status: "Completed",
    priority: "High",
    progress: 100,
    dueDate: "Nov 30, 2024",
    createdAt: "Oct 1, 2024",
    team: [{ name: "David Rodriguez", avatar: "/professional-man-operations-director.jpg", role: "Security Lead" }],
    tasks: { total: 8, completed: 8 },
    color: "bg-red-500",
  },
  {
    id: "6",
    name: "User Onboarding",
    description: "Improve user onboarding flow and documentation",
    status: "On Hold",
    priority: "Medium",
    progress: 20,
    dueDate: "Jan 15, 2025",
    createdAt: "Nov 8, 2024",
    team: [
      { name: "Fatima Al-Rashid", avatar: "/professional-woman-founder.png", role: "UX Designer" },
      { name: "James Mitchell", avatar: "/professional-man-vp-engineering.jpg", role: "Technical Writer" },
    ],
    tasks: { total: 15, completed: 3 },
    color: "bg-cyan-500",
  },
]

export function ProjectsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Review":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "On Hold":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted mt-1">Manage and track all your projects in one place</p>
        </div>
        <Button
          className="bg-secondary hover:bg-secondary/90 btn-press hover-glow"
          onClick={() => setShowNewProjectModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between animate-slide-up stagger-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            Grid
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            List
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredProjects.map((project, index) => (
          <Card
            key={project.id}
            className="group hover-lift card-interactive animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${project.color} animate-pulse`}></div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
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
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="w-4 h-4 mr-2" />
                      Add to Favorites
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Status and Priority */}
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(project.status)} hover-scale`}>{project.status}</Badge>
                <Badge className={`${getPriorityColor(project.priority)} hover-scale`}>{project.priority}</Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 animate-progress" />
              </div>

              {/* Tasks */}
              <div className="flex items-center justify-between text-sm text-muted">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {project.tasks.completed}/{project.tasks.total} tasks
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {project.dueDate}
                </div>
              </div>

              {/* Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted" />
                  <span className="text-sm text-muted">Team</span>
                </div>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, index) => (
                    <Avatar key={index} className="w-6 h-6 border-2 border-background">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-muted">+{project.team.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted text-lg">No projects found</div>
          <p className="text-muted text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* New Project Modal */}
      <NewProjectModal open={showNewProjectModal} onOpenChange={setShowNewProjectModal} />
    </div>
  )
}
