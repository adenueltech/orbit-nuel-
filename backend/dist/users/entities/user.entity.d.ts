import { Organization } from '../../organizations/entities/organization.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    organization: Organization;
    phone: string;
    hireDate: Date;
    avatar: string;
    department: string;
    status: string;
    projectsCount: number;
    tasksCompleted: number;
    lastActive: Date;
}
