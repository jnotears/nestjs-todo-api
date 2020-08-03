import { Controller, Get, UseGuards, Req, Post, Request } from '@nestjs/common';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Request() req){
      return this.authService.register(req.body);
    }

    @Get('github')
    @UseGuards(GithubAuthGuard)
    async githubAuth(@Req() req) {
        console.log('github', req);
    }

    @Get('github/redirect')
    @UseGuards(GithubAuthGuard)
    githubAuthRedirect(@Req() req) {
        console.log('redirecting...', req);
    }
}