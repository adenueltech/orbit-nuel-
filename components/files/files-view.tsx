"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Upload,
  Search,
  Grid3X3,
  List,
  FolderPlus,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  MoreHorizontal,
  Download,
  Share,
  Edit,
  Trash2,
  Eye,
  User,
  Calendar,
  HardDrive,
  Star,
  Lock,
  Users,
} from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "folder" | "file"
  fileType?: "document" | "image" | "video" | "audio" | "archive" | "other"
  size?: string
  uploadedBy: {
    name: string
    avatar: string
  }
  uploadedAt: string
  lastModified: string
  shared: boolean
  starred: boolean
  permissions: "view" | "edit" | "admin"
  project?: string
  tags: string[]
  preview?: string
}

export function FilesView() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const response = await fetch('http://localhost:3001/files', {
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (response.ok) {
          const filesData = await response.json()
          // Transform backend data to frontend format
          const transformedFiles = filesData.map((file: any) => ({
            id: file.id.toString(),
            name: file.name,
            type: file.type,
            fileType: file.fileType,
            size: file.size,
            uploadedBy: {
              name: file.uploadedBy ? `${file.uploadedBy.firstName} ${file.uploadedBy.lastName}` : 'Unknown',
              avatar: '/placeholder-user.jpg' // TODO: Add avatar to user entity
            },
            uploadedAt: new Date(file.uploadedAt).toLocaleDateString(),
            lastModified: new Date(file.lastModified).toLocaleDateString(),
            shared: file.shared,
            starred: file.starred,
            permissions: file.permissions,
            project: file.project?.title || undefined,
            tags: file.tags || [],
            preview: file.preview,
          }))
          setFiles(transformedFiles)
        }
      } catch (error) {
        console.error('Failed to fetch files:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = typeFilter === "all" || file.type === typeFilter
    const matchesProject = projectFilter === "all" || file.project === projectFilter
    return matchesSearch && matchesType && matchesProject
  })

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return FolderPlus
    switch (file.fileType) {
      case "document":
        return FileText
      case "image":
        return FileImage
      case "video":
        return FileVideo
      case "audio":
        return FileAudio
      case "archive":
        return Archive
      default:
        return File
    }
  }

  const getFileTypeColor = (file: FileItem) => {
    if (file.type === "folder") return "text-blue-600"
    switch (file.fileType) {
      case "document":
        return "text-red-600"
      case "image":
        return "text-green-600"
      case "video":
        return "text-purple-600"
      case "audio":
        return "text-orange-600"
      case "archive":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const response = await fetch('http://localhost:3001/files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newFolderName,
            type: "folder",
            // TODO: Add organizationId and uploadedById from user context
          }),
        })

        if (response.ok) {
          const newFolderData = await response.json()
          // Transform and add to local state
          const newFolder: FileItem = {
            id: newFolderData.id.toString(),
            name: newFolderData.name,
            type: newFolderData.type,
            uploadedBy: {
              name: newFolderData.uploadedBy ? `${newFolderData.uploadedBy.firstName} ${newFolderData.uploadedBy.lastName}` : 'Unknown',
              avatar: '/placeholder-user.jpg'
            },
            uploadedAt: new Date(newFolderData.uploadedAt).toLocaleDateString(),
            lastModified: new Date(newFolderData.lastModified).toLocaleDateString(),
            shared: newFolderData.shared,
            starred: newFolderData.starred,
            permissions: newFolderData.permissions,
            tags: newFolderData.tags || [],
          }
          setFiles([newFolder, ...files])
          setNewFolderName("")
          setIsCreateFolderOpen(false)
        }
      } catch (error) {
        console.error('Failed to create folder:', error)
      }
    }
  }

  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsUploadOpen(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const toggleStar = (fileId: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, starred: !file.starred } : file)))
  }

  const projects = Array.from(new Set(files.filter((f) => f.project).map((f) => f.project)))

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-muted">Loading files...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Files</h1>
          <p className="text-muted mt-1">Manage and organize your project files</p>
        </div>
        <div className="flex items-center space-x-3">
          <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>Enter a name for your new folder.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="folderName">Folder Name</Label>
                <Input
                  id="folderName"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFolder}>Create Folder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary/90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>Select files to upload to your workspace.</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted mx-auto mb-4" />
                  <p className="text-muted mb-2">Drag and drop files here, or click to browse</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Uploading files...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleFileUpload} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HardDrive className="w-5 h-5 mr-2" />
            Storage Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Used: 2.4 GB of 10 GB</span>
            <span className="text-sm font-medium">24%</span>
          </div>
          <Progress value={24} className="h-2" />
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="folder">Folders</SelectItem>
              <SelectItem value="file">Files</SelectItem>
            </SelectContent>
          </Select>
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project} value={project || ""}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Files Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file)
            return (
              <Card key={file.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-card ${getFileTypeColor(file)}`}>
                        <FileIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-medium truncate group-hover:text-secondary transition-colors">
                          {file.name}
                        </CardTitle>
                        {file.size && <CardDescription className="text-xs">{file.size}</CardDescription>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStar(file.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className={`w-4 h-4 ${file.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  {/* Preview */}
                  {file.preview && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  {file.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {file.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {file.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{file.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* File Info */}
                  <div className="space-y-2 text-xs text-muted">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {file.uploadedBy.name.split(" ")[0]}
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.shared && <Users className="w-3 h-3" />}
                        {file.permissions === "view" && <Lock className="w-3 h-3" />}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {file.lastModified}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file)
                return (
                  <div key={file.id} className="flex items-center p-4 hover:bg-card/50 transition-colors group">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg bg-card ${getFileTypeColor(file)}`}>
                        <FileIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate group-hover:text-secondary transition-colors">
                          {file.name}
                        </div>
                        <div className="text-sm text-muted">
                          {file.type === "file" && file.size} • Modified {file.lastModified}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={file.uploadedBy.avatar || "/placeholder.svg"} alt={file.uploadedBy.name} />
                          <AvatarFallback className="text-xs">
                            {file.uploadedBy.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted hidden sm:inline">{file.uploadedBy.name}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {file.shared && <Users className="w-4 h-4 text-muted" />}
                        {file.starred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted text-lg">No files found</div>
          <p className="text-muted text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
