import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useOrganization } from '@/lib/contexts/organization-context';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  dueDate: string;
  createdAt: string;
  team: any[];
  tasks: { total: number; completed: number };
  color: string;
}

export const useProjects = () => {
  const { organizationId } = useOrganization();

  return useQuery({
    queryKey: ['projects', organizationId],
    queryFn: async (): Promise<Project[]> => {
      const response = await apiClient.get('/projects');
      return response.data.map((project: any) => ({
        id: project.id.toString(),
        name: project.title,
        description: project.description || '',
        status: project.status,
        priority: "Medium", // TODO: Add priority field to project entity
        progress: 50, // TODO: Calculate actual progress from tasks
        dueDate: "TBD", // TODO: Add due date field
        createdAt: new Date(project.createdAt).toLocaleDateString(),
        team: [], // TODO: Add team members
        tasks: { total: project.tasks?.length || 0, completed: 0 }, // TODO: Calculate completed tasks
        color: "bg-blue-500", // TODO: Add color field
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!organizationId,
  });
};