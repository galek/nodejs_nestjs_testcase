import { Module } from '@nestjs/common';
import { AppController, ResultController, VoteController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController, ResultController, VoteController],
  providers: [AppService],
})
export class AppModule {}
