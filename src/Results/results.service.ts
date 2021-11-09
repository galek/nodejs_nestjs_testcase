import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DBDriverService } from '../DBDriver/dbdriver.service';


@Controller('results')
export class ResultsService {
    constructor(private readonly dbDriver: DBDriverService) {
    }

    /**
     * function what provided results from DB
     * @public
     */
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async results() {
        return JSON.stringify(this.dbDriver.getResults());
    }
}
