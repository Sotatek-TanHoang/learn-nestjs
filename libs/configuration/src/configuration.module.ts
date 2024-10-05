import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared-modules/database/database.module';
import { EnvironmentConfigurationModule } from '@shared-modules/environment/config.module';
import { LoggingModule } from '@shared-modules/logger/logger.module';

@Module({
  imports: [EnvironmentConfigurationModule, LoggingModule, DatabaseModule],
})
export class ConfigurationModule {}
