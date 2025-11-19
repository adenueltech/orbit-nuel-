import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Task } from '../../tasks/entities/task.entity';
export declare class Project {
    id: number;
    title: string;
    description: string;
    status: string;
    owner: User;
    ownerId: number;
    organization: Organization;
    organizationId: number;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
    priority: string;
    progress: number;
    dueDate: Date;
    teamMembers: number[];
    color: string;
}
