import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Discussion, DiscussionDocument } from '../../database/schemas/discussion.schema';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectModel(Discussion.name)
    private discussionModel: Model<DiscussionDocument>,
  ) {}

  async createForRequest(
    requestId: string,
    createDiscussionDto: CreateDiscussionDto,
    accountId: string,
  ) {
    const discussion = new this.discussionModel({
      requestId: new Types.ObjectId(requestId),
      accountId: new Types.ObjectId(accountId),
      content: createDiscussionDto.content,
      replyToId: createDiscussionDto.replyToId
        ? new Types.ObjectId(createDiscussionDto.replyToId)
        : null,
    });

    await discussion.save();
    await discussion.populate('accountId', 'name avatar');
    return await discussion.populate('replyToId');
  }

  async createForProposal(
    proposalId: string,
    createDiscussionDto: CreateDiscussionDto,
    accountId: string,
  ) {
    const discussion = new this.discussionModel({
      proposalId: new Types.ObjectId(proposalId),
      accountId: new Types.ObjectId(accountId),
      content: createDiscussionDto.content,
      replyToId: createDiscussionDto.replyToId
        ? new Types.ObjectId(createDiscussionDto.replyToId)
        : null,
    });

    await discussion.save();
    await discussion.populate('accountId', 'name avatar');
    return await discussion.populate('replyToId');
  }

  async findAllForRequest(requestId: string) {
    return this.discussionModel
      .find({ requestId: new Types.ObjectId(requestId) })
      .populate('accountId', 'name avatar')
      .populate('replyToId')
      .sort({ createdAt: 1 })
      .exec();
  }

  async findAllForProposal(proposalId: string) {
    return this.discussionModel
      .find({ proposalId: new Types.ObjectId(proposalId) })
      .populate('accountId', 'name avatar')
      .populate('replyToId')
      .sort({ createdAt: 1 })
      .exec();
  }
}
