import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
export declare class FilesService {
    private filesRepository;
    private usersService;
    private configService;
    private readonly logger;
    private s3;
    private isProduction;
    constructor(filesRepository: Repository<File>, usersService: UsersService, configService: ConfigService);
    create(createFileDto: CreateFileDto): Promise<File>;
    findAll(organizationId?: number): Promise<File[]>;
    findOne(id: number): Promise<File | null>;
    update(id: number, updateFileDto: UpdateFileDto): Promise<File | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByOrganization(organizationId: number): Promise<File[]>;
    findByProject(projectId: number): Promise<File[]>;
    uploadFile(file: Express.Multer.File, uploadDto: UploadFileDto, userId: number, organizationId: number): Promise<File>;
    private validateFile;
    private generateChecksum;
    private processFile;
    private storeFile;
    private storeProcessedFile;
    private getFileType;
    private scanFile;
    uploadAvatar(file: Express.Multer.File, userId: number): Promise<{
        avatarUrl: string;
    }>;
    countByOrganization(organizationId: number): Promise<number>;
}
