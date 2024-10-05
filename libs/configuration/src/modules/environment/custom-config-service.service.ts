import { IEnvVariable } from '@interfaces/env.interface';
import { ConfigService as BasConfigService } from '@nestjs/config';

import { initEnviromentObject } from './config-getter.utils';

export class CustomConfigService extends BasConfigService {
  getAllConfig(): IEnvVariable {
    return initEnviromentObject(process.env);
  }
}
