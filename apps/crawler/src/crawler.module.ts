import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'libs/configuration/src';

import { CrawlerCommand } from './crawler.command';

@Module({
  imports: [ConfigurationModule],
  providers: [CrawlerCommand],
})
export class CrawlerModule {}
