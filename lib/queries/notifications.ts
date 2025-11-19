import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'task_assigned' | 'task_completed' | 'project_updated' | 'mention' | 'deadline' | 'general';
  isRead: boolean;
  createdAt: string;
  relatedEntity?: {
    type: 'task' | 'project' | 'user';
    id: number;
    name: string;
  };
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  desktop: boolean;
  taskAssigned: boolean;
  taskCompleted: boolean;
  projectUpdated: boolean;
  mentions: boolean;
  deadlines: boolean;
}

export interface UpdateNotificationPreferences {
  channel: 'email' | 'push' | 'desktop';
  notificationType: 'task_assigned' | 'task_completed' | 'project_updated' | 'mention' | 'deadline' | 'general';
  enabled: boolean;
  frequency?: 'immediate' | 'daily' | 'weekly';
}

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<NotificationItem[]> => {
      const response = await apiClient.get('/notifications');
      return response.data.map((notification: any) => ({
        id: notification.id,
        title: notification.title || 'Notification',
        message: notification.message,
        type: notification.type || 'general',
        isRead: notification.isRead || false,
        createdAt: new Date(notification.createdAt).toLocaleString(),
        relatedEntity: notification.relatedEntity,
      }));
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: async (): Promise<NotificationItem[]> => {
      const response = await apiClient.get('/notifications/unread');
      return response.data.map((notification: any) => ({
        id: notification.id,
        title: notification.title || 'Notification',
        message: notification.message,
        type: notification.type || 'general',
        isRead: false,
        createdAt: new Date(notification.createdAt).toLocaleString(),
        relatedEntity: notification.relatedEntity,
      }));
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
};

export const useNotificationPreferences = () => {
  return useQuery({
    queryKey: ['notification-preferences'],
    queryFn: async (): Promise<NotificationPreferences> => {
      const response = await apiClient.get('/notifications/preferences');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.put(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.put('/notifications/read-all');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] });
    },
  });
};

export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateNotificationPreferences) => {
      const response = await apiClient.put('/notifications/preferences', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-preferences'] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/notifications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] });
    },
  });
};