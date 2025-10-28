import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useOrganization } from '@/lib/contexts/organization-context';

export interface AnalyticsData {
  overviewStats: {
    totalProjects: number;
    activeUsers: number;
    tasksCompleted: number;
    avgCompletionTime: number;
  };
  projectPerformance: Array<{
    name: string;
    completed: number;
    inProgress: number;
    planned: number;
  }>;
  teamProductivity: Array<{
    name: string;
    productivity: number;
    tasks: number;
  }>;
  taskDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  userActivity: Array<{
    name: string;
    active: number;
    total: number;
  }>;
  topPerformers: Array<{
    name: string;
    avatar: string;
    tasksCompleted: number;
    efficiency: number;
    projects: number;
  }>;
  projectHealth: Array<{
    name: string;
    health: number;
    color: string;
  }>;
}

export const useAnalyticsData = (timeRange: string = '30d') => {
  const { organizationId } = useOrganization();

  return useQuery({
    queryKey: ['analytics', organizationId, timeRange],
    queryFn: async (): Promise<AnalyticsData> => {
      const response = await apiClient.get(`/analytics?timeRange=${timeRange}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!organizationId,
  });
};