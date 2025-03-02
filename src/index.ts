import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handleShortURL, createShortURL } from './routes'

const app = new Hono()

// Enable CORS
app.use(cors())

// API Routes
app.get('/', (c) => c.text('Hono.js Link Shortener API'))
app.post('/shorten', createShortURL)
app.get('/:shortCode', handleShortURL)

export default app
