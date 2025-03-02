import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { createShortURL, handleShortURL, fetchURLs, deleteURL, modifyURL } from "./routes";
import { login, verifyAuth, checkAuth, logout } from "./auth";

const app = new Hono();

// Serve Static Files (Including index.html)
app.use("*", serveStatic({ root: "./public", rewriteRequestPath: (path) => (path === "/" ? "/login.html" : path) }));

// Authentication
app.post("/login", login);
app.get("/verify", checkAuth);
app.post("/logout", logout);

// Protected Routes
app.post("/shorten", verifyAuth, createShortURL);
app.get("/urls", verifyAuth, fetchURLs);
app.delete("/urls/:shortCode", verifyAuth, deleteURL);
app.put("/urls/:shortCode", verifyAuth, modifyURL);
app.get("/:shortCode", handleShortURL);

export default {
    port: 3000,
    fetch: app.fetch,
};