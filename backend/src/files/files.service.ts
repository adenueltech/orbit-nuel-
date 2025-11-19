import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { UsersService } from '../users/users.service';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  private s3: AWS.S3;
  private isProduction: boolean;

  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    this.isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    if (this.isProduction) {
      this.s3 = new AWS.S3({
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
        region: this.configService.get<string>('AWS_REGION'),
      });
    }
  }

  async create(createFileDto: CreateFileDto) {
    const file = this.filesRepository.create({
      ...createFileDto,
      uploadedAt: new Date(),
      lastModified: new Date(),
    });
    return this.filesRepository.save(file);
  }

  async findAll(organizationId?: number) {
    const where = organizationId ? { organizationId } : {};
    return this.filesRepository.find({
      where,
      relations: ['uploadedBy', 'organization', 'project'],
    });
  }

  async findOne(id: number) {
    return this.filesRepository.findOne({
      where: { id },
      relations: ['uploadedBy', 'organization', 'project'],
    });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    await this.filesRepository.update(id, {
      ...updateFileDto,
      lastModified: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.filesRepository.delete(id);
  }

  async findByOrganization(organizationId: number) {
    return this.filesRepository.find({
      where: { organizationId },
      relations: ['uploadedBy', 'organization', 'project'],
    });
  }

  async findByProject(projectId: number) {
    return this.filesRepository.find({
      where: { projectId },
      relations: ['uploadedBy', 'organization', 'project'],
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    uploadDto: UploadFileDto,
    userId: number,
    organizationId: number,
  ): Promise<File> {
    // Validate file
    this.validateFile(file);

    // Generate checksum
    const checksum = await this.generateChecksum(file.buffer);

    // Check for duplicate
    const existingFile = await this.filesRepository.findOne({
      where: { checksum, organizationId },
    });
    if (existingFile) {
      throw new BadRequestException('File already exists');
    }

    // Process file (generate thumbnail, preview)
    const processedFile = await this.processFile(file);

    // Store file
    const storageKey = await this.storeFile(file, organizationId);

    // Create file record
    const createFileDto: CreateFileDto = {
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

    // Trigger virus scan (async)
    this.scanFile(savedFile.id);

    return savedFile;
  }

  private validateFile(file: Express.Multer.File): void {
    const maxSize = 50 * 1024 * 1024; // 50MB
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
      throw new BadRequestException('File size exceeds 50MB limit');
    }

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed');
    }
  }

  private async generateChecksum(buffer: Buffer): Promise<string> {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  private async processFile(file: Express.Multer.File): Promise<{
    thumbnailUrl?: string;
    previewUrl?: string;
    metadata: object;
  }> {
    const result: {
      thumbnailUrl?: string;
      previewUrl?: string;
      metadata: object;
    } = { metadata: {} };

    if (file.mimetype.startsWith('image/')) {
      try {
        const image = sharp(file.buffer);
        const metadata = await image.metadata();
        result.metadata = metadata;

        // Generate thumbnail
        const thumbnailBuffer = await image
          .resize(200, 200, { fit: 'cover' })
          .jpeg({ quality: 80 })
          .toBuffer();

        result.thumbnailUrl = await this.storeProcessedFile(
          thumbnailBuffer,
          'thumbnail.jpg',
        );

        // Generate preview
        const previewBuffer = await image
          .resize(800, 600, { fit: 'inside' })
          .jpeg({ quality: 85 })
          .toBuffer();

        result.previewUrl = await this.storeProcessedFile(
          previewBuffer,
          'preview.jpg',
        );
      } catch (error) {
        this.logger.error('Error processing image', error);
      }
    }

    return result;
  }

  private async storeFile(
    file: Express.Multer.File,
    organizationId: number,
  ): Promise<string> {
    const storageKey = `org-${organizationId}/${Date.now()}-${file.originalname}`;

    if (this.isProduction) {
      const bucket = this.configService.get<string>('AWS_S3_BUCKET');
      if (!bucket) {
        throw new BadRequestException('AWS S3 bucket not configured');
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
    } else {
      // Local storage fallback
      const uploadDir = path.join(
        process.cwd(),
        'uploads',
        organizationId.toString(),
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, path.basename(storageKey));
      fs.writeFileSync(filePath, file.buffer);
    }

    return storageKey;
  }

  private async storeProcessedFile(
    buffer: Buffer,
    filename: string,
  ): Promise<string> {
    const storageKey = `processed/${Date.now()}-${filename}`;

    if (this.isProduction) {
      const bucket = this.configService.get<string>('AWS_S3_BUCKET');
      if (!bucket) {
        throw new BadRequestException('AWS S3 bucket not configured');
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
    } else {
      const uploadDir = path.join(process.cwd(), 'uploads', 'processed');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, path.basename(storageKey));
      fs.writeFileSync(filePath, buffer);
    }

    return storageKey;
  }

  private getFileType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'document';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return 'archive';
    return 'other';
  }

  private async scanFile(fileId: number): Promise<void> {
    // Placeholder for virus scanning logic
    // In a real implementation, integrate with antivirus service
    try {
      // Simulate scan
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await this.filesRepository.update(fileId, {
        isScanned: true,
        scanResult: 'clean',
      });
    } catch (error) {
      await this.filesRepository.update(fileId, {
        isScanned: true,
        scanResult: 'failed',
      });
    }
  }

  async uploadAvatar(
    file: Express.Multer.File,
    userId: number,
  ): Promise<{ avatarUrl: string }> {
    // Validate file
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    if (file.size > 1024 * 1024) {
      // 1MB
      throw new BadRequestException('File size must be less than 1MB');
    }

    // Process avatar (resize to 200x200)
    const processedBuffer = await sharp(file.buffer)
      .resize(200, 200, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Store avatar
    const storageKey = `avatars/${userId}-${Date.now()}.jpg`;

    if (this.isProduction) {
      const bucket = this.configService.get<string>('AWS_S3_BUCKET');
      if (!bucket) {
        throw new BadRequestException('AWS S3 bucket not configured');
      }
      await this.s3
        .upload({
          Bucket: bucket,
          Key: storageKey,
          Body: processedBuffer,
          ContentType: 'image/jpeg',
          ACL: 'public-read', // Avatars should be public
        })
        .promise();
    } else {
      // Local storage fallback
      const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, path.basename(storageKey));
      fs.writeFileSync(filePath, processedBuffer);
    }

    // Update user avatar
    const avatarUrl = this.isProduction
      ? `https://${this.configService.get<string>('AWS_S3_BUCKET')}.s3.amazonaws.com/${storageKey}`
      : `/uploads/avatars/${path.basename(storageKey)}`;

    await this.usersService.updateAvatar(userId, avatarUrl);

    return { avatarUrl };
  }

  async countByOrganization(organizationId: number) {
    return this.filesRepository.count({
      where: { organizationId },
    });
  }
}
