import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
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
  organizationId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private organizationsService: OrganizationsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // User doesn't exist - return specific error for frontend
      throw new Error('USER_NOT_FOUND');
    }
    if (await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    // Password is wrong
    throw new Error('INVALID_PASSWORD');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role, organizationId: user.organizationId };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(createUserDto: any) {
    if (createUserDto.company) {
      // Create organization first
      const createOrgDto = {
        name: createUserDto.company,
        subdomain: createUserDto.email.split('@')[1].split('.').slice(0,2).join('') + Math.random().toString(36).substring(7),
      };
      const organization = await this.organizationsService.create(createOrgDto);
      createUserDto.organizationId = organization.id;
    }
    return this.usersService.create(createUserDto);
  }
}
