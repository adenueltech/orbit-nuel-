import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UploadFileDto {
  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsString()
  @IsOptional()
  folder?: string;
}
