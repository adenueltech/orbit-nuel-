import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType, NotificationPriority } from './entities/notification.entity';
import { NotificationPreference, NotificationChannel } from './entities/notification-preference.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsGateway } from './gateways/notifications.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationPreference)
    private preferenceRepository: Repository<NotificationPreference>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      priority: createNotificationDto.priority || NotificationPriority.MEDIUM,
    });

    const savedNotification = await this.notificationRepository.save(notification);

    // Send real-time notification via WebSocket
    await this.notificationsGateway.sendNotificationToUser(
      createNotificationDto.userId,
      savedNotification,
    );

    this.logger.log(`Notification created and sent to user ${createNotificationDto.userId}`);
    return savedNotification;
  }

  async findAllForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findUnreadForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId, isRead: false },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number, userId: number): Promise<void> {
    await this.notificationRepository.update(
      { id, userId },
      { isRead: true, readAt: new Date() },
    );
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() },
    );
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.notificationRepository.delete({ id, userId });
  }

  async getUserPreferences(userId: number): Promise<NotificationPreference[]> {
    return this.preferenceRepository.find({
      where: { userId },
    });
  }

  async updatePreference(
    userId: number,
    channel: NotificationChannel,
    notificationType: string,
    enabled: boolean,
    frequency?: string,
  ): Promise<NotificationPreference> {
    let preference = await this.preferenceRepository.findOne({
      where: { userId, channel, notificationType },
    });

    if (preference) {
      preference.enabled = enabled;
      if (frequency) preference.frequency = frequency;
    } else {
      preference = this.preferenceRepository.create({
        userId,
        channel,
        notificationType,
        enabled,
        frequency,
      });
    }

    return this.preferenceRepository.save(preference);
  }

  async shouldSendNotification(
    userId: number,
    type: NotificationType,
    channel: NotificationChannel,
  ): Promise<boolean> {
    const preference = await this.preferenceRepository.findOne({
      where: { userId, channel, notificationType: type },
    });

    return preference ? preference.enabled : true; // Default to enabled if no preference set
  }

  // Database cleanup: Delete notifications older than 30 days
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupOldNotifications() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.notificationRepository.delete({
      createdAt: { $lt: thirtyDaysAgo } as any,
    });

    this.logger.log(`Cleaned up ${result.affected} old notifications`);
  }
}