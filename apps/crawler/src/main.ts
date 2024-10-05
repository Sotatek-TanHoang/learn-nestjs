import { CommandFactory } from 'nest-commander';

import { CrawlerModule } from './crawler.module';

async function bootstrap() {
  await CommandFactory.run(CrawlerModule, ['warn', 'error']);
}

bootstrap();
