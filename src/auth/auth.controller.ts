import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthInfoAddInfoDTO, AuthInfoDTO, AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./common/guards/local-auth.guard";

/**
 * Vote controller
 */
@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: AuthInfoDTO })
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
