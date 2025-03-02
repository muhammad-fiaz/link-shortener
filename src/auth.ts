import { Context } from "hono";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function login(c: Context) {
    const { username, password } = await c.req.json();

    if (username !== process.env.ADMIN_USERNAME) {
        return c.text("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10));

    if (!isMatch) {
        return c.text("Invalid credentials", 401);
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    c.header("Set-Cookie", `token=${token}; HttpOnly; Max-Age=3600; Path=/`);
    return c.json({ message: "Login successful" });
}

export async function verifyAuth(c: Context, next: Function) {
    const token = c.req.header("Cookie")?.split("; ").find(cookie => cookie.startsWith("token="))?.split("=")[1];
    if (!token) return c.text("Unauthorized", 401);

    try {
        jwt.verify(token, JWT_SECRET);
        return next();
    } catch {
        return c.text("Unauthorized", 401);
    }
}

export async function checkAuth(c: Context) {
    const token = c.req.header("Cookie")?.split("; ").find(cookie => cookie.startsWith("token="))?.split("=")[1];
    if (!token) return c.text("Unauthorized", 401);

    try {
        jwt.verify(token, JWT_SECRET);
        return c.text("Authorized", 200);
    } catch {
        return c.text("Unauthorized", 401);
    }
}

export async function logout(c: Context) {
    c.header("Set-Cookie", "token=; HttpOnly; Max-Age=0; Path=/");
    return c.json({ message: "Logout successful" });
}