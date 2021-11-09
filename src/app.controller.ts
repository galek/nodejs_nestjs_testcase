import { Controller } from '@nestjs/common';

export class GetTokenDTO {
    username: string;
    password: string;
}

@Controller()
export class AppController {
    constructor() {
    }
}
