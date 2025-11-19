import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsEnum(['folder', 'file'])
  @IsOptional()
  type?: string = 'file';

  @IsEnum(['document', 'image', 'video', 'audio', 'archive', 'other'])
  @IsOptional()
  fileType?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsNumber()
  uploadedById: number;

  @IsNumber()
  organizationId: number;

  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsBoolean()
  @IsOptional()
  shared?: boolean = false;

  @IsBoolean()
  @IsOptional()
  starred?: boolean = false;

  @IsEnum(['view', 'edit', 'admin'])
  @IsOptional()
  permissions?: string = 'view';

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[] = [];

  @IsString()
  @IsOptional()
  preview?: string;

  @IsString()
  @IsOptional()
  storageKey?: string;

  @IsString()
  @IsOptional()
  checksum?: string;

  @IsString()
  @IsOptional()
  mimeType?: string;

  @IsString()
  @IsOptional()
  encoding?: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsString()
  @IsOptional()
  previewUrl?: string;

  @IsBoolean()
  @IsOptional()
  isScanned?: boolean = false;

  @IsEnum(['clean', 'infected', 'pending', 'failed'])
  @IsOptional()
  scanResult?: string;

  @IsOptional()
  metadata?: object;

  @IsNumber()
  @IsOptional()
  version?: number = 1;
}
