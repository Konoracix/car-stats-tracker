// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './db/schema/*',
  dialect: 'postgresql', // "mysql" | "sqlite"
  out: './db/migrations',
  migrations: {
    table: 'migrations_custom', // default `__drizzle_migrations`,
    schema: 'public', // used in PostgreSQL only and default to `drizzle`
  },
  dbCredentials: { url: process.env.DRIZZLE_DATABASE_URL },
});
