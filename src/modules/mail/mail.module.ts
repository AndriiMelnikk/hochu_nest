import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const templateDir = join(process.cwd(), 'dist', 'modules', 'mail', 'templates');
        return {
          transport: {
            host: config.get('mail.host'),
            port: config.get('mail.port'),
            secure: false,
            auth: {
              user: config.get('mail.user'),
              pass: config.get('mail.password'),
            },
          },
          defaults: {
            from: `"${config.get('mail.fromName')}" <${config.get('mail.from')}>`,
          },
          template: {
            dir: templateDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
