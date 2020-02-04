import { Module, Injectable, UnauthorizedException } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { DBDriver, VoteController, Results } from './vote.service';

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
