import { Injectable } from '@nestjs/common';

export type User = any;

/**
 * User-password container
 * TODO: replace on one token FOR BELL
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

  /**
   * Function what will find a user what associated username
   * @public
   */
  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
