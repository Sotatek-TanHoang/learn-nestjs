export interface IEnvVariable {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  kafka: {
    brokers: string[];
    clientId: string;
    groupId: string;
  };
}
