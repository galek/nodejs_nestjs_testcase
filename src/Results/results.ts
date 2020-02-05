import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DBDriver } from '../DBDriver/dbdriver';

/**
 * Results controller
 */
@Controller('results')
export class Results {
    constructor(private readonly dbDriver: DBDriver) { }

    /**
    * function what provided results from DB
    */
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async results() {
        return JSON.stringify(this.dbDriver.getResults());
    }
}