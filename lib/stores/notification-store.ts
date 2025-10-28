import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  priority: string;
  isRead: boolean;
  relatedEntityId?: number;
  relatedEntityType?: string;
  createdAt: string;
  readAt?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  socket: Socket | null;
  isConnected: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  connectSocket: (userId: number) => void;
  disconnectSocket: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  socket: null,
  isConnected: false,

  fetchNotifications: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const notifications = await response.json();
        const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;
        set({ notifications, unreadCount });
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  },

  markAsRead: async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:3001/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const { notifications } = get();
      const updatedNotifications = notifications.map(n =>
        n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n
      );
      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
      set({ notifications: updatedNotifications, unreadCount });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  },

  markAllAsRead: async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:3001/notifications/read-all', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const { notifications } = get();
      const updatedNotifications = notifications.map(n => ({
        ...n,
        isRead: true,
        readAt: new Date().toISOString()
      }));
      set({ notifications: updatedNotifications, unreadCount: 0 });
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  },

  connectSocket: (userId: number) => {
    const socket = io('http://localhost:3001', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socket.on('connect', () => {
      set({ isConnected: true });
      socket.emit('joinNotifications', userId);
    });

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('notification', (notification: Notification) => {
      const { notifications } = get();
      const updatedNotifications = [notification, ...notifications];
      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
      set({ notifications: updatedNotifications, unreadCount });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },
}));