import 'dotenv/config';

export const EnvConfig = {
  pgUrl: process.env.PG_URL!,
  redisUrl: process.env.REDIS_URL ?? 'redis://127.0.0.1:6379/2',
};

export type EnvConfigType = typeof EnvConfig;