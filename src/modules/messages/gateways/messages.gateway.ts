import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { MessagesService } from '../messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/messages',
})
@Injectable()
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagesGateway.name);
  private connectedUsers = new Map<string, string>(); // userId -> socketId

  constructor(
    private messagesService: MessagesService,
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

      this.logger.log(`Client connected: ${client.id} (User: ${userId})`);

      // Notify others that user is online
      client.broadcast.emit('user:online', { userId });
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? ((error as Record<string, unknown>).message as string)
          : 'Unknown error';
      this.logger.error(`Connection error: ${message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = (client.data as { userId?: string }).userId;
    if (userId) {
      this.connectedUsers.delete(userId);
      this.logger.log(`Client disconnected: ${client.id} (User: ${userId})`);

      // Notify others that user is offline
      client.broadcast.emit('user:offline', { userId });
    }
  }

  @SubscribeMessage('message:send')
  async handleMessage(@MessageBody() data: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const senderId = (client.data as { userId?: string }).userId;
    if (!senderId) {
      throw new UnauthorizedException('Not authenticated');
    }

    const message = await this.messagesService.create(data, senderId);

    // Send to receiver if online
    const receiverSocketId = this.connectedUsers.get(data.receiverId);
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('message:new', message);
    }

    // Also send confirmation to sender
    client.emit('message:sent', message);

    return message;
  }

  @SubscribeMessage('message:read')
  async handleReadMessage(
    @MessageBody() data: { messageId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = (client.data as { userId?: string }).userId as string;
    if (!userId) {
      throw new UnauthorizedException('Not authenticated');
    }

    await this.messagesService.markAsRead(data.messageId, userId);

    // Notify sender that message was read
    client.broadcast.emit('message:read', {
      messageId: data.messageId,
      readBy: userId,
    });
  }

  @SubscribeMessage('typing:start')
  handleTypingStart(
    @MessageBody() data: { receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = (client.data as { userId?: string }).userId as string;
    const receiverSocketId = this.connectedUsers.get(data.receiverId);

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('typing', {
        userId: senderId,
        isTyping: true,
      });
    }
  }

  @SubscribeMessage('typing:stop')
  handleTypingStop(@MessageBody() data: { receiverId: string }, @ConnectedSocket() client: Socket) {
    const senderId = (client.data as { userId?: string }).userId as string;
    const receiverSocketId = this.connectedUsers.get(data.receiverId);

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('typing', {
        userId: senderId,
        isTyping: false,
      });
    }
  }
}
