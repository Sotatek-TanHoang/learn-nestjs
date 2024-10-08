import { CommandFactory } from 'nest-commander';

import { CrawlerModule } from './crawler.module';

async function bootstrap() {
  const app = await CommandFactory.createWithoutRunning(CrawlerModule);
  app.enableShutdownHooks();
  await CommandFactory.runApplication(app);
}

bootstrap();
