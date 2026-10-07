"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Client-side Firebase SDK — used only by "use client" components for the
// public-facing write paths (submitting a review or an inquiry) and the
// public reviews list. Admin-only operations (columns, moderation) still go
// through the server-side Admin SDK in lib/firebaseAdmin.ts. Firestore
// security rules (firebase/firestore.rules) validate everything written
// here, since this config and any data sent through it is visible to
// anyone using the site.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getClientApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getClientDb() {
  return getFirestore(getClientApp());
}

// Writes require request.auth != null per the Firestore rules, so sign in
// anonymously (silent, no UI) before the first write or read of the
// session. Safe to call repeatedly — it's a no-op once already signed in.
export async function ensureSignedIn() {
  const auth = getAuth(getClientApp());
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  return auth.currentUser;
}
