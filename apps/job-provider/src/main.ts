import { CommandFactory } from 'nest-commander';

import { JobProviderModule } from './job-provider.module';

async function bootstrap() {
  await CommandFactory.run(JobProviderModule, ['error', 'warn']);
}
bootstrap();
