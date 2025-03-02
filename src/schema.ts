import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
    id: text("id").primaryKey(),
    originalUrl: text("original_url").notNull(),
    shortCode: varchar("short_code", { length: 10 }).notNull().unique(),
});
