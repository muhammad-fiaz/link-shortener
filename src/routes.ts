import { Context } from 'hono'
import { db } from './db'
import { urls } from './schema'
import { randomUUID } from 'crypto'
import {eq} from "drizzle-orm";

const BASE_URL = process.env.BASE_URL!

// Generate Short URL
export async function createShortURL(c: Context) {
    const { url } = await c.req.json()
    const shortCode = randomUUID().slice(0, 6)

    await db.insert(urls).values({
        id: randomUUID(),
        originalUrl: url,
        shortCode,
    })

    return c.json({ shortUrl: `${BASE_URL}/${shortCode}` })
}

// Redirect Short URL to Original
export async function handleShortURL(c: Context) {
    const shortCode = c.req.param('shortCode')

    const result = await db
        .select({ originalUrl: urls.originalUrl })
        .from(urls)
        .where(eq(urls.shortCode, shortCode))
        .limit(1)

    if (result.length) {
        return c.redirect(result[0].originalUrl, 301)
    } else {
        return c.text('Short URL not found', 404)
    }
}
