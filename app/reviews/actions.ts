"use server";

import { revalidatePath } from "next/cache";
import { getFirestoreDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

// Public review submission now happens client-side (lib/reviewsClient.ts),
// writing straight to Firestore with the client SDK. This file only keeps
// the admin-only moderation action, which still uses the privileged Admin
// SDK (bypassing Firestore rules) behind the admin cookie gate.
export async function deleteReview(reviewId: string) {
  await requireAdmin();

  const db = getFirestoreDb();
  await db.collection("reviews").doc(reviewId).delete();

  revalidatePath("/admin/reviews");
}
