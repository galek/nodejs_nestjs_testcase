import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { DBDriverService } from '../DBDriver/dbdriver.service';
import { VoteService } from './vote.service';
import { JwtAuthGuard } from "../auth/common/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { ResponseObject } from "../common/interfaces";

export class VoteForDTO {
    @ApiProperty({
        type: String,
        description: 'voteFor',
        required: true
    })
    voteFor: string;
}

@ApiTags('Vote service')
@Controller('vote')
export class VoteController {
    constructor(private readonly dbDriver: DBDriverService, private readonly voteService: VoteService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @Version('1')
    @Post()
    async vote(@Body() data: VoteForDTO): Promise<ResponseObject> {
        return this.dbDriver.writeToDB(data.voteFor);
    }
}
