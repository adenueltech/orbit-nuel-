import { Project } from '@/lib/queries/projects';

export const transformProjectData = (data: any): Project => {
  return {
    id: data.id.toString(),
    name: data.title,
    description: data.description || '',
    status: data.status,
    priority: "Medium", // TODO: Add priority field to project entity
    progress: 50, // TODO: Calculate actual progress from tasks
    dueDate: "TBD", // TODO: Add due date field
    createdAt: new Date(data.createdAt).toLocaleDateString(),
    team: [], // TODO: Add team members
    tasks: { total: data.tasks?.length || 0, completed: 0 }, // TODO: Calculate completed tasks
    color: "bg-blue-500", // TODO: Add color field
  };
};

export const transformProjectsData = (data: any[]): Project[] => {
  return data.map(transformProjectData);
};

export const calculateProjectProgress = (tasks: any[]) => {
  if (!tasks || tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  return Math.round((completedTasks / tasks.length) * 100);
};

export const getProjectPriority = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'High';
    case 'low': return 'Low';
    default: return 'Medium';
  }
};