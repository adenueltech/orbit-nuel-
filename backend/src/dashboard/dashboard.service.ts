import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from '../tasks/tasks.service';
import { UsersService } from '../users/users.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  async getOverviewData(organizationId: number) {
    // Get stats
    const activeProjects =
      await this.projectsService.countActive(organizationId);
    const teamMembers =
      await this.usersService.countByOrganization(organizationId);
    const tasksCompleted =
      await this.tasksService.countCompleted(organizationId);
    const filesShared =
      await this.filesService.countByOrganization(organizationId);

    // Get recent projects
    const recentProjectsData = await this.projectsService.findRecent(
      organizationId,
      4,
    );
    const recentProjects = recentProjectsData.map((project) => ({
      id: project.id.toString(),
      name: project.title,
      progress: Math.floor(Math.random() * 100), // TODO: Calculate actual progress
      status: project.status || 'active',
      dueDate: project.dueDate
        ? new Date(project.dueDate).toLocaleDateString()
        : 'TBD',
      team: 3, // TODO: Calculate team size
      priority: 'Medium', // TODO: Add priority field
    }));

    // Get task chart data (last 7 days)
    const taskChartData =
      await this.tasksService.getTaskChartData(organizationId);

    // Get project status distribution
    const projectStatusData =
      await this.projectsService.getStatusDistribution(organizationId);

    return {
      stats: {
        activeProjects,
        teamMembers,
        tasksCompleted,
        filesShared,
      },
      recentProjects,
      taskChartData,
      projectStatusData,
    };
  }
}
