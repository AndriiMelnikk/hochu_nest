import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User, UserRole } from '../../database/schemas/user.schema';
import { RefreshToken } from '../../database/schemas/refresh-token.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserInstance = {
    _id: new Types.ObjectId(),
    name: 'name',
    email: 'test@test.com',
    password: 'hashedPassword',
    memberSince: new Date(),
    role: UserRole.BUYER as UserRole,
    rating: 0,
    reviewsCount: 0,
    isVerified: false,
    toObject: () => ({ name: 'name', email: 'test@test.com', role: UserRole.BUYER }),
    save: jest
      .fn()
      .mockResolvedValue({ name: 'name', email: 'test@test.com', role: UserRole.BUYER }),
  };

  const mockUserModel = jest.fn().mockImplementation(() => mockUserInstance);

  (mockUserModel as any).findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(null),
  });
  (mockUserModel as any).create = jest.fn().mockResolvedValue(mockUserInstance);

  const mockRefreshTokenInstance = {
    save: jest.fn().mockResolvedValue({}),
  };

  const mockRefreshTokenModel = jest.fn().mockImplementation(() => mockRefreshTokenInstance);

  (mockRefreshTokenModel as any).deleteOne = jest.fn().mockResolvedValue({});
  (mockRefreshTokenModel as any).findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(null),
  });

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'jwt.expiresIn') return '1h';
      if (key === 'jwt.refreshExpiresIn') return '7d';
      if (key === 'jwt.refreshSecret') {
        return 'your-test-refresh-secret'; // Може бути будь-який рядок
      }
      return null;
    }),
  };

  const mockI18nServise = {
    t: jest.fn().mockImplementation((key: string) => key),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(RefreshToken.name),
          useValue: mockRefreshTokenModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: I18nService,
          useValue: mockI18nServise,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('користувача з таким email НЕ існує', async () => {
    (mockUserModel as any).findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    mockUserInstance.save.mockResolvedValue({ ...mockUserInstance, _id: new Types.ObjectId() });

    mockRefreshTokenInstance.save.mockResolvedValue({
      userId: mockUserInstance._id,
      token: 'mocked_refresh_token',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const result = await service.register({
      name: mockUserInstance.name,
      email: mockUserInstance.email,
      password: mockUserInstance.password,
    });

    expect(result).toBeDefined();
    expect(mockUserModel).toHaveBeenCalled();
    expect(mockUserInstance.save).toHaveBeenCalled();
  });
});
