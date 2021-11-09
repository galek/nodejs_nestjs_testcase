import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';

export class AuthInfoDTO {
  @ApiProperty({
    type: String,
    description: 'userName for auth',
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'password for auth',
    required: true,
  })
  password: string;
}

export class AuthInfoAddInfoDTO extends AuthInfoDTO {
  id?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string): Promise<User> {
    console.assert(
      username?.length > 0,
      '[AuthService.validateUser] invalid username has been provided',
    );
    console.assert(
      password?.length > 0,
      '[AuthService.validateUser] invalid password has been provided',
    );

    if (!(username?.length >= 0) || !(password?.length >= 0)) return undefined;

    const user: User = this.usersService.findOne(username);
    if (user?.password !== password) return undefined;

    const { ...result } = user;

    return result;
  }

  async login(user: AuthInfoAddInfoDTO) {
    console.assert(user, '[AuthService.login] user is invalid');
    if (!user) return undefined;

    const result = this.validateUser(user.username, user.password);

    console.assert(result, '[AuthService.login] Invalid auth result');

    if (!result) {
      return undefined;
    }

    const access_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });

    return { access_token };
  }
}
