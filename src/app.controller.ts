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

// https://docs.nestjs.com/controllers

@Controller('results')
export class ResultController {
  constructor(private readonly appService: AppService) { }

  @Get()
  results() {
    // TODO: Уточни это массив, или просто пояснение, скорее всего пояснение
    let obj: ResultObject = { name: '1', votes: 1, position: 2 };
    return obj;
  }
}

@Controller('vote')
export class VoteController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async vote(@Body() item: PayLoadObject) {
    if (item) return 'implemented ' + JSON.stringify(item);
    return 'Not yet implemented ' + JSON.stringify(item);
  }
}
