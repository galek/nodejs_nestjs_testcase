import { Get, Post, Controller, Request, Body, Render, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ResultObject, ResponseObject, PayLoadObject } from './interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //  @Render('index')
  @Get()
  render() {
    const message = this.appService.getHello();
    return { message };
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return false;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return true;
  }
}