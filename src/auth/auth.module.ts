import { Module } from '@nestjs/common';
import { GetTokenController } from './get-token/get-token.controller';

@Module({
  controllers: [GetTokenController]
})
export class AuthModule {}
