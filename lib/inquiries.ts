import "server-only";

import { getFirestoreDb } from "@/lib/firebaseAdmin";
import type { InquiryRecord } from "@/types/inquiry";

export async function listInquiries(limitCount = 200): Promise<InquiryRecord[]> {
  const db = getFirestoreDb();
  const snapshot = await db
    .collection("inquiries")
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate?.() as Date | undefined;
    return {
      id: doc.id,
      name: data.name as string,
      email: data.email as string,
      message: data.message as string,
      resolved: Boolean(data.resolved),
      createdAt: (createdAt ?? new Date()).toISOString(),
    };
  });
}
