import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'libs/configuration/src';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
