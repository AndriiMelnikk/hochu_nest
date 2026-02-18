import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Account, AccountDocument } from '../../../database/schemas/account.schema';
import { Profile, ProfileDocument } from '../../../database/schemas/profile.schema';

export interface JwtPayload {
  sub: string;
  profileId?: string;
}

export interface RequestUser {
  id: string;
  profileId: string;
  profileType: 'buyer' | 'seller';
  isAdmin: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {
    const secret = configService.get<string>('jwt.secret');
    if (!secret) {
      throw new Error('JWT secret is not configured');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    const account = await this.accountModel.findById(payload.sub).exec();
    if (!account || account.isBlocked) {
      throw new UnauthorizedException('Account not found or blocked');
    }

    let profileId: Types.ObjectId | undefined;
    if (payload.profileId) {
      profileId = new Types.ObjectId(payload.profileId);
    } else {
      const buyerProfile = await this.profileModel
        .findOne({ accountId: account._id, type: 'buyer' })
        .exec();
      if (buyerProfile) {
        profileId = buyerProfile._id;
      } else {
        const anyProfile = await this.profileModel.findOne({ accountId: account._id }).exec();
        if (anyProfile) {
          profileId = anyProfile._id;
        }
      }
    }

    if (!profileId) {
      throw new UnauthorizedException('Profile not found');
    }

    const profile = await this.profileModel
      .findOne({ _id: profileId, accountId: account._id })
      .exec();
    if (!profile) {
      throw new UnauthorizedException('Profile not found or does not belong to account');
    }

    return {
      id: account._id.toString(),
      profileId: profile._id.toString(),
      profileType: profile.type as 'buyer' | 'seller',
      isAdmin: account.isAdmin,
    };
  }
}
