import { Module } from '@nestjs/common';
import { JobProviderController } from './job-provider.controller';
import { JobProviderService } from './job-provider.service';

@Module({
  imports: [],
  controllers: [JobProviderController],
  providers: [JobProviderService],
})
export class JobProviderModule {}
