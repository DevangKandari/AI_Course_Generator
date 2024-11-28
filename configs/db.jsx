import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" }); // or .env.local

const sql = neon(process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);
export const db = drizzle({ client: sql });
