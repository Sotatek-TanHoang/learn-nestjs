import { Controller, Get } from '@nestjs/common';
import { JobProviderService } from './job-provider.service';

@Controller()
export class JobProviderController {
  constructor(private readonly jobProviderService: JobProviderService) {}

  @Get()
  getHello(): string {
    return this.jobProviderService.getHello();
  }
}
