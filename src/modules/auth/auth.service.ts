import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { Account, AccountDocument } from '../../database/schemas/account.schema';
import { Profile, ProfileDocument, ProfileType } from '../../database/schemas/profile.schema';
import { RefreshToken, RefreshTokenDocument } from '../../database/schemas/refresh-token.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { TokenPairDto } from './dto/token-pair.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, name, lastName, type } = registerDto;

    const existingAccount = await this.accountModel.findOne({ email }).exec();
    if (existingAccount) {
      throw new ConflictException(
        this.i18n.t('common.auth.user_exists', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const account = await this.accountModel.create({
      email,
      password: hashedPassword,
    });

    const now = new Date();
    const profileType = type || ProfileType.BUYER;

    const profile = await this.profileModel.create({
      accountId: account._id,
      name,
      lastName,
      type: profileType,
      rating: 0,
      reviewsCount: 0,
      completedDeals: 0,
      xp: 0,
      memberSince: now,
      isVerified: false,
    });

    const defaultProfileId = profile._id;

    const tokens = await this.generateTokens(account._id.toString(), defaultProfileId.toString());

    const profiles = await this.profileModel
      .find({ accountId: account._id })
      .lean<Profile[]>()
      .exec();
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      account: this.sanitizeAccount(account as unknown as AccountDocument),
      profiles: profiles.map((p) => ({
        id: (p as { _id: Types.ObjectId })._id.toString(),
        name: (p as { name: string }).name,
        lastName: (p as { lastName?: string }).lastName,
        type: (p as { type: string }).type,
        rating: (p as { rating: number }).rating,
        xp: (p as { xp: number }).xp,
        completedDeals: (p as { completedDeals: number }).completedDeals,
      })),
      currentProfileId: defaultProfileId.toString(),
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const account = await this.accountModel.findOne({ email }).exec();
    if (!account) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.invalid_credentials', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.invalid_credentials', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    let profile = await this.profileModel
      .findOne({ accountId: account._id, type: ProfileType.BUYER })
      .exec();

    if (!profile) {
      profile = await this.profileModel.findOne({ accountId: account._id }).exec();
    }

    if (!profile) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.profile_not_found', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (profile.isBlocked && (!profile.blockedUntil || profile.blockedUntil > new Date())) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.user_blocked', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (profile.isBlocked && (!profile.blockedUntil || profile.blockedUntil > new Date())) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.user_blocked', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const defaultProfileId = profile._id;

    const tokens = await this.generateTokens(account._id.toString(), defaultProfileId.toString());

    const profiles = await this.profileModel
      .find({ accountId: account._id })
      .lean<Profile[]>()
      .exec();
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      account: this.sanitizeAccount(account as unknown as AccountDocument),
      profiles: profiles.map((p) => ({
        id: (p as { _id: Types.ObjectId })._id.toString(),
        name: (p as { name: string }).name,
        lastName: (p as { lastName?: string }).lastName,
        type: (p as { type: string }).type,
        rating: (p as { rating: number }).rating,
        xp: (p as { xp: number }).xp,
        completedDeals: (p as { completedDeals: number }).completedDeals,
      })),
      currentProfileId: defaultProfileId.toString(),
    };
  }

  async switchProfile(accountId: string, profileId: string): Promise<AuthResponseDto> {
    const account = await this.accountModel.findById(accountId).exec();
    if (!account) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.user_not_found', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const profile = await this.profileModel
      .findOne({ _id: new Types.ObjectId(profileId), accountId: new Types.ObjectId(accountId) })
      .exec();
    if (!profile) {
      throw new BadRequestException(
        this.i18n.t('common.auth.profile_not_found', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const tokens = await this.generateTokens(accountId, profileId);
    const profiles = await this.profileModel
      .find({ accountId: account._id })
      .lean<Profile[]>()
      .exec();

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      account: this.sanitizeAccount(account as unknown as AccountDocument),
      profiles: profiles.map((p) => ({
        id: (p as { _id: Types.ObjectId })._id.toString(),
        name: (p as { name: string }).name,
        lastName: (p as { lastName?: string }).lastName,
        type: (p as { type: string }).type,
        rating: (p as { rating: number }).rating,
        xp: (p as { xp: number }).xp,
        completedDeals: (p as { completedDeals: number }).completedDeals,
      })),
      currentProfileId: profileId,
    };
  }

  async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
    const tokenDoc = await this.refreshTokenModel.findOne({ token: refreshToken }).exec();

    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.invalid_token', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const accountId = (tokenDoc as { accountId: Types.ObjectId }).accountId?.toString();
    const account = await this.accountModel.findById(accountId).exec();
    if (!account) {
      throw new UnauthorizedException(
        this.i18n.t('common.auth.user_not_found', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    await this.refreshTokenModel.deleteOne({ _id: tokenDoc._id }).exec();

    let profileId: string | undefined = (
      tokenDoc as { profileId?: Types.ObjectId | null }
    ).profileId?.toString();

    if (!profileId) {
      const buyerProfile = await this.profileModel
        .findOne({ accountId: account._id, type: ProfileType.BUYER })
        .exec();
      if (buyerProfile) {
        profileId = buyerProfile._id.toString();
      }
    }

    if (!profileId) {
      const anyProfile = await this.profileModel.findOne({ accountId: account._id }).exec();
      if (anyProfile) {
        profileId = anyProfile._id.toString();
      }
    }

    if (profileId) {
      const profile = await this.profileModel.findById(profileId).exec();
      if (
        profile &&
        profile.isBlocked &&
        (!profile.blockedUntil || profile.blockedUntil > new Date())
      ) {
        throw new UnauthorizedException(
          this.i18n.t('common.auth.user_blocked', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }
    }

    const tokens = await this.generateTokens(accountId, profileId ?? undefined);

    if (profileId) {
      const profile = await this.profileModel.findById(profileId).exec();
      if (
        profile &&
        profile.isBlocked &&
        (!profile.blockedUntil || profile.blockedUntil > new Date())
      ) {
        throw new UnauthorizedException(
          this.i18n.t('common.auth.user_blocked', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }
    }

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async logout(accountId: string, refreshToken?: string): Promise<LogoutResponseDto> {
    if (refreshToken) {
      await this.refreshTokenModel
        .deleteOne({ token: refreshToken, accountId: new Types.ObjectId(accountId) })
        .exec();
    }
    return { success: true };
  }

  private async generateTokens(
    accountId: string,
    profileId?: string,
  ): Promise<TokenPairDto & { profileId?: string }> {
    const payload: { sub: string; profileId?: string } = { sub: accountId };
    if (profileId) {
      payload.profileId = profileId;
    }

    const expiresIn = this.configService.get<string>('jwt.expiresIn') || '1h';
    const refreshSecret = this.configService.get<string>('jwt.refreshSecret');
    const refreshExpiresIn = this.configService.get<string>('jwt.refreshExpiresIn') || '7d';

    if (!refreshSecret) {
      throw new Error('JWT refresh secret is not configured');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessToken = this.jwtService.sign(payload as any, { expiresIn: expiresIn as any });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refreshToken = this.jwtService.sign(payload as any, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn as any,
    });

    const expiresAt = this.calculateExpirationDate(refreshExpiresIn);

    const refreshTokenDoc = new this.refreshTokenModel({
      accountId: new Types.ObjectId(accountId),
      profileId: profileId ? new Types.ObjectId(profileId) : null,
      token: refreshToken,
      expiresAt,
    });
    await refreshTokenDoc.save();

    return { accessToken, refreshToken };
  }

  private calculateExpirationDate(expiresIn: string | undefined): Date {
    if (!expiresIn) {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
    const now = new Date();
    const match = expiresIn.match(/(\d+)([dhm])/);
    if (!match) {
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 'd':
        return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
      case 'h':
        return new Date(now.getTime() + value * 60 * 60 * 1000);
      case 'm':
        return new Date(now.getTime() + value * 60 * 1000);
      default:
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  }

  private sanitizeAccount(account: AccountDocument): Omit<Account, 'password'> {
    const obj = account.toObject();
    delete (obj as { password?: string }).password;
    return obj as Omit<Account, 'password'>;
  }
}
