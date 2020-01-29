import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VoteController, AbstractToken, DBDriver, Results } from './vote.service';

import { AppService } from './app.service';

@Module({
  controllers: [AppController, VoteController, AbstractToken, Results],
  providers: [AppService, DBDriver],
})
export class AppModule { }
