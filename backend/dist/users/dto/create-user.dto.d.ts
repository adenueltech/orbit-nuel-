export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company?: string;
    role?: 'admin' | 'manager' | 'member';
    organizationId?: number;
    phone?: string;
    hireDate?: Date;
}
