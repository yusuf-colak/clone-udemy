import {
  Controller,
  Post,
  Body,
  Req,
  HttpStatus,
  HttpException,
  Get,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import {JwtAuthGuard} from "@/core/auth/jwt-auth.guard";

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successfuly' })
  @ApiResponse({ status: 404, description: 'The email and password you entered did not match our records. Please double-check and try again' })
  @ApiBody({ type: AuthDto })
  @Post('login')
  async login(@Body() loginData: { domain: string; email: string; password: string }) {
    const user = await this.authService.validateUser(loginData.domain, loginData.email, loginData.password);
    if (!user) {
      throw new HttpException('The email and password you entered did not match our records. Please double-check and try again', HttpStatus.NOT_FOUND);
    }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    const user = await this.authService.me(req.user.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

}
