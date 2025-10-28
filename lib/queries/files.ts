import { useQuery } from '@tanstack/react-query';
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