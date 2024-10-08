import { CommandFactory } from 'nest-commander';

import { JobProviderModule } from './job-provider.module';

async function bootstrap() {
  const app = await CommandFactory.createWithoutRunning(JobProviderModule);
  app.enableShutdownHooks();
  await CommandFactory.runApplication(app);
}
bootstrap();
