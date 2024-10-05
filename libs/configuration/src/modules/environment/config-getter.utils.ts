import { EEnvKey } from '@constant/env.constant';
import { IEnvVariable } from '@interfaces/env.interface';

export const initEnviromentObject = (object: object): IEnvVariable => {
  return {
    database: {
      host: object[EEnvKey.DB_HOST],
      port: +object[EEnvKey.DB_PORT],
      password: object[EEnvKey.DB_PASSWORD],
      username: object[EEnvKey.DB_USERNAME],
      database: object[EEnvKey.DB_DATABASE],
    },
    kafka: {
      brokers: object[EEnvKey.KAFKA_BROKERS].split(','),
      clientId: object[EEnvKey.DB_DATABASE],
      groupId: object[EEnvKey.KAFKA_GROUP_ID],
    },
  };
};
