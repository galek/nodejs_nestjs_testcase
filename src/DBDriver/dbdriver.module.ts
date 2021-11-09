import { Module } from '@nestjs/common';
import { DBDriverService } from './dbdriver.service';

@Module({
    providers: [DBDriverService],
    exports: [DBDriverService],
})
export class DBDriverModule {
}
