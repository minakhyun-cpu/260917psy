"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { columnSchema, type ColumnInput } from "@/types/column";
import { getFirestoreDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

export type ColumnFormResult = { success: false; error: string } | undefined;

export async function createColumn(
  _prevState: ColumnFormResult,
  formData: FormData,
): Promise<ColumnFormResult> {
  await requireAdmin();

  const parsed = columnSchema.safeParse(parseColumnForm(formData));
  if (!parsed.success) {
    return { success: false, error: "입력하신 내용을 다시 확인해주세요." };
  }

  const db = getFirestoreDb();
  await db.collection("columns").add({
    ...parsed.data,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  revalidatePath("/columns");
  revalidatePath("/admin/columns");
  redirect("/admin/columns");
}

export async function updateColumn(
  columnId: string,
  _prevState: ColumnFormResult,
  formData: FormData,
): Promise<ColumnFormResult> {
  await requireAdmin();

  const parsed = columnSchema.safeParse(parseColumnForm(formData));
  if (!parsed.success) {
    return { success: false, error: "입력하신 내용을 다시 확인해주세요." };
  }

  const db = getFirestoreDb();
  await db.collection("columns").doc(columnId).update({
    ...parsed.data,
    updatedAt: FieldValue.serverTimestamp(),
  });

  revalidatePath("/columns");
  revalidatePath(`/columns/${columnId}`);
  revalidatePath("/admin/columns");
  redirect("/admin/columns");
}

export async function deleteColumn(columnId: string) {
  await requireAdmin();

  const db = getFirestoreDb();
  await db.collection("columns").doc(columnId).delete();

  revalidatePath("/columns");
  revalidatePath("/admin/columns");
}

function parseColumnForm(formData: FormData): ColumnInput {
  return {
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    content: String(formData.get("content") ?? ""),
    category: String(formData.get("category") ?? "") as ColumnInput["category"],
    authorName: String(formData.get("authorName") ?? ""),
    published: formData.get("published") === "on",
  };
}
