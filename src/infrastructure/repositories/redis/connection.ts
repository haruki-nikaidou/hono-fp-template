import Redis from 'ioredis';
import {EnvConfig} from '../../config';
import {IO} from 'fp-ts/IO';

const redisInstance = new Redis(EnvConfig.redisUrl);

export const redis: IO<typeof redisInstance> = () => redisInstance;