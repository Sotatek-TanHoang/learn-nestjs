import { EEnvKey } from '@constant/env.constant';
import { isDevelopmentEnvironment } from '@helpers/env.helper';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import entities from './entities';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env[EEnvKey.DB_HOST],
  port: +process.env[EEnvKey.DB_PORT],
  username: process.env[EEnvKey.DB_USERNAME],
  password: process.env[EEnvKey.DB_PASSWORD],
  database: process.env[EEnvKey.DB_DATABASE],
  entities: entities,
  logging: isDevelopmentEnvironment(),
  //           project root      migration dir
  migrations: [process.cwd() + '/libs/configuration/src/modules/database/migrations/*.ts'],
  cache: true,
  extra: { decimalNumbers: true },
});
