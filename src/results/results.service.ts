import { Injectable } from '@nestjs/common';
import { DBDriverService } from '../dbdriver/dbdriver.service';
import { ResultObject } from '../common/interfaces';

@Injectable()
export class ResultsService {
  constructor(private readonly dbDriver: DBDriverService) {}

  results(): Array<ResultObject> {
    return this.dbDriver.getResults();
  }
}
