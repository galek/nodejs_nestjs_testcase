import { Injectable } from '@nestjs/common';

export type User = any;

/**
 * User-password container
 */
@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  findOne(username: string): User {
    return this.users.find((user) => user.username === username);
  }
}
