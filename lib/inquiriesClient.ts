"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { inquirySchema, type InquiryInput } from "@/types/inquiry";
import { getClientDb, ensureSignedIn } from "@/lib/firebaseClient";

export type SubmitInquiryResult =
  | { success: true }
  | { success: false; error: string };

export async function submitInquiryClient(
  input: InquiryInput,
): Promise<SubmitInquiryResult> {
  const parsed = inquirySchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "입력하신 내용을 다시 확인해주세요." };
  }

  if (parsed.data.website) {
    return { success: false, error: "제출에 실패했습니다." };
  }

  try {
    await ensureSignedIn();
    const db = getClientDb();
    await addDoc(collection(db, "inquiries"), {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      resolved: false,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("submitInquiryClient error", err);
    return {
      success: false,
      error: "문의 등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return { success: true };
}
