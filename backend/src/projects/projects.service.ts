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

  async findAll(organizationId?: number) {
    const where = organizationId ? { organizationId } : {};
    return this.projectsRepository.find({
      where,
      relations: ['owner', 'organization', 'tasks'],
    });
  }

  async findOne(id: number) {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['owner', 'organization', 'tasks'],
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.projectsRepository.update(id, {
      ...updateProjectDto,
      updatedAt: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.projectsRepository.delete(id);
  }

  async countActive(organizationId: number) {
    return this.projectsRepository.count({
      where: {
        organizationId,
        status: Not('completed'),
      },
    });
  }

  async findRecent(organizationId: number, limit: number = 4) {
    return this.projectsRepository.find({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['owner'],
    });
  }

  async getStatusDistribution(organizationId: number) {
    const result = await this.projectsRepository
      .createQueryBuilder('project')
      .select('project.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('project.organizationId = :organizationId', { organizationId })
      .groupBy('project.status')
      .getRawMany();

    const total = result.reduce((sum, item) => sum + parseInt(item.count), 0);

    return result.map((item) => ({
      name: item.status || 'Unknown',
      value: Math.round((parseInt(item.count) / total) * 100),
      color: this.getStatusColor(item.status),
    }));
  }

  private getStatusColor(status: string): string {
    const colors = {
      active: '#10b981',
      planning: '#f59e0b',
      completed: '#6b7280',
      'on-hold': '#ef4444',
    };
    return colors[status] || '#6b7280';
  }
}
