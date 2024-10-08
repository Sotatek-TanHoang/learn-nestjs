import { sleep } from '@helpers/time';
import { ITestKafaMessage } from '@interfaces/test-kafka.interface';
import { KafkaService } from '@shared-modules/kafka/base-kakfa.service';
import { LoggerService } from 'libs/configuration/src/modules/logger/logger.service';
import { Command, CommandRunner } from 'nest-commander';

interface BasicCommandOptions {
  name: string;
}

@Command({ name: 'produce', description: 'product job' })
export class JobProviderCommand extends CommandRunner {
  constructor(private readonly loggerService: LoggerService, private kafkaService: KafkaService) {
    super();
  }
  private logService = this.loggerService.getLogger('CRAWLER_COMMAND');
  async run(passedParam: string[], options?: BasicCommandOptions): Promise<void> {
    this.logService.info('started', passedParam, options);
    while (true) {
      for (const topic of passedParam) {
        this.logService.info('sending to', topic);
        await this.kafkaService.sendMessage<ITestKafaMessage>(topic, { age: 18, name: Date.now().toString() });
      }
      await sleep(1, 'secs');
    }
  }
}
