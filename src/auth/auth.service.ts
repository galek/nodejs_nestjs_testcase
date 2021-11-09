import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from "@nestjs/swagger";

export class AuthInfoDTO {
    @ApiProperty({
        type: String,
        description: 'userName for auth',
        required: true
    })
    username: string;

    @ApiProperty({
        type: String,
        description: 'password for auth',
        required: true
    })
    password: string;
}

export class AuthInfoAddInfoDTO extends AuthInfoDTO {
    id?: number
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    public async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    public async login(user: AuthInfoAddInfoDTO) {
        console.assert(user, '[AuthService.login] user is null');
        if (!user) return undefined;

        const result = await this.validateUser(user.username, user.password);

        console.assert(result, 'Invalid auth result');

        if (!result) {
            return undefined
        }

        // Generate access token
        const payload = { username: user.username, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        return { access_token }
    }
}
