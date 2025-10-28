import { Task } from '@/lib/queries/tasks';

export const transformTaskData = (data: any): Task => {
  return {
    id: data.id.toString(),
    title: data.title,
    description: data.description || '',
    status: data.status,
    priority: data.priority,
    assignee: data.assignee ? {
      name: `${data.assignee.firstName} ${data.assignee.lastName}`,
      avatar: '/placeholder-user.jpg' // TODO: Add avatar field to user entity
    } : { name: 'Unassigned', avatar: '/placeholder-user.jpg' },
    dueDate: data.dueDate ? new Date(data.dueDate).toLocaleDateString() : 'No due date',
    comments: 0, // TODO: Add comments system
    attachments: 0, // TODO: Add attachments system
    tags: [], // TODO: Add tags system
  };
};

export const transformTasksData = (data: any[]): Task[] => {
  return data.map(transformTaskData);
};

export const getTaskStatusColor = (status: string) => {
  switch (status) {
    case 'todo': return 'bg-gray-100 text-gray-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'review': return 'bg-yellow-100 text-yellow-800';
    case 'done': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getTaskPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};