import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AbstactToken } from '../common/interfaces';

/**
 * Auth service
 */
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    /**
     * Function what provided validation by username-password
     * TODO: replace on one token FOR BELL
     */
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Function providing login
     * TODO: replace on one token FOR BELL
     */
    async login(user: any): Promise<AbstactToken> {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}