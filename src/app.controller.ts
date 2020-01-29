import { Get, Post, Controller, Body, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ResultObject, ResponseObject, PayLoadObject } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //  @Render('index')
  @Get()
  render() {
    const message = this.appService.getHello();
    return { message };
  }
}