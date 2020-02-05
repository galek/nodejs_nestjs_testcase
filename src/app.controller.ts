import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

/**
 * Main app controller
 */
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Function what will generate a token from username-password
   * TODO: replace on one token FOR BELL
   */
  @UseGuards(AuthGuard('local'))
  @Post('get-token')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Function what will provide info about user from provided user-id
   * TODO: replace on one token FOR BELL
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}