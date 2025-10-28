import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface SettingsData {
  id: number;
  bio?: string;
  location?: string;
  companyWebsite?: string;
  companyIndustry?: string;
  companySize?: string;
  companyDescription?: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  marketingCommunications: boolean;
  twoFactorEnabled: boolean;
  allowTeamInvites: boolean;
  requireAdminApproval: boolean;
  allowExternalSharing: boolean;
  theme: string;
  language: string;
  subscriptionPlan?: string;
  billingStatus: string;
}

export interface UpdateSettingsData {
  bio?: string;
  location?: string;
  companyWebsite?: string;
  companyIndustry?: string;
  companySize?: string;
  companyDescription?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  desktopNotifications?: boolean;
  marketingCommunications?: boolean;
  twoFactorEnabled?: boolean;
  allowTeamInvites?: boolean;
  requireAdminApproval?: boolean;
  allowExternalSharing?: boolean;
  theme?: string;
  language?: string;
  subscriptionPlan?: string;
  billingStatus?: string;
}

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async (): Promise<SettingsData> => {
      const response = await apiClient.get('/settings');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSettingsData) => {
      const response = await apiClient.put('/settings', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch settings
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
};