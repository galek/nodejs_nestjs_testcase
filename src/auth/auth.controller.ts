import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthInfoAddInfoDTO, AuthInfoDTO, AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './common/guards/local-auth.guard';
import { DebugInfo, ResponseObject } from '../common/interfaces';
import { DebugHttp } from '../utils/debuginfo.decorator';

@ApiTags('Authentication service')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('get-token')
  @ApiBody({ type: AuthInfoDTO })
  @Version('1')
  async login(@DebugHttp() debugInfo: DebugInfo, @Body() body: AuthInfoAddInfoDTO): Promise<ResponseObject> {
    const result = this.authService.login(body);
    if (!result)
      throw new HttpException(
        {
          status: 'error',
          error: '[AuthController.login] Failed auth',
        },
        HttpStatus.BAD_REQUEST,
      );

    return { success: true, data: result, debugInfo };
  }
}
