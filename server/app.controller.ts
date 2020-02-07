/* Copyright (C) 2009-2020, Nick Galko. All rights reserved.
*
* This file is part of the Nick Galko source-code
* (http://https://galek.github.io/portfolio/).
*
* Your use and or redistribution of this software in source and / or
* binary form, with or without modification, is subject to: (i) your
* ongoing acceptance of and compliance with the terms and conditions of
* the Nick Galko License Agreement; and (ii) your inclusion of this notice
* in any version of this software that you use or redistribute.
* A copy of the NGTech License Agreement is available by contacting
* Nick Galko. at http://https://galek.github.io/portfolio/
*/
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
   * @public
   * TODO: replace on one token FOR BELL
   */
  @UseGuards(AuthGuard('local'))
  @Post('get-token')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Function what will provide info about user from provided user-id
   * @public
   * TODO: replace on one token FOR BELL
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }
}