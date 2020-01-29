import { Module } from '@nestjs/common';
import { AppController, ResultController } from './app.controller';
import { VoteController, AbstractToken, DBDriver } from './vote.service';

import { AppService } from './app.service';

@Module({
  controllers: [AppController, ResultController, VoteController, AbstractToken],
  providers: [AppService, DBDriver],
})
export class AppModule { }
