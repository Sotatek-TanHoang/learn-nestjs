import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EEnvKey } from 'libs/configuration/src/constants/env.constant';

@Injectable()
export class ApiService {
  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get(EEnvKey.NODE_ENV));
  }
  getHello(): string {
    return 'Hello World!';
  }
}
