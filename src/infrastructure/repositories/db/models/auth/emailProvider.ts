import {boolean, pgTable, text, timestamp, uniqueIndex, varchar} from 'drizzle-orm/pg-core';

export const emailProvider = pgTable('email_provider', {
  email: varchar('email', {length: 512}).unique().primaryKey(),
  passwordHash: text('password_hash').notNull(),
  authKey: varchar('auth_key', {length: 64}).notNull().unique(),
  verifyCode: varchar('verify_code', {length: 8}),
  verifyCodeSentAt: timestamp('verify_code_sent_at'),
  verified: boolean('verified').notNull().default(false),
  verifiedAt: timestamp('verified_at'),
}, table => ({
  authKeyIndex: uniqueIndex('auth_key_index').on(table.authKey)
}))