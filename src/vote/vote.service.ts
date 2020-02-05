/*

TODO: 
1) Support uint numbers only for vote
*/

import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as rawbody from 'raw-body';
import { DBDriver } from '../DBDriver/dbdriver';

/**
 * Vote controller
 */
@Controller('vote')
export class VoteController {
  constructor(private dbDriver: DBDriver) { }

  /**
   * Function for vote
   */
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
    
  }
}