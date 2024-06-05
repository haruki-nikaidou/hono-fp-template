import {DomainRedisKey, redisKeyFactory} from '../key';
import {SessionValue} from '../../../interface/dto/userAuth';
import * as IO from 'fp-ts/IO';
import {getRandomString} from '../../utils/rand';
import * as TO from 'fp-ts/TaskOption';
import {redis} from '../connection';

export type SessionRedisKey = DomainRedisKey<'auth', 'session', string>;

export type SessionRedisValue = SessionValue;

export function getSessionKey(sessionToken: string): SessionRedisKey {
  return redisKeyFactory('auth', 'session', sessionToken);
}

export function sessionValueToString(value: SessionValue): string {
  return JSON.stringify(value);
}

export function stringToSessionValue(value: string): SessionValue {
  return JSON.parse(value);
}

export function randomSessionKey(): IO.IO<string> {
  return getRandomString(64);
}

export function createSession(userId: string, expiresAt: Date): IO.IO<[SessionRedisKey, SessionRedisValue]> {
  return () => [
    getSessionKey(randomSessionKey()()),
    {userId, expiresAt}
  ];
}

export function writeInNewSession(userId: string, expiresAt: Date): TO.TaskOption<void> {
  return TO.tryCatch(async () => {
    const [key, value] = createSession(userId, expiresAt)();
    const keyString = key.toString();
    const valueString = sessionValueToString(value);
    await redis().set(keyString, valueString);
    await redis().expireat(keyString, Math.floor(expiresAt.getTime() / 1000));
  })
}

export function readSession(sessionToken: string): TO.TaskOption<SessionValue> {
  return TO.tryCatch(async () => {
    const value = await redis().get(getSessionKey(sessionToken).toString());
    if (value === null) {
      return Promise.reject('Session not found');
    }
    return stringToSessionValue(value);
  })
}