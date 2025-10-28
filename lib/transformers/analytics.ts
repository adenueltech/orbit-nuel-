import { AnalyticsData } from '@/lib/queries/analytics';

export const transformAnalyticsData = (data: any): AnalyticsData => {
  return {
    overviewStats: {
      totalProjects: data.overviewStats?.totalProjects || 0,
      activeUsers: data.overviewStats?.activeUsers || 0,
      tasksCompleted: data.overviewStats?.tasksCompleted || 0,
      avgCompletionTime: data.overviewStats?.avgCompletionTime || 0,
    },
    projectPerformance: data.projectPerformance || [],
    teamProductivity: data.teamProductivity || [],
    taskDistribution: data.taskDistribution || [],
    userActivity: data.userActivity || [],
    topPerformers: data.topPerformers || [],
    projectHealth: data.projectHealth || [],
  };
};

export const calculateChange = (current: number, previous: number) => {
  if (previous === 0) return { change: "+0%", trend: "up" };
  const change = ((current - previous) / previous) * 100;
  return {
    change: `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`,
    trend: change >= 0 ? "up" : "down"
  };
};