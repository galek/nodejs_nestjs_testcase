import { Module, Injectable, UnauthorizedException } from '@nestjs/common';
import { AppController } from './app.controller';
import { VoteController, AbstractToken, DBDriver, Results } from './vote.service';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GetTokenController, AuthService, LocalStrategy, JwtStrategy } from './auth/get-token/get-token.controller';

import { JwtModule } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Module({
  controllers: [AppController, VoteController, AbstractToken, Results, GetTokenController],
  imports: [AuthModule,
    JwtModule.register({
      secret: 'secret'
    })],
  providers: [AuthService, AppService, DBDriver, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule { }
