import { IsEmail, IsString, IsEnum, IsOptional, IsDate, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsEnum(['admin', 'manager', 'member'])
  @IsOptional()
  role?: 'admin' | 'manager' | 'member';

  @IsOptional()
  organizationId?: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDate()
  @IsOptional()
  hireDate?: Date;
}
