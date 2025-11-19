import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<{
        organizationId: any;
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        organization: import("../organizations/entities/organization.entity").Organization;
        phone: string;
        hireDate: Date;
        avatar: string;
        department: string;
        status: string;
        projectsCount: number;
        tasksCompleted: number;
        lastActive: Date;
    } | null>;
}
export {};
