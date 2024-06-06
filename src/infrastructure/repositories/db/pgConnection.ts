import {EnvConfig} from '../../config';
import * as postgres from 'postgres';
import {drizzle} from 'drizzle-orm/postgres-js';

const queryClient = postgres(EnvConfig.pgUrl);
export const db = drizzle(queryClient);