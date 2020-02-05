import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DBDriver } from '../DBDriver/dbdriver';

@Controller('results')
export class Results {
    constructor(private readonly dbDriver: DBDriver) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async results() {
        return JSON.stringify(this.dbDriver.getResults());
    }
}