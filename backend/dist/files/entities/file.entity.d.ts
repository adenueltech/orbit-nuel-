import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Project } from '../../projects/entities/project.entity';
export declare class File {
    id: number;
    name: string;
    type: string;
    fileType: string;
    size: string;
    uploadedBy: User;
    uploadedById: number;
    uploadedAt: Date;
    lastModified: Date;
    shared: boolean;
    starred: boolean;
    permissions: string;
    project: Project;
    projectId: number;
    organization: Organization;
    organizationId: number;
    tags: string[];
    preview: string;
    createdAt: Date;
    updatedAt: Date;
}
