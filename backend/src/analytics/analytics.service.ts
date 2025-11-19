import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  getAnalyticsData(_organizationId: number, _timeRange: string) {
    // Mock analytics data - in production, this would aggregate from actual data
    // Note: organizationId and timeRange parameters are kept for future implementation
    return {
      overviewStats: {
        totalProjects: 24,
        activeUsers: 156,
        tasksCompleted: 1247,
        avgCompletionTime: 3.2,
      },
      projectPerformance: [
        { name: 'Web App Redesign', completed: 85, inProgress: 12, planned: 3 },
        { name: 'Mobile App', completed: 67, inProgress: 25, planned: 8 },
        { name: 'API Development', completed: 92, inProgress: 5, planned: 3 },
        {
          name: 'Database Migration',
          completed: 45,
          inProgress: 35,
          planned: 20,
        },
      ],
      teamProductivity: [
        { name: 'Sarah Johnson', productivity: 95, tasks: 28 },
        { name: 'Mike Chen', productivity: 88, tasks: 24 },
        { name: 'Emma Davis', productivity: 92, tasks: 26 },
        { name: 'Alex Rodriguez', productivity: 85, tasks: 22 },
      ],
      taskDistribution: [
        { name: 'To Do', value: 25, color: '#ef4444' },
        { name: 'In Progress', value: 35, color: '#f59e0b' },
        { name: 'Review', value: 20, color: '#3b82f6' },
        { name: 'Done', value: 20, color: '#10b981' },
      ],
      userActivity: [
        { name: 'Mon', active: 45, total: 52 },
        { name: 'Tue', active: 52, total: 58 },
        { name: 'Wed', active: 48, total: 55 },
        { name: 'Thu', active: 61, total: 65 },
        { name: 'Fri', active: 55, total: 62 },
        { name: 'Sat', active: 28, total: 35 },
        { name: 'Sun', active: 22, total: 28 },
      ],
      topPerformers: [
        {
          name: 'Sarah Johnson',
          avatar: '/placeholder-user.jpg',
          tasksCompleted: 28,
          efficiency: 95,
          projects: 4,
        },
        {
          name: 'Mike Chen',
          avatar: '/placeholder-user.jpg',
          tasksCompleted: 24,
          efficiency: 88,
          projects: 3,
        },
        {
          name: 'Emma Davis',
          avatar: '/placeholder-user.jpg',
          tasksCompleted: 26,
          efficiency: 92,
          projects: 5,
        },
      ],
      projectHealth: [
        { name: 'On Track', health: 65, color: '#10b981' },
        { name: 'At Risk', health: 25, color: '#f59e0b' },
        { name: 'Behind', health: 10, color: '#ef4444' },
      ],
    };
  }
}
