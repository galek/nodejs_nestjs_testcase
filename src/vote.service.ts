import { Injectable, Controller, UseGuards, Get, Post, Body, Req } from "@nestjs/common";
import { ResponseObject } from "./interfaces";
import { AuthGuard } from "@nestjs/passport";
import * as rawbody from 'raw-body';

@Injectable()
export class DBDriver {
  votesArray: Array<{ name: string, votes: number, position: number }>
    = new Array<{ name: string, votes: number, position: number }>();

  writeToDB(value: string): ResponseObject {
    if (!value) return { success: false };
    return this._logicImpl(value);
  }

  getResults() {
    this.votesArray.sort((a, b) => {
      if (a.votes > b.votes) { return -1; }
      if (a.votes < b.votes) { return 1; }
      return 0;
    });

    // TODO:Errors and borderline cases must be taken into account
    // BUG: Частный случай: - когда votes одинаковы, отрабатывается первый (надо сделать по дате)
    this.votesArray.sort((a, b) => {
      return b.votes - a.votes;
    });

    // Позиция не может быть отрицательной
    let index: number = 1;

    this.votesArray.forEach(element => {
      element.position = index;
      index++;
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
      // Позиция не определена еще
      this.votesArray.push({ name: value, votes: 1, position: 0 });
      return { success: true };
    }

  }
}

@Controller('results')
export class Results {
  constructor(private readonly dbDriver: DBDriver) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async results() {
    return JSON.stringify(this.dbDriver.getResults());
  }
}

@Controller('vote')
export class VoteController {
  constructor(private dbDriver: DBDriver) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async vote(@Body() data, @Req() req) {

    // we have to check req.readable because of raw-body issue #57
    // https://github.com/stream-utils/raw-body/issues/57
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const text = raw.toString().trim();
      if (console) console.log('body is readable:', text);
      // TODO: Почитай, что это

    } else {
      // body is parsed by NestJS
      if (console) console.log('data not readable:', data);
      return this.dbDriver.writeToDB(data.voteFor);

    }

    // ...
  }
}