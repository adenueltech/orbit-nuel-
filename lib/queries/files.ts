import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useOrganization } from '@/lib/contexts/organization-context';

export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  fileType?: "document" | "image" | "video" | "audio" | "archive" | "other";
  size?: string;
  uploadedBy: {
    name: string;
    avatar: string;
  };
  uploadedAt: string;
  lastModified: string;
  shared: boolean;
  starred: boolean;
  permissions: "view" | "edit" | "admin";
  project?: string;
  tags: string[];
  preview?: string;
}

export interface CreateFileData {
  name: string;
  type?: string;
  projectId?: number;
  organizationId?: number;
}

export interface UpdateFileData {
  name?: string;
  shared?: boolean;
  starred?: boolean;
  projectId?: number;
}

export interface UploadFileData {
  file: File;
  projectId?: number;
}

export const useFiles = () => {
  const { organizationId } = useOrganization();

  return useQuery({
    queryKey: ['files', organizationId],
    queryFn: async (): Promise<FileItem[]> => {
      const response = await apiClient.get('/files');
      return response.data.map((file: any) => ({
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
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!organizationId,
  });
};

export const useCreateFile = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useOrganization();

  return useMutation({
    mutationFn: async (data: CreateFileData) => {
      const response = await apiClient.post('/files', {
        ...data,
        organizationId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', organizationId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', organizationId] });
    },
  });
};

export const useUpdateFile = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useOrganization();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateFileData }) => {
      const response = await apiClient.patch(`/files/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', organizationId] });
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useOrganization();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/files/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', organizationId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', organizationId] });
    },
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useOrganization();

  return useMutation({
    mutationFn: async (data: UploadFileData) => {
      const formData = new FormData();
      formData.append('file', data.file);
      if (data.projectId) {
        formData.append('projectId', data.projectId.toString());
      }

      const response = await apiClient.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', organizationId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', organizationId] });
    },
  });
};