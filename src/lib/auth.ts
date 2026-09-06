import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "kiser_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours
const SCRYPT_KEYLEN = 64;

/**
 * `scrypt:<saltHex>:<keyHex>` — what goes in ADMIN_PASSWORD_HASH.
 * Colon-separated deliberately: dotenv expands `$`, which silently corrupts
 * the hash when it is loaded from a .env file.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const key = scryptSync(password, salt, SCRYPT_KEYLEN);
  return `scrypt:${salt.toString("hex")}:${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  try {
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    const actual = scryptSync(password, salt, expected.length);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(secret: string): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }),
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string, secret: string): boolean {
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return false;

  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(mac);
  // Compare lengths first: timingSafeEqual throws on a mismatch.
  if (expected.length !== given.length) return false;
  if (!timingSafeEqual(expected, given)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

/** Fails closed: with either variable unset, nobody gets in. */
export async function isAuthenticated(): Promise<boolean> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return false;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return Boolean(token && verifySessionToken(token, secret));
}

/**
 * Fixed-window throttle. Serverless instances are ephemeral and not shared,
 * so this slows a single warm instance rather than truly rate-limiting the
 * endpoint. Adequate against casual guessing; a shared store would be needed
 * to make it real.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export function throttle(key: string): { allowed: boolean; retryInMs: number } {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryInMs: 0 };
  }
  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) {
    return { allowed: false, retryInMs: entry.resetAt - now };
  }
  return { allowed: true, retryInMs: 0 };
}
