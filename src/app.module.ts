import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VoteController, AbstractToken, DBDriver, Results } from './vote.service';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GetTokenController } from './auth/get-token/get-token.controller';

@Module({
  controllers: [AppController, VoteController, AbstractToken, Results, GetTokenController],
  providers: [AppService, DBDriver],
  imports: [AuthModule],
})
export class AppModule { }
