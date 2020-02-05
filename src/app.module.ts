/* Copyright (C) 2009-2020, Nick Galko. All rights reserved.
*
* This file is part of the Nick Galko source-code
* (http://https://galek.github.io/portfolio/).
*
* Your use and or redistribution of this software in source and / or
* binary form, with or without modification, is subject to: (i) your
* ongoing acceptance of and compliance with the terms and conditions of
* the Nick Galko License Agreement; and (ii) your inclusion of this notice
* in any version of this software that you use or redistribute.
* A copy of the NGTech License Agreement is available by contacting
* Nick Galko. at http://https://galek.github.io/portfolio/
*/
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
