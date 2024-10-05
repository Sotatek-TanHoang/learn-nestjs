import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigurationModule } from 'libs/configuration/src';

@Module({
  imports: [ConfigurationModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
