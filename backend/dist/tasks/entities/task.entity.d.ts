import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Project } from '../../projects/entities/project.entity';
export declare class Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: User;
    assigneeId: number;
    organization: Organization;
    organizationId: number;
    project: Project;
    projectId: number;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
