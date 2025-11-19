import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationPreferenceDto } from './dto/update-notification-preference.dto';
import { NotificationChannel } from './entities/notification-preference.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Define a proper interface for the authenticated request
interface AuthenticatedRequest {
  user: {
    userId: number;
  };
}

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAllForUser(@Request() req: AuthenticatedRequest) {
    return this.notificationsService.findAllForUser(req.user.userId);
  }

  @Get('unread')
  findUnreadForUser(@Request() req: AuthenticatedRequest) {
    return this.notificationsService.findUnreadForUser(req.user.userId);
  }

  @Put(':id/read')
  markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.markAsRead(id, req.user.userId);
  }

  @Put('read-all')
  markAllAsRead(@Request() req: AuthenticatedRequest) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.delete(id, req.user.userId);
  }

  // Notification Preferences
  @Get('preferences')
  getUserPreferences(@Request() req: AuthenticatedRequest) {
    return this.notificationsService.getUserPreferences(req.user.userId);
  }

  @Put('preferences')
  updatePreference(
    @Body() updatePreferenceDto: UpdateNotificationPreferenceDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.updatePreference(
      req.user.userId,
      updatePreferenceDto.channel || NotificationChannel.EMAIL,
      updatePreferenceDto.notificationType || 'general',
      updatePreferenceDto.enabled || false,
      updatePreferenceDto.frequency,
    );
  }
}
