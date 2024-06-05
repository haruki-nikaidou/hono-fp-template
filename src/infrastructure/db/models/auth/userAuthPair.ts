import {index, pgTable, primaryKey, uuid, varchar} from 'drizzle-orm/pg-core';

export const userAuthPair = pgTable('user_auth_pair', {
  authProvider: varchar('auth_provider', {length: 32}).notNull(),
  authKey: varchar('auth_key', {length: 256}).notNull(),
  userId: uuid('user_id').notNull(),
}, table => ({
  reverseUserIndex: index('reverse_user_index').on(table.userId),
  primary: primaryKey({columns: [table.authKey, table.authProvider]})
}))