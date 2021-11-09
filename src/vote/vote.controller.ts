/*TODO:
1) Support uint numbers only for vote
*/

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DBDriverService } from '../DBDriver/dbdriver.service';
import { VoteService } from './vote.service';

/**
 * Vote controller
 */
@Controller('vote')
export class VoteController {
    constructor(private readonly dbDriver: DBDriverService, private readonly voteService: VoteService) {
    }

    /**
     * Function for vote
     * @public
     */
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async vote(@Body() data, @Req() req) {
        // TODO: uncomment it
        /*
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
        }*/
    }
}
