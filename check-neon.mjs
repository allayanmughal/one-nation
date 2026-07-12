import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const result = await sql`select id, full_name, email, phone, city, notes from volunteers order by id desc limit 10`;
console.log(JSON.stringify(result, null, 2));
