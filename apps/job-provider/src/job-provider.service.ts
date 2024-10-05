import { Injectable } from '@nestjs/common';

@Injectable()
export class JobProviderService {
  getHello(): string {
    return 'Hello World!';
  }
}
