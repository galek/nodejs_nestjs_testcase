import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DBDriverService } from '../DBDriver/dbdriver.service';

/**
 * ResultsService controller
 */
@Controller('results')
export class ResultsService {
  constructor(private readonly dbDriver: DBDriverService) {}

  /**
   * function what provided results from DB
   * @public
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async results() {
    return JSON.stringify(this.dbDriver.getResults());
  }
}
