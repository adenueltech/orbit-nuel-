import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Request() req: any) {
    const organizationId = req.tenant?.organizationId;
    return this.projectsService.findAll(organizationId);
  }

  @Get('stats/overview')
  async getOverviewStats() {
    const activeProjects = await this.projectsService.countActive(1); // TODO: Get from user context
    return {
      activeProjects,
      // Add more stats as needed
    };
  }

  @Get('recent')
  async getRecentProjects() {
    const projects = await this.projectsService.findAll();
    return projects.slice(0, 4); // Return recent 4 projects
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
