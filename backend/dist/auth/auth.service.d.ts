import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
export interface LoginDto {
    email: string;
    password: string;
}
export interface JwtPayload {
    email: string;
    sub: number;
    role: string;
}
export declare class AuthService {
    private usersService;
    private organizationsService;
    private jwtService;
    constructor(usersService: UsersService, organizationsService: OrganizationsService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(createUserDto: any): Promise<import("../users/entities/user.entity").User>;
}
