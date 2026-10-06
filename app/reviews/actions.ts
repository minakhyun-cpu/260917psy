"use server";

import { revalidatePath } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { reviewSchema, type ReviewInput } from "@/types/review";
import { getFirestoreDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

export type SubmitReviewResult =
  | { success: true }
  | { success: false; error: string };

export async function submitReview(
  input: ReviewInput,
): Promise<SubmitReviewResult> {
  const parsed = reviewSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "입력하신 내용을 다시 확인해주세요." };
  }

  // Honeypot field: a real visitor never sees or fills this input.
  if (parsed.data.website) {
    return { success: false, error: "제출에 실패했습니다." };
  }

  try {
    const db = getFirestoreDb();
    await db.collection("reviews").add({
      name: parsed.data.name,
      rating: parsed.data.rating,
      content: parsed.data.content,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.error("submitReview error", err);
    return {
      success: false,
      error: "후기 등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  revalidatePath("/reviews");
  return { success: true };
}

export async function deleteReview(reviewId: string) {
  await requireAdmin();

  const db = getFirestoreDb();
  await db.collection("reviews").doc(reviewId).delete();

  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
}
