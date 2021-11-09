/*TODO:
1) Support uint numbers only for vote
*/

import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { DBDriverService } from '../DBDriver/dbdriver.service';
import { VoteService } from './vote.service';
import { JwtAuthGuard } from "../auth/common/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Vote service')
@Controller('vote')
export class VoteController {
    constructor(private readonly dbDriver: DBDriverService, private readonly voteService: VoteService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @Version('1')
    @Post()
    async vote(@Body() data) {
        if (data) return { data }

        return { message: 'data is not exist' }
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
