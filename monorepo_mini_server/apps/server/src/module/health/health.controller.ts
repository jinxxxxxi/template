import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { AutoLog, LogCall, LogPerformance } from '../../decorators/auto-log.decorator';

@Controller('health')
export class HealthController {

  constructor(private readonly healthService: HealthService) {}

  @Get()
  @AutoLog({ 
    context: 'HealthController',
    logArgs: true,
    logResult: true,
    logError: true
  })
  getHealth() {
    const result = this.healthService.getHealth();
    return result;
  }

  @Get('detailed')
  @LogCall({ context: 'HealthController' })
  getDetailedHealth() {


    try {
      const result = this.healthService.getDetailedStatus();
      


      return result;
    } catch (error) {

      
      throw error;
    }
  }

  @Get('ping')
  @LogPerformance({ context: 'HealthController', threshold: 100 })
  ping() {

    return this.healthService.ping();
  }
} 