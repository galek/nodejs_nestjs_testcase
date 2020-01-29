import { AppService } from "./app.service";
import { Controller, Body, Post, ValidationPipe, Req, Injectable } from "@nestjs/common";
import { PayLoadObject, AbstactToken, AbstactKey, ResponseObject } from "./interfaces";
import * as rawbody from 'raw-body';

@Injectable()
export class DBDriver {
  writeToDB(value: string): ResponseObject {
    if (!value) return { success: false };
    return { success: true };
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
