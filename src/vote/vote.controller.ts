import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { DBDriverService } from '../dbdriver/dbdriver.service';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DebugInfo, ResponseObject } from '../common/interfaces';
import { DebugHttp } from '../utils/debuginfo.decorator';

export class VoteForDTO {
  @ApiProperty({
    type: String,
    description: 'voteFor',
    required: true,
  })
  voteFor: string;
}

@ApiTags('Vote service')
@Controller('vote')
export class VoteController {
  constructor(private readonly dbDriver: DBDriverService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Version('1')
  @Post()
  async vote(@DebugHttp() debugInfo: DebugInfo, @Body() data: VoteForDTO): Promise<ResponseObject> {
    const res: number = this.dbDriver.writeToDB(data.voteFor);
    if (res === -1) {
      debugInfo.description = '[DBDriverService.writeToDB] Invalid value has been provided';

      return { success: false, debugInfo };
    }

    if (res === 0) {
      debugInfo.description = 'created new user';
      return { success: true, debugInfo };
    }

    debugInfo.description = 'increment for user';
    return { success: true, debugInfo };
  }
}
