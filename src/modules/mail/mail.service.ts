import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
    private i18n: I18nService,
  ) {}

  async sendPasswordResetEmail(email: string, token: string, lang: string = 'uk') {
    const frontendUrl = this.configService.get('app.frontendUrl');
    const url = `${frontendUrl}/auth/reset-password?token=${token}`;

    const subject = this.i18n.t('common.mail.reset_password.subject', { lang });
    const greeting = this.i18n.t('common.mail.reset_password.greeting', { lang });
    const body = this.i18n.t('common.mail.reset_password.body', { lang });
    const button = this.i18n.t('common.mail.reset_password.button', { lang });
    const ignore = this.i18n.t('common.mail.reset_password.ignore', { lang });

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: 'reset-password',
      context: {
        url,
        greeting,
        body,
        button,
        ignore,
      },
    });
  }
}
