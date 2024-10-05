import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'libs/configuration/src';

import { JobProviderCommand } from './job-provider.command';
import { JobProviderService } from './job-provider.service';

@Module({
  imports: [ConfigurationModule],
  providers: [JobProviderService, JobProviderCommand],
})
export class JobProviderModule {}
