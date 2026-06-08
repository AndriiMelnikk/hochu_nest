import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { getSocketIoCorsOptions } from '../../../config/cors.origins';

@WebSocketGateway({
  cors: getSocketIoCorsOptions(),
  namespace: '/notifications',
})
@Injectable()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);
  private connectedUsers = new Map<string, string>();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token =
        typeof client.handshake.auth?.token === 'string' ? client.handshake.auth.token : undefined;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload: { sub: string } = this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.secret'),
      });

      const userId: string = payload.sub;
      this.connectedUsers.set(userId, client.id);
      (client.data as { userId?: string }).userId = userId;

      this.logger.log(`Notifications client connected: ${client.id} (User: ${userId})`);
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? ((error as Record<string, unknown>).message as string)
          : 'Unknown error';
      this.logger.error(`Notifications connection error: ${message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = (client.data as { userId?: string }).userId;
    if (userId) {
      this.connectedUsers.delete(userId);
      this.logger.log(`Notifications client disconnected: ${client.id} (User: ${userId})`);
    }
  }

  isAccountOnline(accountId: string): boolean {
    return this.connectedUsers.has(accountId);
  }

  emitToAccount(accountId: string, event: string, payload: unknown): void {
    const socketId = this.connectedUsers.get(accountId);
    if (socketId) {
      this.server.to(socketId).emit(event, payload);
    }
  }
}
