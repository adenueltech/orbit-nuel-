import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationChannel } from '../entities/notification-preference.entity';

export class UpdateNotificationPreferenceDto {
  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @IsOptional()
  @IsString()
  notificationType?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  frequency?: string;
}