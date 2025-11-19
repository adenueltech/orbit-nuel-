import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(organizationId?: number): Promise<Task[]>;
    findOne(id: number): Promise<Task | null>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    countCompleted(organizationId: number): Promise<number>;
    getTaskChartData(organizationId: number): Promise<{
        name: string;
        tasks: number;
        completed: number;
    }[]>;
}
