/**
 * Auth validation utilities — email, masking, and ID generation.
 * JWT and password crypto are now handled server-side by Supabase Auth.
 */

// ─── Email validation ──────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split('@')
  if (!name || !domain) return email
  const visible = name.length <= 3 ? name[0] : name.slice(0, 2)
  return `${visible}***@${domain}`
}

// ─── ID generation ─────────────────────────────────────────────

export function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
