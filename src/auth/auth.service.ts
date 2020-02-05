/* Copyright (C) 2009-2020, Nick Galko. All rights reserved.
*
* This file is part of the Nick Galko source-code
* (http://https://galek.github.io/portfolio/).
*
* Your use and or redistribution of this software in source and / or
* binary form, with or without modification, is subject to: (i) your
* ongoing acceptance of and compliance with the terms and conditions of
* the Nick Galko License Agreement; and (ii) your inclusion of this notice
* in any version of this software that you use or redistribute.
* A copy of the NGTech License Agreement is available by contacting
* Nick Galko. at http://https://galek.github.io/portfolio/
*/
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