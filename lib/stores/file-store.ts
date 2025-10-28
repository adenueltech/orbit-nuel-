import { create } from 'zustand';

interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  projectId?: string;
  tags: string[];
}

interface FileState {
  files: File[];
  isLoading: boolean;
  error: string | null;
  setFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  updateFile: (id: string, updates: Partial<File>) => void;
  deleteFile: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFileStore = create<FileState>((set, get) => ({
  files: [],
  isLoading: false,
  error: null,
  setFiles: (files: File[]) => set({ files }),
  addFile: (file: File) =>
    set((state) => ({ files: [...state.files, file] })),
  updateFile: (id: string, updates: Partial<File>) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, ...updates } : file
      ),
    })),
  deleteFile: (id: string) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));