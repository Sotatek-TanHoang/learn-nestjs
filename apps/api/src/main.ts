import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EEnvKey } from 'libs/configuration/src/constants/env.constant';

import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const config = app.get(ConfigService);
  await app.listen(config.get(EEnvKey.PORT), () => {
    console.log(`Server is starting at ${config.get(EEnvKey.PORT)}`);
  });
}
bootstrap();
