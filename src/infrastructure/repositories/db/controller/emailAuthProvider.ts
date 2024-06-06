import {TaskOption, tryCatch} from 'fp-ts/TaskOption';
import {db} from '../pgConnection';
import {emailProvider} from '../models/auth/emailProvider';
import {and, eq} from 'drizzle-orm';
import {EmailAuthProviderRecord} from '../../../../application/dto/userAuth';

export function createEmailAuthRecord(
  email: string,
  passwordHash: string,
  authKey: string
): TaskOption<void> {
  return tryCatch(async () => {
    await db
      .insert(emailProvider)
      .values({
        email,
        passwordHash,
        authKey
      })
      .onConflictDoUpdate({
        target: [emailProvider.passwordHash, emailProvider.authKey],
        set: {
          passwordHash,
          authKey
        }
      });
  })
}

export function recordStartEmailVerify(email: string, code: string): TaskOption<void> {
  return tryCatch(async () => {
    await db
      .update(emailProvider)
      .set({
        verifyCode: code,
        verifyCodeSentAt: new Date(),
      })
      .where(
        eq(emailProvider.email, email)
      );
  })
}

export function setVerified(email: string): TaskOption<void> {
  return tryCatch(async () => {
    await db
      .update(emailProvider)
      .set({
        verified: true,
        verifiedAt: new Date(),
      })
      .where(
        eq(emailProvider.email, email)
      );
  })
}

export function findAuthedRecord(email: string): TaskOption<EmailAuthProviderRecord> {
  return tryCatch(async () => {
    const record = await db
      .select()
      .from(emailProvider)
      .where(
        and(
          eq(emailProvider.email, email),
          eq(emailProvider.verified, true),
        )
      );
    if (record.length === 0) {
      return Promise.reject();
    }
    return record[0];
  })
}

export function findByAuthKey(authKey: string): TaskOption<EmailAuthProviderRecord[]> {
  return tryCatch(async () => {
    return db
      .select()
      .from(emailProvider)
      .where(eq(emailProvider.authKey, authKey));
  })
}