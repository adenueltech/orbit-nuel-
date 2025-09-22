"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Filter,
  BarChart3,
  PieChartIcon,
  Activity,
  Target,
  Zap,
  Award,
} from "lucide-react"

// Mock data
const overviewStats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: BarChart3,
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Tasks Completed",
    value: "1,247",
    change: "+23%",
    trend: "up",
    icon: CheckCircle,
    color: "text-purple-600",
  },
  {
    title: "Avg. Completion Time",
    value: "3.2 days",
    change: "-15%",
    trend: "down",
    icon: Clock,
    color: "text-orange-600",
  },
]

const projectPerformanceData = [
  { name: "Jan", completed: 45, inProgress: 23, planned: 12 },
  { name: "Feb", completed: 52, inProgress: 28, planned: 15 },
  { name: "Mar", completed: 48, inProgress: 32, planned: 18 },
  { name: "Apr", completed: 61, inProgress: 25, planned: 14 },
  { name: "May", completed: 55, inProgress: 35, planned: 20 },
  { name: "Jun", completed: 67, inProgress: 30, planned: 16 },
]

const teamProductivityData = [
  { name: "Week 1", productivity: 85, tasks: 42 },
  { name: "Week 2", productivity: 78, tasks: 38 },
  { name: "Week 3", productivity: 92, tasks: 48 },
  { name: "Week 4", productivity: 88, tasks: 45 },
  { name: "Week 5", productivity: 95, tasks: 52 },
  { name: "Week 6", productivity: 82, tasks: 41 },
]

const taskDistributionData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 30, color: "#8b5cf6" },
  { name: "Planning", value: 15, color: "#f59e0b" },
  { name: "On Hold", value: 10, color: "#ef4444" },
]

const userActivityData = [
  { name: "Mon", active: 120, total: 156 },
  { name: "Tue", active: 132, total: 156 },
  { name: "Wed", active: 145, total: 156 },
  { name: "Thu", active: 128, total: 156 },
  { name: "Fri", active: 142, total: 156 },
  { name: "Sat", active: 98, total: 156 },
  { name: "Sun", active: 87, total: 156 },
]

const topPerformers = [
  {
    name: "Sarah Johnson",
    avatar: "/professional-woman-ceo.png",
    tasksCompleted: 47,
    efficiency: 94,
    projects: 8,
  },
  {
    name: "Michael Chen",
    avatar: "/professional-project-manager.png",
    tasksCompleted: 42,
    efficiency: 91,
    projects: 6,
  },
  {
    name: "Amara Okafor",
    avatar: "/professional-woman-cto.png",
    tasksCompleted: 38,
    efficiency: 89,
    projects: 7,
  },
  {
    name: "David Rodriguez",
    avatar: "/professional-man-operations-director.jpg",
    tasksCompleted: 35,
    efficiency: 87,
    projects: 5,
  },
]

const projectHealthData = [
  { name: "Mobile App", health: 92, color: "#10b981" },
  { name: "API Integration", health: 78, color: "#f59e0b" },
  { name: "Marketing", health: 95, color: "#10b981" },
  { name: "Database", health: 65, color: "#ef4444" },
]

export function AnalyticsView() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-muted">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted mt-1">Track performance and gain insights into your team's productivity</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Project Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
                  Project Performance
                </CardTitle>
                <CardDescription>Monthly project completion trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10b981" name="Completed" />
                    <Bar dataKey="inProgress" fill="#8b5cf6" name="In Progress" />
                    <Bar dataKey="planned" fill="#f59e0b" name="Planned" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Task Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2 text-secondary" />
                  Task Distribution
                </CardTitle>
                <CardDescription>Current status of all tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={taskDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {taskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {taskDistributionData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-muted">{item.name}</span>
                      <span className="text-sm font-medium text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-secondary" />
                User Activity
              </CardTitle>
              <CardDescription>Daily active users over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="active" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="total" stroke="#e5e7eb" fill="#e5e7eb" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Project Health */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-secondary" />
                  Project Health Score
                </CardTitle>
                <CardDescription>Overall health metrics for active projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectHealthData.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{project.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{project.health}%</span>
                        <Badge
                          variant={
                            project.health >= 90 ? "default" : project.health >= 70 ? "secondary" : "destructive"
                          }
                        >
                          {project.health >= 90 ? "Excellent" : project.health >= 70 ? "Good" : "Needs Attention"}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={project.health} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-900">On Track</div>
                    <div className="text-sm text-green-700">18 projects meeting deadlines</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-900">At Risk</div>
                    <div className="text-sm text-yellow-700">4 projects behind schedule</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">High Velocity</div>
                    <div className="text-sm text-blue-700">2 projects ahead of schedule</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Team Productivity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
                  Team Productivity
                </CardTitle>
                <CardDescription>Weekly productivity trends and task completion</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={teamProductivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="productivity" stroke="#8b5cf6" strokeWidth={3} />
                    <Line type="monotone" dataKey="tasks" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-secondary" />
                  Top Performers
                </CardTitle>
                <CardDescription>This month's highest achievers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-full text-sm font-bold text-secondary">
                      {index + 1}
                    </div>
                    <img
                      src={performer.avatar || "/placeholder.svg"}
                      alt={performer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{performer.name}</div>
                      <div className="text-sm text-muted">
                        {performer.tasksCompleted} tasks • {performer.efficiency}% efficiency
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Task Completion Rate</span>
                    <span className="text-sm font-bold">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">On-Time Delivery</span>
                    <span className="text-sm font-bold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Team Satisfaction</span>
                    <span className="text-sm font-bold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Resource Utilization</span>
                    <span className="text-sm font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Efficiency Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Overview</CardTitle>
                <CardDescription>Radial view of team efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="90%"
                    data={[{ name: "Efficiency", value: 87, fill: "#8b5cf6" }]}
                  >
                    <RadialBar dataKey="value" cornerRadius={10} fill="#8b5cf6" />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-2xl font-bold fill-foreground"
                    >
                      87%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <div className="text-sm text-muted">Overall Team Efficiency</div>
                  <div className="text-xs text-muted mt-1">Based on task completion and time tracking</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
