import { ITestKafaMessage } from '@interfaces/test-kafka.interface';
import { KafkaService } from '@shared-modules/kafka/base-kakfa.service';
import { LoggerService } from 'libs/configuration/src/modules/logger/logger.service';
import { Command, CommandRunner } from 'nest-commander';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({ name: 'basic', description: 'A parameter parse' })
export class CrawlerCommand extends CommandRunner {
  constructor(private readonly loggerService: LoggerService, private readonly kafkaService: KafkaService) {
    super();
  }
  private logService = this.loggerService.getLogger('CRAWLER_COMMAND');
  async run(passedParam: string[], options?: BasicCommandOptions): Promise<void> {
    this.logService.info(passedParam, options);
    await this.kafkaService.consumeMessages<ITestKafaMessage>('test_topic', async (data: ITestKafaMessage) => {
      this.logService.info(data);
      return true;
    });
  }
}
