import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { ResultsService } from "./results.service";
import { JwtAuthGuard } from "../auth/common/guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Vote service')
@Controller('results')
export class ResultsController {
    constructor(private readonly resultsService: ResultsService) {
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    @Version('1')
    async results() {
        return this.resultsService.results()
    }
}
