import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Not } from 'typeorm/find-options/operator/Not';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.projectsRepository.save(project);
  }

  async findAll() {
    return this.projectsRepository.find({ relations: ['owner', 'organization', 'tasks'] });
  }

  async findOne(id: number) {
    return this.projectsRepository.findOne({ where: { id }, relations: ['owner', 'organization', 'tasks'] });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.projectsRepository.update(id, { ...updateProjectDto, updatedAt: new Date() });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.projectsRepository.delete(id);
  }

  async countActive(organizationId: number) {
    return this.projectsRepository.count({
      where: {
        organizationId,
        status: Not('completed')
      }
    });
  }
}
