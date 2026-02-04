import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'
import path from "path"
dotenv.config({ path : path.resolve(__dirname,'../../.env')})
if(!process.env.DATABASE_URL)
{
    throw new Error('DATABASE_URL is not defined in .env');
}

export default defineConfig(
    {
        schema:"./src/schema.ts",
        out:"./drizzle",
        dialect:'postgresql',
        dbCredentials:{ url:process.env.DATABASE_URL!,},
        verbose:true,
        strict:true,
    }
)