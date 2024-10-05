import { NestFactory } from '@nestjs/core';
import { CustomConfigService } from '@shared-modules/environment/custom-config-service.service';
import { LoggerService } from '@shared-modules/logger/logger.service';
import { EEnvKey } from 'libs/configuration/src/constants/env.constant';
import { ResponseTransformInterceptor } from 'libs/configuration/src/intecepters/response.intercepter';

import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const config = app.get(CustomConfigService);
  app.useGlobalInterceptors(new ResponseTransformInterceptor(app.get(LoggerService)));
  await app.listen(config.get(EEnvKey.PORT), () => {
    console.log(`Server is starting at ${config.get(EEnvKey.PORT)}`);
  });
}
bootstrap();
