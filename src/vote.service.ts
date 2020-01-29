﻿import { AppService } from "./app.service";
import { Controller, Body, Post, Get, ValidationPipe, Req, Injectable } from "@nestjs/common";
import { PayLoadObject, AbstactToken, AbstactKey, ResponseObject } from "./interfaces";
import * as rawbody from 'raw-body';

@Injectable()
export class DBDriver {
  votesArray: Array<{ name: string, votes: number }>
    = new Array<{ name: string, votes: number }>();

  writeToDB(value: string): ResponseObject {
    if (!value) return { success: false };
    return this._logicImpl(value);
  }

  getResults() {
    // this.votesArray.sort((a, b) => {
    //   if (a.votes > b.votes) { return -1; }
    //   if (a.votes < b.votes) { return 1; }
    //   return 0;
    // });
    this.votesArray.sort((a, b) => {
      return a.votes - b.votes;
    });

    return this.votesArray;
  }

  private _logicImpl(value: string) {

    if (console) console.warn(JSON.stringify(this.votesArray));

    let obj = this.votesArray.find(obj => obj.name === value);
    if (obj) {
      if (console) console.warn('find before: ' + obj.votes);
      obj.votes++;
      if (console) console.warn('find now: ' + obj.votes);
      return { success: true };
    }
    else {
      this.votesArray.push({ name: value, votes: 1 });
      return { success: true };
    }

  }
}


@Controller('results')
export class Results {
  constructor(private readonly appService: AppService, private readonly dbDriver: DBDriver) { }

  @Get()
  async results() {
    return JSON.stringify(this.dbDriver.getResults());
  }

}



@Controller('vote')
export class VoteController {
  constructor(private readonly appService: AppService, private dbDriver: DBDriver) { }

  @Post()
  async vote(@Body() data, @Req() req) {

    // we have to check req.readable because of raw-body issue #57
    // https://github.com/stream-utils/raw-body/issues/57
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const text = raw.toString().trim();
      console.log('body is readable:', text);
      // TODO: Почитай, что это

    } else {
      // body is parsed by NestJS
      console.log('data not readable:', data);
      return this.dbDriver.writeToDB(data.voteFor);

    }

    // ...
  }
}

@Controller('gettoken')
export class AbstractToken {
  constructor(private readonly appService: AppService) { }

  @Post()
  async gettoken(@Body() item: AbstactKey) {
    if (!item) { if (console) console.warn('token unproviden'); return {}; }

    return { accessToken: '12' }
  }

}
