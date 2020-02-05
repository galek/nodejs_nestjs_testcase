import { Module, Injectable, UnauthorizedException } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { VoteController } from './vote/vote.service';
import { Results } from './Results/results';
import { DBDriver } from './DBDriver/DBDriver';

@Module({
  controllers: [AppController, VoteController, Results],
  imports: [UsersModule, AuthModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' }
    }), PassportModule],
  providers: [AppService, DBDriver],
})
export class AppModule { }
