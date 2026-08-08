import 'server-only';
import { randomBytes } from 'node:crypto';

/** MEC-2026-XXXXXXXX where XXXXXXXX is 8 base32 chars from a CSPRNG.
 *  Displayed on /quote/thank-you and included in the notification email. */
export function newReference(now = new Date()): string {
  const year = now.getUTCFullYear();
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L
  const bytes = randomBytes(8);
  let suffix = '';
  for (let i = 0; i < 8; i++) suffix += chars[bytes[i]! % chars.length];
  return `MEC-${year}-${suffix}`;
}

const SALT_PLACEHOLDER = 'change-me-to-a-32-char-random-string';
const MIN_SALT_LEN = 32;

/** Reads and validates IP_HASH_SALT. Throws in production if missing,
 *  too short, or still the .env.example placeholder — because a weak
 *  salt makes historical rate-limit hashes guessable and silently
 *  disables the rate-limit path. Returns null in dev if unset so
 *  local development without env setup still runs. */
function getSalt(): string | null {
  const salt = process.env.IP_HASH_SALT;
  const invalid = !salt || salt.length < MIN_SALT_LEN || salt === SALT_PLACEHOLDER;
  if (invalid) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `IP_HASH_SALT must be a random string of at least ${MIN_SALT_LEN} characters and not the placeholder value.`,
      );
    }
    return null;
  }
  return salt;
}

/** Salted SHA-256 of the caller's IP, hex encoded. Never store raw IPs. */
export async function hashIp(ip: string): Promise<string | null> {
  const salt = getSalt();
  if (!salt || !ip) return null;
  const { createHash } = await import('node:crypto');
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}
