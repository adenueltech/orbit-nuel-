import { User } from '../../users/entities/user.entity';
export declare class Organization {
    id: number;
    name: string;
    subdomain: string;
    users: User[];
    createdAt: Date;
}
