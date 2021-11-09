import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, Version } from '@nestjs/common';
import { AuthInfoAddInfoDTO, AuthInfoDTO, AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./common/guards/local-auth.guard";

@ApiTags('Authentication service')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('get-token')
    @ApiBody({ type: AuthInfoDTO })
    @Version('1')
    async login(@Body() body: AuthInfoAddInfoDTO) {
        // TODO: remove it line
        console.assert(false, 'sdas ' + JSON.stringify(body))

        const result = await this.authService.login(body);
        if (!result) throw new HttpException({
                status: 'error',
                error: 'Failed auth'
            },
            HttpStatus.BAD_REQUEST
        )

        return { status: true, result }
    }
}
