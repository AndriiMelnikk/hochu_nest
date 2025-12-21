import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from '../../database/schemas/message.schema';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationUtil } from '../../common/utils/pagination.util';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../../database/schemas/notification.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private notificationsService: NotificationsService,
  ) {}

  async create(createMessageDto: CreateMessageDto, senderId: string) {
    const { receiverId, content, requestId, proposalId } = createMessageDto;

    // Check if receiver exists
    const receiver = await this.userModel.findById(receiverId).exec();
    if (!receiver) {
      throw new NotFoundException(`User with ID ${receiverId} not found`);
    }

    const message = new this.messageModel({
      senderId: new Types.ObjectId(senderId),
      receiverId: new Types.ObjectId(receiverId),
      requestId: requestId ? new Types.ObjectId(requestId) : null,
      proposalId: proposalId ? new Types.ObjectId(proposalId) : null,
      content,
      read: false,
    });

    await message.save();

    // Create notification if receiver is offline (will be sent via WebSocket if online)
    await this.notificationsService.create({
      userId: receiverId,
      type: NotificationType.NEW_MESSAGE,
      title: 'Нове повідомлення',
      message: `Ви отримали нове повідомлення`,
      link: `/messages`,
    });

    return await message.populate('senderId', 'name avatar').populate('receiverId', 'name avatar');
  }

  async findAll(
    userId: string,
    requestId?: string,
    proposalId?: string,
    otherUserId?: string,
    page?: number,
    pageSize?: number,
  ) {
    const normalizedPage = PaginationUtil.normalizePage(page);
    const normalizedPageSize = PaginationUtil.normalizePageSize(pageSize);
    const skip = PaginationUtil.getSkip(normalizedPage, normalizedPageSize);

    const query: any = {
      $or: [
        { senderId: new Types.ObjectId(userId) },
        { receiverId: new Types.ObjectId(userId) },
      ],
    };

    if (requestId) {
      query.requestId = new Types.ObjectId(requestId);
    }

    if (proposalId) {
      query.proposalId = new Types.ObjectId(proposalId);
    }

    if (otherUserId) {
      query.$and = [
        {
          $or: [
            {
              senderId: new Types.ObjectId(userId),
              receiverId: new Types.ObjectId(otherUserId),
            },
            {
              senderId: new Types.ObjectId(otherUserId),
              receiverId: new Types.ObjectId(userId),
            },
          ],
        },
      ];
    }

    const [results, count] = await Promise.all([
      this.messageModel
        .find(query)
        .populate('senderId', 'name avatar')
        .populate('receiverId', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(normalizedPageSize)
        .exec(),
      this.messageModel.countDocuments(query).exec(),
    ]);

    return PaginationUtil.createPaginationResult(
      results.reverse(),
      count,
      normalizedPage,
      normalizedPageSize,
      '/api/messages',
      { requestId, proposalId, otherUserId },
    );
  }

  async getConversations(userId: string) {
    const conversations = await this.messageModel.aggregate([
      {
        $match: {
          $or: [
            { senderId: new Types.ObjectId(userId) },
            { receiverId: new Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$senderId', new Types.ObjectId(userId)] },
              '$receiverId',
              '$senderId',
            ],
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiverId', new Types.ObjectId(userId)] },
                    { $eq: ['$read', false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          user: {
            _id: '$user._id',
            name: '$user.name',
            avatar: '$user.avatar',
          },
          lastMessage: {
            _id: '$lastMessage._id',
            content: '$lastMessage.content',
            createdAt: '$lastMessage.createdAt',
            read: '$lastMessage.read',
          },
          unreadCount: 1,
        },
      },
      {
        $sort: { 'lastMessage.createdAt': -1 },
      },
    ]);

    return conversations;
  }

  async markAsRead(id: string, userId: string) {
    const message = await this.messageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    if (message.receiverId.toString() !== userId) {
      throw new ForbiddenException('You can only mark your own received messages as read');
    }

    message.read = true;
    await message.save();

    return { success: true };
  }
}

