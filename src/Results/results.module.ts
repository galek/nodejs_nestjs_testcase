import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { DBDriverModule } from '../DBDriver/dbdriver.module';

@Module({
  imports: [DBDriverModule],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
