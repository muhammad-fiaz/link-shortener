import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { createShortURL, handleShortURL, fetchURLs, deleteURL, modifyURL } from "./routes";
import { login, verifyAuth, checkAuth, logout } from "./auth";

const app = new Hono();

// 🔹 Serve Static Files (Including index.html)
app.use(
    "*",
    serveStatic({
        root: "./public",
        rewriteRequestPath: (path) => (path === "/" ? "/login.html" : path),
    })
);

// 🔹 Authentication Routes
const auth = new Hono();
auth.post("/login", login);
auth.get("/verify", checkAuth);
auth.post("/logout", logout);
app.route("/api/auth", auth);

// 🔹 Protected API Routes
const api = new Hono();
api.post("/shorten", verifyAuth, createShortURL);
api.get("/urls", verifyAuth, fetchURLs);
api.delete("/urls/:shortCode", verifyAuth, deleteURL);
api.put("/urls/:shortCode", verifyAuth, modifyURL);
app.route("/api", api);

// 🔹 Shortened URL Handling
app.get("/:shortCode", handleShortURL);

export default app;
