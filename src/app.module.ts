import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import uploadConfig from './config/upload.config';
import appConfig from './config/app.config';
import novaPoshtaConfig from './config/nova-poshta.config';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RequestsModule } from './modules/requests/requests.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { MessagesModule } from './modules/messages/messages.module';
import { DiscussionsModule } from './modules/discussions/discussions.module';
import { BlogModule } from './modules/blog/blog.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { UploadModule } from './modules/upload/upload.module';
import { AdminModule } from './modules/admin/admin.module';
import { XpModule } from './modules/xp/xp.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { LocationsModule } from './modules/locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, uploadConfig, appConfig, novaPoshtaConfig],
      envFilePath: '.env',
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'uk',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    XpModule,
    AchievementsModule,
    RequestsModule,
    ProposalsModule,
    ReviewsModule,
    MessagesModule,
    DiscussionsModule,
    BlogModule,
    ReportsModule,
    NotificationsModule,
    CategoriesModule,
    LocationsModule,
    UploadModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
