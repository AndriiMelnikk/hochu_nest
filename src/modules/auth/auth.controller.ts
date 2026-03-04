import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SwitchProfileDto } from './dto/switch-profile.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
