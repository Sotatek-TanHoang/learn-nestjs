import { Global, Module } from '@nestjs/common';

import { KafkaService } from './base-kakfa.service';

@Global()
@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
