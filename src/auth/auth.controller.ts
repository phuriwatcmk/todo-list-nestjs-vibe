import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'สมัครสมาชิก' })
  @ApiResponse({ status: 201, description: 'สมัครสำเร็จ' })
  @ApiResponse({ status: 409, description: 'Email ซ้ำ' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'เข้าสู่ระบบ — ได้รับ access_token' })
  @ApiResponse({ status: 200, description: 'Login สำเร็จ ได้ access_token' })
  @ApiResponse({ status: 401, description: 'Email หรือรหัสผ่านผิด' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ดูข้อมูล user ของตัวเอง (ต้องใส่ token)' })
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
