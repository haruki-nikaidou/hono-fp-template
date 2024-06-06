import {none, TaskOption, tryCatch} from 'fp-ts/TaskOption';
import {UserAuthRecord} from '../../../../application/dto/userAuth';
import {db} from '../pgConnection';
import {userAuthPair} from '../models/auth/userAuthPair';
import {and, eq} from 'drizzle-orm';
import validator from 'validator';

export function queryUserAuthPair(
  provider: string,
  key: string
): TaskOption<UserAuthRecord> {
  return tryCatch(async () => {
    return (await db
      .select()
      .from(userAuthPair)
      .where(
        and(
          eq(userAuthPair.authProvider, provider),
          eq(userAuthPair.authKey, key)
        )
      ))[0];
  })
}

export function findUserAuth(userId: string): TaskOption<UserAuthRecord[]> {
  if (!validator.isUUID(userId)) {
    return none;
  }
  return tryCatch(async () => {
    return (await db
      .select()
      .from(userAuthPair)
      .where(eq(userAuthPair.userId, userId)));
  })
}