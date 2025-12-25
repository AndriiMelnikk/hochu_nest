import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../database/schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../../database/schemas/refresh-token.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      memberSince: new Date(),
    });
    await user.save();

    // Generate tokens
    const tokens = await this.generateTokens(user._id.toString(), user.role);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: this.sanitizeUser(user),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if blocked
    if (user.isBlocked) {
      throw new UnauthorizedException('User is blocked');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user._id.toString(), user.role);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: this.sanitizeUser(user),
    };
  }

  async refreshToken(refreshToken: string) {
    // Find refresh token
    const tokenDoc = await this.refreshTokenModel
      .findOne({ token: refreshToken })
      .exec();

    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Find user
    const user = await this.userModel.findById(tokenDoc.userId).exec();
    if (!user || user.isBlocked) {
      throw new UnauthorizedException('User not found or blocked');
    }

    // Delete old refresh token
    await this.refreshTokenModel.deleteOne({ _id: tokenDoc._id }).exec();

    // Generate new tokens
    const tokens = await this.generateTokens(user._id.toString(), user.role);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      await this.refreshTokenModel
        .deleteOne({ token: refreshToken, userId })
        .exec();
    }
    return { success: true };
  }

  private async generateTokens(userId: string, role: string) {
    const payload = { sub: userId, email: '', role };

    const expiresIn = this.configService.get<string>('jwt.expiresIn') || '1h';
    const refreshSecret = this.configService.get<string>('jwt.refreshSecret');
    const refreshExpiresIn =
      this.configService.get<string>('jwt.refreshExpiresIn') || '7d';

    if (!refreshSecret) {
      throw new Error('JWT refresh secret is not configured');
    }

    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: expiresIn as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn as any,
    });
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */

    // Calculate expiration date
    const expiresAt = this.calculateExpirationDate(refreshExpiresIn);

    // Save refresh token
    const refreshTokenDoc = new this.refreshTokenModel({
      userId,
      token: refreshToken,
      expiresAt,
    });
    await refreshTokenDoc.save();

    return { accessToken, refreshToken };
  }

  private calculateExpirationDate(expiresIn: string | undefined): Date {
    if (!expiresIn) {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
    }
    const now = new Date();
    const match = expiresIn.match(/(\d+)([dhm])/);
    if (!match) {
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
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

  private sanitizeUser(user: UserDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userObj = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete userObj.password;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return userObj;
  }
}
