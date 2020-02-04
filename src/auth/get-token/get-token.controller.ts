import { Controller, Get, Post, Req, Body, UseGuards, Injectable, UnauthorizedException } from '@nestjs/common';
import { AbstactToken } from '../../interfaces';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export const jwtConstants = {
    secret: 'secretKey',
};

@Injectable()
export class AuthService {
    private tokenType = 'bearer';

    constructor(private readonly jwtService: JwtService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        // const user = await this.usersService.findOne(username);
        // if (user && user.password === pass) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        return null;
    }

    // async login(user: any) {
    //     const payload = { username: user.username, sub: user.userId };
    //     // const expiresIn = 60;
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //         token_type: this.tokenType,
    //         // refresh_token: '',
    //         // expires_in: expiresIn,
    //     };
    // }
    public generateTokenJwt(payload: object, expiresIn: number) {
        const accessToken = this.jwtService.sign(payload);
        return {
            access_token: accessToken,
            // token_type: this.tokenType,
            // refresh_token: "",
            // expires_in: expiresIn,
        };
    }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}

@Controller('get-token')
export class GetTokenController {

    @UseGuards(AuthGuard('local'))
    @Post()
    async generateTokenByKey(@Body() data, @Req() req) {
        return { accessToken: 'string', provided: data.accessKey, accessKey: 'str' }
    }

}
