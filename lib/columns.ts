import "server-only";

import { getFirestoreDb } from "@/lib/firebaseAdmin";
import type { ColumnRecord } from "@/types/column";

function toColumnRecord(
  id: string,
  data: FirebaseFirestore.DocumentData,
): ColumnRecord {
  const createdAt = data.createdAt?.toDate?.() as Date | undefined;
  const updatedAt = data.updatedAt?.toDate?.() as Date | undefined;
  return {
    id,
    title: data.title as string,
    summary: data.summary as string,
    content: data.content as string,
    category: data.category as string,
    authorName: data.authorName as string,
    published: Boolean(data.published),
    createdAt: (createdAt ?? new Date()).toISOString(),
    updatedAt: (updatedAt ?? createdAt ?? new Date()).toISOString(),
  };
}

// Firestore needs a composite index for a where() + orderBy() on different
// fields. To avoid requiring that setup, we fetch a bounded, recent set
// ordered by date and filter `published` in memory instead.
export async function listPublishedColumns(
  limitCount = 50,
): Promise<ColumnRecord[]> {
  const db = getFirestoreDb();
  const snapshot = await db
    .collection("columns")
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();

  return snapshot.docs
    .map((doc) => toColumnRecord(doc.id, doc.data()))
    .filter((column) => column.published);
}

export async function listAllColumns(limitCount = 200): Promise<ColumnRecord[]> {
  const db = getFirestoreDb();
  const snapshot = await db
    .collection("columns")
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();

  return snapshot.docs.map((doc) => toColumnRecord(doc.id, doc.data()));
}

export async function getColumnById(id: string): Promise<ColumnRecord | null> {
  const db = getFirestoreDb();
  const doc = await db.collection("columns").doc(id).get();
  if (!doc.exists) return null;
  return toColumnRecord(doc.id, doc.data()!);
}
