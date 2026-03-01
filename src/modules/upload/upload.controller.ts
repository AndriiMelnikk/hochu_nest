import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UploadType } from './dto/upload.dto';
import { RequestUser } from '../auth/strategies/jwt.strategy';
import { UsersService } from '../users/users.service';

@ApiTags('Upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly usersService: UsersService,
  ) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload avatar image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        profileId: {
          type: 'string',
          description:
            'Optional profile ID to update avatar for. Defaults to current active profile.',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Avatar uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: RequestUser },
    @Body('profileId') profileId?: string,
  ) {
    const userId = req.user?.id;
    const targetProfileId = profileId || req.user?.profileId;

    // Get current profile to check for existing avatar
    const { profile } = await this.usersService.findMe(userId, targetProfileId);
    const oldAvatarUrl = profile.avatar;

    const result = await this.uploadService.uploadFile(file, userId, UploadType.AVATAR);

    // Update profile avatar link
    await this.usersService.updateMe(userId, targetProfileId, { avatar: result.url });
    await this.uploadService.confirmUploads([result.url], targetProfileId);

    // Delete old avatar if it existed
    if (oldAvatarUrl) {
      try {
        await this.uploadService.deleteByUrl(oldAvatarUrl);
      } catch (error) {
        // We don't want to fail the request if deletion of the old file fails
        console.error(`Failed to delete old avatar ${oldAvatarUrl}:`, error);
      }
    }

    return result;
  }

  @Post('post')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload post image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Post image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async uploadPostImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: RequestUser },
  ) {
    const userId = req.user?.id;
    return this.uploadService.uploadFile(file, userId, UploadType.POST);
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload general photo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Photo uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: RequestUser },
  ) {
    const userId = req.user?.id;
    return this.uploadService.uploadFile(file, userId, UploadType.PHOTO);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete uploaded file' })
  @ApiQuery({ name: 'url', required: true, description: 'File URL to delete' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async deleteFile(@Query('url') url: string, @Req() req: Request & { user: RequestUser }) {
    const userId = req.user?.id;
    await this.uploadService.deleteFile(url, userId);
    return { success: true };
  }
}
