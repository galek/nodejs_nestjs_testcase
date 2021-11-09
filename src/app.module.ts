import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { VoteModule } from './vote/vote.module';
import { DBDriverModule } from './DBDriver/dbdriver.module';
import { ResultsModule } from './Results/results.module';

@Module({
    controllers: [AppController],
    imports: [
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
export class AppModule {
}
