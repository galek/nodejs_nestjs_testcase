/*

TODO: 
1) Support uint numbers only for vote
*/

import { Injectable, Controller, UseGuards, Get, Post, Body, Req } from '@nestjs/common';
import { ResponseObject } from './interfaces';
import { AuthGuard } from '@nestjs/passport';
import * as rawbody from 'raw-body';

@Injectable()
export class DBDriver {
  votesArray: Array<{ name: string, votes: number, position: number, timestamp: number }>
    = new Array<{ name: string, votes: number, position: number, timestamp: number }>();

  writeToDB(value: string): ResponseObject {
    if (!value) return { success: false };
    return this._logicImpl(value);
  }

  // It's not be async!
  getResults() {
    this.votesArray.sort((a, b) => {
      if (a.votes > b.votes) { return -1; }
      if (a.votes < b.votes) { return 1; }
      return 0;
    });

    /*
    result: [{"name":"3","votes":2,"position":1,"timestamp":1580927100409},{"name":"4","votes":2,"position":2,"timestamp":1580927098313},{"name":"-1","votes":1,"position":3,"timestamp":1580927065863}]
    */
    this.votesArray.sort((a, b) => {
      // Частный случай: - когда votes одинаковы, обрабатываем приоритетный тот за который отдали первый голос (появился в базе данных самый первый)
      // Что и делаем, вводим timestamp
      // Можно сделать обработку как того, за которого отдали последний голос (см ниже)
      // TODO: см 'тут определите логику как нужно'
      if (b.votes === a.votes) {
        if (console) console.log('votes is equal');

        // Если нужно отображать тот за который проголосовали последним
        // return b.timestamp - a.timestamp;
        return a.timestamp - b.timestamp;
      }
      // Иначе обычная сортировка
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
      // TODO: тут определите логику как нужно
      // Обновляем дату последнего голоса
      // obj.timestamp = Date.now();
    }
    else {
      // Позиция не определена еще
      this.votesArray.push({ name: value, votes: 1, position: 0, timestamp: Date.now() });
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