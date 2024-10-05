import { NestFactory } from '@nestjs/core';
import { JobProviderModule } from './job-provider.module';

async function bootstrap() {
  const app = await NestFactory.create(JobProviderModule);
  await app.listen(3000);
}
bootstrap();
