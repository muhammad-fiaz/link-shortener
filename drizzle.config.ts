import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config(); // Load .env variables

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    strict: true,
    verbose: true,
});
