import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private projectsRepository;
    constructor(projectsRepository: Repository<Project>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(organizationId?: number): Promise<Project[]>;
    findOne(id: number): Promise<Project | null>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    countActive(organizationId: number): Promise<number>;
    findRecent(organizationId: number, limit?: number): Promise<Project[]>;
    getStatusDistribution(organizationId: number): Promise<{
        name: any;
        value: number;
        color: string;
    }[]>;
    private getStatusColor;
}
