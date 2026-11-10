import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AdminUser, AdminUserDocument } from '../../database/schemas/admin-user.schema';
import { BCRYPT_ROUNDS } from './admin-auth.service';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';

@Injectable()
export class AdminStaffService {
  constructor(@InjectModel(AdminUser.name) private readonly users: Model<AdminUserDocument>) {}

  private format(user: AdminUserDocument) {
    return {
      id: user._id.toString(),
      login: user.login,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      createdBy: user.createdBy,
    };
  }

  async list() {
    const users = await this.users.find().sort({ createdAt: 1 }).exec();
    return { count: users.length, results: users.map((u) => this.format(u)) };
  }

  async create(dto: CreateStaffDto, createdBy: string) {
    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    try {
      const user = await this.users.create({
        login: dto.login,
        name: dto.name?.trim() ?? '',
        passwordHash,
        role: dto.role,
        createdBy,
      });
      return this.format(user);
    } catch (error) {
      if ((error as { code?: number }).code === 11000) {
        throw new ConflictException('login_taken');
      }
      throw error;
    }
  }

  /** Захист від втрати доступу: не можна позбутись останнього активного адміна чи змінити себе. */
  private async assertSafeChange(target: AdminUserDocument, actorId: string, dto: UpdateStaffDto) {
    const demoting = dto.role !== undefined && dto.role !== 'admin' && target.role === 'admin';
    const deactivating = dto.isActive === false && target.isActive;
    if (target._id.toString() === actorId && (demoting || deactivating)) {
      throw new BadRequestException('cannot_modify_self');
    }
    if (target.role === 'admin' && target.isActive && (demoting || deactivating)) {
      const otherAdmins = await this.users.countDocuments({
        _id: { $ne: target._id },
        role: 'admin',
        isActive: true,
      });
      if (otherAdmins === 0) throw new BadRequestException('last_admin');
    }
  }

  async update(id: string, dto: UpdateStaffDto, actorId: string) {
    const user = await this.users.findById(id).exec();
    if (!user) throw new NotFoundException('staff_not_found');
    await this.assertSafeChange(user, actorId, dto);

    if (dto.name !== undefined) user.name = dto.name.trim();
    if (dto.role !== undefined) user.role = dto.role;
    if (dto.isActive !== undefined) {
      user.isActive = dto.isActive;
      if (dto.isActive) {
        user.failedAttempts = 0;
        user.lockedUntil = null;
      }
    }
    await user.save();
    return this.format(user);
  }

  async resetPassword(id: string, password: string) {
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const res = await this.users
      .updateOne({ _id: id }, { passwordHash, failedAttempts: 0, lockedUntil: null })
      .exec();
    if (res.matchedCount === 0) throw new NotFoundException('staff_not_found');
    return { success: true };
  }
}
