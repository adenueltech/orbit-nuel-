import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { UploadFileDto } from './dto/upload-file.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(createFileDto: CreateFileDto): Promise<import("./entities/file.entity").File>;
    findAll(req: any): Promise<import("./entities/file.entity").File[]>;
    findByOrganization(organizationId: string): Promise<import("./entities/file.entity").File[]>;
    findByProject(projectId: string): Promise<import("./entities/file.entity").File[]>;
    findOne(id: string): Promise<import("./entities/file.entity").File | null>;
    update(id: string, updateFileDto: UpdateFileDto): Promise<import("./entities/file.entity").File | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    uploadFile(file: Express.Multer.File, uploadDto: UploadFileDto, req: any): Promise<import("./entities/file.entity").File>;
    uploadAvatar(file: Express.Multer.File, req: any): Promise<{
        avatarUrl: string;
    }>;
}
