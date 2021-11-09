import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { DBDriverModule } from '../DBDriver/dbdriver.module';
import { ResultsController } from "./results.controller";

@Module({
    imports: [DBDriverModule],
    providers: [ResultsService],
    exports: [ResultsService],
    controllers: [ResultsController]
})
export class ResultsModule {
}
