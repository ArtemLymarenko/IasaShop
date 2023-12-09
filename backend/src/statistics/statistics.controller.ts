import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';


@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @HttpCode(200)
  @Get('main/:id')
  getMainStatistics(@Param('id') id: number){
    return this.statisticsService.getMain(+id)
  }
}

