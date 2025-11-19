import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface SearchResult {
  id: number;
  title: string;
  type: 'project' | 'task' | 'user' | 'file';
  description?: string;
  relevanceScore: number;
  lastModified: string;
  metadata?: {
    status?: string;
    priority?: string;
    assignee?: string;
    project?: string;
  };
}

export interface SearchQuery {
  q: string;
  type?: 'all' | 'project' | 'task' | 'user' | 'file';
  limit?: number;
  offset?: number;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  took: number; // milliseconds
}

export const useSearch = (query: SearchQuery, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async (): Promise<SearchResponse> => {
      const params = new URLSearchParams({
        q: query.q,
        ...(query.type && query.type !== 'all' && { type: query.type }),
        ...(query.limit && { limit: query.limit.toString() }),
        ...(query.offset && { offset: query.offset.toString() }),
      });

      const response = await apiClient.get(`/search?${params}`);
      return response.data;
    },
    enabled: enabled && !!query.q,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useSearchSuggestions = (query: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['search', 'suggestions', query],
    queryFn: async (): Promise<string[]> => {
      const response = await apiClient.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
      return response.data;
    },
    enabled: enabled && query.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchHistory = () => {
  return useQuery({
    queryKey: ['search', 'history'],
    queryFn: async (): Promise<string[]> => {
      const response = await apiClient.get('/search/history');
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTrackSearchClick = () => {
  return useMutation({
    mutationFn: async (data: { searchId: string; entityType: string; entityId: number }) => {
      await apiClient.post('/search/analytics/click', data);
    },
  });
};

export const useTrackSearchTime = () => {
  return useMutation({
    mutationFn: async (data: { searchId: string; timeSpent: number }) => {
      await apiClient.post('/search/analytics/time', data);
    },
  });
};