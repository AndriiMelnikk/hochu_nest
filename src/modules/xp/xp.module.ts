import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XpService } from './xp.service';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
  providers: [XpService],
  exports: [XpService],
})
export class XpModule {}
