import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { VoteModule } from './vote/vote.module';
import { DBDriverModule } from './dbdriver/dbdriver.module';
import { ResultsModule } from './results/results.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (process.env.NODE_ENV ? process.env.NODE_ENV : '') + '.env',
    }),
    PrometheusModule.register({
      path: '/metrics',
    }),
    DBDriverModule,
    ResultsModule,
    VoteModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  providers: [AppService],
})
export class AppModule {}
