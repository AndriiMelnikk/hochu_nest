import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationDispatcher } from './services/notification-dispatcher.service';
import { NotificationPreferencesService } from './services/notification-preferences.service';
import { NotificationTemplatesService } from './services/notification-templates.service';
import { RequestSubscriptionMatcherService } from './services/request-subscription-matcher.service';
import { RequestSubscriptionService } from './services/request-subscription.service';
import { NotificationsGateway } from './gateways/notifications.gateway';
import { Notification, NotificationSchema } from '../../database/schemas/notification.schema';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';
import { Account, AccountSchema } from '../../database/schemas/account.schema';
import { Category, CategorySchema } from '../../database/schemas/category.schema';
import {
  RequestSubscription,
  RequestSubscriptionSchema,
} from '../../database/schemas/request-subscription.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Category.name, schema: CategorySchema },
      { name: RequestSubscription.name, schema: RequestSubscriptionSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationDispatcher,
    NotificationPreferencesService,
    NotificationTemplatesService,
    RequestSubscriptionMatcherService,
    RequestSubscriptionService,
    NotificationsGateway,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
