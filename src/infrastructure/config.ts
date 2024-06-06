import 'dotenv/config';

export const EnvConfig = {
  pgUrl: process.env.PG_URL!,
  redisUrl: process.env.REDIS_URL ?? 'redis://127.0.0.1:6379/2',
  appName: process.env.APP_NAME!,
  smtp: {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  }
};

export type EnvConfigType = typeof EnvConfig;