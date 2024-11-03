import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CharacterService } from './character.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private service: CharacterService) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  handleCron() {
    this.logger.log('Running each 12 migration');
    this.service.runUpdate();
  }
}
