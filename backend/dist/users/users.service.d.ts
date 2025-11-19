import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(organizationId?: number): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<User | null>;
    countByOrganization(organizationId: number): Promise<number>;
    updateAvatar(id: number, avatarUrl: string): Promise<User | null>;
}
