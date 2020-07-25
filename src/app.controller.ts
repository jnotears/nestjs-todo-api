
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('login..');
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Request() req){
    console.log('registing....');
    console.log('req content ',req);
    console.log('req body: ',req.body);
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }
}