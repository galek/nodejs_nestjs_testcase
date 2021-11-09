import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthInfoAddInfoDTO, AuthInfoDTO, AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";

/**
 * Vote controller
 */
@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('login')
    @ApiBody({ type: AuthInfoDTO })
    public async login(@Body() body: AuthInfoAddInfoDTO) {
        const result = await this.authService.login(body);
        if (!result) throw new HttpException({
                status: 'error',
                error: 'Failed auth'
            },
            HttpStatus.BAD_REQUEST
        )

        return { status: true, result }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    public getProfile(@Req() req) {
        return req.user;
    }
}
