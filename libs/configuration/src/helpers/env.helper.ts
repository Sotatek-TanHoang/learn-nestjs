import { EEnvironments, EEnvKey } from '../constants/env.constant';

export const isDevelopmentEnvironment = () =>
  [EEnvironments.LOCAL, EEnvironments.DEV].includes(
    process.env[EEnvKey.NODE_ENV] as EEnvironments,
  );
