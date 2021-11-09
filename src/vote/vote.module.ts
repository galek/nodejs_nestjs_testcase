import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { DBDriverModule } from '../DBDriver/dbdriver.module';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
  exports: [VoteService],
  imports: [DBDriverModule],
})
export class VoteModule {}
