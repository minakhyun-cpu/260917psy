"use server";

import { revalidatePath } from "next/cache";
import { getFirestoreDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

// Public inquiry submission now happens client-side
// (lib/inquiriesClient.ts), writing straight to Firestore with the client
// SDK. This file only keeps admin-only actions, which still use the
// privileged Admin SDK (bypassing Firestore rules) behind the admin cookie
// gate.
export async function toggleInquiryResolved(
  inquiryId: string,
  resolved: boolean,
) {
  await requireAdmin();

  const db = getFirestoreDb();
  await db.collection("inquiries").doc(inquiryId).update({ resolved });

  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(inquiryId: string) {
  await requireAdmin();

  const db = getFirestoreDb();
  await db.collection("inquiries").doc(inquiryId).delete();

  revalidatePath("/admin/inquiries");
}
