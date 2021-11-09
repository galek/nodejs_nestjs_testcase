import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Function what will generate a token from username-password
   * @public
   * TODO: replace on one token FOR BELL
   */
  @UseGuards(AuthGuard('local'))
  @Post('get-token')
  public async login(@Req() req) {
    return this.authService.login(req.user);
  }

  /**
   * Function what will provide info about user from provided user-id
   * @public
   * TODO: replace on one token FOR BELL
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  public getProfile(@Req() req) {
    return req.user;
  }
}
