import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: path.resolve(process.cwd(), '.env.local') });

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
