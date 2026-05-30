import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { MailService } from '../mail/mail.service';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly mailService: MailService,
    private readonly i18n: I18nService,
  ) {}

  async submitContactForm(contactDto: ContactDto) {
    const lang = I18nContext.current()?.lang ?? 'uk';

    await this.mailService.sendContactFormEmail(contactDto, lang);

    return {
      success: true,
      message: this.i18n.t('common.contact.success', { lang }),
    };
  }
}
