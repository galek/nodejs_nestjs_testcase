import { Injectable } from '@nestjs/common';
import { DBDriverService } from '../DBDriver/dbdriver.service';

@Injectable()
export class ResultsService {
    constructor(private readonly dbDriver: DBDriverService) {
    }

    results() {
        return JSON.stringify(this.dbDriver.getResults());
    }
}
