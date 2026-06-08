import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { NotificationType } from '../../../database/schemas/notification.schema';
import { NotificationMetadataPayload } from '../dto/dispatch-notification.dto';

export interface NotificationTemplateResult {
  title: string;
  message: string;
  link: string;
}

@Injectable()
export class NotificationTemplatesService {
  constructor(private readonly i18n: I18nService) {}

  build(
    type: NotificationType,
    metadata?: NotificationMetadataPayload,
    linkOverride?: string,
    lang?: string,
  ): NotificationTemplateResult {
    const resolvedLang = lang ?? I18nContext.current()?.lang ?? 'uk';
    const args = {
      requestTitle: metadata?.requestTitle ?? '',
      rating: metadata?.rating ?? 0,
    };

    const title = this.i18n.t(`common.notifications.templates.${type}.title`, {
      lang: resolvedLang,
      args,
    });
    const message = this.i18n.t(`common.notifications.templates.${type}.message`, {
      lang: resolvedLang,
      args,
    });

    const link = linkOverride ?? this.buildDefaultLink(type, metadata);

    return { title, message, link };
  }

  private buildDefaultLink(type: NotificationType, metadata?: NotificationMetadataPayload): string {
    if (metadata?.proposalId) {
      return `/proposal/${metadata.proposalId}`;
    }
    if (metadata?.requestId) {
      return `/request/${metadata.requestId}`;
    }
    if (type === NotificationType.NEW_MESSAGE) {
      return '/messages';
    }
    if (type === NotificationType.ACHIEVEMENT_UNLOCKED) {
      return '/achievements';
    }
    return '/notifications';
  }
}
