import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheck')
@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get('healthCheck')
  async healthCheck() {
    return this.app.healthCheck();
  }
}
