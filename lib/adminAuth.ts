import "server-only";

// Minimal cookie-based gate for the internal admin dashboard. This compares
// the cookie value directly against ADMIN_PASSWORD; it is intentionally
// lightweight (no session store) and is meant for a small internal team,
// not as a general-purpose auth system.
export const ADMIN_COOKIE_NAME = "admin_session";

export function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD 환경변수가 설정되어 있지 않습니다.");
  }
  return password;
}

export function isValidAdminSession(cookieValue: string | undefined) {
  if (!cookieValue) return false;
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return cookieValue === expected;
}
