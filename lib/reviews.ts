import "server-only";

import { getFirestoreDb } from "@/lib/firebaseAdmin";
import type { ReviewRecord } from "@/types/review";

export async function listReviews(limitCount = 50): Promise<ReviewRecord[]> {
  const db = getFirestoreDb();
  const snapshot = await db
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate?.() as Date | undefined;
    return {
      id: doc.id,
      name: data.name as string,
      rating: data.rating as number,
      content: data.content as string,
      createdAt: (createdAt ?? new Date()).toISOString(),
    };
  });
}
