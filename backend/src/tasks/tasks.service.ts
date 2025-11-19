import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.tasksRepository.save(task);
  }

  async findAll(organizationId?: number) {
    const where = organizationId ? { organizationId } : {};
    return this.tasksRepository.find({
      where,
      relations: ['assignee', 'organization', 'project'],
    });
  }

  async findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['assignee', 'organization', 'project'],
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, {
      ...updateTaskDto,
      updatedAt: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.tasksRepository.delete(id);
  }

  async countCompleted(organizationId: number) {
    return this.tasksRepository.count({
      where: {
        organizationId,
        status: 'done',
      },
    });
  }

  async getTaskChartData(organizationId: number) {
    // Generate mock data for the last 7 days
    const data: Array<{ name: string; tasks: number; completed: number }> = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      // Mock data - in real app, calculate from actual tasks
      data.push({
        name: dateStr,
        tasks: Math.floor(Math.random() * 10) + 5,
        completed: Math.floor(Math.random() * 8) + 2,
      });
    }

    return data;
  }
}
