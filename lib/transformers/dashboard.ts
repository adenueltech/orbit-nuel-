import { DashboardData } from '@/lib/queries/dashboard';

export const transformDashboardData = (data: any): DashboardData => {
  return {
    stats: {
      activeProjects: data.stats?.activeProjects || 0,
      teamMembers: data.stats?.teamMembers || 0,
      tasksCompleted: data.stats?.tasksCompleted || 0,
      filesShared: data.stats?.filesShared || 0,
    },
    recentProjects: data.recentProjects || [],
    taskChartData: data.taskChartData || [],
    projectStatusData: data.projectStatusData || [],
  };
};

export const calculateProjectProgress = (tasks: any[]) => {
  if (!tasks || tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  return Math.round((completedTasks / tasks.length) * 100);
};

export const getProjectStatus = (progress: number, dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (progress === 100) return 'Completed';
  if (daysLeft < 0) return 'Overdue';
  if (daysLeft <= 7) return 'At Risk';
  return 'On Track';
};