import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XpService } from './xp.service';
import { User, UserSchema } from '../../database/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [XpService],
  exports: [XpService],
})
export class XpModule {}

