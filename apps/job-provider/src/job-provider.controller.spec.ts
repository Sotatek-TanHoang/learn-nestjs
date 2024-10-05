import { Test, TestingModule } from '@nestjs/testing';
import { JobProviderController } from './job-provider.controller';
import { JobProviderService } from './job-provider.service';

describe('JobProviderController', () => {
  let jobProviderController: JobProviderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobProviderController],
      providers: [JobProviderService],
    }).compile();

    jobProviderController = app.get<JobProviderController>(JobProviderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jobProviderController.getHello()).toBe('Hello World!');
    });
  });
});
