import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useOrganization } from '@/lib/contexts/organization-context';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
  status: string;
  joinDate: string;
  location: string;
  phone: string;
  projects: number;
  tasksCompleted: number;
  lastActive: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  department?: string;
}

export const useTeamMembers = () => {
  const { organizationId } = useOrganization();

  return useQuery({
    queryKey: ['team-members', organizationId],
    queryFn: async (): Promise<TeamMember[]> => {
      const response = await apiClient.get('/users');
      return response.data.map((user: any) => ({
        id: user.id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role || 'Member',
        department: 'Engineering', // TODO: Add department field to user entity
        avatar: '/placeholder-user.jpg', // TODO: Add avatar field to user entity
        status: 'Active', // TODO: Add status field to user entity
        joinDate: user.hireDate ? new Date(user.hireDate).toLocaleDateString() : 'Unknown',
        location: 'Unknown', // TODO: Add location field to user entity
        phone: user.phone || 'Not provided',
        projects: 0, // TODO: Calculate from projects
        tasksCompleted: 0, // TODO: Calculate from tasks
        lastActive: 'Recently', // TODO: Add last active field
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!organizationId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await apiClient.put('/users/profile', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
};