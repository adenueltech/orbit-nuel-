import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useOrganization } from '@/lib/contexts/organization-context';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  comments: number;
  attachments: number;
  tags: string[];
}

export const useTasks = (projectId?: string) => {
  const { organizationId } = useOrganization();

  return useQuery({
    queryKey: ['tasks', organizationId, projectId],
    queryFn: async (): Promise<Task[]> => {
      const url = projectId ? `/tasks?projectId=${projectId}` : '/tasks';
      const response = await apiClient.get(url);
      return response.data.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        assignee: task.assignee ? {
          name: `${task.assignee.firstName} ${task.assignee.lastName}`,
          avatar: '/placeholder-user.jpg' // TODO: Add avatar field to user entity
        } : { name: 'Unassigned', avatar: '/placeholder-user.jpg' },
        dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date',
        comments: 0, // TODO: Add comments system
        attachments: 0, // TODO: Add attachments system
        tags: [], // TODO: Add tags system
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!organizationId,
  });
};