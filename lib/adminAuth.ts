import "server-only";

import { cookies } from "next/headers";

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

// Server Actions are directly POST-able regardless of which page rendered
// them, so proxy.ts's path-based gate is not a substitute for checking the
// admin session inside the action itself. Call this first in any Server
// Action that performs an admin-only write.
export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) {
    throw new Error("관리자 인증이 필요합니다.");
  }
}
