import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface Organization {
  id: number;
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
  memberCount?: number;
  projectCount?: number;
}

export interface CreateOrganizationData {
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface UpdateOrganizationData {
  name?: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: async (): Promise<Organization[]> => {
      const response = await apiClient.get('/organizations');
      return response.data.map((org: any) => ({
        id: org.id,
        name: org.name,
        description: org.description,
        website: org.website,
        industry: org.industry,
        size: org.size,
        logo: org.logo,
        address: org.address,
        phone: org.phone,
        email: org.email,
        createdAt: new Date(org.createdAt).toLocaleDateString(),
        updatedAt: new Date(org.updatedAt).toLocaleDateString(),
        memberCount: org.memberCount || 0,
        projectCount: org.projectCount || 0,
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOrganization = (id: number) => {
  return useQuery({
    queryKey: ['organizations', id],
    queryFn: async (): Promise<Organization> => {
      const response = await apiClient.get(`/organizations/${id}`);
      const org = response.data;
      return {
        id: org.id,
        name: org.name,
        description: org.description,
        website: org.website,
        industry: org.industry,
        size: org.size,
        logo: org.logo,
        address: org.address,
        phone: org.phone,
        email: org.email,
        createdAt: new Date(org.createdAt).toLocaleDateString(),
        updatedAt: new Date(org.updatedAt).toLocaleDateString(),
        memberCount: org.memberCount || 0,
        projectCount: org.projectCount || 0,
      };
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOrganizationData) => {
      const response = await apiClient.post('/organizations', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateOrganizationData }) => {
      const response = await apiClient.patch(`/organizations/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/organizations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};