import { EEnvKey } from '@constant/env.constant';
import { isDevelopmentEnvironment } from '@helpers/env.helper';
import * as dotenv from 'dotenv';
import { join } from 'path';
import type { DataSourceOptions } from 'typeorm';

dotenv.config();
export const migrationDir = __dirname + 'database/migrations';
export default {
  type: 'postgres',
  host: process.env[EEnvKey.DB_HOST],
  port: +process.env[EEnvKey.DB_PORT],
  username: process.env[EEnvKey.DB_USERNAME],
  password: process.env[EEnvKey.DB_PASSWORD],
  database: process.env[EEnvKey.DB_DATABASE],
  entities: [__dirname + '/modules/**/entities/*.entity{.js,.ts}'],
  migrationsTableName: 'custom_migration_table',
  migrations: [join(migrationDir, '*{.js,.ts}')],
  logging: isDevelopmentEnvironment(),
  cache: true,
  timezone: 'Z',
  extra: { decimalNumbers: true },
} as DataSourceOptions;
