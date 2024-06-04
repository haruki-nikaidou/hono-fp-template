import 'dotenv/config';

export const EnvConfig = {
  pgUrl: process.env.PG_URL!,
}

export type EnvConfigType = typeof EnvConfig;