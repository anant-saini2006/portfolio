import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Verify a password against the ADMIN_PASSWORD env var.
 */
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not set in environment variables.");
  }
  return password === adminPassword;
}

/**
 * Create a simple signed session token.
 * Format: timestamp.signature
 * The signature is a hex-encoded hash of (timestamp + secret).
 */
function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set.");
  // Simple HMAC-like signature using Web Crypto-compatible approach
  // For edge/serverless compatibility, we use a basic hash
  const data = payload + "." + secret;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Create a session cookie after successful login.
 */
export async function createSession(): Promise<void> {
  const timestamp = Date.now().toString();
  const signature = sign(timestamp);
  const token = `${timestamp}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

/**
 * Verify the session cookie is valid and not expired.
 */
export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const expectedSignature = sign(timestamp);
  if (signature !== expectedSignature) return false;

  // Check expiry
  const created = parseInt(timestamp, 10);
  if (isNaN(created)) return false;
  if (Date.now() - created > MAX_AGE * 1000) return false;

  return true;
}

/**
 * Destroy the session cookie (logout).
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
