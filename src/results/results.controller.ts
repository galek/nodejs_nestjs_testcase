import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseObject, ResultObject } from '../common/interfaces';
import { DebugHttp } from '../utils/debuginfo.decorator';

@ApiTags('Vote service')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @Version('1')
  async results(@DebugHttp() debugInfo): Promise<ResponseObject> {
    const data: Array<ResultObject> = this.resultsService.results();
    return { success: true, data, debugInfo };
  }
}
