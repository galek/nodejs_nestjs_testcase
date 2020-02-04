import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AbstactToken } from '../../interfaces';

@Controller('get-token')
export class GetTokenController {
    @Post()
    async generateTokenByKey(@Body() data, @Req() req) {
        return { accessToken: 'string', provided: data.accessKey, accessKey: 'str' }
    }

}
