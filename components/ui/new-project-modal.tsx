"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface NewProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const teamMembers = [
  { id: "1", name: "Sarah Johnson", avatar: "/professional-woman-ceo.png", role: "Admin" },
  { id: "2", name: "Michael Chen", avatar: "/professional-project-manager.png", role: "PM" },
  { id: "3", name: "Amara Okafor", avatar: "/professional-woman-cto.png", role: "Developer" },
  { id: "4", name: "David Rodriguez", avatar: "/professional-man-operations-director.jpg", role: "Developer" },
  { id: "5", name: "Fatima Al-Rashid", avatar: "/professional-woman-founder.png", role: "Designer" },
]

export function NewProjectModal({ open, onOpenChange }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    dueDate: undefined as Date | undefined,
    template: "",
  })
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
      priority: "",
      dueDate: undefined,
      template: "",
    })
    setSelectedMembers([])
    setIsLoading(false)
    onOpenChange(false)
  }

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-secondary" />
            <span>Create New Project</span>
          </DialogTitle>
          <DialogDescription>Set up a new project with team members, deadlines, and priorities.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="Enter project name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Project Settings */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Project Template */}
          <div className="space-y-2">
            <Label htmlFor="template">Project Template</Label>
            <Select value={formData.template} onValueChange={(value) => setFormData({ ...formData, template: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blank">Blank Project</SelectItem>
                <SelectItem value="software">Software Development</SelectItem>
                <SelectItem value="marketing">Marketing Campaign</SelectItem>
                <SelectItem value="design">Design Project</SelectItem>
                <SelectItem value="research">Research & Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Members */}
          <div className="space-y-3">
            <Label>Team Members</Label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border border-border rounded-lg p-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                    selectedMembers.includes(member.id) ? "bg-secondary/20 border border-secondary" : "hover:bg-muted",
                  )}
                  onClick={() => toggleMember(member.id)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted">{member.role}</p>
                  </div>
                  {selectedMembers.includes(member.id) && (
                    <Badge variant="secondary" className="text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            {selectedMembers.length > 0 && (
              <p className="text-xs text-muted">
                {selectedMembers.length} team member{selectedMembers.length !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-secondary hover:bg-secondary/90" disabled={!formData.name || isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
