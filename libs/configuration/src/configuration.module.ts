import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared-modules/database/database.module';
import { EnvironmentConfigurationModule } from '@shared-modules/environment/config.module';
import { KafkaModule } from '@shared-modules/kafka/kafka.module';
import { LoggingModule } from '@shared-modules/logger/logger.module';

@Module({
  imports: [EnvironmentConfigurationModule, LoggingModule, DatabaseModule, KafkaModule],
})
export class ConfigurationModule {}
