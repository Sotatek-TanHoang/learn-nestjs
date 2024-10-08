import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'libs/configuration/src';

import { JobProviderCommand } from './job-provider.command';

@Module({
  imports: [ConfigurationModule],
  providers: [JobProviderCommand],
})
export class JobProviderModule {}
