import crypto from "crypto";

const SESSION_MAX_AGE_DAYS = 7;

export function createSessionToken(email: string): string {
    const secret = process.env.ADMIN_SESSION_SECRET || "fallback-secret-key-at-least-32-chars";
    const expiresAt = Date.now() + SESSION_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    const payload = `${email}:${expiresAt}`;
    const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return `${payload}:${hmac}`;
}

export function verifySessionToken(token: string | undefined): boolean {
    if (!token) return false;

    const parts = token.split(":");
    if (parts.length !== 3) return false;

    const [email, expiresAtStr, hmac] = parts;
    const expiresAt = Number(expiresAtStr);

    if (isNaN(expiresAt) || Date.now() > expiresAt) {
        return false;
    }

    const expectedEmail = process.env.ADMIN_EMAIL;
    if (!expectedEmail || email !== expectedEmail) {
        return false;
    }

    const secret = process.env.ADMIN_SESSION_SECRET || "fallback-secret-key-at-least-32-chars";
    const payload = `${email}:${expiresAtStr}`;
    const expectedHmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");

    try {
        return crypto.timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(expectedHmac, "hex"));
    } catch {
        return false;
    }
}
