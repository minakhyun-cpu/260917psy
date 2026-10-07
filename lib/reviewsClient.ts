"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { reviewSchema, type ReviewInput } from "@/types/review";
import { getClientDb, ensureSignedIn } from "@/lib/firebaseClient";

export type SubmitReviewResult =
  | { success: true }
  | { success: false; error: string };

// Runs entirely in the browser: validates, then writes straight to
// Firestore using the client SDK. Firestore rules (not this function) are
// the real security boundary — this validation is just UX.
export async function submitReviewClient(
  input: ReviewInput,
): Promise<SubmitReviewResult> {
  const parsed = reviewSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "입력하신 내용을 다시 확인해주세요." };
  }

  if (parsed.data.website) {
    return { success: false, error: "제출에 실패했습니다." };
  }

  try {
    await ensureSignedIn();
    const db = getClientDb();
    await addDoc(collection(db, "reviews"), {
      name: parsed.data.name,
      rating: parsed.data.rating,
      content: parsed.data.content,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("submitReviewClient error", err);
    return {
      success: false,
      error: "후기 등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return { success: true };
}
