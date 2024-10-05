import { isDevelopmentEnvironment } from '@helpers/env.helper';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigService } from '@shared-modules/environment/custom-config-service.service';

import entities from './entities';
import { UserRepository } from './repositories/user.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [CustomConfigService],
      useFactory: async (config: CustomConfigService) => {
        return {
          type: 'postgres',
          logging: isDevelopmentEnvironment(),
          entities,
          cache: true,
          extra: { decimalNumbers: true },
          ...config.getAllConfig().database,
        };
      },
    }),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
