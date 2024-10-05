import { LoggerService } from 'libs/configuration/src/modules/logger/logger.service';
import { Command, CommandRunner, Option } from 'nest-commander';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({ name: 'basic', description: 'A parameter parse' })
export class CrawlerCommand extends CommandRunner {
  constructor(private readonly loggerService: LoggerService) {
    super();
  }
  private logService = this.loggerService.getLogger('CRAWLER_COMMAND');
  async run(passedParam: string[], options?: BasicCommandOptions): Promise<void> {
    if (options?.boolean !== undefined && options?.boolean !== null) {
      this.runWithBoolean(passedParam, options.boolean);
    } else if (options?.number) {
      this.runWithNumber(passedParam, options.number);
    } else if (options?.string) {
      this.runWithString(passedParam, options.string);
    } else {
      this.runWithNone(passedParam);
    }
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --boolean [boolean]',
    description: 'A boolean parser',
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val);
  }

  runWithString(param: string[], option: string): void {
    this.logService.info({ param, string: option });
  }

  runWithNumber(param: string[], option: number): void {
    this.logService.info({ param, number: option });
  }

  runWithBoolean(param: string[], option: boolean): void {
    this.logService.info({ param, boolean: option });
  }

  runWithNone(param: string[]): void {
    this.logService.info({ param });
  }
}
