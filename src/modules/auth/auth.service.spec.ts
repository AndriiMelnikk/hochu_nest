import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Account } from '../../database/schemas/account.schema';
import { Profile } from '../../database/schemas/profile.schema';
import { RefreshToken } from '../../database/schemas/refresh-token.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;

  const mockAccountInstance = {
    _id: new Types.ObjectId(),
    name: 'name',
    email: 'test@test.com',
    password: 'hashedPassword',
    toObject: () => ({ name: 'name', email: 'test@test.com' }),
    save: jest.fn().mockResolvedValue({}),
  };

  const mockAccountFindOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(null),
  });
  const mockAccountCreate = jest.fn().mockResolvedValue(mockAccountInstance);
  const mockAccountModel = Object.assign(jest.fn(), {
    findOne: mockAccountFindOne,
    create: mockAccountCreate,
  });

  const buyerProfileId = new Types.ObjectId();
  const mockProfileModel = {
    insertMany: jest
      .fn()
      .mockResolvedValue([{ _id: buyerProfileId }, { _id: new Types.ObjectId() }]),
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: buyerProfileId }),
    }),
    find: jest.fn().mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          { _id: buyerProfileId, type: 'buyer', rating: 0, xp: 0, completedDeals: 0 },
          { _id: new Types.ObjectId(), type: 'seller', rating: 0, xp: 0, completedDeals: 0 },
        ]),
      }),
    }),
  };

  const mockRefreshTokenInstance = {
    save: jest.fn().mockResolvedValue({}),
  };
  const mockRefreshTokenModel = jest.fn().mockImplementation(() => mockRefreshTokenInstance);
  (mockRefreshTokenModel as unknown as { deleteOne: jest.Mock }).deleteOne = jest
    .fn()
    .mockResolvedValue({});
  (mockRefreshTokenModel as unknown as { findOne: jest.Mock }).findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(null),
  });

  const mockJwtService = { sign: jest.fn().mockReturnValue('token') };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'jwt.expiresIn') return '1h';
      if (key === 'jwt.refreshExpiresIn') return '7d';
      if (key === 'jwt.refreshSecret') return 'your-test-refresh-secret';
      return null;
    }),
  };

  const mockI18nService = { t: jest.fn().mockImplementation((key: string) => key) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken(Account.name), useValue: mockAccountModel },
        { provide: getModelToken(Profile.name), useValue: mockProfileModel },
        { provide: getModelToken(RefreshToken.name), useValue: mockRefreshTokenModel },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('реєстрація створює account та два профілі', async () => {
    mockAccountFindOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    const result = await service.register({
      name: mockAccountInstance.name,
      email: mockAccountInstance.email,
      password: 'password123',
    });

    expect(result).toBeDefined();
    expect(result.account).toBeDefined();
    expect(result.profiles).toHaveLength(2);
    expect(result.currentProfileId).toBe(buyerProfileId.toString());
    expect(mockAccountFindOne).toHaveBeenCalled();
    expect(mockAccountCreate).toHaveBeenCalled();
    expect(mockProfileModel.insertMany).toHaveBeenCalled();
  });
});
