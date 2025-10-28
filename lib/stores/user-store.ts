import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  department?: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setCurrentUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  setUsers: (users: User[]) => set({ users }),
  addUser: (user: User) =>
    set((state) => ({ users: [...state.users, user] })),
  updateUser: (id: string, updates: Partial<User>) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
    })),
  deleteUser: (id: string) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));