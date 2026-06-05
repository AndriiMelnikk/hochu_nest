import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SwitchProfileDto } from './dto/switch-profile.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { GoogleTokenDto } from './dto/google-login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GoogleAuthGuard } from '../../common/guards/google-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { GoogleUser } from './strategies/google.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new account with buyer and seller profiles' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Account and profiles created' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('google')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login or register with Google ID token (Auth.js / Next.js frontend)',
    description:
      'Accepts Google ID token from Auth.js signIn callback (account.id_token) and returns platform JWT tokens.',
  })
  @ApiBody({ type: GoogleTokenDto })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'Logged in or registered via Google',
  })
  @ApiResponse({ status: 401, description: 'Invalid Google token' })
  googleTokenLogin(@Body() googleTokenDto: GoogleTokenDto): Promise<AuthResponseDto> {
    return this.authService.googleTokenLogin(googleTokenDto.token);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: 'Initiate Google OAuth redirect flow',
    description: 'Redirects the user to Google for authentication (alternative to ID token flow).',
  })
  @ApiResponse({ status: 302, description: 'Redirect to Google OAuth' })
  googleAuthRedirect(): void {
    // Passport handles the redirect via GoogleAuthGuard
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: 'Google OAuth callback (redirect flow)',
    description:
      'Handles Google redirect, issues platform JWT tokens, and redirects to the frontend with tokens in the URL hash.',
  })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with tokens' })
  async googleAuthCallback(
    @Req() req: Request & { user: GoogleUser },
    @Res() res: Response,
  ): Promise<void> {
    const authResponse = await this.authService.googleLogin(req.user);
    const frontendUrl =
      this.configService.get<string>('app.frontendUrl') ?? 'http://localhost:3000';

    const hash = new URLSearchParams({
      access_token: authResponse.access_token,
      refresh_token: authResponse.refresh_token,
      currentProfileId: authResponse.currentProfileId,
    }).toString();

    res.redirect(`${frontendUrl}/auth/google/callback#${hash}`);
  }

  @Post('switch-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Switch active profile and get new tokens' })
  @ApiBody({ type: SwitchProfileDto })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'New tokens and account state with selected profile',
  })
  @ApiResponse({ status: 400, description: 'Profile not found or not owned' })
  async switchProfile(@CurrentUser() user: { id: string }, @Body() body: SwitchProfileDto) {
    return this.authService.switchProfile(user.id, body.profileId);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Token successfully refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(@CurrentUser() user: { id: string }, @Body() body: { refresh_token?: string }) {
    return this.authService.logout(user.id, body.refresh_token);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid old password' })
  async changePassword(
    @CurrentUser() user: { id: string },
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, changePasswordDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset email sent (if account exists)' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
