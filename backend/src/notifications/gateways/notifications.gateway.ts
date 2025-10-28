import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { NotificationsService } from '../notifications.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('NotificationsGateway');

  constructor(
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinNotifications')
  handleJoinNotifications(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`user_${userId}`);
    this.logger.log(`User ${userId} joined notifications room`);
  }

  @SubscribeMessage('leaveNotifications')
  handleLeaveNotifications(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`user_${userId}`);
    this.logger.log(`User ${userId} left notifications room`);
  }

  async sendNotificationToUser(userId: number, notification: any) {
    this.server.to(`user_${userId}`).emit('notification', notification);
  }

  async broadcastNotification(notification: any) {
    this.server.emit('notification', notification);
  }
}