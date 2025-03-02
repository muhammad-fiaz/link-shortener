import { Context } from "hono";
import { db } from "./db";
import { urls } from "./schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : process.env.BASE_URL;

// Create Short URL
export async function createShortURL(c: Context) {
    const { url } = await c.req.json();

    // Check if the URL already exists
    const existingUrl = await db.select().from(urls).where(eq(urls.originalUrl, url)).limit(1);
    if (existingUrl.length) {
        return c.json({ shortUrl: `${BASE_URL}/${existingUrl[0].shortCode}` });
    }

    // Create a new short URL
    const shortCode = randomUUID().slice(0, 6);

    await db.insert(urls).values({
        id: randomUUID(),
        originalUrl: url,
        shortCode,
    });

    return c.json({ shortUrl: `${BASE_URL}/${shortCode}` });
}

// Fetch all URLs
export async function fetchURLs(c: Context) {
    const result = await db.select().from(urls);
    const urlsWithBase = result.map(url => ({
        ...url,
        shortUrl: `${BASE_URL}/${url.shortCode}`,
    }));
    return c.json(urlsWithBase);
}

// Delete a URL
export async function deleteURL(c: Context) {
    const shortCode = c.req.param("shortCode");
    await db.delete(urls).where(eq(urls.shortCode, shortCode));
    return c.text("URL deleted", 200);
}

// Modify a URL
export async function modifyURL(c: Context) {
    const shortCode = c.req.param("shortCode");
    const { originalUrl } = await c.req.json();

    await db.update(urls).set({ originalUrl }).where(eq(urls.shortCode, shortCode));
    return c.text("URL updated", 200);
}

// Redirect to Original URL
export async function handleShortURL(c: Context) {
    const shortCode = c.req.param("shortCode");

    const result = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);

    if (result.length) {
        return c.redirect(result[0].originalUrl, 301);
    } else {
        return c.text("Short URL not found", 404);
    }
}