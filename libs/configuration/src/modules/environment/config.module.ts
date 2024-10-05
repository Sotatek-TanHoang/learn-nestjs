import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as Joi from 'joi';
import { EEnvironments, EEnvKey } from '../../constants/env.constant';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        [EEnvKey.NODE_ENV]: Joi.string()
          .valid(...Object.values(EEnvironments))
          .default(EEnvironments.DEV),
        [EEnvKey.PORT]: Joi.number().default(3000),
        [EEnvKey.TZ]: Joi.string().default('UTC'),
        [EEnvKey.GLOBAL_PREFIX]: Joi.string(),
        [EEnvKey.SWAGGER_PATH]: Joi.string(),
        [EEnvKey.LOG_LEVEL]: Joi.string().valid(),
        [EEnvKey.IS_WRITE_LOG]: Joi.string().valid('yes', 'no'),
        // database
        [EEnvKey.DB_HOST]: Joi.string().default('localhost'),
        [EEnvKey.DB_PORT]: Joi.number().default(5432),
        [EEnvKey.DB_USERNAME]: Joi.string().required(),
        [EEnvKey.DB_PASSWORD]: Joi.string().required(),
        // JWT KEY
        [EEnvKey.JWT_SECRET_KEY]: Joi.string().required(),
        [EEnvKey.JWT_REFRESH_SECRET_KEY]: Joi.string().required(),
        [EEnvKey.JWT_ACCESS_TOKEN_EXPIRE]: Joi.string().required(),
        [EEnvKey.JWT_REFRESH_TOKEN_EXPIRE]: Joi.string().required(),
      }),
      load: [],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class EnvironmentConfigurationModule {}
