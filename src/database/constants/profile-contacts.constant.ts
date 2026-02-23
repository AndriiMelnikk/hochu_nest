import { ProfileType } from '../enums/profile-type.enum';
import { ContactChannel } from '../enums/contact-channel.enum';

export const ALLOWED_CONTACTS: Record<ProfileType, ContactChannel[]> = {
  [ProfileType.BUYER]: [ContactChannel.PHONE, ContactChannel.EMAIL, ContactChannel.TELEGRAM],
  [ProfileType.SELLER]: [
    ContactChannel.PHONE,
    ContactChannel.EMAIL,
    ContactChannel.TELEGRAM,
    ContactChannel.VIBER,
    ContactChannel.WHATSAPP,
    ContactChannel.INSTAGRAM,
    ContactChannel.FACEBOOK,
    ContactChannel.WEBSITE,
  ],
};
