import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendPasswordResetEmail(email: string, token: string) {
    const frontendUrl = this.configService.get('app.frontendUrl');
    const url = `${frontendUrl}/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: './reset-password',
      context: {
        url,
      },
    });
  }
}
