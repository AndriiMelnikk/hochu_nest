import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  lastName?: string;
  avatar?: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('google.clientId');
    const clientSecret = configService.get<string>('google.clientSecret');
    const callbackURL = configService.get<string>('google.callbackUrl');

    if (!clientID || !clientSecret) {
      throw new Error('Google OAuth credentials are not configured');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): void {
    const { id, name, emails, photos } = profile;

    const user: GoogleUser = {
      googleId: id,
      email: emails?.[0]?.value ?? '',
      name: name?.givenName ?? '',
      lastName: name?.familyName,
      avatar: photos?.[0]?.value,
    };

    done(null, user);
  }
}
