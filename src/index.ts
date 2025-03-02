import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { createShortURL, handleShortURL } from "./routes";
import { login, verifyAuth } from "./auth";

const app = new Hono();

// Serve Static Files
app.use("/", serveStatic({ root: "./public" }));

// Authentication
app.post("/login", login);

// Protected Routes
app.post("/shorten", verifyAuth, createShortURL);
app.get("/:shortCode", handleShortURL);

export default {
    port: 3000,
    fetch: app.fetch,
};
