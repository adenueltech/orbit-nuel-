"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FilesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
const users_service_1 = require("../users/users.service");
const AWS = require("aws-sdk");
const sharp = require("sharp");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const config_1 = require("@nestjs/config");
let FilesService = FilesService_1 = class FilesService {
    filesRepository;
    usersService;
    configService;
    logger = new common_1.Logger(FilesService_1.name);
    s3;
    isProduction;
    constructor(filesRepository, usersService, configService) {
        this.filesRepository = filesRepository;
        this.usersService = usersService;
        this.configService = configService;
        this.isProduction =
            this.configService.get('NODE_ENV') === 'production';
        if (this.isProduction) {
            this.s3 = new AWS.S3({
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
                region: this.configService.get('AWS_REGION'),
            });
        }
    }
    async create(createFileDto) {
        const file = this.filesRepository.create({
            ...createFileDto,
            uploadedAt: new Date(),
            lastModified: new Date(),
        });
        return this.filesRepository.save(file);
    }
    async findAll(organizationId) {
        const where = organizationId ? { organizationId } : {};
        return this.filesRepository.find({
            where,
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
    async findOne(id) {
        return this.filesRepository.findOne({
            where: { id },
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
    async update(id, updateFileDto) {
        await this.filesRepository.update(id, {
            ...updateFileDto,
            lastModified: new Date(),
        });
        return this.findOne(id);
    }
    async remove(id) {
        return this.filesRepository.delete(id);
    }
    async findByOrganization(organizationId) {
        return this.filesRepository.find({
            where: { organizationId },
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
    async findByProject(projectId) {
        return this.filesRepository.find({
            where: { projectId },
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
    async uploadFile(file, uploadDto, userId, organizationId) {
        this.validateFile(file);
        const checksum = await this.generateChecksum(file.buffer);
        const existingFile = await this.filesRepository.findOne({
            where: { checksum, organizationId },
        });
        if (existingFile) {
            throw new common_1.BadRequestException('File already exists');
        }
        const processedFile = await this.processFile(file);
        const storageKey = await this.storeFile(file, organizationId);
        const createFileDto = {
            name: file.originalname,
            size: file.size.toString(),
            mimeType: file.mimetype,
            encoding: file.encoding,
            storageKey,
            checksum,
            thumbnailUrl: processedFile.thumbnailUrl,
            previewUrl: processedFile.previewUrl,
            uploadedById: userId,
            organizationId,
            projectId: uploadDto.projectId,
            fileType: this.getFileType(file.mimetype),
            metadata: processedFile.metadata,
        };
        const savedFile = await this.create(createFileDto);
        this.scanFile(savedFile.id);
        return savedFile;
    }
    validateFile(file) {
        const maxSize = 50 * 1024 * 1024;
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'text/plain',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File size exceeds 50MB limit');
        }
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('File type not allowed');
        }
    }
    async generateChecksum(buffer) {
        return crypto.createHash('sha256').update(buffer).digest('hex');
    }
    async processFile(file) {
        const result = { metadata: {} };
        if (file.mimetype.startsWith('image/')) {
            try {
                const image = sharp(file.buffer);
                const metadata = await image.metadata();
                result.metadata = metadata;
                const thumbnailBuffer = await image
                    .resize(200, 200, { fit: 'cover' })
                    .jpeg({ quality: 80 })
                    .toBuffer();
                result.thumbnailUrl = await this.storeProcessedFile(thumbnailBuffer, 'thumbnail.jpg');
                const previewBuffer = await image
                    .resize(800, 600, { fit: 'inside' })
                    .jpeg({ quality: 85 })
                    .toBuffer();
                result.previewUrl = await this.storeProcessedFile(previewBuffer, 'preview.jpg');
            }
            catch (error) {
                this.logger.error('Error processing image', error);
            }
        }
        return result;
    }
    async storeFile(file, organizationId) {
        const storageKey = `org-${organizationId}/${Date.now()}-${file.originalname}`;
        if (this.isProduction) {
            const bucket = this.configService.get('AWS_S3_BUCKET');
            if (!bucket) {
                throw new common_1.BadRequestException('AWS S3 bucket not configured');
            }
            await this.s3
                .upload({
                Bucket: bucket,
                Key: storageKey,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'private',
            })
                .promise();
        }
        else {
            const uploadDir = path.join(process.cwd(), 'uploads', organizationId.toString());
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, path.basename(storageKey));
            fs.writeFileSync(filePath, file.buffer);
        }
        return storageKey;
    }
    async storeProcessedFile(buffer, filename) {
        const storageKey = `processed/${Date.now()}-${filename}`;
        if (this.isProduction) {
            const bucket = this.configService.get('AWS_S3_BUCKET');
            if (!bucket) {
                throw new common_1.BadRequestException('AWS S3 bucket not configured');
            }
            await this.s3
                .upload({
                Bucket: bucket,
                Key: storageKey,
                Body: buffer,
                ContentType: 'image/jpeg',
                ACL: 'private',
            })
                .promise();
        }
        else {
            const uploadDir = path.join(process.cwd(), 'uploads', 'processed');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, path.basename(storageKey));
            fs.writeFileSync(filePath, buffer);
        }
        return storageKey;
    }
    getFileType(mimeType) {
        if (mimeType.startsWith('image/'))
            return 'image';
        if (mimeType === 'application/pdf')
            return 'document';
        if (mimeType.startsWith('video/'))
            return 'video';
        if (mimeType.startsWith('audio/'))
            return 'audio';
        if (mimeType.includes('zip') || mimeType.includes('rar'))
            return 'archive';
        return 'other';
    }
    async scanFile(fileId) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await this.filesRepository.update(fileId, {
                isScanned: true,
                scanResult: 'clean',
            });
        }
        catch (error) {
            await this.filesRepository.update(fileId, {
                isScanned: true,
                scanResult: 'failed',
            });
        }
    }
    async uploadAvatar(file, userId) {
        if (!file.mimetype.startsWith('image/')) {
            throw new common_1.BadRequestException('Only image files are allowed');
        }
        if (file.size > 1024 * 1024) {
            throw new common_1.BadRequestException('File size must be less than 1MB');
        }
        const processedBuffer = await sharp(file.buffer)
            .resize(200, 200, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();
        const storageKey = `avatars/${userId}-${Date.now()}.jpg`;
        if (this.isProduction) {
            const bucket = this.configService.get('AWS_S3_BUCKET');
            if (!bucket) {
                throw new common_1.BadRequestException('AWS S3 bucket not configured');
            }
            await this.s3
                .upload({
                Bucket: bucket,
                Key: storageKey,
                Body: processedBuffer,
                ContentType: 'image/jpeg',
                ACL: 'public-read',
            })
                .promise();
        }
        else {
            const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, path.basename(storageKey));
            fs.writeFileSync(filePath, processedBuffer);
        }
        const avatarUrl = this.isProduction
            ? `https://${this.configService.get('AWS_S3_BUCKET')}.s3.amazonaws.com/${storageKey}`
            : `/uploads/avatars/${path.basename(storageKey)}`;
        await this.usersService.updateAvatar(userId, avatarUrl);
        return { avatarUrl };
    }
    async countByOrganization(organizationId) {
        return this.filesRepository.count({
            where: { organizationId },
        });
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = FilesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        config_1.ConfigService])
], FilesService);
//# sourceMappingURL=files.service.js.map