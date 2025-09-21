import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
export declare class FilesService {
    private filesRepository;
    constructor(filesRepository: Repository<File>);
    create(createFileDto: CreateFileDto): Promise<File>;
    findAll(): Promise<File[]>;
    findOne(id: number): Promise<File | null>;
    update(id: number, updateFileDto: UpdateFileDto): Promise<File | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByOrganization(organizationId: number): Promise<File[]>;
    findByProject(projectId: number): Promise<File[]>;
}
