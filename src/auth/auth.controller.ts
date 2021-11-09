import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AbstractToken } from "../common/interfaces";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";

/**
 * Vote controller
 */
@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Req() req): Promise<AbstractToken> {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    public getProfile(@Req() req) {
        return req.user;
    }
}
