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