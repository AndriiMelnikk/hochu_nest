import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscussionsController } from './discussions.controller';
import { DiscussionsService } from './discussions.service';
import { Discussion, DiscussionSchema } from '../../database/schemas/discussion.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Discussion.name, schema: DiscussionSchema }])],
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
  exports: [DiscussionsService],
})
export class DiscussionsModule {}
