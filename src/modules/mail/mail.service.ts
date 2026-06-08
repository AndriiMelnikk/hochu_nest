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

  async sendContactFormEmail(
    data: { name: string; email: string; subject: string; message: string },
    lang: string = 'uk',
  ) {
    const recipient = this.configService.get<string>('mail.contactRecipient');

    if (!recipient) {
      throw new Error('Contact recipient email is not configured');
    }

    const subjectPrefix = this.i18n.t('common.mail.contact.subject_prefix', { lang });
    const nameLabel = this.i18n.t('common.mail.contact.name_label', { lang });
    const emailLabel = this.i18n.t('common.mail.contact.email_label', { lang });
    const subjectLabel = this.i18n.t('common.mail.contact.subject_label', { lang });
    const messageLabel = this.i18n.t('common.mail.contact.message_label', { lang });

    await this.mailerService.sendMail({
      to: recipient,
      replyTo: data.email,
      subject: `${subjectPrefix}: ${data.subject}`,
      template: 'contact-form',
      context: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        nameLabel,
        emailLabel,
        subjectLabel,
        messageLabel,
      },
    });
  }

  async sendNotificationEmail(
    email: string,
    data: { title: string; message: string; link?: string; lang?: string },
  ) {
    const frontendUrl = this.configService.get('app.frontendUrl');
    const lang = data.lang ?? 'uk';
    const subject = this.i18n.t('common.mail.notification.subject', { lang });
    const button = this.i18n.t('common.mail.notification.button', { lang });
    const link = data.link ? `${frontendUrl}${data.link}` : frontendUrl;

    await this.mailerService.sendMail({
      to: email,
      subject: `${subject}: ${data.title}`,
      template: 'notification',
      context: {
        message: data.message,
        link: data.link ? link : null,
        button,
      },
    });
  }
}
