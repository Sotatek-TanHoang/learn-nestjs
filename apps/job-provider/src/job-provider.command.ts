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
      await this.kafkaService.sendMessage<ITestKafaMessage>('test_topic', { age: 18, name: 'tanhoangminh' });
      await sleep(5, 'secs');
    }
  }
}
