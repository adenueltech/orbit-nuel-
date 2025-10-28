"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { default as apiClient } from "@/lib/api-client"

interface SearchResult {
  id: number
  entityType: string
  entityId: number
  title: string
  content: string
  metadata: Record<string, any>
  relevanceScore: number
  highlights?: string[]
}

interface SearchResponse {
  items: SearchResult[]
  total: number
  hasMore: boolean
  query: string
  took: number
}

interface GlobalSearchProps {
  placeholder?: string
  className?: string
}

export function GlobalSearch({ placeholder = "Search projects, tasks, files...", className }: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query)
    } else {
      setSuggestions([])
    }
  }, [query])

  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const response = await apiClient.get(`/search/suggestions?q=${encodeURIComponent(searchQuery)}`)
      setSuggestions(response.data)
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
    }
  }

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await apiClient.get<SearchResponse>(`/search?q=${encodeURIComponent(searchQuery)}`)
      setResults(response.data.items)
      setIsOpen(true)

      // Update search history
      const newHistory = [searchQuery, ...history.filter(h => h !== searchQuery)].slice(0, 10)
      setHistory(newHistory)
      localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex])
      } else {
        performSearch(query)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setSelectedIndex(-1)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    // Track click analytics
    apiClient.post('/search/analytics/click', {
      searchId: result.id,
      entityType: result.entityType,
      entityId: result.entityId,
    }).catch(console.error)

    // Navigate to the appropriate page
    switch (result.entityType) {
      case 'project':
        router.push(`/dashboard/projects/${result.entityId}`)
        break
      case 'task':
        // Navigate to task within project - this might need adjustment based on your routing
        router.push(`/dashboard/projects/${result.metadata?.projectId}?task=${result.entityId}`)
        break
      case 'file':
        router.push(`/dashboard/files?file=${result.entityId}`)
        break
      case 'user':
        router.push(`/dashboard/team?user=${result.entityId}`)
        break
    }

    setIsOpen(false)
    setQuery("")
  }

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'project': return '📁'
      case 'task': return '📋'
      case 'file': return '📄'
      case 'user': return '👤'
      default: return '🔍'
    }
  }

  const getEntityRoute = (entityType: string) => {
    switch (entityType) {
      case 'project': return 'Projects'
      case 'task': return 'Tasks'
      case 'file': return 'Files'
      case 'user': return 'Team'
      default: return 'Search'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              setQuery("")
              setResults([])
              setIsOpen(false)
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full mt-2 w-full max-w-md z-50 shadow-lg">
          <CardContent className="p-0">
            {/* Search History */}
            {!query && history.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Recent Searches</span>
                </div>
                <div className="space-y-2">
                  {history.slice(0, 5).map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-2"
                      onClick={() => {
                        setQuery(item)
                        performSearch(item)
                      }}
                    >
                      <span className="text-sm">{item}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {query && suggestions.length > 0 && results.length === 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Suggestions</span>
                </div>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-2"
                      onClick={() => {
                        setQuery(suggestion)
                        performSearch(suggestion)
                      }}
                    >
                      <span className="text-sm">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {results.length} results for "{query}"
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {results.length} found
                    </Badge>
                  </div>
                </div>
                <div className="divide-y">
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 ${
                        index === selectedIndex ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{getEntityIcon(result.entityType)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{result.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {getEntityRoute(result.entityType)}
                            </Badge>
                          </div>
                          {result.highlights && result.highlights.length > 0 && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {result.highlights[0]}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              Relevance: {Math.round(result.relevanceScore * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            )}

            {/* Empty State */}
            {query && !isLoading && results.length === 0 && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">Try different keywords</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}