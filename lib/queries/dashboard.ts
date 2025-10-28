import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useOrganization } from '@/lib/contexts/organization-context';

export interface DashboardStats {
  activeProjects: number;
  teamMembers: number;
  tasksCompleted: number;
  filesShared: number;
}

export interface RecentProject {
  id: string;
  name: string;
  progress: number;
  status: string;
  dueDate: string;
  team: number;
  priority: string;
}

export interface TaskChartData {
  name: string;
  tasks: number;
  completed: number;
}

export interface ProjectStatusData {
  name: string;
  value: number;
  color: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentProjects: RecentProject[];
  taskChartData: TaskChartData[];
  projectStatusData: ProjectStatusData[];
}

export const useDashboardData = () => {
  const { organizationId } = useOrganization();

  return useQuery({
    queryKey: ['dashboard', organizationId],
    queryFn: async (): Promise<DashboardData> => {
      const response = await apiClient.get('/dashboard/overview');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!organizationId,
  });
};