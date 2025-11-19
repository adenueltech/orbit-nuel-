import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from '../tasks/tasks.service';
import { UsersService } from '../users/users.service';
import { FilesService } from '../files/files.service';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { File } from '../files/entities/file.entity';
import { Organization } from '../organizations/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Task, User, File, Organization]),
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    ProjectsService,
    TasksService,
    UsersService,
    FilesService,
  ],
})
export class DashboardModule {}
