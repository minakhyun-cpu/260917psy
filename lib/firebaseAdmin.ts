import "server-only";

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Server-only. All Firestore access in this app goes through the Admin SDK
// (never the client SDK), the same way Supabase access goes through the
// service-role key: reads happen in Server Components, writes happen in
// Server Actions, and access to /admin/* routes is already gated by
// proxy.ts + the ADMIN_PASSWORD cookie. Firestore security rules therefore
// deny all direct client access (see firebase/firestore.rules).
function getAdminApp(): App {
  const existing = getApps();
  if (existing.length > 0) {
    return existing[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase 환경변수(FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)가 설정되어 있지 않습니다.",
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getFirestoreDb() {
  return getFirestore(getAdminApp());
}
